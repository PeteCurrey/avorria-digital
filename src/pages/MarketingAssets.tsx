import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { emailSequences } from "@/data/emailSequences";
import { adCreative, campaignNotes } from "@/data/adCreative";

const MarketingAssets = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-light mb-4">Marketing Assets & Copy Bank</h1>
            <p className="text-muted-foreground text-lg">
              Internal resource hub for email sequences, ad creative and campaign copy.
            </p>
          </div>

          <Tabs defaultValue="emails" className="space-y-8">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="emails">Email Sequences</TabsTrigger>
              <TabsTrigger value="ads">Ad Creative</TabsTrigger>
            </TabsList>

            {/* EMAIL SEQUENCES TAB */}
            <TabsContent value="emails" className="space-y-8">
              {/* Audit Sequence */}
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-2xl">Free SEO & Website Audit Sequence</CardTitle>
                      <CardDescription className="mt-2">
                        Trigger: {emailSequences.auditSequence.trigger}
                      </CardDescription>
                    </div>
                    <Badge variant="secondary">{emailSequences.auditSequence.emails.length} emails</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {emailSequences.auditSequence.emails.map((email, idx) => (
                    <div key={idx} className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Badge className="shrink-0">Email {email.sequence}</Badge>
                        <h3 className="font-medium">{email.timing}</h3>
                      </div>
                      {email.condition && (
                        <p className="text-sm text-muted-foreground">Condition: {email.condition}</p>
                      )}
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-muted-foreground">Subject Lines:</p>
                        <ul className="space-y-1">
                          {email.subject.map((subj, i) => (
                            <li key={i} className="text-sm pl-4 border-l-2 border-muted py-1">
                              {subj}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-muted/50 p-4 rounded-lg">
                        <p className="text-sm font-medium mb-2">Body:</p>
                        <pre className="text-sm whitespace-pre-wrap font-sans">{email.body}</pre>
                      </div>
                      {idx < emailSequences.auditSequence.emails.length - 1 && (
                        <Separator className="mt-6" />
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Estimator Sequence */}
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-2xl">Project Estimator Sequence</CardTitle>
                      <CardDescription className="mt-2">
                        Trigger: {emailSequences.estimatorSequence.trigger}
                      </CardDescription>
                    </div>
                    <Badge variant="secondary">{emailSequences.estimatorSequence.emails.length} emails</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {emailSequences.estimatorSequence.emails.map((email, idx) => (
                    <div key={idx} className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Badge className="shrink-0">Email {email.sequence}</Badge>
                        <h3 className="font-medium">{email.timing}</h3>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-muted-foreground">Subject Lines:</p>
                        <ul className="space-y-1">
                          {email.subject.map((subj, i) => (
                            <li key={i} className="text-sm pl-4 border-l-2 border-muted py-1">
                              {subj}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-muted/50 p-4 rounded-lg">
                        <p className="text-sm font-medium mb-2">Body:</p>
                        <pre className="text-sm whitespace-pre-wrap font-sans">{email.body}</pre>
                      </div>
                      {idx < emailSequences.estimatorSequence.emails.length - 1 && (
                        <Separator className="mt-6" />
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Teardown Sequence */}
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-2xl">Agency Report Teardown Sequence</CardTitle>
                      <CardDescription className="mt-2">
                        Trigger: {emailSequences.teardownSequence.trigger}
                      </CardDescription>
                    </div>
                    <Badge variant="secondary">{emailSequences.teardownSequence.emails.length} emails</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {emailSequences.teardownSequence.emails.map((email, idx) => (
                    <div key={idx} className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Badge className="shrink-0">Email {email.sequence}</Badge>
                        <h3 className="font-medium">{email.timing}</h3>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-muted-foreground">Subject Lines:</p>
                        <ul className="space-y-1">
                          {email.subject.map((subj, i) => (
                            <li key={i} className="text-sm pl-4 border-l-2 border-muted py-1">
                              {subj}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-muted/50 p-4 rounded-lg">
                        <p className="text-sm font-medium mb-2">Body:</p>
                        <pre className="text-sm whitespace-pre-wrap font-sans">{email.body}</pre>
                      </div>
                      {idx < emailSequences.teardownSequence.emails.length - 1 && (
                        <Separator className="mt-6" />
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            {/* AD CREATIVE TAB */}
            <TabsContent value="ads" className="space-y-8">
              {/* SEO & Audit Ads */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">SEO & Free Audit Ads</CardTitle>
                  <CardDescription className="mt-2">
                    Hook angle: {adCreative.seoAudit.hookAngle}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <p className="text-sm font-medium mb-2">Target Audience:</p>
                    <p className="text-sm text-muted-foreground">{adCreative.seoAudit.targetAudience}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-2">Platforms:</p>
                    <div className="flex gap-2">
                      {adCreative.seoAudit.platforms.map((platform, i) => (
                        <Badge key={i} variant="outline">{platform}</Badge>
                      ))}
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <p className="text-sm font-medium mb-3">Headlines:</p>
                    <ul className="space-y-2">
                      {adCreative.seoAudit.headlines.map((headline, i) => (
                        <li key={i} className="text-sm pl-4 border-l-2 border-primary/50 py-1">
                          {headline}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-3">Primary Text Variants:</p>
                    <div className="space-y-4">
                      {adCreative.seoAudit.primaryText.map((text, i) => (
                        <div key={i} className="bg-muted/50 p-4 rounded-lg">
                          <Badge className="mb-2">Variant {text.variant}</Badge>
                          <pre className="text-sm whitespace-pre-wrap font-sans">{text.text}</pre>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-2">CTA Options:</p>
                    <ul className="space-y-1">
                      {adCreative.seoAudit.cta.map((cta, i) => (
                        <li key={i} className="text-sm pl-4 border-l-2 border-muted py-1">
                          {cta}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg">
                    <p className="text-sm font-medium mb-2">Campaign Notes:</p>
                    <p className="text-sm mb-3"><strong>Budget:</strong> {campaignNotes.seoAudit.budgetAllocation}</p>
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Testing Priority:</p>
                      <ul className="text-sm space-y-1 list-disc list-inside">
                        {campaignNotes.seoAudit.testingPriority.map((test, i) => (
                          <li key={i}>{test}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Web Rebuild Ads */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Web/Funnel Rebuild Ads</CardTitle>
                  <CardDescription className="mt-2">
                    Hook angle: {adCreative.webRebuild.hookAngle}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <p className="text-sm font-medium mb-2">Target Audience:</p>
                    <p className="text-sm text-muted-foreground">{adCreative.webRebuild.targetAudience}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-2">Platforms:</p>
                    <div className="flex gap-2">
                      {adCreative.webRebuild.platforms.map((platform, i) => (
                        <Badge key={i} variant="outline">{platform}</Badge>
                      ))}
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <p className="text-sm font-medium mb-3">Headlines:</p>
                    <ul className="space-y-2">
                      {adCreative.webRebuild.headlines.map((headline, i) => (
                        <li key={i} className="text-sm pl-4 border-l-2 border-primary/50 py-1">
                          {headline}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-3">Primary Text Variants:</p>
                    <div className="space-y-4">
                      {adCreative.webRebuild.primaryText.map((text, i) => (
                        <div key={i} className="bg-muted/50 p-4 rounded-lg">
                          <Badge className="mb-2">Variant {text.variant}</Badge>
                          <pre className="text-sm whitespace-pre-wrap font-sans">{text.text}</pre>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-2">CTA Options:</p>
                    <ul className="space-y-1">
                      {adCreative.webRebuild.cta.map((cta, i) => (
                        <li key={i} className="text-sm pl-4 border-l-2 border-muted py-1">
                          {cta}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg">
                    <p className="text-sm font-medium mb-2">Campaign Notes:</p>
                    <p className="text-sm mb-3"><strong>Budget:</strong> {campaignNotes.webRebuild.budgetAllocation}</p>
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Testing Priority:</p>
                      <ul className="text-sm space-y-1 list-disc list-inside">
                        {campaignNotes.webRebuild.testingPriority.map((test, i) => (
                          <li key={i}>{test}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Agency Switch Ads */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Agency-Switch / Teardown Ads</CardTitle>
                  <CardDescription className="mt-2">
                    Hook angle: {adCreative.agencySwitch.hookAngle}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <p className="text-sm font-medium mb-2">Target Audience:</p>
                    <p className="text-sm text-muted-foreground">{adCreative.agencySwitch.targetAudience}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-2">Platforms:</p>
                    <div className="flex gap-2">
                      {adCreative.agencySwitch.platforms.map((platform, i) => (
                        <Badge key={i} variant="outline">{platform}</Badge>
                      ))}
                    </div>
                  </div>
                  {adCreative.agencySwitch.notes && (
                    <div className="bg-amber-50 dark:bg-amber-950/20 p-4 rounded-lg">
                      <p className="text-sm font-medium mb-2">⚠️ Note:</p>
                      <p className="text-sm">{adCreative.agencySwitch.notes}</p>
                    </div>
                  )}
                  <Separator />
                  <div>
                    <p className="text-sm font-medium mb-3">Headlines:</p>
                    <ul className="space-y-2">
                      {adCreative.agencySwitch.headlines.map((headline, i) => (
                        <li key={i} className="text-sm pl-4 border-l-2 border-primary/50 py-1">
                          {headline}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-3">Primary Text Variants:</p>
                    <div className="space-y-4">
                      {adCreative.agencySwitch.primaryText.map((text, i) => (
                        <div key={i} className="bg-muted/50 p-4 rounded-lg">
                          <Badge className="mb-2">Variant {text.variant}</Badge>
                          <pre className="text-sm whitespace-pre-wrap font-sans">{text.text}</pre>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-2">CTA Options:</p>
                    <ul className="space-y-1">
                      {adCreative.agencySwitch.cta.map((cta, i) => (
                        <li key={i} className="text-sm pl-4 border-l-2 border-muted py-1">
                          {cta}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg">
                    <p className="text-sm font-medium mb-2">Campaign Notes:</p>
                    <p className="text-sm mb-3"><strong>Budget:</strong> {campaignNotes.agencySwitch.budgetAllocation}</p>
                    <div className="space-y-2 mb-3">
                      <p className="text-sm font-medium">Testing Priority:</p>
                      <ul className="text-sm space-y-1 list-disc list-inside">
                        {campaignNotes.agencySwitch.testingPriority.map((test, i) => (
                          <li key={i}>{test}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-amber-700 dark:text-amber-400">⚠️ Warnings:</p>
                      <ul className="text-sm space-y-1 list-disc list-inside text-amber-700 dark:text-amber-400">
                        {campaignNotes.agencySwitch.warnings.map((warning, i) => (
                          <li key={i}>{warning}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default MarketingAssets;
