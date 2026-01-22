import React from "react";
import { motion } from "framer-motion";
import { Play, Quote } from "lucide-react";
import { Card } from "@/components/ui/card";

interface TestimonialVideoCardProps {
  quote: string;
  author: string;
  role: string;
  company: string;
  avatarUrl?: string;
}

const TestimonialVideoCard: React.FC<TestimonialVideoCardProps> = ({
  quote,
  author,
  role,
  company,
  avatarUrl,
}) => {
  return (
    <Card className="overflow-hidden border-accent/20 bg-gradient-to-br from-accent/5 to-transparent">
      <div className="flex flex-col md:flex-row">
        {/* Video Thumbnail / Avatar */}
        <div className="relative w-full md:w-48 h-48 md:h-auto bg-muted flex items-center justify-center shrink-0">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={author}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center">
              <span className="text-2xl font-medium text-accent">
                {author.charAt(0)}
              </span>
            </div>
          )}
          
          {/* Play Button Overlay */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center bg-black/30"
            whileHover={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-14 h-14 rounded-full bg-accent flex items-center justify-center cursor-pointer shadow-lg"
            >
              <Play className="h-6 w-6 text-accent-foreground ml-1" />
            </motion.div>
          </motion.div>

          {/* Coming Soon Badge */}
          <div className="absolute top-2 right-2 px-2 py-1 bg-black/60 rounded text-xs text-white/80">
            Coming Soon
          </div>
        </div>

        {/* Quote Content */}
        <div className="p-6 flex-1">
          <Quote className="h-8 w-8 text-accent/30 mb-3" />
          
          <blockquote className="text-lg text-foreground italic mb-4 line-clamp-3">
            "{quote}"
          </blockquote>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
              <span className="text-sm font-medium text-accent">
                {author.charAt(0)}
              </span>
            </div>
            <div>
              <p className="font-medium text-foreground">{author}</p>
              <p className="text-sm text-muted-foreground">
                {role}, {company}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

// Pre-built testimonials for the page
export const testimonials = [
  {
    quote: "Our old site was exactly like Archetype #2 - trying to be everything to everyone. Avorria helped us focus, and enquiries tripled within 3 months.",
    author: "James Mitchell",
    role: "Managing Director",
    company: "Mitchell & Partners",
  },
  {
    quote: "I didn't realize how much our hero slider was hurting us until I saw the heat maps. The rebuild paid for itself in the first quarter.",
    author: "Sarah Chen",
    role: "Head of Marketing",
    company: "TechScale Solutions",
  },
  {
    quote: "We were the 'beautiful but useless' archetype. Now our site actually generates leads instead of just winning design awards.",
    author: "David Thompson",
    role: "CEO",
    company: "Horizon Consulting",
  },
];

export default TestimonialVideoCard;
