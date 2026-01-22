import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import EstimatorProgress from "@/components/EstimatorProgress";
import { ArrowLeft, ArrowRight, Download, Calendar, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { trackEvent, EVENTS, getUserType } from "@/lib/tracking";
import { useCreateLead } from "@/hooks/useLeads";

interface FormData {
  // Step 1
  projectTypes: string[];
  engagementModel: string;
  timeline: string;
  
  // Step 2
  businessName: string;
  websiteUrl: string;
  industry: string;
  dealValue: string;
  audience: string[];
  
  // Step 3
  monthlySpend: string;
  currentChannels: string[];
  biggestFrustration: string;
  
  // Step 4
  mainObjective: string;
  keyMetric: string;
  nonNegotiables: string;
  
  // Step 5
  investmentLevel: string;
  involvementLevel: string;
  
  // Step 6
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  phone: string;
  openToCall: boolean;
}

const ProjectEstimator = () => {
  const { toast } = useToast();
  const createLead = useCreateLead();
  const [currentStep, setCurrentStep] = useState(1);
  const [showResults, setShowResults] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    projectTypes: [],
    engagementModel: "",
    timeline: "",
    businessName: "",
    websiteUrl: "",
    industry: "",
    dealValue: "",
    audience: [],
    monthlySpend: "",
    currentChannels: [],
    biggestFrustration: "",
    mainObjective: "",
    keyMetric: "",
    nonNegotiables: "",
    investmentLevel: "",
    involvementLevel: "",
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    phone: "",
    openToCall: false,
  });

  const totalSteps = 6;

  // Track estimator viewed on mount
  useEffect(() => {
    trackEvent(EVENTS.ESTIMATOR_VIEWED, {
      entry_source: document.referrer || 'direct',
      user_type: getUserType(),
    });
  }, []);

  const handleNext = () => {
    const stepKeys = ['business_profile', 'channels', 'current_situation', 'goals_kpis', 'budget_fit', 'contact'];
    
    trackEvent(EVENTS.ESTIMATOR_STEP_COMPLETED, {
      step_number: currentStep,
      step_key: stepKeys[currentStep - 1] || 'unknown',
      is_back: false,
    });
    
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    const stepKeys = ['business_profile', 'channels', 'current_situation', 'goals_kpis', 'budget_fit', 'contact'];
    
    if (currentStep > 1) {
      trackEvent(EVENTS.ESTIMATOR_STEP_COMPLETED, {
        step_number: currentStep - 1,
        step_key: stepKeys[currentStep - 2] || 'unknown',
        is_back: true,
      });
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    // Save lead to database
    try {
      await createLead.mutateAsync({
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
        phone: formData.phone || null,
        company: formData.businessName,
        source: 'estimator',
        metadata: {
          projectTypes: formData.projectTypes,
          engagementModel: formData.engagementModel,
          timeline: formData.timeline,
          websiteUrl: formData.websiteUrl,
          industry: formData.industry,
          dealValue: formData.dealValue,
          audience: formData.audience,
          monthlySpend: formData.monthlySpend,
          currentChannels: formData.currentChannels,
          biggestFrustration: formData.biggestFrustration,
          mainObjective: formData.mainObjective,
          keyMetric: formData.keyMetric,
          nonNegotiables: formData.nonNegotiables,
          investmentLevel: formData.investmentLevel,
          involvementLevel: formData.involvementLevel,
          role: formData.role,
          openToCall: formData.openToCall,
        },
      });
    } catch (error) {
      console.error('Error saving estimator lead:', error);
    }

    trackEvent(EVENTS.ESTIMATOR_SUBMITTED, {
      project_type: formData.projectTypes.join(','),
      budget_band: formData.investmentLevel,
      timeline_band: formData.timeline,
      engagement_model: formData.engagementModel,
    });
    
    setShowResults(true);
    
    toast({
      title: "Brief generated successfully!",
      description: "Review your project summary and ballpark estimate below.",
    });
  };

  const handleToggleProjectType = (type: string) => {
    setFormData((prev) => ({
      ...prev,
      projectTypes: prev.projectTypes.includes(type)
        ? prev.projectTypes.filter((t) => t !== type)
        : [...prev.projectTypes, type],
    }));
  };

  const handleToggleChannel = (channel: string) => {
    setFormData((prev) => ({
      ...prev,
      currentChannels: prev.currentChannels.includes(channel)
        ? prev.currentChannels.filter((c) => c !== channel)
        : [...prev.currentChannels, channel],
    }));
  };

  const handleToggleAudience = (aud: string) => {
    setFormData((prev) => ({
      ...prev,
      audience: prev.audience.includes(aud)
        ? prev.audience.filter((a) => a !== aud)
        : [...prev.audience, aud],
    }));
  };

  // Calculate ballpark ranges based on inputs
  const calculateBallpark = () => {
    const { investmentLevel, projectTypes, engagementModel } = formData;
    
    if (investmentLevel === "testing") {
      return {
        range: "£1,500 - £5,000 one-off project or £1,000 - £2,500/month",
        model: "Small Project or Growth Lite",
        fit: "possible",
      };
    } else if (investmentLevel === "ready") {
      return {
        range: engagementModel === "retainer" 
          ? "£2,500 - £8,000/month" 
          : "£10,000 - £40,000 project fee",
        model: engagementModel === "retainer" ? "Growth or Scale Retainer" : "Strategic Project",
        fit: "strong",
      };
    } else if (investmentLevel === "scale") {
      return {
        range: engagementModel === "retainer" 
          ? "£8,000 - £20,000+/month" 
          : "£40,000 - £100,000+ project",
        model: engagementModel === "retainer" ? "Scale or Partner Retainer" : "Enterprise Project",
        fit: "strong",
      };
    } else {
      return {
        range: "£2,500 - £15,000/month or £10,000 - £50,000 project",
        model: "To be determined",
        fit: "needs-clarification",
      };
    }
  };

  const ballpark = calculateBallpark();

  if (showResults) {
    return (
      <div className="min-h-screen bg-background">
        <section className="pt-32 pb-20 px-6">
          <div className="container mx-auto max-w-4xl">
            <h1 className="text-4xl lg:text-5xl font-light leading-tight mb-4 text-foreground text-center">
              Here's what makes sense based on what you've told us.
            </h1>

            <div className="space-y-8">
              {/* Project Snapshot */}
              <Card className="border-border">
                <CardContent className="p-8 space-y-6">
                  <h2 className="text-2xl font-semibold text-foreground">Project Snapshot</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                        Services Requested
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {formData.projectTypes.map((type) => (
                          <span
                            key={type}
                            className="px-3 py-1 bg-accent/10 text-accent text-sm rounded-md"
                          >
                            {type}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                        Main Objective
                      </p>
                      <p className="text-foreground">{formData.mainObjective || "Not specified"}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                        Timeline
                      </p>
                      <p className="text-foreground">{formData.timeline || "Not specified"}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                        Engagement Model
                      </p>
                      <p className="text-foreground">{formData.engagementModel || "Not specified"}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Ballpark Range */}
              <Card className="border-accent bg-accent/5">
                <CardContent className="p-8 space-y-4">
                  <h2 className="text-2xl font-semibold text-foreground">Ballpark Investment Range</h2>
                  <p className="text-3xl font-light text-accent">{ballpark.range}</p>
                  <p className="text-sm text-muted-foreground">
                    This isn't a formal quote, but it's an honest range based on similar projects. If it's wildly out of line with what you had in mind, it's better we both know now.
                  </p>
                  {ballpark.fit === "needs-clarification" && (
                    <p className="text-sm text-foreground bg-background/50 p-4 rounded-md">
                      💡 <strong>We'll need to clarify a couple of things</strong> to give you a more accurate estimate. Let's jump on a call to firm this up.
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* Suggested Engagement */}
              <Card className="border-border">
                <CardContent className="p-8 space-y-4">
                  <h2 className="text-2xl font-semibold text-foreground">Suggested Engagement Model</h2>
                  <p className="text-lg text-foreground">
                    Based on what you've told us, you're likely a fit for:{" "}
                    <span className="font-semibold text-accent">{ballpark.model}</span>
                  </p>
                  <p className="text-muted-foreground">
                    {ballpark.fit === "strong" 
                      ? "This looks like a strong fit. We'd love to explore this with you on a strategy call."
                      : ballpark.fit === "possible"
                      ? "This could work, but we'd need to discuss scope and expectations in detail."
                      : "Let's have a conversation to understand your needs better and recommend the best approach."}
                  </p>
                </CardContent>
              </Card>

              {/* Next Steps */}
              <Card className="border-border bg-secondary">
                <CardContent className="p-8 space-y-6">
                  <h2 className="text-2xl font-semibold text-foreground">What happens next?</h2>
                  <ol className="space-y-3 text-muted-foreground">
                    <li className="flex items-start">
                      <span className="text-accent font-semibold mr-3">1.</span>
                      <span>We'll review your brief and respond within 24 hours</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-accent font-semibold mr-3">2.</span>
                      <span>Book a 30-minute strategy call to discuss scope and approach</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-accent font-semibold mr-3">3.</span>
                      <span>Receive a detailed proposal with exact pricing and timelines</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-accent font-semibold mr-3">4.</span>
                      <span>Start work and see measurable progress within 30 days</span>
                    </li>
                  </ol>
                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <Button
                      variant="accent"
                      size="lg"
                      className="flex-1"
                      asChild
                      onClick={() => console.log("estimator_book_call_clicked")}
                    >
                      <Link to="/contact">
                        <Calendar className="mr-2" size={20} />
                        Book Strategy Call
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      className="flex-1"
                      onClick={() => {
                        console.log("estimator_summary_email_clicked");
                        toast({
                          title: "Email sent!",
                          description: "Check your inbox for a copy of this brief.",
                        });
                      }}
                    >
                      <Mail className="mr-2" size={20} />
                      Email Me This
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Download Option */}
              <Card className="border-border">
                <CardContent className="p-8 text-center space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">Take this brief with you</h3>
                  <p className="text-muted-foreground">
                    You can hand this to any agency—not just us. We'd like to be the ones who win it.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      console.log("estimator_download_clicked");
                      window.print();
                    }}
                  >
                    <Download className="mr-2" size={18} />
                    Print or Save as PDF
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-light leading-tight mb-4 text-foreground text-center">
              Project Estimator & <span className="font-semibold text-accent">Brief Builder</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Answer a few focused questions and we'll give you a realistic budget range and a structured brief our team can turn into a proposal – no back-and-forth guesswork.
            </p>
            <p className="text-sm text-muted-foreground mt-4 italic">
              This is for serious projects and serious buyers. If you're just kicking tyres, start with a free audit instead.
            </p>
          </div>

          <EstimatorProgress currentStep={currentStep} totalSteps={totalSteps} />

          <Card className="border-border max-w-3xl mx-auto">
            <CardContent className="p-10">
              {/* Step 1: Basics */}
              {currentStep === 1 && (
                <div className="space-y-8 animate-fade-in">
                  <h2 className="text-3xl font-light text-foreground mb-6">Let's get the basics down.</h2>
                  
                  <div>
                    <Label className="text-base mb-4 block">Project type (select all that apply)</Label>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {["SEO", "Paid Media", "Web Design / Rebuild", "Funnel / Landing Pages", "Content & Email", "Analytics & Tracking"].map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => handleToggleProjectType(type)}
                          className={`p-4 rounded-lg border-2 text-left transition-all ${
                            formData.projectTypes.includes(type)
                              ? "border-accent bg-accent/10 text-accent"
                              : "border-border hover:border-accent/50"
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label className="text-base mb-4 block">Are you looking for a one-off project or an ongoing partnership?</Label>
                    <RadioGroup value={formData.engagementModel} onValueChange={(value) => setFormData({ ...formData, engagementModel: value })}>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:border-accent/50 transition-all">
                          <RadioGroupItem value="project" id="project" />
                          <Label htmlFor="project" className="cursor-pointer flex-1">One-off project</Label>
                        </div>
                        <div className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:border-accent/50 transition-all">
                          <RadioGroupItem value="retainer" id="retainer" />
                          <Label htmlFor="retainer" className="cursor-pointer flex-1">Ongoing retainer</Label>
                        </div>
                        <div className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:border-accent/50 transition-all">
                          <RadioGroupItem value="unsure" id="unsure" />
                          <Label htmlFor="unsure" className="cursor-pointer flex-1">Not sure yet</Label>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>

                  <div>
                    <Label className="text-base mb-4 block">Rough timeline</Label>
                    <RadioGroup value={formData.timeline} onValueChange={(value) => setFormData({ ...formData, timeline: value })}>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:border-accent/50 transition-all">
                          <RadioGroupItem value="asap" id="asap" />
                          <Label htmlFor="asap" className="cursor-pointer flex-1">ASAP (this month)</Label>
                        </div>
                        <div className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:border-accent/50 transition-all">
                          <RadioGroupItem value="1-3months" id="1-3months" />
                          <Label htmlFor="1-3months" className="cursor-pointer flex-1">Next 1-3 months</Label>
                        </div>
                        <div className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:border-accent/50 transition-all">
                          <RadioGroupItem value="3-6months" id="3-6months" />
                          <Label htmlFor="3-6months" className="cursor-pointer flex-1">3-6 months</Label>
                        </div>
                        <div className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:border-accent/50 transition-all">
                          <RadioGroupItem value="exploring" id="exploring" />
                          <Label htmlFor="exploring" className="cursor-pointer flex-1">"Just exploring"</Label>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>

                  <Button
                    variant="accent"
                    size="lg"
                    className="w-full"
                    onClick={handleNext}
                    disabled={formData.projectTypes.length === 0}
                  >
                    Continue
                    <ArrowRight className="ml-2" size={20} />
                  </Button>
                </div>
              )}

              {/* Step 2: Business & Audience */}
              {currentStep === 2 && (
                <div className="space-y-8 animate-fade-in">
                  <h2 className="text-3xl font-light text-foreground mb-6">Who are we helping you reach?</h2>
                  
                  <div>
                    <Label htmlFor="businessName">Business name</Label>
                    <Input
                      id="businessName"
                      value={formData.businessName}
                      onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="websiteUrl">Website URL</Label>
                    <Input
                      id="websiteUrl"
                      type="url"
                      value={formData.websiteUrl}
                      onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                      placeholder="https://"
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="industry">Industry</Label>
                    <Select value={formData.industry} onValueChange={(value) => setFormData({ ...formData, industry: value })}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select your industry" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="saas">SaaS / Software</SelectItem>
                        <SelectItem value="ecommerce">E-commerce</SelectItem>
                        <SelectItem value="professional">Professional Services</SelectItem>
                        <SelectItem value="healthcare">Healthcare</SelectItem>
                        <SelectItem value="finance">Finance / Fintech</SelectItem>
                        <SelectItem value="education">Education</SelectItem>
                        <SelectItem value="manufacturing">Manufacturing</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="dealValue">Average deal value / order value</Label>
                    <Input
                      id="dealValue"
                      value={formData.dealValue}
                      onChange={(e) => setFormData({ ...formData, dealValue: e.target.value })}
                      placeholder="e.g. £500, £5,000, £50,000"
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label className="text-base mb-4 block">Primary audience</Label>
                    <div className="space-y-3">
                      {["B2B", "B2C", "Both"].map((aud) => (
                        <div key={aud} className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:border-accent/50 transition-all">
                          <Checkbox
                            id={aud}
                            checked={formData.audience.includes(aud)}
                            onCheckedChange={() => handleToggleAudience(aud)}
                          />
                          <Label htmlFor={aud} className="cursor-pointer flex-1">{aud}</Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button variant="outline" size="lg" className="flex-1" onClick={handleBack}>
                      <ArrowLeft className="mr-2" size={20} />
                      Back
                    </Button>
                    <Button
                      variant="accent"
                      size="lg"
                      className="flex-1"
                      onClick={handleNext}
                      disabled={!formData.businessName}
                    >
                      Continue
                      <ArrowRight className="ml-2" size={20} />
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 3: Current Situation */}
              {currentStep === 3 && (
                <div className="space-y-8 animate-fade-in">
                  <h2 className="text-3xl font-light text-foreground mb-6">Where are you right now?</h2>
                  
                  <div>
                    <Label htmlFor="monthlySpend">Current monthly marketing spend</Label>
                    <Select value={formData.monthlySpend} onValueChange={(value) => setFormData({ ...formData, monthlySpend: value })}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="<2k">£0 - £2k</SelectItem>
                        <SelectItem value="2k-5k">£2k - £5k</SelectItem>
                        <SelectItem value="5k-10k">£5k - £10k</SelectItem>
                        <SelectItem value="10k-25k">£10k - £25k</SelectItem>
                        <SelectItem value="25k+">£25k+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-base mb-4 block">What's already in play?</Label>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {["SEO", "Google Ads", "Meta Ads", "LinkedIn Ads", "Email marketing", "Organic social", "None of the above"].map((channel) => (
                        <div key={channel} className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:border-accent/50 transition-all">
                          <Checkbox
                            id={channel}
                            checked={formData.currentChannels.includes(channel)}
                            onCheckedChange={() => handleToggleChannel(channel)}
                          />
                          <Label htmlFor={channel} className="cursor-pointer flex-1">{channel}</Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="biggestFrustration">Biggest frustration with your current setup</Label>
                    <Textarea
                      id="biggestFrustration"
                      value={formData.biggestFrustration}
                      onChange={(e) => setFormData({ ...formData, biggestFrustration: e.target.value })}
                      rows={4}
                      placeholder="e.g. Low-quality leads, no idea what's working, agency not proactive…"
                      className="mt-2"
                    />
                  </div>

                  <div className="flex gap-4">
                    <Button variant="outline" size="lg" className="flex-1" onClick={handleBack}>
                      <ArrowLeft className="mr-2" size={20} />
                      Back
                    </Button>
                    <Button variant="accent" size="lg" className="flex-1" onClick={handleNext}>
                      Continue
                      <ArrowRight className="ml-2" size={20} />
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 4: Goals & KPIs */}
              {currentStep === 4 && (
                <div className="space-y-8 animate-fade-in">
                  <h2 className="text-3xl font-light text-foreground mb-6">What does success actually look like?</h2>
                  
                  <div>
                    <Label className="text-base mb-4 block">Main objective for the next 6-12 months</Label>
                    <RadioGroup value={formData.mainObjective} onValueChange={(value) => setFormData({ ...formData, mainObjective: value })}>
                      <div className="space-y-3">
                        {[
                          "More leads",
                          "Better lead quality",
                          "Scale ad spend profitably",
                          "Fix tracking / clarity",
                          "Rebuild the site to convert better",
                        ].map((obj) => (
                          <div key={obj} className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:border-accent/50 transition-all">
                            <RadioGroupItem value={obj} id={obj} />
                            <Label htmlFor={obj} className="cursor-pointer flex-1">{obj}</Label>
                          </div>
                        ))}
                      </div>
                    </RadioGroup>
                  </div>

                  <div>
                    <Label className="text-base mb-4 block">If you had to pick one metric to improve, what would it be?</Label>
                    <RadioGroup value={formData.keyMetric} onValueChange={(value) => setFormData({ ...formData, keyMetric: value })}>
                      <div className="space-y-3">
                        {[
                          "Cost per lead",
                          "Number of qualified leads",
                          "Revenue from inbound",
                          "ROAS on paid media",
                          "Other",
                        ].map((metric) => (
                          <div key={metric} className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:border-accent/50 transition-all">
                            <RadioGroupItem value={metric} id={metric} />
                            <Label htmlFor={metric} className="cursor-pointer flex-1">{metric}</Label>
                          </div>
                        ))}
                      </div>
                    </RadioGroup>
                  </div>

                  <div>
                    <Label htmlFor="nonNegotiables">Anything absolutely non-negotiable?</Label>
                    <Textarea
                      id="nonNegotiables"
                      value={formData.nonNegotiables}
                      onChange={(e) => setFormData({ ...formData, nonNegotiables: e.target.value })}
                      rows={3}
                      placeholder="e.g. Must integrate with HubSpot, must launch before [date]…"
                      className="mt-2"
                    />
                  </div>

                  <div className="flex gap-4">
                    <Button variant="outline" size="lg" className="flex-1" onClick={handleBack}>
                      <ArrowLeft className="mr-2" size={20} />
                      Back
                    </Button>
                    <Button
                      variant="accent"
                      size="lg"
                      className="flex-1"
                      onClick={handleNext}
                      disabled={!formData.mainObjective}
                    >
                      Continue
                      <ArrowRight className="ml-2" size={20} />
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 5: Budget & Fit */}
              {currentStep === 5 && (
                <div className="space-y-8 animate-fade-in">
                  <h2 className="text-3xl font-light text-foreground mb-6">Budget & fit check.</h2>
                  
                  <div>
                    <Label className="text-base mb-4 block">What level of investment are you realistically open to?</Label>
                    <RadioGroup value={formData.investmentLevel} onValueChange={(value) => setFormData({ ...formData, investmentLevel: value })}>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:border-accent/50 transition-all">
                          <RadioGroupItem value="testing" id="testing" />
                          <div className="flex-1">
                            <Label htmlFor="testing" className="cursor-pointer block font-medium">
                              "We're testing the waters"
                            </Label>
                            <p className="text-xs text-muted-foreground mt-1">
                              &lt;£2k / month or &lt;£10k project
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:border-accent/50 transition-all">
                          <RadioGroupItem value="ready" id="ready" />
                          <div className="flex-1">
                            <Label htmlFor="ready" className="cursor-pointer block font-medium">
                              "We're ready to invest properly"
                            </Label>
                            <p className="text-xs text-muted-foreground mt-1">
                              Roughly £2k-£8k / month or £10k-£40k project
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:border-accent/50 transition-all">
                          <RadioGroupItem value="scale" id="scale" />
                          <div className="flex-1">
                            <Label htmlFor="scale" className="cursor-pointer block font-medium">
                              "We want a serious scale partner"
                            </Label>
                            <p className="text-xs text-muted-foreground mt-1">
                              £8k+ / month or £40k+ project
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:border-accent/50 transition-all">
                          <RadioGroupItem value="unsure-budget" id="unsure-budget" />
                          <div className="flex-1">
                            <Label htmlFor="unsure-budget" className="cursor-pointer block font-medium">
                              "Not sure – I need guidance"
                            </Label>
                          </div>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>

                  <div>
                    <Label className="text-base mb-4 block">How involved do you want to be day-to-day?</Label>
                    <RadioGroup value={formData.involvementLevel} onValueChange={(value) => setFormData({ ...formData, involvementLevel: value })}>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:border-accent/50 transition-all">
                          <RadioGroupItem value="very" id="very" />
                          <Label htmlFor="very" className="cursor-pointer flex-1">
                            Very involved – collaboration and frequent check-ins
                          </Label>
                        </div>
                        <div className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:border-accent/50 transition-all">
                          <RadioGroupItem value="strategy" id="strategy" />
                          <Label htmlFor="strategy" className="cursor-pointer flex-1">
                            Involved on strategy, light on execution
                          </Label>
                        </div>
                        <div className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:border-accent/50 transition-all">
                          <RadioGroupItem value="outcome" id="outcome" />
                          <Label htmlFor="outcome" className="cursor-pointer flex-1">
                            Outcome-focused – just show me the numbers
                          </Label>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="flex gap-4">
                    <Button variant="outline" size="lg" className="flex-1" onClick={handleBack}>
                      <ArrowLeft className="mr-2" size={20} />
                      Back
                    </Button>
                    <Button
                      variant="accent"
                      size="lg"
                      className="flex-1"
                      onClick={handleNext}
                      disabled={!formData.investmentLevel}
                    >
                      Continue
                      <ArrowRight className="ml-2" size={20} />
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 6: Contact & Handoff */}
              {currentStep === 6 && (
                <div className="space-y-8 animate-fade-in">
                  <h2 className="text-3xl font-light text-foreground mb-6">Where should we send your brief & ballpark?</h2>
                  
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        required
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        required
                        className="mt-2"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Work Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="role">Role</Label>
                    <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="founder">Founder</SelectItem>
                        <SelectItem value="director">Director</SelectItem>
                        <SelectItem value="marketing">Marketing Lead</SelectItem>
                        <SelectItem value="sales">Sales Lead</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number (optional, but encouraged)</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="mt-2"
                    />
                  </div>

                  <div className="flex items-center space-x-3 p-4 rounded-lg border border-border">
                    <Checkbox
                      id="openToCall"
                      checked={formData.openToCall}
                      onCheckedChange={(checked) => setFormData({ ...formData, openToCall: checked as boolean })}
                    />
                    <Label htmlFor="openToCall" className="cursor-pointer flex-1">
                      I'm open to a follow-up call if we're a good fit.
                    </Label>
                  </div>

                  <p className="text-xs text-muted-foreground text-center">
                    🔒 Your data is safe. We'll never share it with third parties.
                  </p>

                  <div className="flex gap-4">
                    <Button variant="outline" size="lg" className="flex-1" onClick={handleBack}>
                      <ArrowLeft className="mr-2" size={20} />
                      Back
                    </Button>
                    <Button
                      variant="accent"
                      size="lg"
                      className="flex-1"
                      onClick={handleSubmit}
                      disabled={!formData.firstName || !formData.lastName || !formData.email}
                    >
                      Generate My Brief & Ballpark
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <p className="text-center text-sm text-muted-foreground mt-8">
            Need help? <Link to="/contact" className="text-accent hover:underline">Contact us directly</Link>
          </p>
        </div>
      </section>
    </div>
  );
};

export default ProjectEstimator;
