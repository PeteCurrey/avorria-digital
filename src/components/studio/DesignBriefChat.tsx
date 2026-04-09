'use client';
import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  Send, 
  Sparkles, 
  FileText, 
  Download, 
  Loader2,
  MessageSquare,
  CheckCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface DesignBrief {
  projectOverview: {
    businessName: string;
    industry: string;
    projectSummary: string;
  };
  targetAudience: {
    primaryPersona: {
      name: string;
      demographics: string;
      goals: string[];
      painPoints: string[];
    };
    secondaryPersonas: Array<{ name: string; description: string }>;
  };
  brandPersonality: {
    tone: string[];
    values: string[];
    differentiators: string[];
  };
  designDirection: {
    visualStyle: string;
    colorRecommendations: {
      primary: string;
      secondary: string;
      accent: string;
    };
    typographyNotes: string;
    moodKeywords: string[];
  };
  siteStructure: {
    recommendedPages: Array<{ page: string; purpose: string; priority: string }>;
    keyFeatures: Array<{ feature: string; rationale: string }>;
  };
  contentStrategy: {
    keyMessages: string[];
    callsToAction: string[];
    contentNeeds: string[];
  };
  successMetrics: {
    goals: string[];
    kpis: string[];
  };
  competitiveInsights: {
    strengths: string[];
    opportunities: string[];
    avoidList: string[];
  };
  nextSteps: string[];
}

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface DesignBriefChatProps {
  config: {
    purpose: string;
    palette: string;
    siteSize: string;
    features: string[];
    modules?: string[];
  };
  isOpen: boolean;
  onClose: () => void;
  onBriefGenerated?: (brief: DesignBrief) => void;
}

const generateBriefPDFHTML = (brief: DesignBrief): string => {
  const today = new Date().toLocaleDateString('en-GB', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  });

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          color: #1a1a2e;
          line-height: 1.6;
          background: #fff;
        }
        
        .page {
          width: 210mm;
          min-height: 297mm;
          padding: 40px 50px;
          background: white;
        }
        
        .header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 40px;
          padding-bottom: 30px;
          border-bottom: 3px solid #8B5CF6;
        }
        
        .logo {
          font-size: 28px;
          font-weight: 700;
          color: #8B5CF6;
          letter-spacing: -0.5px;
        }
        
        .logo span {
          color: #1a1a2e;
        }
        
        .date {
          font-size: 12px;
          color: #6b7280;
        }
        
        .title-section {
          margin-bottom: 40px;
        }
        
        .title {
          font-size: 32px;
          font-weight: 700;
          color: #1a1a2e;
          margin-bottom: 8px;
        }
        
        .subtitle {
          font-size: 16px;
          color: #6b7280;
        }
        
        .section {
          margin-bottom: 32px;
          page-break-inside: avoid;
        }
        
        .section-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
        }
        
        .section-icon {
          width: 32px;
          height: 32px;
          background: linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 16px;
        }
        
        .section-title {
          font-size: 18px;
          font-weight: 600;
          color: #1a1a2e;
        }
        
        .section-content {
          padding-left: 44px;
        }
        
        .card {
          background: #f8f9fa;
          border-radius: 12px;
          padding: 20px;
          margin-bottom: 12px;
        }
        
        .card-title {
          font-size: 14px;
          font-weight: 600;
          color: #1a1a2e;
          margin-bottom: 8px;
        }
        
        .card-text {
          font-size: 14px;
          color: #4b5563;
        }
        
        .tag-list {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 8px;
        }
        
        .tag {
          background: #8B5CF6;
          color: white;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 500;
        }
        
        .tag.secondary {
          background: #e0e7ff;
          color: #4338ca;
        }
        
        .list {
          list-style: none;
        }
        
        .list li {
          padding: 8px 0;
          padding-left: 24px;
          position: relative;
          font-size: 14px;
          color: #4b5563;
          border-bottom: 1px solid #f3f4f6;
        }
        
        .list li:last-child {
          border-bottom: none;
        }
        
        .list li::before {
          content: "?";
          position: absolute;
          left: 0;
          color: #8B5CF6;
          font-weight: 600;
        }
        
        .color-palette {
          display: flex;
          gap: 16px;
          margin-top: 12px;
        }
        
        .color-item {
          flex: 1;
        }
        
        .color-swatch {
          height: 60px;
          border-radius: 8px;
          margin-bottom: 8px;
        }
        
        .color-label {
          font-size: 12px;
          font-weight: 500;
          color: #1a1a2e;
        }
        
        .color-value {
          font-size: 11px;
          color: #6b7280;
        }
        
        .page-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 12px;
        }
        
        .page-table th {
          background: #f3f4f6;
          padding: 12px;
          text-align: left;
          font-size: 12px;
          font-weight: 600;
          color: #1a1a2e;
        }
        
        .page-table td {
          padding: 12px;
          font-size: 13px;
          color: #4b5563;
          border-bottom: 1px solid #f3f4f6;
        }
        
        .priority-badge {
          padding: 2px 8px;
          border-radius: 4px;
          font-size: 11px;
          font-weight: 500;
          text-transform: uppercase;
        }
        
        .priority-high {
          background: #fee2e2;
          color: #dc2626;
        }
        
        .priority-medium {
          background: #fef3c7;
          color: #d97706;
        }
        
        .priority-low {
          background: #d1fae5;
          color: #059669;
        }
        
        .footer {
          margin-top: 60px;
          padding-top: 30px;
          border-top: 2px solid #f3f4f6;
          text-align: center;
        }
        
        .footer-text {
          font-size: 12px;
          color: #9ca3af;
        }
        
        .cta-box {
          background: linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%);
          border-radius: 12px;
          padding: 24px;
          color: white;
          text-align: center;
          margin-top: 40px;
        }
        
        .cta-title {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 8px;
        }
        
        .cta-text {
          font-size: 14px;
          opacity: 0.9;
        }
        
        .grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
      </style>
    </head>
    <body>
      <div class="page">
        <div class="header">
          <div class="logo">Avorria<span>.</span></div>
          <div class="date">Design Brief €¢ ${today}</div>
        </div>
        
        <div class="title-section">
          <h1 class="title">${brief.projectOverview.businessName || 'Your'} Website Design Brief</h1>
          <p class="subtitle">${brief.projectOverview.industry} €¢ AI-Generated Strategic Blueprint</p>
        </div>
        
        <!-- Project Overview -->
        <div class="section">
          <div class="section-header">
            <div class="section-icon">??</div>
            <h2 class="section-title">Project Overview</h2>
          </div>
          <div class="section-content">
            <div class="card">
              <p class="card-text">${brief.projectOverview.projectSummary}</p>
            </div>
          </div>
        </div>
        
        <!-- Target Audience -->
        <div class="section">
          <div class="section-header">
            <div class="section-icon">??</div>
            <h2 class="section-title">Target Audience</h2>
          </div>
          <div class="section-content">
            <div class="card">
              <div class="card-title">${brief.targetAudience.primaryPersona.name}</div>
              <p class="card-text">${brief.targetAudience.primaryPersona.demographics}</p>
              <div class="tag-list">
                ${brief.targetAudience.primaryPersona.goals.map(g => `<span class="tag">${g}</span>`).join('')}
              </div>
            </div>
            ${brief.targetAudience.secondaryPersonas.map(p => `
              <div class="card">
                <div class="card-title">${p.name}</div>
                <p class="card-text">${p.description}</p>
              </div>
            `).join('')}
          </div>
        </div>
        
        <!-- Brand Personality -->
        <div class="section">
          <div class="section-header">
            <div class="section-icon">?</div>
            <h2 class="section-title">Brand Personality</h2>
          </div>
          <div class="section-content">
            <div class="grid-2">
              <div class="card">
                <div class="card-title">Tone</div>
                <div class="tag-list">
                  ${brief.brandPersonality.tone.map(t => `<span class="tag secondary">${t}</span>`).join('')}
                </div>
              </div>
              <div class="card">
                <div class="card-title">Core Values</div>
                <div class="tag-list">
                  ${brief.brandPersonality.values.map(v => `<span class="tag secondary">${v}</span>`).join('')}
                </div>
              </div>
            </div>
            <div class="card">
              <div class="card-title">What Sets You Apart</div>
              <ul class="list">
                ${brief.brandPersonality.differentiators.map(d => `<li>${d}</li>`).join('')}
              </ul>
            </div>
          </div>
        </div>
        
        <!-- Design Direction -->
        <div class="section">
          <div class="section-header">
            <div class="section-icon">??</div>
            <h2 class="section-title">Design Direction</h2>
          </div>
          <div class="section-content">
            <div class="card">
              <div class="card-title">Visual Style</div>
              <p class="card-text">${brief.designDirection.visualStyle}</p>
              <div class="tag-list" style="margin-top: 16px;">
                ${brief.designDirection.moodKeywords.map(k => `<span class="tag">${k}</span>`).join('')}
              </div>
            </div>
            <div class="card">
              <div class="card-title">Typography</div>
              <p class="card-text">${brief.designDirection.typographyNotes}</p>
            </div>
            <div class="card">
              <div class="card-title">Color Recommendations</div>
              <ul class="list">
                <li><strong>Primary:</strong> ${brief.designDirection.colorRecommendations.primary}</li>
                <li><strong>Secondary:</strong> ${brief.designDirection.colorRecommendations.secondary}</li>
                <li><strong>Accent:</strong> ${brief.designDirection.colorRecommendations.accent}</li>
              </ul>
            </div>
          </div>
        </div>
        
        <!-- Site Structure -->
        <div class="section">
          <div class="section-header">
            <div class="section-icon">???</div>
            <h2 class="section-title">Site Structure</h2>
          </div>
          <div class="section-content">
            <table class="page-table">
              <thead>
                <tr>
                  <th>Page</th>
                  <th>Purpose</th>
                  <th>Priority</th>
                </tr>
              </thead>
              <tbody>
                ${brief.siteStructure.recommendedPages.map(p => `
                  <tr>
                    <td><strong>${p.page}</strong></td>
                    <td>${p.purpose}</td>
                    <td><span class="priority-badge priority-${p.priority}">${p.priority}</span></td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
            
            <div style="margin-top: 24px;">
              <div class="card-title" style="margin-bottom: 12px;">Key Features</div>
              ${brief.siteStructure.keyFeatures.map(f => `
                <div class="card">
                  <div class="card-title">${f.feature}</div>
                  <p class="card-text">${f.rationale}</p>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
        
        <!-- Content Strategy -->
        <div class="section">
          <div class="section-header">
            <div class="section-icon">??</div>
            <h2 class="section-title">Content Strategy</h2>
          </div>
          <div class="section-content">
            <div class="grid-2">
              <div class="card">
                <div class="card-title">Key Messages</div>
                <ul class="list">
                  ${brief.contentStrategy.keyMessages.map(m => `<li>${m}</li>`).join('')}
                </ul>
              </div>
              <div class="card">
                <div class="card-title">Calls to Action</div>
                <ul class="list">
                  ${brief.contentStrategy.callsToAction.map(c => `<li>${c}</li>`).join('')}
                </ul>
              </div>
            </div>
            <div class="card">
              <div class="card-title">Content Needs</div>
              <ul class="list">
                ${brief.contentStrategy.contentNeeds.map(c => `<li>${c}</li>`).join('')}
              </ul>
            </div>
          </div>
        </div>
        
        <!-- Success Metrics -->
        <div class="section">
          <div class="section-header">
            <div class="section-icon">??</div>
            <h2 class="section-title">Success Metrics</h2>
          </div>
          <div class="section-content">
            <div class="grid-2">
              <div class="card">
                <div class="card-title">Goals</div>
                <ul class="list">
                  ${brief.successMetrics.goals.map(g => `<li>${g}</li>`).join('')}
                </ul>
              </div>
              <div class="card">
                <div class="card-title">Key Performance Indicators</div>
                <ul class="list">
                  ${brief.successMetrics.kpis.map(k => `<li>${k}</li>`).join('')}
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Competitive Insights -->
        <div class="section">
          <div class="section-header">
            <div class="section-icon">??</div>
            <h2 class="section-title">Competitive Insights</h2>
          </div>
          <div class="section-content">
            <div class="grid-2">
              <div class="card">
                <div class="card-title">Strengths to Leverage</div>
                <ul class="list">
                  ${brief.competitiveInsights.strengths.map(s => `<li>${s}</li>`).join('')}
                </ul>
              </div>
              <div class="card">
                <div class="card-title">Opportunities</div>
                <ul class="list">
                  ${brief.competitiveInsights.opportunities.map(o => `<li>${o}</li>`).join('')}
                </ul>
              </div>
            </div>
            <div class="card">
              <div class="card-title">What to Avoid</div>
              <ul class="list">
                ${brief.competitiveInsights.avoidList.map(a => `<li>${a}</li>`).join('')}
              </ul>
            </div>
          </div>
        </div>
        
        <!-- Next Steps -->
        <div class="section">
          <div class="section-header">
            <div class="section-icon">??</div>
            <h2 class="section-title">Next Steps</h2>
          </div>
          <div class="section-content">
            <div class="card">
              <ul class="list">
                ${brief.nextSteps.map((step, i) => `<li><strong>Step ${i + 1}:</strong> ${step}</li>`).join('')}
              </ul>
            </div>
          </div>
        </div>
        
        <div class="cta-box">
          <div class="cta-title">Ready to bring this vision to life?</div>
          <p class="cta-text">Contact Avorria to discuss your project and get a detailed quote.</p>
        </div>
        
        <div class="footer">
          <p class="footer-text">Generated by Avorria AI Design Consultant €¢ avorria.com</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

export const DesignBriefChat = ({ 
  config, 
  isOpen, 
  onClose,
  onBriefGenerated 
}: DesignBriefChatProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGeneratingBrief, setIsGeneratingBrief] = useState(false);
  const [isExportingPDF, setIsExportingPDF] = useState(false);
  const [generatedBrief, setGeneratedBrief] = useState<DesignBrief | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Initial greeting
      setMessages([{
        role: "assistant",
        content: "Hi! I'm your AI design consultant. I'm here to help you create a comprehensive design brief for your website.\n\nLet's start with the basics €” tell me about your business. What do you do, and what makes you different from others in your space?"
      }]);
    }
  }, [isOpen, messages.length]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/generate-design-brief`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({
            messages: [...messages, userMessage],
            config: {
              purpose: config.purpose,
              palette: config.palette,
              siteSize: config.siteSize,
              features: config.features,
            },
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();
      
      if (data.message) {
        setMessages(prev => [...prev, { role: "assistant", content: data.message }]);
      }

      // Check if AI is ready to generate brief
      if (data.readyForBrief) {
        toast.info("I have enough information to generate your design brief!", {
          action: {
            label: "Generate Brief",
            onClick: generateBrief,
          },
        });
      }
    } catch (error) {
      console.error("Chat error:", error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const generateBrief = async () => {
    setIsGeneratingBrief(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/generate-design-brief`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({
            messages,
            config: {
              purpose: config.purpose,
              palette: config.palette,
              siteSize: config.siteSize,
              features: config.features,
            },
            generateFinalBrief: true,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate brief");
      }

      const data = await response.json();
      if (data.brief) {
        setGeneratedBrief(data.brief);
        onBriefGenerated?.(data.brief);
        toast.success("Design brief generated successfully!");
      } else {
        toast.error("Could not generate brief. Please continue the conversation.");
      }
    } catch (error) {
      console.error("Brief generation error:", error);
      toast.error(error instanceof Error ? error.message : "Failed to generate brief");
    } finally {
      setIsGeneratingBrief(false);
    }
  };

  const exportToPDF = async () => {
    if (!generatedBrief) {
      toast.error("Please generate a design brief first.");
      return;
    }

    setIsExportingPDF(true);
    try {
      const html = generateBriefPDFHTML(generatedBrief);
      const { generatePDFFromHTML } = await import("@/lib/pdf-generator");
      
      const businessName = generatedBrief.projectOverview.businessName || "Website";
      const filename = `${businessName.replace(/[^a-z0-9]/gi, '-')}-Design-Brief.pdf`;

      await generatePDFFromHTML(html, {
        filename,
        imageQuality: 0.98,
        scale: 2,
        format: "a4",
        orientation: "portrait",
      });

      toast.success("PDF downloaded successfully!");
    } catch (error) {
      console.error("PDF export error:", error);
      toast.error("Failed to export PDF. Please try again.");
    } finally {
      setIsExportingPDF(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: 400 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 400 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed right-0 top-0 h-full w-full max-w-md bg-card border-l border-border shadow-2xl z-50 flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border bg-gradient-to-r from-primary/10 to-transparent">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">AI Design Consultant</h3>
                <p className="text-xs text-muted-foreground">Creating your design brief</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-md"
                      : "bg-muted text-foreground rounded-bl-md"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>
              </motion.div>
            ))}
            
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="bg-muted rounded-2xl rounded-bl-md px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Thinking...</span>
                  </div>
                </div>
              </motion.div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Generated Brief Actions */}
          {generatedBrief && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 border-t border-border bg-gradient-to-r from-green-500/10 to-transparent"
            >
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="font-medium text-foreground">Design Brief Ready!</span>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={exportToPDF}
                  disabled={isExportingPDF}
                  className="flex-1 bg-primary hover:bg-primary/90"
                >
                  {isExportingPDF ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Download className="w-4 h-4 mr-2" />
                  )}
                  Download PDF
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setGeneratedBrief(null)}
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Continue Chat
                </Button>
              </div>
            </motion.div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-border">
            <div className="flex gap-2 mb-3">
              <Button
                onClick={generateBrief}
                disabled={messages.length < 4 || isGeneratingBrief}
                variant="outline"
                size="sm"
                className="text-xs"
              >
                {isGeneratingBrief ? (
                  <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                ) : (
                  <FileText className="w-3 h-3 mr-1" />
                )}
                Generate Brief
              </Button>
            </div>
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Tell me about your project..."
                className="flex-1 px-4 py-2 rounded-full border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                disabled={isLoading}
              />
              <Button
                onClick={sendMessage}
                disabled={!input.trim() || isLoading}
                size="icon"
                className="rounded-full"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DesignBriefChat;



