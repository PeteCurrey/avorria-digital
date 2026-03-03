import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { Upload, FileText, BarChart3, TrendingDown, MessagesSquare } from "lucide-react";
import { useCreateLead } from "@/hooks/useLeads";

const AgencyTeardown = () => {
  const navigate = useNavigate();
  const createLead = useCreateLead();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    website: "",
    monthlyFee: "",
    relationshipLength: "",
    painDescription: "",
    confirmShare: false,
    openToSwitch: false,
  });
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
      
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'teardown_upload_started');
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'teardown_upload_started');
      }
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Save lead to database
      await createLead.mutateAsync({
        name: formData.name,
        email: formData.email,
        company: formData.company,
        source: 'teardown',
        notes: formData.painDescription,
        metadata: {
          website: formData.website,
          monthlyFee: formData.monthlyFee,
          relationshipLength: formData.relationshipLength,
          openToSwitch: formData.openToSwitch,
          fileName: file?.name,
          fileSize: file?.size,
        },
      });

      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'teardown_upload_submitted', {
          monthly_fee_band: formData.monthlyFee,
          relationship_length: formData.relationshipLength,
          open_to_switch: formData.openToSwitch,
        });
      }

      navigate("/agency-report-teardown/thanks");
    } catch (error) {
      console.error('Error submitting teardown form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Agency Report Teardown - Get a Blunt Assessment | Avorria</title>
        <meta 
          name="description" 
          content="Upload your agency's report and we'll tell you if it's worth what you're paying. Plain-English breakdown of what's solid, what's filler, and where you're being short-changed." 
        />
      </Helmet>

      <div className="min-h-screen bg-background pt-24 pb-16">
        {/* Hero Section */}
        <section className="container mx-auto px-4 mb-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-light mb-6 text-foreground">
              Upload Your Agency's Report.<br />
              <span className="text-accent">We'll Tell You If It's Worth What You're Paying.</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
              If your monthly PDF is 40 slides of charts and no clear plan, you're not alone. Send us your latest report or proposal and we'll break it down in plain English – what's solid, what's filler, and where you're being short-changed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={() => document.getElementById('upload-form')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Upload my report for teardown
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => {
                  // Event: teardown_cta_view_reporting_clicked
                  if (typeof window !== 'undefined' && (window as any).gtag) {
                    (window as any).gtag('event', 'teardown_cta_view_reporting_clicked');
                  }
                  navigate('/reporting/demo');
                }}
              >
                See how we report instead
              </Button>
            </div>
          </div>
        </section>

        {/* Pain Section */}
        <section className="container mx-auto px-4 mb-20">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-light text-center mb-12 text-foreground">
              Does This Feel Familiar?
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6 border-border bg-card">
                <BarChart3 className="w-10 h-10 text-accent mb-4" />
                <h3 className="text-xl font-medium mb-3 text-foreground">
                  A report full of impressions and clicks, not leads and pipeline.
                </h3>
                <p className="text-muted-foreground">
                  Vanity metrics look impressive but tell you nothing about whether you're making money.
                </p>
              </Card>
              
              <Card className="p-6 border-border bg-card">
                <FileText className="w-10 h-10 text-accent mb-4" />
                <h3 className="text-xl font-medium mb-3 text-foreground">
                  No clear explanation of what was actually done last month.
                </h3>
                <p className="text-muted-foreground">
                  "Optimisation" and "monitoring" aren't tasks. You deserve to know exactly what you're paying for.
                </p>
              </Card>
              
              <Card className="p-6 border-border bg-card">
                <MessagesSquare className="w-10 h-10 text-accent mb-4" />
                <h3 className="text-xl font-medium mb-3 text-foreground">
                  No plan for the next 30–90 days beyond "keep optimising".
                </h3>
                <p className="text-muted-foreground">
                  A retainer without a roadmap is just hope in a spreadsheet.
                </p>
              </Card>
              
              <Card className="p-6 border-border bg-card">
                <TrendingDown className="w-10 h-10 text-accent mb-4" />
                <h3 className="text-xl font-medium mb-3 text-foreground">
                  You still have no idea if this retainer is profitable.
                </h3>
                <p className="text-muted-foreground">
                  If your agency can't connect their work to your revenue, what are you actually buying?
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* What We'll Do Section */}
        <section className="container mx-auto px-4 mb-20">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-light text-center mb-12 text-foreground">
              What You Get From an Avorria Teardown
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-medium mb-3 text-accent">Blunt assessment</h3>
                <p className="text-muted-foreground">
                  We'll tell you if the work matches the invoice – or if it's smoke and mirrors.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-medium mb-3 text-accent">Decoded reporting</h3>
                <p className="text-muted-foreground">
                  We translate their charts into normal language – what's working, what isn't, and what's missing.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-medium mb-3 text-accent">Priority fixes</h3>
                <p className="text-muted-foreground">
                  A short list of changes that would move the needle fastest.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-medium mb-3 text-accent">No-obligation options</h3>
                <p className="text-muted-foreground">
                  Keep your agency and challenge them with our findings, or ask us to rebuild the strategy.
                </p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground text-center mt-8">
              <strong>Confidentiality:</strong> All reports and proposals are treated as sensitive and stored securely.
            </p>
          </div>
        </section>

        {/* Upload Form */}
        <section id="upload-form" className="container mx-auto px-4 mb-20">
          <Card className="max-w-3xl mx-auto p-8 border-border bg-card">
            <h2 className="text-2xl font-light mb-8 text-foreground text-center">
              Upload your latest report or proposal
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* File Upload */}
              <div>
                <div
                  className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
                    dragActive ? 'border-accent bg-accent/5' : 'border-border'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-foreground mb-2">
                    {file ? file.name : "Drop your file here or click to upload"}
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    Accepted: PDF, PPT, PPTX, DOC, DOCX, XLSX, CSV, PNG, JPG (max 25MB)
                  </p>
                  <input
                    type="file"
                    id="file-upload"
                    className="hidden"
                    accept=".pdf,.ppt,.pptx,.doc,.docx,.xlsx,.csv,.png,.jpg,.jpeg"
                    onChange={handleFileChange}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById('file-upload')?.click()}
                  >
                    Choose File
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  If you can't share the full report for confidentiality reasons, paste key pages or screenshots below.
                </p>
              </div>

              {/* Name */}
              <div>
                <Label htmlFor="name">Your name *</Label>
                <Input
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                />
              </div>

              {/* Email */}
              <div>
                <Label htmlFor="email">Work email *</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                />
              </div>

              {/* Company */}
              <div>
                <Label htmlFor="company">Company name *</Label>
                <Input
                  id="company"
                  required
                  value={formData.company}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                />
              </div>

              {/* Website */}
              <div>
                <Label htmlFor="website">Website URL *</Label>
                <Input
                  id="website"
                  type="url"
                  required
                  value={formData.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                />
              </div>

              {/* Monthly Fee */}
              <div>
                <Label htmlFor="monthlyFee">What are you currently paying your agency each month? *</Label>
                <Select required value={formData.monthlyFee} onValueChange={(value) => handleInputChange('monthlyFee', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="under-2k">&lt; £2k</SelectItem>
                    <SelectItem value="2k-5k">£2k – £5k</SelectItem>
                    <SelectItem value="5k-10k">£5k – £10k</SelectItem>
                    <SelectItem value="10k-25k">£10k – £25k</SelectItem>
                    <SelectItem value="25k-plus">£25k+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Relationship Length */}
              <div>
                <Label htmlFor="relationshipLength">How long have you been with them? *</Label>
                <Select required value={formData.relationshipLength} onValueChange={(value) => handleInputChange('relationshipLength', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="under-3-months">&lt; 3 months</SelectItem>
                    <SelectItem value="3-12-months">3–12 months</SelectItem>
                    <SelectItem value="1-2-years">1–2 years</SelectItem>
                    <SelectItem value="2-plus-years">2+ years</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Pain Description */}
              <div>
                <Label htmlFor="painDescription">What feels "off" about the current setup? *</Label>
                <Textarea
                  id="painDescription"
                  required
                  rows={4}
                  placeholder="e.g. Lots of activity, no clear results; reporting feels vague; no clear plan; constant excuses..."
                  value={formData.painDescription}
                  onChange={(e) => handleInputChange('painDescription', e.target.value)}
                />
              </div>

              {/* Checkboxes */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="confirmShare"
                    required
                    checked={formData.confirmShare}
                    onCheckedChange={(checked) => handleInputChange('confirmShare', checked as boolean)}
                  />
                  <Label htmlFor="confirmShare" className="font-normal cursor-pointer">
                    I confirm I'm allowed to share this report/proposal for review. *
                  </Label>
                </div>

                <div className="flex items-start gap-3">
                  <Checkbox
                    id="openToSwitch"
                    checked={formData.openToSwitch}
                    onCheckedChange={(checked) => handleInputChange('openToSwitch', checked as boolean)}
                  />
                  <Label htmlFor="openToSwitch" className="font-normal cursor-pointer">
                    I'm open to discussing a switch if the teardown confirms my suspicions.
                  </Label>
                </div>
              </div>

              <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit for teardown"}
              </Button>
            </form>
          </Card>
        </section>

        {/* Social Proof Section */}
        <section className="container mx-auto px-4 mb-20">
          <div className="max-w-4xl mx-auto">
            <Card className="p-8 border-border bg-card">
              <h2 className="text-2xl font-light mb-6 text-foreground">We've Seen Worse</h2>
              <p className="text-muted-foreground mb-6">
                We see the same patterns across dozens of agencies – bloated reports, fuzzy accountability, minimal strategy.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="border-l-2 border-accent pl-4">
                  <p className="text-foreground">
                    <strong>£6k/month</strong> on "full-funnel marketing" where 90% of budget went on low-intent display 
                    and almost no tracking was in place.
                  </p>
                </div>
                
                <div className="border-l-2 border-accent pl-4">
                  <p className="text-foreground">
                    An <strong>SEO retainer</strong> with 20-page reports, zero technical fixes, and no commercial keyword strategy.
                  </p>
                </div>
                
                <div className="border-l-2 border-accent pl-4">
                  <p className="text-foreground">
                    <strong>Paid media team</strong> optimising for CTR and CPM while cost per qualified lead quietly doubled.
                  </p>
                </div>
              </div>

              <div className="text-center">
                <Button 
                  variant="outline"
                  onClick={() => {
                    // Event: teardown_cta_view_reporting_clicked
                    if (typeof window !== 'undefined' && (window as any).gtag) {
                      (window as any).gtag('event', 'teardown_cta_view_reporting_clicked');
                    }
                    navigate('/reporting/demo');
                  }}
                >
                  See how we report instead
                </Button>
              </div>
            </Card>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="container mx-auto px-4 mb-20">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-light text-center mb-12 text-foreground">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-6">
              <Card className="p-6 border-border bg-card">
                <h3 className="text-lg font-medium mb-2 text-foreground">Is this confidential?</h3>
                <p className="text-muted-foreground">
                  Absolutely. We treat all reports as sensitive information. They're stored securely and only viewed 
                  by the team member conducting your teardown.
                </p>
              </Card>

              <Card className="p-6 border-border bg-card">
                <h3 className="text-lg font-medium mb-2 text-foreground">What if my agency actually is doing a good job?</h3>
                <p className="text-muted-foreground">
                  We'll tell you. We're not here to throw stones for fun – if your agency's solid, we'll tell you 
                  and highlight what they're doing well.
                </p>
              </Card>

              <Card className="p-6 border-border bg-card">
                <h3 className="text-lg font-medium mb-2 text-foreground">How detailed is the feedback?</h3>
                <p className="text-muted-foreground">
                  You'll get a plain-English breakdown covering: what's working, what's missing, what's lazy or 
                  misaligned, and 3–5 key recommendations for improvement.
                </p>
              </Card>

              <Card className="p-6 border-border bg-card">
                <h3 className="text-lg font-medium mb-2 text-foreground">Do you try to "steal" us as a client straight away?</h3>
                <p className="text-muted-foreground">
                  No. The teardown is about giving you clarity. If you want to discuss working with us after, great. 
                  If you want to use our findings to challenge your current agency, also great.
                </p>
              </Card>

              <Card className="p-6 border-border bg-card">
                <h3 className="text-lg font-medium mb-2 text-foreground">
                  What if I don't have a formal report, just screenshots/emails?
                </h3>
                <p className="text-muted-foreground">
                  That works too. Upload whatever you have, or just describe the situation in the pain description field. 
                  We can work with partial information.
                </p>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default AgencyTeardown;
