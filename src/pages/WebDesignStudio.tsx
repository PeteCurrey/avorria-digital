import React, { useState, useMemo, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { trackEvent } from "@/lib/tracking";
import { HeroCanvas } from "@/components/studio/HeroCanvas";

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
  notes: "",
};

const WebStudioPage: React.FC = () => {
  const [state, setState] = useState<StudioState>(defaultState);
  const previewRef = useRef<HTMLDivElement>(null);

  // Mouse tracking for parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 150 };
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

  const handleUpdate = <K extends keyof StudioState>(key: K, value: StudioState[K]) => {
    setState((prev) => ({ ...prev, [key]: value }));
    trackEvent("studio_option_changed", { option: key, value });
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
      element.scrollIntoView({ behavior: "smooth" });
    }
    trackEvent("studio_entered", {});
  };

  return (
    <>
      <Helmet>
        <title>Web Design Studio | Avorria</title>
        <meta name="description" content="Spec your next website like you'd spec a flagship. A guided studio for serious builds." />
      </Helmet>

      <div className="min-h-screen bg-slate-950 text-slate-50 selection:bg-sky-400/30">
        {/* HERO – Cinematic */}
        <section className="relative h-screen w-full overflow-hidden">
          <HeroCanvas className="absolute inset-0 h-full w-full" />

          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/30 via-transparent to-slate-950/30" />

          <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-6">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-2xl text-center"
            >
              <p className="text-[11px] font-medium uppercase tracking-[0.4em] text-sky-300/60">
                Avorria Web Studio
              </p>
              
              <h1 className="mt-8 text-5xl font-light tracking-tight text-white md:text-7xl">
                Spec your next website
                <span className="block mt-2 text-slate-300/90">like you'd spec a flagship.</span>
              </h1>
              
              <p className="mt-8 text-base text-slate-400/80 font-light tracking-wide">
                A guided studio for serious builds – no templates, no drag-and-drop.
              </p>

              <div className="mt-12 flex flex-col items-center gap-6">
                <motion.button
                  onClick={scrollToConfig}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="rounded-full bg-white px-10 py-4 text-sm font-medium text-slate-900 shadow-2xl shadow-white/10 transition-all duration-300 hover:shadow-white/20"
                >
                  Enter the Studio
                </motion.button>
                
                <Link
                  to="/services/web-design"
                  className="text-sm text-slate-500 transition-colors hover:text-slate-300"
                >
                  Back to Web Design
                </Link>
              </div>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2"
          >
            <div className="h-12 w-px bg-gradient-to-b from-transparent via-slate-500/50 to-transparent" />
          </motion.div>
        </section>

        {/* STUDIO CONFIGURATOR */}
        <section
          id="studio-config"
          className="relative min-h-screen bg-slate-950 px-6 py-24 md:px-12 md:py-32"
        >
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -top-1/2 left-1/4 h-96 w-96 rounded-full bg-sky-900/10 blur-[120px]" />
            <div className="absolute -bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-emerald-900/10 blur-[120px]" />
          </div>

          <div className="relative mx-auto flex max-w-7xl flex-col gap-16 lg:flex-row lg:gap-20">
            {/* LEFT: Controls */}
            <div className="w-full lg:w-[42%] space-y-16">
              <motion.header
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-slate-500">
                  Configuration
                </p>
                <h2 className="mt-4 text-3xl font-light tracking-tight text-white md:text-4xl">
                  Define the blueprint.
                </h2>
              </motion.header>

              {/* Step 1 – Purpose */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="space-y-6"
              >
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-slate-600">
                    01 · Purpose
                  </p>
                  <h3 className="mt-2 text-lg font-light tracking-wide text-slate-200">
                    What's the primary job?
                  </h3>
                </div>
                
                <div className="grid grid-cols-1 gap-3">
                  {[
                    { id: "lead_gen", label: "Lead generation", desc: "Convert visitors into pipeline." },
                    { id: "authority", label: "Authority hub", desc: "Deep, searchable expertise." },
                    { id: "saas", label: "Product marketing", desc: "Explain and convert to trial." },
                    { id: "platform", label: "Service platform", desc: "Marketing meets operations." },
                  ].map((option) => {
                    const selected = state.purpose === option.id;
                    return (
                      <motion.button
                        key={option.id}
                        type="button"
                        onClick={() => handleUpdate("purpose", option.id as Purpose)}
                        whileHover={{ x: 4 }}
                        whileTap={{ scale: 0.995 }}
                        className={`group relative rounded-2xl border px-5 py-4 text-left transition-all duration-500 ${
                          selected
                            ? "border-sky-500/30 bg-sky-500/5"
                            : "border-slate-800/60 hover:border-slate-700/80 hover:bg-slate-900/30"
                        }`}
                      >
                        {selected && (
                          <motion.div
                            layoutId="purpose-glow"
                            className="absolute inset-0 rounded-2xl bg-sky-400/5 shadow-[0_0_40px_rgba(56,189,248,0.1)]"
                            transition={{ duration: 0.4 }}
                          />
                        )}
                        <div className="relative flex items-center justify-between">
                          <div>
                            <span className={`text-sm font-medium transition-colors duration-300 ${selected ? "text-white" : "text-slate-300"}`}>
                              {option.label}
                            </span>
                            <p className="mt-1 text-xs text-slate-500">{option.desc}</p>
                          </div>
                          <div className={`h-2 w-2 rounded-full transition-all duration-300 ${
                            selected ? "bg-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.6)]" : "bg-slate-700"
                          }`} />
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>

              {/* Step 2 – Mood */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-6"
              >
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
                      {["minimal", "content_rich"].map((d) => (
                        <button
                          key={d}
                          type="button"
                          onClick={() => handleUpdate("density", d as MoodDensity)}
                          className={`rounded-full px-4 py-1.5 text-xs transition-all duration-300 ${
                            state.density === d
                              ? "bg-slate-700 text-white"
                              : "text-slate-500 hover:text-slate-300"
                          }`}
                        >
                          {d === "minimal" ? "Minimal" : "Rich"}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between rounded-xl border border-slate-800/40 bg-slate-900/20 px-5 py-3">
                    <span className="text-xs text-slate-400">Energy</span>
                    <div className="flex gap-1 rounded-full bg-slate-800/50 p-1">
                      {["calm", "bold"].map((e) => (
                        <button
                          key={e}
                          type="button"
                          onClick={() => handleUpdate("energy", e as MoodEnergy)}
                          className={`rounded-full px-4 py-1.5 text-xs capitalize transition-all duration-300 ${
                            state.energy === e
                              ? "bg-slate-700 text-white"
                              : "text-slate-500 hover:text-slate-300"
                          }`}
                        >
                          {e}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-xl border border-slate-800/40 bg-slate-900/20 px-5 py-4">
                    <span className="text-xs text-slate-400">Palette</span>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {[
                        { id: "dark", label: "Dark" },
                        { id: "light", label: "Light" },
                        { id: "mono", label: "Mono" },
                        { id: "gradient", label: "Gradient" },
                      ].map((opt) => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => handleUpdate("palette", opt.id as Palette)}
                          className={`rounded-full border px-4 py-1.5 text-xs transition-all duration-300 ${
                            state.palette === opt.id
                              ? "border-sky-500/40 bg-sky-500/10 text-sky-200"
                              : "border-slate-700/50 text-slate-500 hover:border-slate-600 hover:text-slate-400"
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Step 3 – Structure */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="space-y-6"
              >
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-slate-600">
                    03 · Structure
                  </p>
                  <h3 className="mt-2 text-lg font-light tracking-wide text-slate-200">
                    How expansive?
                  </h3>
                </div>

                <div className="flex flex-col gap-3">
                  {[
                    { id: "lean", label: "Lean", desc: "3–5 focused pages" },
                    { id: "standard", label: "Standard", desc: "6–10 pages" },
                    { id: "expanded", label: "Expanded", desc: "Full ecosystem" },
                  ].map((opt) => {
                    const selected = state.structureSize === opt.id;
                    return (
                      <motion.button
                        key={opt.id}
                        type="button"
                        onClick={() => handleUpdate("structureSize", opt.id as StructureSize)}
                        whileHover={{ x: 4 }}
                        whileTap={{ scale: 0.995 }}
                        className={`group relative rounded-2xl border px-5 py-4 text-left transition-all duration-500 ${
                          selected
                            ? "border-emerald-500/30 bg-emerald-500/5"
                            : "border-slate-800/60 hover:border-slate-700/80 hover:bg-slate-900/30"
                        }`}
                      >
                        {selected && (
                          <motion.div
                            layoutId="structure-glow"
                            className="absolute inset-0 rounded-2xl bg-emerald-400/5 shadow-[0_0_40px_rgba(52,211,153,0.1)]"
                            transition={{ duration: 0.4 }}
                          />
                        )}
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
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>

              {/* Step 4 – Features */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="space-y-6"
              >
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-slate-600">
                    04 · Features
                  </p>
                  <h3 className="mt-2 text-lg font-light tracking-wide text-slate-200">
                    Advanced capabilities?
                  </h3>
                </div>

                <div className="grid grid-cols-1 gap-2">
                  {[
                    { id: "tools", label: "Interactive tools & calculators" },
                    { id: "content", label: "Content library with filters" },
                    { id: "portal", label: "Client portal / log-in journeys" },
                    { id: "animations", label: "Animations & micro-interactions" },
                    { id: "seo", label: "SEO & migration foundations" },
                    { id: "analytics", label: "Deep analytics & reporting" },
                  ].map((feature) => {
                    const selected = state.features.includes(feature.id);
                    return (
                      <motion.button
                        key={feature.id}
                        type="button"
                        onClick={() => {
                          const newFeatures = selected
                            ? state.features.filter((f) => f !== feature.id)
                            : [...state.features, feature.id];
                          handleUpdate("features", newFeatures);
                        }}
                        whileHover={{ x: 2 }}
                        whileTap={{ scale: 0.995 }}
                        className={`group relative flex items-center justify-between rounded-xl border px-4 py-3 text-left transition-all duration-300 ${
                          selected
                            ? "border-violet-500/30 bg-violet-500/5"
                            : "border-slate-800/50 hover:border-slate-700/70 hover:bg-slate-900/20"
                        }`}
                      >
                        <span className={`text-sm transition-colors duration-300 ${selected ? "text-slate-200" : "text-slate-400"}`}>
                          {feature.label}
                        </span>
                        <div className={`flex h-4 w-4 items-center justify-center rounded border transition-all duration-300 ${
                          selected
                            ? "border-violet-400 bg-violet-400"
                            : "border-slate-600"
                        }`}>
                          {selected && (
                            <svg className="h-2.5 w-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>

              {/* Step 5 – Brand Personality */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="space-y-6"
              >
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
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={state.straightTalking}
                      onChange={(e) => handleUpdate("straightTalking", parseInt(e.target.value))}
                      className="w-full accent-sky-400 [&::-webkit-slider-runnable-track]:h-1 [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-slate-700 [&::-webkit-slider-thumb]:mt-[-4px] [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-sky-400"
                    />
                  </div>

                  {/* Analytical to Story-led */}
                  <div className="rounded-xl border border-slate-800/40 bg-slate-900/20 px-5 py-4">
                    <div className="mb-4 flex items-center justify-between">
                      <span className="text-xs text-slate-500">Analytical</span>
                      <span className="text-xs text-slate-500">Story-led</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={state.analytical}
                      onChange={(e) => handleUpdate("analytical", parseInt(e.target.value))}
                      className="w-full accent-emerald-400 [&::-webkit-slider-runnable-track]:h-1 [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-slate-700 [&::-webkit-slider-thumb]:mt-[-4px] [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-emerald-400"
                    />
                  </div>

                  {/* Understated to Showpiece */}
                  <div className="rounded-xl border border-slate-800/40 bg-slate-900/20 px-5 py-4">
                    <div className="mb-4 flex items-center justify-between">
                      <span className="text-xs text-slate-500">Understated</span>
                      <span className="text-xs text-slate-500">Showpiece</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={state.understated}
                      onChange={(e) => handleUpdate("understated", parseInt(e.target.value))}
                      className="w-full accent-violet-400 [&::-webkit-slider-runnable-track]:h-1 [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-slate-700 [&::-webkit-slider-thumb]:mt-[-4px] [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-violet-400"
                    />
                  </div>

                  {/* Notes */}
                  <div className="rounded-xl border border-slate-800/40 bg-slate-900/20 px-5 py-4">
                    <label className="mb-3 block text-xs text-slate-500">
                      Anything we should know?
                    </label>
                    <textarea
                      placeholder="Examples you like, competitors, banned phrases..."
                      value={state.notes}
                      onChange={(e) => handleUpdate("notes", e.target.value)}
                      className="min-h-[100px] w-full resize-none rounded-lg border border-slate-800/50 bg-slate-950/50 px-4 py-3 text-sm text-slate-300 placeholder-slate-600 transition-colors focus:border-slate-700 focus:outline-none"
                    />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* RIGHT: Concept Canvas */}
            <div className="w-full lg:w-[58%]">
              <div className="sticky top-24">
                <motion.div
                  ref={previewRef}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  style={{
                    rotateX,
                    rotateY,
                    transformPerspective: 1200,
                  }}
                  className="relative"
                >
                  <div className={`absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br ${previewBg} opacity-20 blur-2xl transition-all duration-700`} />
                  
                  <motion.div
                    layout
                    className={`relative h-[560px] w-full rounded-[2rem] border border-white/[0.06] bg-gradient-to-br ${previewBg} p-8 shadow-2xl shadow-black/50 transition-all duration-700 md:h-[640px]`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase tracking-[0.25em] text-slate-500">
                        Concept Canvas
                      </span>
                      <span className="rounded-full bg-white/[0.03] px-3 py-1 text-[10px] text-slate-400 backdrop-blur-sm">
                        {purposeLabel}
                      </span>
                    </div>

                    <motion.div
                      layout
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className={`mt-8 ${heroHeight} relative overflow-hidden rounded-2xl border border-white/[0.04] transition-all duration-500 ${
                        state.energy === "bold" ? "bg-white/[0.03]" : "bg-black/20"
                      }`}
                    >
                      <div className="absolute inset-0 p-6">
                        <div className="flex h-full items-center justify-between">
                          <div className="space-y-3">
                            <motion.div 
                              layout
                              className={`rounded-full ${state.palette === "light" ? "bg-slate-800/80" : "bg-white/80"}`}
                              style={{ height: 10, width: state.purpose === "lead_gen" ? 180 : 120 }}
                            />
                            <motion.div 
                              layout
                              className={`h-2 rounded-full ${state.palette === "light" ? "bg-slate-800/40" : "bg-white/30"}`}
                              style={{ width: state.purpose === "authority" ? 200 : 140 }}
                            />
                          </div>
                          {state.purpose === "lead_gen" && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.8 }}
                              className="h-10 w-28 rounded-full bg-sky-400/80 shadow-[0_0_30px_rgba(56,189,248,0.4)]"
                            />
                          )}
                        </div>
                      </div>
                    </motion.div>

                    <motion.div 
                      layout
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className={`mt-4 grid gap-3 ${
                        state.density === "minimal" ? "grid-cols-2" : "grid-cols-3"
                      }`}
                    >
                      {Array.from({ length: sectionCount }).map((_, idx) => (
                        <motion.div
                          key={idx}
                          layout
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: idx * 0.05 }}
                          className={`rounded-xl border border-white/[0.03] bg-black/20 p-5 backdrop-blur-sm ${
                            idx === 0 && state.structureSize === "expanded" ? "col-span-2" : ""
                          }`}
                        >
                          <div className={`h-2 w-16 rounded-full ${state.palette === "light" ? "bg-slate-700/60" : "bg-white/50"}`} />
                          <div className={`mt-3 h-1.5 w-full rounded-full ${state.palette === "light" ? "bg-slate-700/20" : "bg-white/10"}`} />
                          <div className={`mt-2 h-1.5 w-3/4 rounded-full ${state.palette === "light" ? "bg-slate-700/10" : "bg-white/[0.06]"}`} />
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
                          <div className="h-1.5 w-12 animate-pulse rounded-full bg-violet-400/40" />
                        )}
                        {state.features.includes("tools") && (
                          <div className="h-6 w-20 rounded-lg border border-white/10 bg-white/[0.03]" />
                        )}
                        {state.features.includes("portal") && (
                          <div className="h-6 w-6 rounded-full border border-white/10 bg-white/[0.03]" />
                        )}
                      </motion.div>
                    )}

                    <div className="absolute bottom-8 left-8 right-8">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex flex-wrap gap-2">
                          <span className="rounded-full border border-white/[0.06] bg-white/[0.02] px-3 py-1 text-[10px] text-slate-500">
                            {state.density === "minimal" ? "Minimal" : "Content-rich"}
                          </span>
                          <span className="rounded-full border border-white/[0.06] bg-white/[0.02] px-3 py-1 text-[10px] text-slate-500">
                            {state.energy === "bold" ? "Bold" : "Calm"}
                          </span>
                          {state.features.length > 0 && (
                            <span className="rounded-full border border-violet-500/20 bg-violet-500/5 px-3 py-1 text-[10px] text-violet-300/70">
                              {state.features.length} feature{state.features.length !== 1 ? "s" : ""}
                            </span>
                          )}
                        </div>
                        <span className="rounded-full border border-white/[0.06] bg-white/[0.02] px-3 py-1 text-[10px] text-slate-500">
                          {state.structureSize === "lean" ? "Lean" : state.structureSize === "expanded" ? "Expanded" : "Standard"}
                        </span>
                      </div>
                    </div>

                    <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gradient-to-br from-white/10 via-transparent to-transparent blur-3xl opacity-30" />
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default WebStudioPage;
