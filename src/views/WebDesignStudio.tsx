import { SEOHead } from "@/components/seo/SEOHead";
import VideoHero from "@/components/studio/VideoHero";

const WebDesignStudio = () => {
  return (
    <>
      <SEOHead
        title="Web Design Studio | Avorria"
        description="Spec your next website like you'd spec a flagship. A guided studio for serious builds with AI-powered configuration."
        canonical="/web-design/studio"
      />

      <div className="min-h-screen bg-black">
        <VideoHero />
      </div>
    </>
  );
};

export default WebDesignStudio;
