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
      className="fixed bottom-8 right-8 z-40 w-14 h-14 rounded-full shadow-2xl hover:scale-110 transition-transform animate-fade-in"
      aria-label="Contact us"
    >
      <MessageCircle size={24} />
    </Button>
  );
};

export default FloatingChatButton;
