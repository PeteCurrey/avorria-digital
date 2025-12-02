import React, { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { trackEvent } from "@/lib/tracking";

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
};

const defaultState: StudioState = {
  purpose: null,
  density: "minimal",
  energy: "calm",
  palette: "dark",
  structureSize: "standard",
};

const WebStudioPage: React.FC = () => {
  const [state, setState] = useState<StudioState>(defaultState);

  const handleUpdate = <K extends keyof StudioState>(key: K, value: StudioState[K]) => {
    setState((prev) => ({ ...prev, [key]: value }));
    trackEvent("studio_option_changed", { option: key, value });
  };

  const previewClasses = useMemo(() => {
    const base = "relative h-full w-full rounded-3xl border border-white/10 p-6 overflow-hidden transition-all duration-500";
    const bg =
      state.palette === "dark"
        ? "bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800"
        : state.palette === "light"
        ? "bg-gradient-to-br from-slate-50 via-white to-slate-100"
        : state.palette === "mono"
        ? "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
        : "bg-gradient-to-br from-purple-600 via-sky-500 to-emerald-400";

    const energyBorder =
      state.energy === "bold" ? "shadow-[0_0_60px_rgba(56,189,248,0.45)] scale-[1.01]" : "shadow-[0_0_40px_rgba(15,23,42,0.7)]";

    return `${base} ${bg} ${energyBorder}`;
  }, [state.energy, state.palette]);

  const blockCount = useMemo(() => {
    if (state.structureSize === "lean") return state.density === "minimal" ? 3 : 5;
    if (state.structureSize === "expanded") return state.density === "minimal" ? 6 : 10;
    return state.density === "minimal" ? 4 : 8;
  }, [state.structureSize, state.density]);

  const purposeLabel = useMemo(() => {
    switch (state.purpose) {
      case "lead_gen":
        return "Lead-generation machine";
      case "authority":
        return "Authority & content hub";
      case "saas":
        return "Product / SaaS story";
      case "platform":
        return "Service platform & portal";
      default:
        return "Your next website, designed properly";
    }
  }, [state.purpose]);

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
        <title>Web Design Studio | Configure Your Website | Avorria</title>
        <meta name="description" content="Configure your next website like you're speccing an S-Class. A guided studio experience to define the feel, shape and ambition of your next site." />
      </Helmet>

      <div className="min-h-screen bg-slate-950 text-slate-50">
        {/* HERO – full-screen video */}
        <section className="relative h-screen w-full overflow-hidden">
          <video
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster="/placeholder.svg"
          >
            {/* Replace with a real video source when available */}
            <source src="/studio/avorria-web-studio.mp4" type="video/mp4" />
          </video>

          {/* Fallback gradient background when video is not available */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800" />
          
          {/* Animated gradient overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-sky-900/30 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-emerald-900/20 via-transparent to-transparent" />

          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-900/10" />

          <div className="relative z-10 flex h-full w-full items-center justify-center px-6">
            <div className="max-w-3xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-sky-300/70">
                Avorria Web Studio
              </p>
              <h1 className="mt-4 text-4xl md:text-6xl font-semibold tracking-tight text-slate-50">
                Configure your next website like you're speccing an S-Class.
              </h1>
              <p className="mt-5 text-base md:text-lg text-slate-300/80">
                A guided studio experience to define the feel, shape and ambition of your next site.
                No templates. No drag-and-drop. Just a blueprint for us to build something serious.
              </p>

              <div className="mt-8 flex items-center justify-center gap-4 flex-wrap">
                <button
                  onClick={scrollToConfig}
                  className="inline-flex items-center justify-center rounded-full border border-sky-400/80 bg-sky-400/90 px-8 py-3 text-sm font-semibold text-slate-900 shadow-lg shadow-sky-400/40 transition hover:bg-sky-300 hover:scale-105"
                >
                  Enter the Studio
                </button>
                <Link
                  to="/services/web-design"
                  className="text-sm font-medium text-slate-200/80 hover:text-slate-50/100 transition"
                >
                  Back to web design overview
                </Link>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <div className="h-10 w-6 rounded-full border-2 border-slate-400/50 flex items-start justify-center p-1">
              <div className="h-2 w-1 rounded-full bg-slate-400/70 animate-pulse" />
            </div>
          </div>
        </section>

        {/* STUDIO CONFIGURATOR */}
        <section
          id="studio-config"
          className="relative border-t border-slate-800 bg-slate-950/95 px-4 py-12 md:px-8 md:py-16"
        >
          <div className="mx-auto flex max-w-6xl flex-col gap-10 md:flex-row">
            {/* LEFT: Steps / controls */}
            <div className="w-full md:w-[45%] space-y-8">
              <header>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-sky-300/70">
                  Guided configuration
                </p>
                <h2 className="mt-3 text-2xl md:text-3xl font-semibold text-slate-50">
                  Let's sketch the blueprint.
                </h2>
                <p className="mt-3 text-sm md:text-base text-slate-400">
                  Answer a few sharp questions and watch the concept evolve on the right. When you're done,
                  you'll send us a blueprint for a site that actually fits how your business works.
                </p>
              </header>

              {/* Step 1 – Purpose */}
              <div className="space-y-3">
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
                  Step 1 · Purpose
                </p>
                <h3 className="text-sm font-semibold text-slate-100">
                  What job does this website need to do first and foremost?
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  {[
                    { id: "lead_gen", label: "Lead-generation site", desc: "Turn qualified visitors into pipeline." },
                    {
                      id: "authority",
                      label: "Authority & content hub",
                      desc: "Show expertise with deep, searchable content.",
                    },
                    {
                      id: "saas",
                      label: "Product / SaaS marketing",
                      desc: "Explain the product and move people to trial or demo.",
                    },
                    {
                      id: "platform",
                      label: "Service platform / portal",
                      desc: "Blend marketing with client log-in and operations.",
                    },
                  ].map((option) => {
                    const selected = state.purpose === option.id;
                    return (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => handleUpdate("purpose", option.id as Purpose)}
                        className={[
                          "group rounded-2xl border px-4 py-3 text-left transition-all duration-300",
                          selected
                            ? "border-sky-400/90 bg-sky-400/10 shadow-[0_0_35px_rgba(56,189,248,0.35)]"
                            : "border-slate-700/80 hover:border-sky-400/60 hover:bg-slate-900/60",
                        ].join(" ")}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-sm font-semibold text-slate-50">{option.label}</span>
                          <span
                            className={[
                              "h-2 w-2 rounded-full border transition-all duration-300",
                              selected ? "border-sky-400 bg-sky-400" : "border-slate-500",
                            ].join(" ")}
                          />
                        </div>
                        <p className="mt-1 text-xs text-slate-400">{option.desc}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2 – Look & mood */}
              <div className="space-y-3">
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
                  Step 2 · Look & mood
                </p>
                <h3 className="text-sm font-semibold text-slate-100">
                  How should it feel at a glance?
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {/* Density */}
                  <div className="space-y-2 rounded-2xl border border-slate-700/80 bg-slate-900/70 p-3">
                    <p className="text-xs font-medium text-slate-300">Layout density</p>
                    <div className="flex gap-2 text-[11px]">
                      <button
                        type="button"
                        onClick={() => handleUpdate("density", "minimal")}
                        className={[
                          "flex-1 rounded-full px-2 py-1 text-center transition-all duration-300",
                          state.density === "minimal"
                            ? "bg-slate-100 text-slate-900"
                            : "bg-slate-800 text-slate-300 hover:bg-slate-700",
                        ].join(" ")}
                      >
                        Minimal
                      </button>
                      <button
                        type="button"
                        onClick={() => handleUpdate("density", "content_rich")}
                        className={[
                          "flex-1 rounded-full px-2 py-1 text-center transition-all duration-300",
                          state.density === "content_rich"
                            ? "bg-slate-100 text-slate-900"
                            : "bg-slate-800 text-slate-300 hover:bg-slate-700",
                        ].join(" ")}
                      >
                        Content-rich
                      </button>
                    </div>
                  </div>

                  {/* Energy */}
                  <div className="space-y-2 rounded-2xl border border-slate-700/80 bg-slate-900/70 p-3">
                    <p className="text-xs font-medium text-slate-300">Energy</p>
                    <div className="flex gap-2 text-[11px]">
                      <button
                        type="button"
                        onClick={() => handleUpdate("energy", "calm")}
                        className={[
                          "flex-1 rounded-full px-2 py-1 text-center transition-all duration-300",
                          state.energy === "calm"
                            ? "bg-slate-100 text-slate-900"
                            : "bg-slate-800 text-slate-300 hover:bg-slate-700",
                        ].join(" ")}
                      >
                        Calm
                      </button>
                      <button
                        type="button"
                        onClick={() => handleUpdate("energy", "bold")}
                        className={[
                          "flex-1 rounded-full px-2 py-1 text-center transition-all duration-300",
                          state.energy === "bold"
                            ? "bg-slate-100 text-slate-900"
                            : "bg-slate-800 text-slate-300 hover:bg-slate-700",
                        ].join(" ")}
                      >
                        Bold
                      </button>
                    </div>
                  </div>
                </div>

                {/* Palette */}
                <div className="space-y-2">
                  <p className="text-xs font-medium text-slate-300">Palette direction</p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { id: "light", label: "Light / airy" },
                      { id: "dark", label: "Dark / cinematic" },
                      { id: "mono", label: "Monochrome + accent" },
                      { id: "gradient", label: "Gradient-forward" },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => handleUpdate("palette", opt.id as Palette)}
                        className={[
                          "rounded-full border px-3 py-1 text-xs transition-all duration-300",
                          state.palette === opt.id
                            ? "border-sky-400 bg-sky-400/10 text-sky-100"
                            : "border-slate-700 text-slate-300 hover:border-sky-400/70 hover:bg-slate-900",
                        ].join(" ")}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Step 3 – Structure size */}
              <div className="space-y-3">
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
                  Step 3 · Structure
                </p>
                <h3 className="text-sm font-semibold text-slate-100">
                  How big does this thing really need to be?
                </h3>
                <div className="flex flex-col gap-3">
                  {[
                    {
                      id: "lean",
                      label: "Lean",
                      desc: "Home + 3–5 core pages. Focused and fast to launch.",
                    },
                    {
                      id: "standard",
                      label: "Standard",
                      desc: "6–10 pages with room for services, proof and content.",
                    },
                    {
                      id: "expanded",
                      label: "Expanded",
                      desc: "Multiple services, locations, resources and tools.",
                    },
                  ].map((opt) => {
                    const selected = state.structureSize === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => handleUpdate("structureSize", opt.id as StructureSize)}
                        className={[
                          "rounded-2xl border px-4 py-3 text-left transition-all duration-300",
                          selected
                            ? "border-emerald-400/90 bg-emerald-400/10 shadow-[0_0_32px_rgba(52,211,153,0.4)]"
                            : "border-slate-700/80 hover:border-emerald-400/70 hover:bg-slate-900/60",
                        ].join(" ")}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold text-slate-50">{opt.label}</span>
                          <span className="text-[11px] text-slate-300/80 uppercase tracking-[0.16em]">
                            {opt.id.toUpperCase()}
                          </span>
                        </div>
                        <p className="mt-1 text-xs text-slate-400">{opt.desc}</p>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* RIGHT: Live preview */}
            <div className="w-full md:w-[55%]">
              <div className="sticky top-16 h-[520px] md:h-[600px]">
                <div className={previewClasses}>
                  {/* Overlay label */}
                  <div className="flex items-center justify-between text-xs text-slate-200/80">
                    <span className="uppercase tracking-[0.2em] text-slate-300/70">
                      Concept canvas
                    </span>
                    <span className="rounded-full bg-black/30 px-3 py-1 text-[11px] text-slate-100/80 backdrop-blur">
                      {purposeLabel}
                    </span>
                  </div>

                  {/* Abstract hero */}
                  <div className="mt-5 flex flex-col gap-3">
                    <div
                      className={[
                        "relative overflow-hidden rounded-2xl border border-white/10 p-4 transition-all duration-500",
                        state.energy === "bold" ? "bg-white/5" : "bg-black/20",
                      ].join(" ")}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div className="space-y-2">
                          <div className="h-3 w-28 rounded-full bg-white/80" />
                          <div className="h-2 w-40 rounded-full bg-white/40" />
                        </div>
                        <div className="h-8 w-24 rounded-full bg-sky-400/90 shadow-[0_0_32px_rgba(56,189,248,0.5)]" />
                      </div>
                      <div className="mt-4 flex gap-2">
                        <div className="h-2 flex-1 rounded-full bg-white/15" />
                        <div className="h-2 flex-[0.7] rounded-full bg-white/10" />
                      </div>
                    </div>

                    {/* Abstract body blocks */}
                    <div
                      className={[
                        "grid gap-2 transition-all duration-500",
                        state.density === "minimal" ? "grid-cols-2" : "grid-cols-3",
                      ].join(" ")}
                    >
                      {Array.from({ length: blockCount }).map((_, idx) => (
                        <div
                          key={idx}
                          className="rounded-xl border border-white/[0.08] bg-black/25 p-3 backdrop-blur-sm transition-all duration-300 hover:border-white/20"
                        >
                          <div className="h-2 w-10 rounded-full bg-white/60" />
                          <div className="mt-2 h-1.5 w-full rounded-full bg-white/[0.12]" />
                          <div className="mt-1 h-1.5 w-[70%] rounded-full bg-white/[0.08]" />
                        </div>
                      ))}
                    </div>

                    {/* Palette + mood hint */}
                    <div className="mt-4 flex items-center justify-between text-[11px] text-slate-200/80 flex-wrap gap-2">
                      <span className="flex gap-2 flex-wrap">
                        <span className="rounded-full bg-slate-900/60 px-3 py-1 backdrop-blur">
                          {state.density === "minimal" ? "Minimal layout" : "Content-rich layout"}
                        </span>
                        <span className="rounded-full bg-slate-900/60 px-3 py-1 backdrop-blur">
                          {state.energy === "bold" ? "High-energy" : "Calm"} feel
                        </span>
                      </span>
                      <span className="rounded-full bg-slate-900/60 px-3 py-1 backdrop-blur">
                        {state.structureSize === "lean"
                          ? "Lean footprint"
                          : state.structureSize === "expanded"
                          ? "Expanded footprint"
                          : "Balanced footprint"}
                      </span>
                    </div>
                  </div>

                  {/* Glass reflection accent */}
                  <div className="pointer-events-none absolute -right-16 -top-24 h-48 w-48 rotate-12 rounded-full bg-gradient-to-br from-white/20 via-white/0 to-white/0 blur-3xl opacity-40" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default WebStudioPage;
