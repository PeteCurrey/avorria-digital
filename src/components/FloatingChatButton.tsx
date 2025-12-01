import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const FloatingChatButton = () => {
  const handleClick = () => {
    // Scroll to contact form or open chat
    const contactSection = document.querySelector("#contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = "/contact";
    }
  };

  return (
    <Button
      onClick={handleClick}
      size="icon"
      variant="accent"
      className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-40 w-12 h-12 sm:w-14 sm:h-14 rounded-full shadow-2xl hover:scale-110 transition-transform animate-fade-in"
      aria-label="Contact us"
    >
      <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
    </Button>
  );
};

export default FloatingChatButton;
