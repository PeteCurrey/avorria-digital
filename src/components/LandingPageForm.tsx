import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

interface LandingPageFormProps {
  serviceName: string;
  industryName?: string;
  locationName?: string;
}

const formSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Name must be at least 2 characters" })
    .max(100, { message: "Name must be less than 100 characters" }),
  email: z
    .string()
    .trim()
    .email({ message: "Invalid email address" })
    .max(255, { message: "Email must be less than 255 characters" }),
  businessName: z
    .string()
    .trim()
    .min(2, { message: "Business name must be at least 2 characters" })
    .max(100, { message: "Business name must be less than 100 characters" }),
  website: z
    .string()
    .trim()
    .max(255, { message: "Website URL must be less than 255 characters" })
    .optional()
    .or(z.literal("")),
  budgetRange: z.string().min(1, { message: "Please select a budget range" }),
  mainGoal: z.string().min(1, { message: "Please select your main goal" }),
  message: z
    .string()
    .trim()
    .max(2000, { message: "Message must be less than 2000 characters" })
    .optional()
    .or(z.literal("")),
});

type FormData = z.infer<typeof formSchema>;

const LandingPageForm = ({ serviceName, industryName, locationName }: LandingPageFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    businessName: "",
    website: "",
    budgetRange: "",
    mainGoal: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate form
    try {
      formSchema.parse(formData);
      setErrors({});

      // Track conversion event
      if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("event", "conversion", {
          send_to: "AW-XXXXX/XXXXX", // Replace with actual conversion ID
          event_category: "Lead",
          event_label: `${serviceName}${industryName ? ` - ${industryName}` : ""}${
            locationName ? ` - ${locationName}` : ""
          }`,
        });
      }

      toast({
        title: "Thank you for reaching out!",
        description:
          "We'll review your information and get back to you within 24 hours with a custom strategy.",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        businessName: "",
        website: "",
        budgetRange: "",
        mainGoal: "",
        message: "",
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Partial<Record<keyof FormData, string>> = {};
        error.issues.forEach((issue) => {
          if (issue.path[0]) {
            fieldErrors[issue.path[0] as keyof FormData] = issue.message;
          }
        });
        setErrors(fieldErrors);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="border-border">
      <CardContent className="p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="name">
                Full Name <span className="text-accent">*</span>
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="mt-2"
                maxLength={100}
              />
              {errors.name && <p className="text-sm text-destructive mt-1">{errors.name}</p>}
            </div>
            <div>
              <Label htmlFor="email">
                Email Address <span className="text-accent">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="mt-2"
                maxLength={255}
              />
              {errors.email && <p className="text-sm text-destructive mt-1">{errors.email}</p>}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="businessName">
                Business Name <span className="text-accent">*</span>
              </Label>
              <Input
                id="businessName"
                value={formData.businessName}
                onChange={(e) => handleInputChange("businessName", e.target.value)}
                className="mt-2"
                maxLength={100}
              />
              {errors.businessName && (
                <p className="text-sm text-destructive mt-1">{errors.businessName}</p>
              )}
            </div>
            <div>
              <Label htmlFor="website">Website URL</Label>
              <Input
                id="website"
                type="url"
                value={formData.website}
                onChange={(e) => handleInputChange("website", e.target.value)}
                placeholder="https://"
                className="mt-2"
                maxLength={255}
              />
              {errors.website && <p className="text-sm text-destructive mt-1">{errors.website}</p>}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="budgetRange">
                Budget Range <span className="text-accent">*</span>
              </Label>
              <Select
                value={formData.budgetRange}
                onValueChange={(value) => handleInputChange("budgetRange", value)}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select budget" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="under-2500">Under £2,500/month</SelectItem>
                  <SelectItem value="2500-5000">£2,500 - £5,000/month</SelectItem>
                  <SelectItem value="5000-10000">£5,000 - £10,000/month</SelectItem>
                  <SelectItem value="10000+">£10,000+/month</SelectItem>
                  <SelectItem value="project">One-off project</SelectItem>
                  <SelectItem value="unsure">Not sure yet</SelectItem>
                </SelectContent>
              </Select>
              {errors.budgetRange && (
                <p className="text-sm text-destructive mt-1">{errors.budgetRange}</p>
              )}
            </div>
            <div>
              <Label htmlFor="mainGoal">
                Main Goal <span className="text-accent">*</span>
              </Label>
              <Select
                value={formData.mainGoal}
                onValueChange={(value) => handleInputChange("mainGoal", value)}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select your goal" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="more-leads">More qualified leads</SelectItem>
                  <SelectItem value="lead-quality">Better lead quality</SelectItem>
                  <SelectItem value="lower-cpa">Lower cost per acquisition</SelectItem>
                  <SelectItem value="improve-roas">Improve ROAS/efficiency</SelectItem>
                  <SelectItem value="new-website">New website or redesign</SelectItem>
                  <SelectItem value="fix-tracking">Fix tracking & attribution</SelectItem>
                  <SelectItem value="full-strategy">Full marketing strategy</SelectItem>
                </SelectContent>
              </Select>
              {errors.mainGoal && (
                <p className="text-sm text-destructive mt-1">{errors.mainGoal}</p>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="message">Additional Details</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => handleInputChange("message", e.target.value)}
              rows={4}
              placeholder={`Tell us about your ${
                industryName ? industryName.toLowerCase() : "business"
              }${
                locationName ? ` in ${locationName}` : ""
              }... What are your biggest challenges? What have you tried before?`}
              className="mt-2"
              maxLength={2000}
            />
            {errors.message && <p className="text-sm text-destructive mt-1">{errors.message}</p>}
          </div>

          <Button type="submit" variant="accent" size="lg" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : `Get Your Custom ${serviceName} Strategy`}
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            We'll respond within 24 hours with a custom strategy and pricing. No spam, no hard sell.
          </p>
        </form>
      </CardContent>
    </Card>
  );
};

export default LandingPageForm;
