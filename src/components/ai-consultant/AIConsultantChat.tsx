'use client';
import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Loader2, Mic, MicOff, Volume2, VolumeX, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface AIConsultantChatProps {
  isOpen: boolean;
  onClose: () => void;
}

// Next.js process.env instead of Vite import.meta.env
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const CHAT_URL = `${SUPABASE_URL}/functions/v1/ai-consultant`;
const TTS_URL = `${SUPABASE_URL}/functions/v1/elevenlabs-tts`;

// Warm, human opening sequence
const OPENING_MESSAGES: Message[] = [
  {
    role: "assistant",
    content: "Hey — thanks for stopping by."
  },
  {
    role: "assistant",
    content: "I'm here to help you think through your digital marketing — no forms, no pressure. Whether it's SEO, website performance, or just getting more from your online presence, I've got time."
  },
  {
    role: "assistant",
    content: "What can I help with?"
  }
];

const AIConsultantChat = ({ isOpen, onClose }: AIConsultantChatProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [openingStep, setOpeningStep] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const [isTypingOpening, setIsTypingOpening] = useState(false);
  
  // Voice features
  const [isListening, setIsListening] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const recognitionRef = useRef<any>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTypingOpening]);

  useEffect(() => {
    if (isOpen && inputRef.current && openingStep >= 3) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen, openingStep]);

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = true;
        recognitionRef.current.lang = 'en-GB';

        recognitionRef.current.onresult = (event) => {
          const transcript = Array.from(event.results)
            .map(result => result[0].transcript)
            .join('');
          setInput(transcript);
        };

        recognitionRef.current.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current.onerror = () => {
          setIsListening(false);
        };
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, []);

  // Display opening messages with typing indicators
  const startOpeningSequence = useCallback(() => {
    if (hasStarted) return;
    setHasStarted(true);
    
    setMessages([OPENING_MESSAGES[0]]);
    setOpeningStep(1);
    
    setTimeout(() => setIsTypingOpening(true), 1000);
    
    setTimeout(() => {
      setIsTypingOpening(false);
      setMessages(prev => [...prev, OPENING_MESSAGES[1]]);
      setOpeningStep(2);
    }, 2200);
    
    setTimeout(() => setIsTypingOpening(true), 3000);
    
    setTimeout(() => {
      setIsTypingOpening(false);
      setMessages(prev => [...prev, OPENING_MESSAGES[2]]);
      setOpeningStep(3);
    }, 4000);
  }, [hasStarted]);

  useEffect(() => {
    if (isOpen && !hasStarted) {
      startOpeningSequence();
    }
  }, [isOpen, hasStarted, startOpeningSequence]);

  // Text to speech function
  const speakText = async (text: string) => {
    if (!voiceEnabled) return;
    
    try {
      setIsSpeaking(true);
      
      const response = await fetch(TTS_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error('TTS request failed');
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      
      if (audioRef.current) {
        audioRef.current.pause();
      }
      
      audioRef.current = new Audio(audioUrl);
      audioRef.current.onended = () => {
        setIsSpeaking(false);
        URL.revokeObjectURL(audioUrl);
      };
      audioRef.current.onerror = () => {
        setIsSpeaking(false);
        URL.revokeObjectURL(audioUrl);
      };
      
      await audioRef.current.play();
    } catch (error) {
      console.error('TTS Error:', error);
      setIsSpeaking(false);
    }
  };

  const toggleListening = () => {
    if (!recognitionRef.current) {
      if (typeof window !== 'undefined') {
        alert('Speech recognition is not supported in your browser.');
      }
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      setInput('');
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const toggleVoice = () => {
    if (isSpeaking && audioRef.current) {
      audioRef.current.pause();
      setIsSpeaking(false);
    }
    setVoiceEnabled(!voiceEnabled);
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input.trim() };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    let assistantContent = "";

    try {
      const response = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!response.ok || !response.body) {
        throw new Error("Failed to send message");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = buffer.indexOf("\n")) !== -1) {
          let line = buffer.slice(0, newlineIndex);
          buffer = buffer.slice(newlineIndex + 1);

          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") break;

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              assistantContent += content;
              setMessages((prev) => {
                const last = prev[prev.length - 1];
                if (last?.role === "assistant") {
                  return prev.map((m, i) =>
                    i === prev.length - 1 ? { ...m, content: assistantContent } : m
                  );
                }
                return [...prev, { role: "assistant", content: assistantContent }];
              });
            }
          } catch {
            buffer = line + "\n" + buffer;
            break;
          }
        }
      }

      // Speak the response if voice is enabled
      if (voiceEnabled && assistantContent) {
        speakText(assistantContent);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "I apologize, but I'm having trouble connecting. Please try again." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleClose = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    if (recognitionRef.current) {
      recognitionRef.current.abort();
    }
    onClose();
    setTimeout(() => {
      setMessages([]);
      setHasStarted(false);
      setInput("");
      setIsListening(false);
      setIsSpeaking(false);
    }, 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-50"
          />

          {/* Chat Panel - Reduced width */}
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full sm:w-[380px] bg-background border-l border-border z-50 flex flex-col shadow-2xl"
          >
            {/* Header with Avatar */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-purple-600 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  {/* Online indicator */}
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                </div>
                <div>
                  <h2 className="text-base font-medium tracking-tight">Avorria</h2>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    Digital Strategy
                    <span className="inline-flex h-1.5 w-1.5 rounded-full bg-accent/40" />
                    <span className="text-[10px] font-mono opacity-70">Claude 3.5</span>
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {/* Voice toggle */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleVoice}
                  className={cn(
                    "h-8 w-8",
                    voiceEnabled && "text-accent",
                    isSpeaking && "animate-pulse"
                  )}
                  title={voiceEnabled ? "Disable voice responses" : "Enable voice responses"}
                >
                  {voiceEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleClose}
                  className="h-8 w-8 hover:bg-muted"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={cn(
                    "flex",
                    message.role === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  <div className="flex items-end gap-2 max-w-[85%]">
                    {message.role === "assistant" && (
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-accent to-purple-600 flex items-center justify-center flex-shrink-0">
                        <Bot className="w-3 h-3 text-white" />
                      </div>
                    )}
                    <div
                      className={cn(
                        "rounded-2xl px-3 py-2",
                        message.role === "user"
                          ? "bg-primary text-primary-foreground rounded-br-md"
                          : "bg-muted text-foreground rounded-bl-md"
                      )}
                    >
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">
                        {message.content}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator for opening sequence */}
              {isTypingOpening && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex justify-start"
                >
                  <div className="flex items-end gap-2">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-accent to-purple-600 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-3 h-3 text-white" />
                    </div>
                    <div className="bg-muted rounded-2xl rounded-bl-md px-3 py-2">
                      <div className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full animate-pulse" />
                        <span className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full animate-pulse [animation-delay:150ms]" />
                        <span className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full animate-pulse [animation-delay:300ms]" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Typing indicator for user messages */}
              {isLoading && messages[messages.length - 1]?.role === "user" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="flex items-end gap-2">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-accent to-purple-600 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-3 h-3 text-white" />
                    </div>
                    <div className="bg-muted rounded-2xl rounded-bl-md px-3 py-2">
                      <div className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full animate-pulse" />
                        <span className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full animate-pulse [animation-delay:150ms]" />
                        <span className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full animate-pulse [animation-delay:300ms]" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input with Voice */}
            <div className="px-4 py-3 border-t border-border bg-background">
              <div className="flex items-end gap-2">
                {/* Microphone button */}
                <Button
                  variant={isListening ? "default" : "outline"}
                  size="icon"
                  onClick={toggleListening}
                  disabled={isLoading}
                  className={cn(
                    "h-10 w-10 rounded-xl shrink-0",
                    isListening && "bg-red-500 hover:bg-red-600 text-white animate-pulse"
                  )}
                  title={isListening ? "Stop recording" : "Start voice input"}
                >
                  {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                </Button>
                
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={isListening ? "Listening..." : "Type or speak..."}
                  disabled={isLoading}
                  rows={1}
                  className="flex-1 resize-none bg-muted rounded-xl px-3 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50 max-h-24"
                  style={{ minHeight: "40px" }}
                />
                <Button
                  onClick={sendMessage}
                  disabled={!input.trim() || isLoading}
                  size="icon"
                  className="h-10 w-10 rounded-xl shrink-0"
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <p className="text-[10px] text-muted-foreground mt-2 text-center">
                {voiceEnabled ? "Voice responses enabled" : "Press Enter to send"}
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AIConsultantChat;

