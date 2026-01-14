import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Sparkles, Loader2, FileText, X, MessageSquare, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import type { StudioConfig } from "@/types/studio";

interface Message {
  role: "user" | "assistant";
  content: string;
}

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

interface DesignBriefChatProps {
  config: StudioConfig;
  isOpen: boolean;
  onClose: () => void;
  onBriefGenerated?: (brief: DesignBrief) => void;
}

export const DesignBriefChat = ({ config, isOpen, onClose, onBriefGenerated }: DesignBriefChatProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [readyForBrief, setReadyForBrief] = useState(false);
  const [isGeneratingBrief, setIsGeneratingBrief] = useState(false);
  const [generatedBrief, setGeneratedBrief] = useState<DesignBrief | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Initial greeting
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const purposeLabel = {
        "lead-generation": "lead generation",
        "content-hub": "content hub",
        "product-saas": "SaaS product",
        "service-portal": "service portal",
      }[config.purpose] || config.purpose;

      setMessages([
        {
          role: "assistant",
          content: `Welcome to the Design Brief Studio! I see you're planning a ${purposeLabel} website with a ${config.palette} aesthetic. I'm here to help you create a comprehensive design brief that captures your vision perfectly.\n\nLet's start with the basics—tell me about your business. What do you do, and what makes you different from others in your space?`,
        },
      ]);
    }
  }, [isOpen, config.purpose, config.palette]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-design-brief`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({
            messages: [...messages, { role: "user", content: userMessage }],
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
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to get response");
      }

      const data = await response.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.message }]);
      
      if (data.readyForBrief) {
        setReadyForBrief(true);
      }
    } catch (error) {
      console.error("Chat error:", error);
      toast.error(error instanceof Error ? error.message : "Failed to send message");
    } finally {
      setIsLoading(false);
    }
  };

  const generateBrief = async () => {
    setIsGeneratingBrief(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-design-brief`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        className="fixed right-0 top-0 z-50 h-full w-full max-w-md border-l border-white/10 bg-zinc-950/95 backdrop-blur-xl flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/20">
              <Sparkles className="h-5 w-5 text-accent" />
            </div>
            <div>
              <h3 className="font-medium text-white">Design Brief AI</h3>
              <p className="text-xs text-white/50">Let's craft your vision</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-white/60 hover:text-white"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4" ref={scrollRef}>
          <div className="space-y-4">
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
                      ? "bg-accent text-accent-foreground"
                      : "bg-white/5 text-white/90"
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
                <div className="bg-white/5 rounded-2xl px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin text-accent" />
                    <span className="text-sm text-white/60">Thinking...</span>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </ScrollArea>

        {/* Generated Brief Preview */}
        {generatedBrief && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="border-t border-white/10 bg-accent/10 p-4"
          >
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-accent" />
              <div className="flex-1">
                <p className="text-sm font-medium text-white">Design Brief Ready!</p>
                <p className="text-xs text-white/50">
                  {generatedBrief.projectOverview.businessName || "Your project"} • {generatedBrief.siteStructure.recommendedPages.length} pages
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                className="border-accent/30 text-accent hover:bg-accent/10"
              >
                View Full Brief
              </Button>
            </div>
          </motion.div>
        )}

        {/* Generate Brief CTA */}
        {readyForBrief && !generatedBrief && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="border-t border-white/10 bg-accent/5 p-4"
          >
            <Button
              onClick={generateBrief}
              disabled={isGeneratingBrief}
              className="w-full bg-accent hover:bg-accent/90"
            >
              {isGeneratingBrief ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating Your Brief...
                </>
              ) : (
                <>
                  <FileText className="mr-2 h-4 w-4" />
                  Generate Design Brief
                </>
              )}
            </Button>
          </motion.div>
        )}

        {/* Input */}
        <div className="border-t border-white/10 p-4">
          <div className="flex gap-2">
            <Textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Tell me about your business..."
              className="min-h-[60px] max-h-[120px] resize-none border-white/10 bg-white/5 text-white placeholder:text-white/40 focus-visible:ring-accent"
              disabled={isLoading}
            />
            <Button
              onClick={sendMessage}
              disabled={!input.trim() || isLoading}
              size="icon"
              className="h-[60px] w-[60px] shrink-0 bg-accent hover:bg-accent/90"
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
          <p className="mt-2 text-xs text-white/40 text-center">
            Press Enter to send • Shift+Enter for new line
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

// Floating trigger button
export const DesignBriefTrigger = ({ onClick }: { onClick: () => void }) => {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="fixed bottom-24 right-6 z-40 flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-accent-foreground shadow-lg shadow-accent/30 transition-all hover:shadow-accent/50"
    >
      <MessageSquare className="h-5 w-5" />
      <span className="font-medium">AI Design Brief</span>
      <ChevronDown className="h-4 w-4 rotate-[-90deg]" />
    </motion.button>
  );
};

export default DesignBriefChat;
