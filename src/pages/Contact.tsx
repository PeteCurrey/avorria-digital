'use client';
import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { trackEvent, EVENTS, trackFormStart } from "@/lib/tracking";
import { useCreateLead } from "@/hooks/useLeads";
import SEOHead from "@/components/seo/SEOHead";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import heroContactOffice from "@/assets/hero-contact-office.jpg";
const Contact = () => {
  const {
    toast
  } = useToast();
  const createLead = useCreateLead();
  const [step, setStep] = useState(1);
  const [formStarted, setFormStarted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    website: "",
    monthlySpend: "",
    channels: "",
    mainGoal: "",
    timeline: "",
    message: ""
  });
  const handleInputChange = (field: string, value: string) => {
    if (!formStarted) {
      setFormStarted(true);
      trackFormStart('contact', window.pathname);
    }
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
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
        source: 'contact',
        notes: formData.message,
        metadata: {
          website: formData.website,
          monthlySpend: formData.monthlySpend,
          channels: formData.channels,
          mainGoal: formData.mainGoal,
          timeline: formData.timeline
        }
      });
      trackEvent(EVENTS.CONTACT_FORM_SUBMITTED, {
        reason: formData.mainGoal || 'general',
        monthly_spend: formData.monthlySpend,
        channels: formData.channels
      });
      toast({
        title: "Thank you for reaching out!",
        description: "We'll review your information and get back to you within 24 hours."
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        company: "",
        website: "",
        monthlySpend: "",
        channels: "",
        mainGoal: "",
        timeline: "",
        message: ""
      });
      setStep(1);
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again or email us directly.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  return <>
      <SEOHead
        title="Contact Avorria – Book a Strategy Call"
        description="Get in touch with Avorria. Book a strategy call or request a proposal for SEO, paid media, web design and analytics services across the UK and USA."
        canonical="/contact"
        keywords={["contact avorria", "book strategy call", "digital marketing consultation", "SEO consultation"]}
      />
      <BreadcrumbSchema items={[{ name: "Home", url: "https://avorria.com" }, { name: "Contact", url: "https://avorria.com/contact" }]} />
      
    <div className="min-h-screen">
      {/* Hero Section with Parallax - flows behind header */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden -mt-20 pt-20">
        <div className="absolute inset-0">
          <img src={heroContactOffice} alt="" className="w-full h-full object-cover" loading="eager" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-[hsl(var(--background))]" />
        
        <div className="container mx-auto max-w-4xl text-center relative z-10 px-4 sm:px-6 py-24">
          <h1 className="text-4xl sm:text-5xl font-light leading-tight mb-6 text-white animate-fade-in lg:text-5xl">
            Let's talk about{" "}
            <span className="font-semibold text-accent">your growth goals</span>
          </h1>
          <p className="text-lg sm:text-xl text-white/90 leading-relaxed mb-6 animate-fade-in-up">
            Book a strategy call or request a proposal. We'll respond within 24 hours.
          </p>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-24 px-6 bg-background">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-light mb-6 text-foreground">Get in touch</h2>
              <Card className="border-border">
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {step === 1 && <div className="space-y-6 animate-fade-in">
                        <div>
                          <Label htmlFor="name">Full Name *</Label>
                          <Input id="name" value={formData.name} onChange={e => handleInputChange("name", e.target.value)} required className="mt-2" />
                        </div>
                        <div>
                          <Label htmlFor="email">Email Address *</Label>
                          <Input id="email" type="email" value={formData.email} onChange={e => handleInputChange("email", e.target.value)} required className="mt-2" />
                        </div>
                        <div>
                          <Label htmlFor="company">Company Name *</Label>
                          <Input id="company" value={formData.company} onChange={e => handleInputChange("company", e.target.value)} required className="mt-2" />
                        </div>
                        <div>
                          <Label htmlFor="website">Website URL</Label>
                          <Input id="website" type="url" value={formData.website} onChange={e => handleInputChange("website", e.target.value)} placeholder="https://" className="mt-2" />
                        </div>
                        <div>
                          <Label htmlFor="message">How can we help? *</Label>
                          <Textarea id="message" value={formData.message} onChange={e => handleInputChange("message", e.target.value)} rows={4} required placeholder="Tell us about your goals, challenges, or questions..." className="mt-2" />
                        </div>
                        <Button type="button" variant="accent" className="w-full" onClick={() => setStep(2)} disabled={!formData.name || !formData.email || !formData.company || !formData.message}>
                          Continue
                          <ArrowRight className="ml-2" size={18} />
                        </Button>
                      </div>}

                    {step === 2 && <div className="space-y-6 animate-fade-in">
                        <div>
                          <Label htmlFor="monthlySpend">Current Monthly Marketing Spend</Label>
                          <Select value={formData.monthlySpend} onValueChange={value => handleInputChange("monthlySpend", value)}>
                            <SelectTrigger className="mt-2">
                              <SelectValue placeholder="Select range" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="0-2500">£0 - £2,500</SelectItem>
                              <SelectItem value="2500-5000">£2,500 - £5,000</SelectItem>
                              <SelectItem value="5000-10000">£5,000 - £10,000</SelectItem>
                              <SelectItem value="10000+">£10,000+</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="channels">Current Marketing Channels</Label>
                          <Select value={formData.channels} onValueChange={value => handleInputChange("channels", value)}>
                            <SelectTrigger className="mt-2">
                              <SelectValue placeholder="Select primary channel" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="seo">Organic/SEO</SelectItem>
                              <SelectItem value="paid">Paid Advertising</SelectItem>
                              <SelectItem value="social">Social Media</SelectItem>
                              <SelectItem value="email">Email Marketing</SelectItem>
                              <SelectItem value="multiple">Multiple Channels</SelectItem>
                              <SelectItem value="none">Not Currently Marketing</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="mainGoal">Main Marketing Goal *</Label>
                          <Select value={formData.mainGoal} onValueChange={value => handleInputChange("mainGoal", value)} required>
                            <SelectTrigger className="mt-2">
                              <SelectValue placeholder="Select your goal" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="leads">More qualified leads</SelectItem>
                              <SelectItem value="quality">Better lead quality</SelectItem>
                              <SelectItem value="roas">Improve ROAS/efficiency</SelectItem>
                              <SelectItem value="website">New website or redesign</SelectItem>
                              <SelectItem value="strategy">Full marketing strategy</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="timeline">Timeline & Urgency</Label>
                          <Select value={formData.timeline} onValueChange={value => handleInputChange("timeline", value)}>
                            <SelectTrigger className="mt-2">
                              <SelectValue placeholder="When do you want to start?" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="asap">As soon as possible</SelectItem>
                              <SelectItem value="month">Within a month</SelectItem>
                              <SelectItem value="quarter">Within 3 months</SelectItem>
                              <SelectItem value="planning">Just planning ahead</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex gap-4">
                          <Button type="button" variant="outline" className="flex-1" onClick={() => setStep(1)}>
                            Back
                          </Button>
                          <Button type="submit" variant="accent" className="flex-1" disabled={isSubmitting}>
                            {isSubmitting ? "Submitting..." : "Submit Request"}
                          </Button>
                        </div>
                      </div>}
                  </form>
                  <p className="text-xs text-center text-muted-foreground mt-4">
                    Need help scoping this properly?{" "}
                    <Link href="/project-estimator" className="text-accent hover:underline">
                      Try the project estimator
                    </Link>
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-light mb-6 text-foreground">Other ways to reach us</h2>
                <div className="space-y-6">
                  <Card className="border-border hover:shadow-lg transition-shadow">
                    <CardContent className="p-6 flex items-start space-x-4">
                      <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <Mail className="text-accent" size={24} />
                      </div>
                      <div>
                        <h3 className="text-foreground mb-1 text-2xl font-normal">Email Us</h3>
                        <p className="text-muted-foreground text-sm mb-2">
                          For general inquiries or partnerships
                        </p>
                        <a href="mailto:hello@avorria.com" className="text-accent hover:text-accent/80 text-sm font-light">
                          hello@avorria.com
                        </a>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-border hover:shadow-lg transition-shadow">
                    <CardContent className="p-6 flex items-start space-x-4">
                      <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <Phone className="text-accent" size={24} />
                      </div>
                      <div>
                        <h3 className="text-foreground mb-1 text-2xl font-normal">Call Us</h3>
                        <p className="text-muted-foreground text-sm mb-2">Monday - Friday, 9am - 5pm</p>
                        <a href="tel:+44204586 5422" className="text-accent hover:text-accent/80 text-sm font-light">
                          UK - (+44) 020 4586 5422 |
 USA - (+1) 914 677 1280     
      
                        </a>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-border hover:shadow-lg transition-shadow">
                    <CardContent className="p-6 flex items-start space-x-4">
                      <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <MapPin className="text-accent" size={24} />
                      </div>
                      <div>
                        <h3 className="text-foreground mb-1 text-2xl font-normal">Visit Us</h3>
                        <p className="text-muted-foreground text-sm font-light">
                          2 Old Brick Works Lane Chesterfield S41 7JD                  
                          <br />
                          37th Floor One Canada Square London E14 5AB       
                          <br />
                          555 N Michigan Ave Chicago IL 60611      
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <Card className="border-border bg-secondary">
                <CardContent className="p-8 space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">What happens next?</h3>
                  <ol className="space-y-3 text-muted-foreground">
                    <li className="flex items-start">
                      <span className="text-accent font-semibold mr-3">1.</span>
                      <span>We'll review your information and respond within 24 hours</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-accent font-semibold mr-3">2.</span>
                      <span>Schedule a 30-minute strategy call to discuss your goals</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-accent font-semibold mr-3">3.</span>
                      <span>Receive a custom proposal with transparent pricing and timelines</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-accent font-semibold mr-3">4.</span>
                      <span>Start seeing results within the first 30 days</span>
                    </li>
                  </ol>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
    </>;
};
export default Contact;
