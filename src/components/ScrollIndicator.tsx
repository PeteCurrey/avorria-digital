import { ChevronDown } from "lucide-react";

const ScrollIndicator = () => {
  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToContent}
      className="animate-bounce hover:scale-110 transition-transform cursor-pointer"
      aria-label="Scroll to content"
    >
      <div className="flex flex-col items-center space-y-2">
        <div className="w-6 h-10 border-2 border-white/40 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-2 bg-white/60 rounded-full animate-pulse" />
        </div>
        <ChevronDown className="text-white/60" size={20} />
      </div>
    </button>
  );
};

export default ScrollIndicator;
