import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { trackEvent, EVENTS, trackFormStart } from "@/lib/tracking";
import { useCreateLead } from "@/hooks/useLeads";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, CheckCircle, FileText, AlertCircle } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address").max(255),
  company: z.string().min(2, "Company name is required").max(100),
  website: z.string().url("Please enter a valid URL").max(255),
  budget: z.string().min(1, "Please select a budget range"),
  priorities: z.array(z.string()).min(1, "Select at least one priority"),
  consent: z.boolean().refine((val) => val === true, {
    message: "You must agree to receive emails",
  }),
});

type FormData = z.infer<typeof formSchema>;

const budgetRanges = [
  "Under £2,000/month",
  "£2,000 - £5,000/month",
  "£5,000 - £10,000/month",
  "£10,000 - £25,000/month",
  "£25,000+/month",
];

const priorities = [
  "More leads",
  "Better lead quality",
  "Fix tracking",
  "Website rebuild",
  "All of the above",
];

interface InlineLeadFormProps {
  source?: string;
  variant?: "default" | "compact";
}

type FormStatus = "idle" | "submitting" | "generating" | "success" | "error";

interface AuditResult {
  reportUrl: string;
  overallScore: number;
  emailSent: boolean;
}

export function InlineLeadForm({ source = "inline", variant = "default" }: InlineLeadFormProps) {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<FormStatus>("idle");
  const [auditResult, setAuditResult] = useState<AuditResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>([]);
  const [formStarted, setFormStarted] = useState(false);
  const createLead = useCreateLead();

  // Pre-fill from URL params (from exit intent popup)
  const prefillWebsite = searchParams.get("website") || "";
  const prefillEmail = searchParams.get("email") || "";
  const prefillSource = searchParams.get("source") || source;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      website: prefillWebsite,
      email: prefillEmail,
    },
  });

  // Set prefilled values on mount
  useEffect(() => {
    if (prefillWebsite) {
      setValue("website", prefillWebsite);
    }
    if (prefillEmail) {
      setValue("email", prefillEmail);
    }
  }, [prefillWebsite, prefillEmail, setValue]);

  const handleFirstInteraction = () => {
    if (!formStarted) {
      setFormStarted(true);
      trackFormStart('audit', window.location.pathname, prefillSource);
    }
  };

  const onSubmit = async (data: FormData) => {
    setStatus("submitting");
    setErrorMessage("");
    
    try {
      // Step 1: Save lead to database
      const leadResult = await createLead.mutateAsync({
        name: data.name,
        email: data.email,
        company: data.company,
        source: prefillSource === 'exit-intent' ? 'exit-intent' : 'audit',
        metadata: {
          website: data.website,
          budget: data.budget,
          priorities: data.priorities,
        },
      });

      // Track successful lead capture
      trackEvent(EVENTS.AUDIT_FORM_SUBMITTED, {
        source_page: window.location.pathname,
        form_variant: prefillSource,
        has_website_url: !!data.website,
        budget_band: data.budget,
      });

      // Step 2: Generate the audit PDF
      setStatus("generating");
      
      const { data: auditData, error: auditError } = await supabase.functions.invoke(
        "generate-audit-pdf",
        {
          body: {
            email: data.email,
            name: data.name,
            websiteUrl: data.website,
            companyName: data.company,
            leadId: leadResult?.id,
          },
        }
      );

      if (auditError) {
        console.error("Audit generation error:", auditError);
        throw new Error(auditError.message || "Failed to generate audit");
      }

      if (auditData?.error) {
        throw new Error(auditData.error);
      }

      // Success!
      setAuditResult({
        reportUrl: auditData.reportUrl,
        overallScore: auditData.overallScore,
        emailSent: auditData.emailSent,
      });
      setStatus("success");
      
    } catch (error) {
      console.error("Form submission error:", error);
      setErrorMessage(
        error instanceof Error 
          ? error.message 
          : "Something went wrong. Please try again."
      );
      setStatus("error");
      
      trackEvent(EVENTS.AUDIT_FORM_ERROR, {
        source_page: window.location.pathname,
        form_variant: prefillSource,
        error_type: 'submission',
      });
    }
  };

  const handlePriorityChange = (priority: string, checked: boolean) => {
    const updated = checked
      ? [...selectedPriorities, priority]
      : selectedPriorities.filter((p) => p !== priority);
    
    setSelectedPriorities(updated);
    setValue("priorities", updated, { shouldValidate: true });
  };

  // Success state
  if (status === "success" && auditResult) {
    return (
      <Card className="p-8 bg-card border-border">
        <div className="text-center space-y-6">
          <div className="w-16 h-16 mx-auto rounded-full bg-accent/10 flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-accent" />
          </div>
          
          <div className="space-y-2">
            <h3 className="text-2xl font-light text-foreground">Your audit is ready!</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              We've analyzed your website and generated a comprehensive report.
              {auditResult.emailSent && " A copy has also been sent to your email."}
            </p>
          </div>

          <div className="bg-muted/50 rounded-lg p-6 max-w-sm mx-auto">
            <div className="text-sm text-muted-foreground mb-2">Your Overall Score</div>
            <div className="text-5xl font-bold text-accent">{auditResult.overallScore}</div>
            <div className="text-sm text-muted-foreground">/100</div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button asChild size="lg">
              <a href={auditResult.reportUrl} target="_blank" rel="noopener noreferrer">
                <FileText className="w-4 h-4 mr-2" />
                View Full Report
              </a>
            </Button>
            <Button variant="outline" asChild size="lg">
              <a href="/contact">Book a Strategy Call</a>
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  // Generating state
  if (status === "generating") {
    return (
      <Card className="p-8 bg-card border-border">
        <div className="text-center space-y-6">
          <div className="w-16 h-16 mx-auto rounded-full bg-accent/10 flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-accent animate-spin" />
          </div>
          
          <div className="space-y-2">
            <h3 className="text-2xl font-light text-foreground">Generating your audit...</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              We're analyzing your website across technical SEO, performance, content, and conversion factors. This usually takes 30-60 seconds.
            </p>
          </div>

          <div className="space-y-2 text-sm text-muted-foreground">
            <p>✓ Checking technical health</p>
            <p>✓ Analyzing SEO factors</p>
            <p>✓ Evaluating page performance</p>
            <p className="animate-pulse">→ Generating recommendations...</p>
          </div>
        </div>
      </Card>
    );
  }

  // Error state with retry option
  if (status === "error") {
    return (
      <Card className="p-8 bg-card border-border">
        <div className="text-center space-y-6">
          <div className="w-16 h-16 mx-auto rounded-full bg-destructive/10 flex items-center justify-center">
            <AlertCircle className="w-8 h-8 text-destructive" />
          </div>
          
          <div className="space-y-2">
            <h3 className="text-2xl font-light text-foreground">Something went wrong</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              {errorMessage || "We couldn't generate your audit. Please try again."}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => setStatus("idle")} size="lg">
              Try Again
            </Button>
            <Button variant="outline" asChild size="lg">
              <a href="/contact">Contact Support</a>
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  // Default form state
  return (
    <Card className="p-8 bg-card border-border">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-light text-foreground">
            Get your instant SEO & website audit
          </h3>
          <p className="text-muted-foreground">
            Enter your details and we'll generate a comprehensive audit of your website in under 60 seconds.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                {...register("name")}
                onFocus={handleFirstInteraction}
                className={errors.name ? "border-destructive" : ""}
              />
              {errors.name && (
                <p className="text-sm text-destructive">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Work Email *</Label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                className={errors.email ? "border-destructive" : ""}
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="company">Company Name *</Label>
              <Input
                id="company"
                {...register("company")}
                className={errors.company ? "border-destructive" : ""}
              />
              {errors.company && (
                <p className="text-sm text-destructive">{errors.company.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="website">Website URL *</Label>
              <Input
                id="website"
                type="url"
                placeholder="https://"
                {...register("website")}
                className={errors.website ? "border-destructive" : ""}
              />
              {errors.website && (
                <p className="text-sm text-destructive">{errors.website.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="budget">Monthly Marketing Budget *</Label>
            <Select onValueChange={(value) => setValue("budget", value, { shouldValidate: true })}>
              <SelectTrigger className={errors.budget ? "border-destructive" : ""}>
                <SelectValue placeholder="Select budget range" />
              </SelectTrigger>
              <SelectContent>
                {budgetRanges.map((range) => (
                  <SelectItem key={range} value={range}>
                    {range}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.budget && (
              <p className="text-sm text-destructive">{errors.budget.message}</p>
            )}
          </div>

          <div className="space-y-3">
            <Label>Main Priority * (select all that apply)</Label>
            <div className="space-y-2">
              {priorities.map((priority) => (
                <div key={priority} className="flex items-center space-x-2">
                  <Checkbox
                    id={priority}
                    checked={selectedPriorities.includes(priority)}
                    onCheckedChange={(checked) =>
                      handlePriorityChange(priority, checked as boolean)
                    }
                  />
                  <label
                    htmlFor={priority}
                    className="text-sm font-normal cursor-pointer text-foreground"
                  >
                    {priority}
                  </label>
                </div>
              ))}
            </div>
            {errors.priorities && (
              <p className="text-sm text-destructive">{errors.priorities.message}</p>
            )}
          </div>

          <div className="flex items-start space-x-2">
            <Checkbox
              id="consent"
              {...register("consent")}
              onCheckedChange={(checked) => setValue("consent", checked as boolean, { shouldValidate: true })}
            />
            <label htmlFor="consent" className="text-sm text-muted-foreground cursor-pointer">
              I'm happy for Avorria to email me insights and follow-ups.
            </label>
          </div>
          {errors.consent && (
            <p className="text-sm text-destructive">{errors.consent.message}</p>
          )}

          <div className="pt-4 space-y-2">
            <Button
              type="submit"
              disabled={status === "submitting"}
              className="w-full md:w-auto"
              size="lg"
            >
              {status === "submitting" ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Generate my instant audit"
              )}
            </Button>
            <p className="text-xs text-muted-foreground">
              ⚡ Instant results • 🔒 Your data is safe
            </p>
          </div>
        </form>
      </div>
    </Card>
  );
}