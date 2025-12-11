import { useState } from "react";
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

export function InlineLeadForm({ source = "inline", variant = "default" }: InlineLeadFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>([]);
  const [formStarted, setFormStarted] = useState(false);
  const createLead = useCreateLead();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    getValues,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const handleFirstInteraction = () => {
    if (!formStarted) {
      setFormStarted(true);
      trackFormStart('audit', window.location.pathname, source);
    }
  };

  const onSubmit = async (data: FormData) => {
    try {
      // Save lead to database
      await createLead.mutateAsync({
        name: data.name,
        email: data.email,
        company: data.company,
        source: source === 'audit-funnel' ? 'audit' : 'audit',
        metadata: {
          website: data.website,
          budget: data.budget,
          priorities: data.priorities,
        },
      });

      // Track successful submission
      trackEvent(EVENTS.AUDIT_FORM_SUBMITTED, {
        source_page: window.location.pathname,
        form_variant: source,
        has_website_url: !!data.website,
        budget_band: data.budget,
      });
      
      setSubmitted(true);
    } catch (error) {
      // Track error
      trackEvent(EVENTS.AUDIT_FORM_ERROR, {
        source_page: window.location.pathname,
        form_variant: source,
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

  if (submitted) {
    return (
      <Card className="p-8 bg-card border-border">
        <div className="text-center space-y-4">
          <h3 className="text-2xl font-light text-foreground">Thank you!</h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            We'll review your setup and send your audit within 2–3 working days.
          </p>
          <div className="flex gap-4 justify-center pt-4">
            <Button asChild>
              <a href="/contact">Book a strategy call now</a>
            </Button>
            <Button variant="outline" asChild>
              <a href="/case-studies">View case studies</a>
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-8 bg-card border-border">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-light text-foreground">
            Want a straight answer on what's holding your marketing back?
          </h3>
          <p className="text-muted-foreground">
            Drop your details and we'll send you a quick teardown of your site, traffic and funnel – no fluff, no 40-page PDF.
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
              disabled={isSubmitting}
              className="w-full md:w-auto"
              size="lg"
            >
              {isSubmitting ? "Submitting..." : "Request my audit"}
            </Button>
            <p className="text-xs text-muted-foreground">
              🔒 Your data is safe. We'll never share it with third parties.
            </p>
          </div>
        </form>
      </div>
    </Card>
  );
}
