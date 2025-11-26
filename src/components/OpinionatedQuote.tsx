import { Quote } from "lucide-react";

interface OpinionatedQuoteProps {
  quote: string;
}

export const OpinionatedQuote = ({ quote }: OpinionatedQuoteProps) => {
  return (
    <div className="relative my-12 p-8 rounded-lg bg-gradient-to-r from-[hsl(var(--accent))] to-[hsl(280,75%,60%)] text-white overflow-hidden">
      <div className="absolute top-4 left-4 opacity-20">
        <Quote size={48} />
      </div>
      <p className="text-xl lg:text-2xl font-semibold relative z-10 italic max-w-4xl">
        "{quote}"
      </p>
    </div>
  );
};
