import Link from "next/link";
import React from "react";
import { cn } from "@/lib/utils";
import { Twitter, Linkedin, Instagram, Facebook, Globe, Heart, MessageCircle, Share2, ThumbsUp, Send } from "lucide-react";

interface SocialPreviewFrameProps {
  platform: string;
  content: string;
  title?: string | null;
  imageUrl?: string | null;
  hashtags?: string[] | null;
  className?: string;
}

const SocialPreviewFrame = ({ platform, content, title, imageUrl, hashtags, className }: SocialPreviewFrameProps) => {
  const hashtagText = hashtags?.map((t) => `#${t}`).join(" ") || "";

  if (platform === "instagram") {
    return (
      <div className={cn("max-w-sm mx-auto rounded-xl border border-border/30 bg-card overflow-hidden", className)}>
        {/* iPhone notch bar */}
        <div className="h-6 bg-muted/30 flex items-center justify-center">
          <div className="w-16 h-1 rounded-full bg-muted-foreground/20" />
        </div>
        {/* Instagram header */}
        <div className="flex items-center gap-2 px-3 py-2 border-b border-border/20">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center text-[9px] font-bold text-white">A</div>
          <span className="text-xs font-semibold">avorria</span>
        </div>
        {/* Image */}
        {imageUrl ? (
          <img src={imageUrl} alt="" className="w-full aspect-square object-cover" />
        ) : (
          <div className="w-full aspect-square bg-muted/20 flex items-center justify-center">
            <Instagram className="h-8 w-8 text-muted-foreground/20" />
          </div>
        )}
        {/* Actions */}
        <div className="flex items-center gap-4 px-3 py-2">
          <Heart className="h-4 w-4 text-foreground" />
          <MessageCircle className="h-4 w-4 text-foreground" />
          <Send className="h-4 w-4 text-foreground" />
        </div>
        {/* Caption */}
        <div className="px-3 pb-3">
          <p className="text-[11px] leading-relaxed"><span className="font-semibold">avorria </span>{content.slice(0, 200)}</p>
          {hashtagText && <p className="text-[10px] text-accent/70 mt-1">{hashtagText}</p>}
        </div>
      </div>
    );
  }

  if (platform === "linkedin") {
    return (
      <div className={cn("max-w-md mx-auto rounded-xl border border-border/30 bg-card overflow-hidden", className)}>
        {/* LinkedIn header */}
        <div className="flex items-center gap-2.5 px-4 py-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center text-xs font-bold text-white">A</div>
          <div>
            <p className="text-xs font-semibold">Avorria</p>
            <p className="text-[10px] text-muted-foreground">Digital Marketing Agency Ã‚Â· 1h</p>
          </div>
        </div>
        {/* Content */}
        <div className="px-4 pb-3">
          {title && <p className="text-xs font-semibold mb-1">{title}</p>}
          <p className="text-[11px] leading-relaxed text-muted-foreground whitespace-pre-wrap">{content.slice(0, 400)}</p>
          {hashtagText && <p className="text-[10px] text-accent/70 mt-2">{hashtagText}</p>}
        </div>
        {imageUrl && <img src={imageUrl} alt="" className="w-full aspect-[1.91/1] object-cover" />}
        {/* Actions */}
        <div className="flex items-center justify-around px-4 py-2 border-t border-border/20">
          <div className="flex items-center gap-1 text-[10px] text-muted-foreground"><ThumbsUp className="h-3 w-3" /> Like</div>
          <div className="flex items-center gap-1 text-[10px] text-muted-foreground"><MessageCircle className="h-3 w-3" /> Comment</div>
          <div className="flex items-center gap-1 text-[10px] text-muted-foreground"><Share2 className="h-3 w-3" /> Share</div>
        </div>
      </div>
    );
  }

  // Twitter / default
  return (
    <div className={cn("max-w-md mx-auto rounded-xl border border-border/30 bg-card overflow-hidden", className)}>
      <div className="flex items-start gap-2.5 px-4 py-3">
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center text-xs font-bold text-white flex-shrink-0">A</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1">
            <span className="text-xs font-semibold">Avorria</span>
            <span className="text-[10px] text-muted-foreground">@avorria Ã‚Â· 1h</span>
          </div>
          <p className="text-[11px] leading-relaxed mt-1 whitespace-pre-wrap">{content.slice(0, 280)}</p>
          {hashtagText && <p className="text-[10px] text-accent/70 mt-1">{hashtagText}</p>}
          {imageUrl && <img src={imageUrl} alt="" className="w-full aspect-video object-cover rounded-lg mt-2 border border-border/20" />}
          {/* Actions */}
          <div className="flex items-center justify-between mt-2 max-w-[240px]">
            <MessageCircle className="h-3.5 w-3.5 text-muted-foreground" />
            <Share2 className="h-3.5 w-3.5 text-muted-foreground" />
            <Heart className="h-3.5 w-3.5 text-muted-foreground" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialPreviewFrame;

