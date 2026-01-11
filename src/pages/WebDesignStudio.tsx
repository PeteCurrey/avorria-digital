import React, { useState, useMemo, useRef, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { trackEvent } from "@/lib/tracking";
import { HeroCanvas } from "@/components/studio/HeroCanvas";
import { StudioStepper } from "@/components/studio/StudioStepper";
import { PremiumSummary } from "@/components/studio/PremiumSummary";
import type { StudioConfig } from "@/types/studio";
import { ArrowDown, Sparkles } from "lucide-react";

type Purpose = "lead_gen" | "authority" | "saas" | "platform";
type MoodDensity = "minimal" | "content_rich";
type MoodEnergy = "calm" | "bold";
type Palette = "light" | "dark" | "mono" | "gradient";
type StructureSize = "lean" | "standard" | "expanded";

type StudioState = {
  purpose: Purpose | null;
  density: MoodDensity;
  energy: MoodEnergy;
  palette: Palette;
  structureSize: StructureSize;
  features: string[];
  straightTalking: number;
  analytical: number;
  understated: number;
  notes: string;
};

const defaultState: StudioState = {
  purpose: null,
  density: "minimal",
  energy: "calm",
  palette: "dark",
  structureSize: "standard",
  features: [],
  straightTalking: 50,
  analytical: 50,
  understated: 50,
  notes: ""
};
const STEPS = [{
  id: "purpose",
  label: "Purpose",
  number: "01"
}, {
  id: "mood",
  label: "Mood",
  number: "02"
}, {
  id: "structure",
  label: "Structure",
  number: "03"
}, {
  id: "features",
  label: "Features",
  number: "04"
}, {
  id: "personality",
  label: "Personality",
  number: "05"
}, {
  id: "summary",
  label: "Submit",
  number: "06"
}];
const WebStudioPage: React.FC = () => {
  const [state, setState] = useState<StudioState>(defaultState);
  const [activeStep, setActiveStep] = useState(0);
  const [showIndicator, setShowIndicator] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const configSectionRef = useRef<HTMLElement>(null);

  // Track active step and indicator visibility based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      
      // Check if configurator section is in view
      if (configSectionRef.current) {
        const sectionTop = configSectionRef.current.offsetTop;
        const sectionBottom = sectionTop + configSectionRef.current.offsetHeight;
        const viewportTop = window.scrollY;
        const viewportBottom = viewportTop + window.innerHeight;
        
        const isInView = viewportBottom > sectionTop + 200 && viewportTop < sectionBottom - 200;
        setShowIndicator(isInView);
      }
      
      // Track active step
      for (let i = stepRefs.current.length - 1; i >= 0; i--) {
        const ref = stepRefs.current[i];
        if (ref && ref.offsetTop <= scrollPosition) {
          setActiveStep(i);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Mouse tracking for parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = {
    damping: 25,
    stiffness: 150
  };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [2, -2]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-2, 2]), springConfig);
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!previewRef.current) return;
    const rect = previewRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };
  const handleUpdate = <K extends keyof StudioState,>(key: K, value: StudioState[K]) => {
    setState(prev => ({
      ...prev,
      [key]: value
    }));
    trackEvent("studio_option_changed", {
      option: key,
      value
    });
  };
  const previewBg = useMemo(() => {
    switch (state.palette) {
      case "light":
        return "from-slate-100 via-white to-slate-50";
      case "mono":
        return "from-slate-900 via-slate-850 to-slate-900";
      case "gradient":
        return "from-indigo-950 via-slate-900 to-emerald-950";
      default:
        return "from-slate-950 via-slate-900 to-slate-850";
    }
  }, [state.palette]);
  const purposeLabel = useMemo(() => {
    switch (state.purpose) {
      case "lead_gen":
        return "Lead-generation";
      case "authority":
        return "Authority hub";
      case "saas":
        return "Product story";
      case "platform":
        return "Service platform";
      default:
        return "Awaiting direction";
    }
  }, [state.purpose]);
  const heroHeight = useMemo(() => {
    if (state.purpose === "lead_gen") return "h-32";
    if (state.purpose === "authority") return "h-20";
    return "h-24";
  }, [state.purpose]);
  const sectionCount = useMemo(() => {
    if (state.structureSize === "lean") return 2;
    if (state.structureSize === "expanded") return 4;
    return 3;
  }, [state.structureSize]);
  const scrollToConfig = () => {
    const element = document.getElementById("studio-config");
    if (element) {
      element.scrollIntoView({
        behavior: "smooth"
      });
    }
    trackEvent("studio_entered", {});
  };
  return <>
      <Helmet>
        <title>Web Design Studio | Avorria</title>
        <meta name="description" content="Spec your next website like you'd spec a flagship. A guided studio for serious builds." />
      </Helmet>

      <div className="min-h-screen bg-slate-950 text-slate-50 selection:bg-sky-400/30">
        {/* HERO – Cinematic */}
        <section className="relative h-screen w-full overflow-hidden">
          <HeroCanvas className="absolute inset-0 h-full w-full" />

          {/* Premium gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/40 via-transparent to-slate-950/40" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(2,6,23,0.6)_70%)]" />

          <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-6">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-3xl text-center"
            >
              {/* Premium badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="mb-8 inline-flex items-center gap-2 rounded-full border border-sky-500/20 bg-sky-500/5 px-4 py-2 backdrop-blur-sm"
              >
                <Sparkles className="h-3.5 w-3.5 text-sky-400" />
                <span className="text-[11px] font-medium uppercase tracking-[0.3em] text-sky-300/80">
                  Web Design Studio
                </span>
              </motion.div>
              
              {/* Animated headline */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl tracking-tight text-white font-extralight leading-[1.1]">
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="block"
                >
                  Spec Your Next
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  className="block bg-gradient-to-r from-white via-sky-200 to-white bg-clip-text text-transparent"
                >
                  Website.
                </motion.span>
              </h1>
              
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.8 }}
                className="mt-8 text-lg text-slate-400/90 font-light tracking-wide max-w-xl mx-auto"
              >
                A guided configurator for serious builds. No templates. 
                <span className="text-slate-300"> Just precision.</span>
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.8 }}
                className="mt-12 flex flex-col items-center gap-6"
              >
                <motion.button 
                  onClick={scrollToConfig} 
                  whileHover={{ scale: 1.03, boxShadow: "0 0 60px rgba(255,255,255,0.2)" }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative rounded-full bg-white px-12 py-5 text-sm font-medium text-slate-900 shadow-2xl shadow-white/10 transition-all duration-500"
                >
                  <span className="relative z-10">Enter the Studio</span>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-sky-100 to-white opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </motion.button>
                
                <Link 
                  to="/services/web-design" 
                  className="text-sm text-slate-500 transition-colors hover:text-slate-300 flex items-center gap-2"
                >
                  ← Back to Web Design
                </Link>
              </motion.div>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
          >
            <span className="text-[10px] uppercase tracking-[0.3em] text-slate-500">Scroll to configure</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowDown className="h-4 w-4 text-slate-500" />
            </motion.div>
          </motion.div>
        </section>

        {/* STUDIO CONFIGURATOR */}
        <section ref={configSectionRef} id="studio-config" className="relative min-h-screen bg-slate-950 px-6 py-20 md:px-12 md:py-28">
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -top-1/2 left-1/4 h-96 w-96 rounded-full bg-sky-900/10 blur-[120px]" />
            <div className="absolute -bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-emerald-900/10 blur-[120px]" />
          </div>

          <div className="relative mx-auto flex max-w-7xl flex-col-reverse gap-8 lg:flex-row lg:gap-16">
            {/* LEFT: Controls */}
            <div className="w-full lg:w-[45%] space-y-12">
              <motion.header initial={{
              opacity: 0,
              y: 20
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.8
            }}>
                <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-slate-500">
                  Configuration
                </p>
                <h2 className="mt-4 text-3xl font-light tracking-tight text-white md:text-4xl">
                  Define the blueprint.
                </h2>
              </motion.header>

              {/* Premium Step Indicator */}
              <StudioStepper
                steps={STEPS}
                activeStep={activeStep}
                onStepClick={(index) => {
                  const ref = stepRefs.current[index];
                  if (ref) {
                    ref.scrollIntoView({ behavior: "smooth", block: "start" });
                  }
                }}
                isVisible={showIndicator}
              />

              {/* Step 1 – Purpose */}
              <motion.div ref={el => {
              stepRefs.current[0] = el;
            }} initial={{
              opacity: 0,
              y: 20
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.8,
              delay: 0.1
            }} className="space-y-6 scroll-mt-48">
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-slate-600">
                    01 · Purpose
                  </p>
                  <h3 className="mt-2 text-lg font-light tracking-wide text-slate-200">
                    What's the primary job?
                  </h3>
                </div>
                
                <div className="grid grid-cols-1 gap-3">
                  {[{
                  id: "lead_gen",
                  label: "Lead generation",
                  desc: "Convert visitors into pipeline."
                }, {
                  id: "authority",
                  label: "Authority hub",
                  desc: "Deep, searchable expertise."
                }, {
                  id: "saas",
                  label: "Product marketing",
                  desc: "Explain and convert to trial."
                }, {
                  id: "platform",
                  label: "Service platform",
                  desc: "Marketing meets operations."
                }].map(option => {
                  const selected = state.purpose === option.id;
                  return <motion.button key={option.id} type="button" onClick={() => handleUpdate("purpose", option.id as Purpose)} whileHover={{
                    x: 4
                  }} whileTap={{
                    scale: 0.995
                  }} className={`group relative rounded-2xl border px-5 py-4 text-left transition-all duration-500 ${selected ? "border-sky-500/30 bg-sky-500/5" : "border-slate-800/60 hover:border-slate-700/80 hover:bg-slate-900/30"}`}>
                        {selected && <motion.div layoutId="purpose-glow" className="absolute inset-0 rounded-2xl bg-sky-400/5 shadow-[0_0_40px_rgba(56,189,248,0.1)]" transition={{
                      duration: 0.4
                    }} />}
                        <div className="relative flex items-center justify-between">
                          <div>
                            <span className={`text-sm font-medium transition-colors duration-300 ${selected ? "text-white" : "text-slate-300"}`}>
                              {option.label}
                            </span>
                            <p className="mt-1 text-xs text-slate-500">{option.desc}</p>
                          </div>
                          <div className={`h-2 w-2 rounded-full transition-all duration-300 ${selected ? "bg-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.6)]" : "bg-slate-700"}`} />
                        </div>
                      </motion.button>;
                })}
                </div>
              </motion.div>

              {/* Step 2 – Mood */}
              <motion.div ref={el => {
              stepRefs.current[1] = el;
            }} initial={{
              opacity: 0,
              y: 20
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.8,
              delay: 0.2
            }} className="space-y-6 scroll-mt-48">
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-slate-600">
                    02 · Mood
                  </p>
                  <h3 className="mt-2 text-lg font-light tracking-wide text-slate-200">
                    How should it feel?
                  </h3>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between rounded-xl border border-slate-800/40 bg-slate-900/20 px-5 py-3">
                    <span className="text-xs text-slate-400">Density</span>
                    <div className="flex gap-1 rounded-full bg-slate-800/50 p-1">
                      {["minimal", "content_rich"].map(d => <button key={d} type="button" onClick={() => handleUpdate("density", d as MoodDensity)} className={`rounded-full px-4 py-1.5 text-xs transition-all duration-300 ${state.density === d ? "bg-slate-700 text-white" : "text-slate-500 hover:text-slate-300"}`}>
                          {d === "minimal" ? "Minimal" : "Rich"}
                        </button>)}
                    </div>
                  </div>

                  <div className="flex items-center justify-between rounded-xl border border-slate-800/40 bg-slate-900/20 px-5 py-3">
                    <span className="text-xs text-slate-400">Energy</span>
                    <div className="flex gap-1 rounded-full bg-slate-800/50 p-1">
                      {["calm", "bold"].map(e => <button key={e} type="button" onClick={() => handleUpdate("energy", e as MoodEnergy)} className={`rounded-full px-4 py-1.5 text-xs capitalize transition-all duration-300 ${state.energy === e ? "bg-slate-700 text-white" : "text-slate-500 hover:text-slate-300"}`}>
                          {e}
                        </button>)}
                    </div>
                  </div>

                  <div className="rounded-xl border border-slate-800/40 bg-slate-900/20 px-5 py-4">
                    <span className="text-xs text-slate-400">Palette</span>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {[{
                      id: "dark",
                      label: "Dark"
                    }, {
                      id: "light",
                      label: "Light"
                    }, {
                      id: "mono",
                      label: "Mono"
                    }, {
                      id: "gradient",
                      label: "Gradient"
                    }].map(opt => <button key={opt.id} type="button" onClick={() => handleUpdate("palette", opt.id as Palette)} className={`rounded-full border px-4 py-1.5 text-xs transition-all duration-300 ${state.palette === opt.id ? "border-sky-500/40 bg-sky-500/10 text-sky-200" : "border-slate-700/50 text-slate-500 hover:border-slate-600 hover:text-slate-400"}`}>
                          {opt.label}
                        </button>)}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Step 3 – Structure */}
              <motion.div ref={el => {
              stepRefs.current[2] = el;
            }} initial={{
              opacity: 0,
              y: 20
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.8,
              delay: 0.3
            }} className="space-y-6 scroll-mt-48">
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-slate-600">
                    03 · Structure
                  </p>
                  <h3 className="mt-2 text-lg font-light tracking-wide text-slate-200">
                    How expansive?
                  </h3>
                </div>

                <div className="flex flex-col gap-3">
                  {[{
                  id: "lean",
                  label: "Lean",
                  desc: "3–5 focused pages"
                }, {
                  id: "standard",
                  label: "Standard",
                  desc: "6–10 pages"
                }, {
                  id: "expanded",
                  label: "Expanded",
                  desc: "Full ecosystem"
                }].map(opt => {
                  const selected = state.structureSize === opt.id;
                  return <motion.button key={opt.id} type="button" onClick={() => handleUpdate("structureSize", opt.id as StructureSize)} whileHover={{
                    x: 4
                  }} whileTap={{
                    scale: 0.995
                  }} className={`group relative rounded-2xl border px-5 py-4 text-left transition-all duration-500 ${selected ? "border-emerald-500/30 bg-emerald-500/5" : "border-slate-800/60 hover:border-slate-700/80 hover:bg-slate-900/30"}`}>
                        {selected && <motion.div layoutId="structure-glow" className="absolute inset-0 rounded-2xl bg-emerald-400/5 shadow-[0_0_40px_rgba(52,211,153,0.1)]" transition={{
                      duration: 0.4
                    }} />}
                        <div className="relative flex items-center justify-between">
                          <div>
                            <span className={`text-sm font-medium transition-colors duration-300 ${selected ? "text-white" : "text-slate-300"}`}>
                              {opt.label}
                            </span>
                            <p className="mt-1 text-xs text-slate-500">{opt.desc}</p>
                          </div>
                          <span className="text-[10px] uppercase tracking-widest text-slate-600">
                            {opt.id}
                          </span>
                        </div>
                      </motion.button>;
                })}
                </div>
              </motion.div>

              {/* Step 4 – Features */}
              <motion.div ref={el => {
              stepRefs.current[3] = el;
            }} initial={{
              opacity: 0,
              y: 20
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.8,
              delay: 0.4
            }} className="space-y-6 scroll-mt-48">
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-slate-600">
                    04 · Features
                  </p>
                  <h3 className="mt-2 text-lg font-light tracking-wide text-slate-200">
                    Advanced capabilities?
                  </h3>
                </div>

                <div className="grid grid-cols-1 gap-2">
                  {[{
                  id: "tools",
                  label: "Interactive tools & calculators"
                }, {
                  id: "content",
                  label: "Content library with filters"
                }, {
                  id: "portal",
                  label: "Client portal / log-in journeys"
                }, {
                  id: "animations",
                  label: "Animations & micro-interactions"
                }, {
                  id: "seo",
                  label: "SEO & migration foundations"
                }, {
                  id: "analytics",
                  label: "Deep analytics & reporting"
                }].map(feature => {
                  const selected = state.features.includes(feature.id);
                  return <motion.button key={feature.id} type="button" onClick={() => {
                    const newFeatures = selected ? state.features.filter(f => f !== feature.id) : [...state.features, feature.id];
                    handleUpdate("features", newFeatures);
                  }} whileHover={{
                    x: 2
                  }} whileTap={{
                    scale: 0.995
                  }} className={`group relative flex items-center justify-between rounded-xl border px-4 py-3 text-left transition-all duration-300 ${selected ? "border-violet-500/30 bg-violet-500/5" : "border-slate-800/50 hover:border-slate-700/70 hover:bg-slate-900/20"}`}>
                        <span className={`text-sm transition-colors duration-300 ${selected ? "text-slate-200" : "text-slate-400"}`}>
                          {feature.label}
                        </span>
                        <div className={`flex h-4 w-4 items-center justify-center rounded border transition-all duration-300 ${selected ? "border-violet-400 bg-violet-400" : "border-slate-600"}`}>
                          {selected && <svg className="h-2.5 w-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>}
                        </div>
                      </motion.button>;
                })}
                </div>
              </motion.div>

              {/* Step 5 – Brand Personality */}
              <motion.div ref={el => {
              stepRefs.current[4] = el;
            }} initial={{
              opacity: 0,
              y: 20
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.8,
              delay: 0.5
            }} className="space-y-6 scroll-mt-48">
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-slate-600">
                    05 · Personality
                  </p>
                  <h3 className="mt-2 text-lg font-light tracking-wide text-slate-200">
                    How should it speak?
                  </h3>
                </div>

                <div className="space-y-6">
                  {/* Straight-talking to Polished */}
                  <div className="rounded-xl border border-slate-800/40 bg-slate-900/20 px-5 py-4">
                    <div className="mb-4 flex items-center justify-between">
                      <span className="text-xs text-slate-500">Straight-talking</span>
                      <span className="text-xs text-slate-500">Polished</span>
                    </div>
                    <input type="range" min="0" max="100" value={state.straightTalking} onChange={e => handleUpdate("straightTalking", parseInt(e.target.value))} className="w-full accent-sky-400 [&::-webkit-slider-runnable-track]:h-1 [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-slate-700 [&::-webkit-slider-thumb]:mt-[-4px] [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-sky-400" />
                  </div>

                  {/* Analytical to Story-led */}
                  <div className="rounded-xl border border-slate-800/40 bg-slate-900/20 px-5 py-4">
                    <div className="mb-4 flex items-center justify-between">
                      <span className="text-xs text-slate-500">Analytical</span>
                      <span className="text-xs text-slate-500">Story-led</span>
                    </div>
                    <input type="range" min="0" max="100" value={state.analytical} onChange={e => handleUpdate("analytical", parseInt(e.target.value))} className="w-full accent-emerald-400 [&::-webkit-slider-runnable-track]:h-1 [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-slate-700 [&::-webkit-slider-thumb]:mt-[-4px] [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-emerald-400" />
                  </div>

                  {/* Understated to Showpiece */}
                  <div className="rounded-xl border border-slate-800/40 bg-slate-900/20 px-5 py-4">
                    <div className="mb-4 flex items-center justify-between">
                      <span className="text-xs text-slate-500">Understated</span>
                      <span className="text-xs text-slate-500">Showpiece</span>
                    </div>
                    <input type="range" min="0" max="100" value={state.understated} onChange={e => handleUpdate("understated", parseInt(e.target.value))} className="w-full accent-violet-400 [&::-webkit-slider-runnable-track]:h-1 [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-slate-700 [&::-webkit-slider-thumb]:mt-[-4px] [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-violet-400" />
                  </div>

                  {/* Notes */}
                  <div className="rounded-xl border border-slate-800/40 bg-slate-900/20 px-5 py-4">
                    <label className="mb-3 block text-xs text-slate-500">
                      Anything we should know?
                    </label>
                  <textarea placeholder="Examples you like, competitors, banned phrases..." value={state.notes} onChange={e => handleUpdate("notes", e.target.value)} className="min-h-[100px] w-full resize-none rounded-lg border border-slate-800/50 bg-slate-950/50 px-4 py-3 text-sm text-slate-300 placeholder-slate-600 transition-colors focus:border-slate-700 focus:outline-none" />
                  </div>
                </div>
              </motion.div>

              {/* Step 6 – Summary & Submit */}
              <motion.div ref={el => {
              stepRefs.current[5] = el;
            }} initial={{
              opacity: 0,
              y: 20
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.8,
              delay: 0.1
            }} className="scroll-mt-48 rounded-2xl border border-slate-800/40 bg-slate-900/20 p-8">
                <PremiumSummary state={state} />
              </motion.div>
            </div>

            {/* RIGHT: Concept Canvas - Sticky Preview */}
            <div className="w-full lg:w-[55%]">
              <div className="lg:sticky lg:top-20 lg:h-[calc(100vh-5rem)] flex flex-col">
                {/* Preview Header */}
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-3 w-3 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_12px_rgba(52,211,153,0.5)]" />
                    <span className="text-[10px] uppercase tracking-[0.3em] text-slate-400">
                      Live Preview
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-slate-800/60 px-3 py-1.5 text-[10px] text-slate-400 border border-slate-700/50">
                      Step {activeStep + 1} of {STEPS.length}
                    </span>
                  </div>
                </div>
                
                <motion.div 
                  ref={previewRef} 
                  onMouseMove={handleMouseMove} 
                  onMouseLeave={handleMouseLeave} 
                  style={{
                    rotateX,
                    rotateY,
                    transformPerspective: 1200
                  }} 
                  className="relative flex-1"
                >
                  {/* Glow effect */}
                  <div className={`absolute -inset-6 rounded-[3rem] bg-gradient-to-br ${previewBg} opacity-30 blur-3xl transition-all duration-700`} />
                  
                  {/* Browser frame */}
                  <motion.div 
                    layout 
                    className={`relative h-full min-h-[500px] w-full rounded-[1.75rem] border border-white/[0.08] bg-gradient-to-br ${previewBg} shadow-2xl shadow-black/60 transition-all duration-700 overflow-hidden`}
                  >
                    {/* Browser chrome */}
                    <div className="flex items-center gap-2 px-5 py-3 border-b border-white/[0.04] bg-black/20">
                      <div className="flex gap-1.5">
                        <div className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
                        <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/60" />
                        <div className="h-2.5 w-2.5 rounded-full bg-green-500/60" />
                      </div>
                      <div className="flex-1 mx-4">
                        <div className="h-5 w-48 max-w-full rounded-md bg-white/[0.04] border border-white/[0.04] flex items-center px-2">
                          <span className="text-[9px] text-slate-500 truncate">yourwebsite.com</span>
                        </div>
                      </div>
                      <span className="rounded-full bg-white/[0.03] px-3 py-1 text-[9px] text-slate-400 backdrop-blur-sm border border-white/[0.04]">
                        {purposeLabel}
                      </span>
                    </div>
                    
                    {/* Content area */}
                    <div className="p-6 h-[calc(100%-52px)] overflow-hidden">
                      {/* Hero section */}
                      <motion.div 
                        layout 
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} 
                        className={`${heroHeight} relative overflow-hidden rounded-xl border border-white/[0.04] transition-all duration-500 ${state.energy === "bold" ? "bg-gradient-to-br from-white/[0.06] to-white/[0.02]" : "bg-black/30"}`}
                      >
                        <div className="absolute inset-0 p-5">
                          <div className="flex h-full items-center justify-between">
                            <div className="space-y-2.5">
                              <motion.div 
                                layout 
                                className={`rounded-full ${state.palette === "light" ? "bg-slate-800/80" : "bg-white/90"}`} 
                                style={{ height: 8, width: state.purpose === "lead_gen" ? 160 : 100 }} 
                              />
                              <motion.div 
                                layout 
                                className={`h-1.5 rounded-full ${state.palette === "light" ? "bg-slate-800/40" : "bg-white/40"}`} 
                                style={{ width: state.purpose === "authority" ? 180 : 120 }} 
                              />
                              <motion.div 
                                layout 
                                className={`h-1 rounded-full ${state.palette === "light" ? "bg-slate-800/20" : "bg-white/20"}`} 
                                style={{ width: 80 }} 
                              />
                            </div>
                            {state.purpose === "lead_gen" && (
                              <motion.div 
                                initial={{ opacity: 0, scale: 0.8 }} 
                                animate={{ opacity: 1, scale: 1 }} 
                                exit={{ opacity: 0, scale: 0.8 }} 
                                className="h-9 w-24 rounded-full bg-gradient-to-r from-sky-400 to-sky-500 shadow-[0_0_30px_rgba(56,189,248,0.5)]" 
                              />
                            )}
                          </div>
                        </div>
                        {/* Decorative gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/[0.02]" />
                      </motion.div>

                      {/* Content sections */}
                      <motion.div 
                        layout 
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} 
                        className={`mt-4 grid gap-3 ${state.density === "minimal" ? "grid-cols-2" : "grid-cols-3"}`}
                      >
                        {Array.from({ length: sectionCount }).map((_, idx) => (
                          <motion.div 
                            key={idx} 
                            layout 
                            initial={{ opacity: 0, y: 10 }} 
                            animate={{ opacity: 1, y: 0 }} 
                            transition={{ duration: 0.4, delay: idx * 0.05 }} 
                            className={`rounded-lg border border-white/[0.04] bg-gradient-to-br from-white/[0.03] to-transparent p-4 backdrop-blur-sm ${idx === 0 && state.structureSize === "expanded" ? "col-span-2" : ""}`}
                          >
                            <div className={`h-1.5 w-14 rounded-full ${state.palette === "light" ? "bg-slate-700/60" : "bg-white/60"}`} />
                            <div className={`mt-2.5 h-1 w-full rounded-full ${state.palette === "light" ? "bg-slate-700/20" : "bg-white/15"}`} />
                            <div className={`mt-1.5 h-1 w-4/5 rounded-full ${state.palette === "light" ? "bg-slate-700/10" : "bg-white/[0.08]"}`} />
                            <div className={`mt-1.5 h-1 w-3/5 rounded-full ${state.palette === "light" ? "bg-slate-700/10" : "bg-white/[0.05]"}`} />
                          </motion.div>
                        ))}
                      </motion.div>

                      {/* Feature indicators */}
                      {state.features.length > 0 && (
                        <motion.div 
                          initial={{ opacity: 0 }} 
                          animate={{ opacity: 1 }} 
                          className="mt-4 flex flex-wrap gap-2"
                        >
                          {state.features.includes("animations") && (
                            <div className="h-1.5 w-14 animate-pulse rounded-full bg-gradient-to-r from-violet-400/60 to-fuchsia-400/40" />
                          )}
                          {state.features.includes("tools") && (
                            <div className="h-7 w-24 rounded-lg border border-white/10 bg-white/[0.04] flex items-center justify-center">
                              <div className="h-1 w-12 rounded-full bg-white/20" />
                            </div>
                          )}
                          {state.features.includes("portal") && (
                            <div className="h-7 w-7 rounded-full border border-white/10 bg-white/[0.04] flex items-center justify-center">
                              <div className="h-3 w-3 rounded-full bg-white/20" />
                            </div>
                          )}
                          {state.features.includes("content") && (
                            <div className="h-5 w-16 rounded-md border border-white/10 bg-white/[0.04]" />
                          )}
                          {state.features.includes("analytics") && (
                            <div className="flex gap-0.5">
                              {[40, 60, 30, 80, 50].map((h, i) => (
                                <div key={i} className="w-1 rounded-full bg-emerald-400/40" style={{ height: h * 0.12 }} />
                              ))}
                            </div>
                          )}
                        </motion.div>
                      )}

                      {/* Status bar at bottom */}
                      <div className="absolute bottom-4 left-6 right-6">
                        <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg bg-black/30 backdrop-blur-sm p-3 border border-white/[0.04]">
                          <div className="flex flex-wrap gap-2">
                            <span className="rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 text-[9px] text-slate-400 font-medium">
                              {state.density === "minimal" ? "Minimal" : "Content-rich"}
                            </span>
                            <span className="rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 text-[9px] text-slate-400 font-medium">
                              {state.energy === "bold" ? "Bold" : "Calm"}
                            </span>
                            {state.features.length > 0 && (
                              <span className="rounded-full border border-violet-500/30 bg-violet-500/10 px-2.5 py-1 text-[9px] text-violet-300 font-medium">
                                {state.features.length} feature{state.features.length !== 1 ? "s" : ""}
                              </span>
                            )}
                          </div>
                          <span className="rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 text-[9px] text-slate-400 font-medium">
                            {state.structureSize === "lean" ? "Lean" : state.structureSize === "expanded" ? "Expanded" : "Standard"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Decorative elements */}
                    <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gradient-to-br from-white/10 via-transparent to-transparent blur-3xl opacity-20" />
                    <div className="pointer-events-none absolute -left-16 -bottom-16 h-48 w-48 rounded-full bg-gradient-to-tr from-sky-500/10 via-transparent to-transparent blur-3xl opacity-30" />
                  </motion.div>
                </motion.div>
                
                {/* Preview footer info */}
                <div className="mt-4 flex items-center justify-center gap-4 text-[10px] text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <div className="h-1.5 w-1.5 rounded-full bg-sky-400/60" />
                    Hover for 3D effect
                  </span>
                  <span className="flex items-center gap-1.5">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-400/60" />
                    Updates in real-time
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>;
};
export default WebStudioPage;