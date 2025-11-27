import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Loader2, CheckCircle2, Sparkles, Target, Users } from "lucide-react";

const Onboarding = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const { user, userRole } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const userType = searchParams.get("type") || "client";
  const { toast } = useToast();

  // Form data
  const [company, setCompany] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [goals, setGoals] = useState("");

  useEffect(() => {
    if (!user) {
      navigate("/auth/login");
    }
  }, [user, navigate]);

  const progress = (step / 3) * 100;

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handleComplete = async () => {
    setLoading(true);
    
    try {
      // Update profile with additional info
      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: user?.user_metadata?.full_name,
          avatar_url: null,
        })
        .eq("id", user?.id);

      if (error) throw error;

      toast({
        title: "Profile completed!",
        description: "Welcome to Avorria. Let's get started.",
      });

      // Redirect based on user role
      const redirectPath = userRole === "client" ? "/client" : "/platform";
      navigate(redirectPath);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const renderWelcome = () => (
    <Card className="border-border/50 shadow-lg max-w-2xl mx-auto">
      <CardHeader className="text-center space-y-2">
        <div className="flex justify-center mb-4">
          <div className="rounded-full bg-primary/10 p-6">
            {userType === "client" ? (
              <Sparkles className="h-12 w-12 text-primary" />
            ) : (
              <Users className="h-12 w-12 text-primary" />
            )}
          </div>
        </div>
        <CardTitle className="text-3xl">
          {userType === "client" ? "Welcome to Your Growth Journey" : "Welcome to the Platform"}
        </CardTitle>
        <CardDescription className="text-base">
          {userType === "client" 
            ? "Let's set up your account so we can deliver the best results for your business."
            : "Let's get your account set up so you can start managing clients and campaigns."}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4">
          <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/50">
            <CheckCircle2 className="h-6 w-6 text-primary shrink-0 mt-0.5" />
            <div>
              <h4 className="font-medium mb-1">
                {userType === "client" ? "Transparent Reporting" : "Centralized Management"}
              </h4>
              <p className="text-sm text-muted-foreground">
                {userType === "client" 
                  ? "Access real-time performance data and insights whenever you need them."
                  : "All your clients, campaigns, and reports in one powerful platform."}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/50">
            <CheckCircle2 className="h-6 w-6 text-primary shrink-0 mt-0.5" />
            <div>
              <h4 className="font-medium mb-1">
                {userType === "client" ? "Expert Guidance" : "Proven Playbooks"}
              </h4>
              <p className="text-sm text-muted-foreground">
                {userType === "client" 
                  ? "Direct access to your dedicated growth team and strategic recommendations."
                  : "Access tested strategies and SOPs to deliver consistent results."}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/50">
            <CheckCircle2 className="h-6 w-6 text-primary shrink-0 mt-0.5" />
            <div>
              <h4 className="font-medium mb-1">
                {userType === "client" ? "Measurable Growth" : "Data-Driven Insights"}
              </h4>
              <p className="text-sm text-muted-foreground">
                {userType === "client" 
                  ? "Track leads, conversions, and ROI with precision."
                  : "Make informed decisions with comprehensive analytics and alerts."}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleNext} className="w-full" size="lg">
          Let's Get Started
        </Button>
      </CardFooter>
    </Card>
  );

  const renderProfileInfo = () => (
    <Card className="border-border/50 shadow-lg max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Tell us about yourself</CardTitle>
        <CardDescription>
          This information helps us personalize your experience
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="company">
            {userType === "client" ? "Company Name" : "Primary Focus Area"}
          </Label>
          <Input
            id="company"
            placeholder={userType === "client" ? "Acme Corp" : "e.g., SEO Strategy, Paid Media"}
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="jobTitle">Job Title</Label>
          <Input
            id="jobTitle"
            placeholder={userType === "client" ? "Marketing Director" : "Senior Strategist"}
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number (Optional)</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="+1 (555) 123-4567"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
      </CardContent>
      <CardFooter className="flex gap-3">
        <Button onClick={() => setStep(1)} variant="outline" className="flex-1">
          Back
        </Button>
        <Button onClick={handleNext} className="flex-1">
          Continue
        </Button>
      </CardFooter>
    </Card>
  );

  const renderGoals = () => (
    <Card className="border-border/50 shadow-lg max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>
          {userType === "client" ? "What are your growth goals?" : "What do you want to achieve?"}
        </CardTitle>
        <CardDescription>
          {userType === "client" 
            ? "Understanding your objectives helps us deliver better results"
            : "This helps us tailor the platform to your workflow"}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="goals">
            {userType === "client" ? "Primary Goals" : "Key Objectives"}
          </Label>
          <Textarea
            id="goals"
            placeholder={
              userType === "client" 
                ? "e.g., Increase qualified leads by 50%, improve website conversion rate, expand into new markets..."
                : "e.g., Scale client acquisition, improve campaign efficiency, streamline reporting..."
            }
            value={goals}
            onChange={(e) => setGoals(e.target.value)}
            rows={5}
            className="resize-none"
          />
        </div>
        <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
          <div className="flex items-start gap-3">
            <Target className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-foreground mb-1">Pro Tip</p>
              <p className="text-muted-foreground">
                {userType === "client" 
                  ? "Specific, measurable goals help us create a tailored strategy that delivers real results."
                  : "Clear objectives help you prioritize your work and measure success effectively."}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex gap-3">
        <Button onClick={() => setStep(2)} variant="outline" className="flex-1">
          Back
        </Button>
        <Button onClick={handleComplete} className="flex-1" disabled={loading}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Complete Setup
        </Button>
      </CardFooter>
    </Card>
  );

  return (
    <>
      <Helmet>
        <title>Welcome - Avorria</title>
      </Helmet>

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-accent/5 p-4">
        <div className="w-full max-w-4xl">
          {/* Progress bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-foreground">
                Step {step} of 3
              </span>
              <span className="text-sm text-muted-foreground">
                {Math.round(progress)}% complete
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Step content */}
          {step === 1 && renderWelcome()}
          {step === 2 && renderProfileInfo()}
          {step === 3 && renderGoals()}
        </div>
      </div>
    </>
  );
};

export default Onboarding;