"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Video, Bot, LayoutDashboard, ChevronRight, Play, Loader2, CheckCircle, Sparkles } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";

// ─── AI Video Generator Demo ───────────────────────────────────────────────
// Prompt options — replace labels with your actual prompts later
const promptOptions = [
  { id: "prompt-1", label: "Placeholder prompt 1", videoUrl: "" },
  { id: "prompt-2", label: "Placeholder prompt 2", videoUrl: "" },
  { id: "prompt-3", label: "Placeholder prompt 3", videoUrl: "" },
  { id: "prompt-4", label: "Placeholder prompt 4", videoUrl: "" },
  { id: "prompt-5", label: "Placeholder prompt 5", videoUrl: "" },
  { id: "prompt-6", label: "Placeholder prompt 6", videoUrl: "" },
];

function AIVideoDemo() {
  const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "generating" | "done">("idle");
  const [generatedVideo, setGeneratedVideo] = useState<string | null>(null);

  const handleGenerate = () => {
    if (!selectedPrompt) return;
    setStatus("generating");
    setGeneratedVideo(null);

    const chosen = promptOptions.find((p) => p.id === selectedPrompt);

    // Simulate generation delay
    setTimeout(() => {
      setGeneratedVideo(chosen?.videoUrl || "");
      setStatus("done");
    }, 4000);
  };

  return (
    <div className="glass-card p-8 md:p-10">
      <div className="flex items-center gap-3 mb-6">
        <Video className="w-6 h-6 text-gold" />
        <h3 className="font-serif text-2xl text-gold-light">AI Video Generator</h3>
      </div>
      <p className="text-text-muted text-sm mb-6">
        Choose a prompt and watch as our AI generates the video in moments.
      </p>

      {/* Prompt Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
        {promptOptions.map((option) => (
          <button
            key={option.id}
            onClick={() => { setSelectedPrompt(option.id); setStatus("idle"); }}
            className={`p-4 rounded-xl border text-left transition-all ${
              selectedPrompt === option.id
                ? "border-gold bg-gold/10 text-gold-light"
                : "border-navy-700 bg-navy-900/50 text-text-muted hover:border-gold/50"
            }`}
          >
            <div className="text-sm font-medium">{option.label}</div>
          </button>
        ))}
      </div>

      {/* Generate Button */}
      <div className="mb-6">
        <button
          onClick={handleGenerate}
          disabled={!selectedPrompt || status === "generating"}
          className="w-full sm:w-auto bg-gradient-to-r from-gold-light to-gold-dark text-navy-950 px-8 py-3 rounded-xl font-semibold transition-all hover:scale-105 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
        >
          {status === "generating" ? (
            <>
              <Loader2 size={16} className="animate-spin" /> Generating
            </>
          ) : (
            <>
              <Play size={16} /> Generate Video
            </>
          )}
        </button>
      </div>

      {/* Video Output Area */}
      <div className="relative rounded-xl border border-navy-700 bg-navy-950/80 overflow-hidden min-h-[300px] md:min-h-[400px] flex items-center justify-center">
        {status === "idle" && (
          <div className="text-center text-text-muted/50 p-8">
            <Video className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-sm">Select a prompt above and hit Generate</p>
          </div>
        )}

        {status === "generating" && (
          <div className="text-center p-8">
            <div className="relative w-16 h-16 mx-auto mb-4">
              <div className="absolute inset-0 rounded-full border-2 border-gold/20" />
              <div className="absolute inset-0 rounded-full border-2 border-t-gold animate-spin" />
              <Sparkles className="absolute inset-0 m-auto w-6 h-6 text-gold" />
            </div>
            <p className="text-gold-light font-medium mb-2">Generating your video...</p>
            <div className="flex items-center justify-center gap-6 text-xs text-text-muted mt-4">
              <span className="flex items-center gap-1"><CheckCircle size={12} className="text-gold" /> Analyzing prompt</span>
              <span className="flex items-center gap-1"><Loader2 size={12} className="animate-spin text-gold" /> Rendering frames</span>
              <span className="flex items-center gap-1 opacity-40"><ChevronRight size={12} /> Finalizing</span>
            </div>
          </div>
        )}

        {status === "done" && (
          <div className="w-full h-full min-h-[300px] md:min-h-[400px] flex items-center justify-center">
            {generatedVideo ? (
              <video
                src={generatedVideo}
                controls
                autoPlay
                className="w-full h-full object-cover rounded-xl"
              />
            ) : (
              <div className="text-center p-8">
                <CheckCircle className="w-12 h-12 text-gold mx-auto mb-3" />
                <p className="text-gold-light font-medium mb-1">Video Generated!</p>
                <p className="text-text-muted text-sm">
                  Video preview slot — add pre-generated video URLs to display here.
                </p>
                <button
                  onClick={() => { setStatus("idle"); setSelectedPrompt(null); }}
                  className="mt-4 text-gold text-sm hover:text-gold-light transition-colors"
                >
                  Generate another
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Booking System Embed Slot ──────────────────────────────────────────────
function BookingSystemDemo() {
  return (
    <div className="glass-card p-8 md:p-10">
      <div className="flex items-center gap-3 mb-6">
        <Calendar className="w-6 h-6 text-gold" />
        <h3 className="font-serif text-2xl text-gold-light">Smart Booking System</h3>
      </div>
      <p className="text-text-muted text-sm mb-6">
        An intelligent booking system powered by AI — automated scheduling, conflict detection,
        and smart availability management.
      </p>

      {/* Embed Slot — paste your booking system frontend here */}
      <div
        id="booking-system-embed"
        className="relative rounded-xl border-2 border-dashed border-navy-700 bg-navy-950/50 min-h-[500px] flex items-center justify-center"
      >
        <div className="text-center text-text-muted/50 p-8">
          <Calendar className="w-16 h-16 mx-auto mb-4 opacity-20" />
          <p className="text-lg font-medium text-text-muted/70 mb-2">Booking System</p>
          <p className="text-sm max-w-md mx-auto">
            Interactive booking interface will be embedded here.
            Replace this placeholder with your booking system component or iframe.
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Additional Product Slot ────────────────────────────────────────────────
function ProductSlot({ title, description, icon }: { title: string; description: string; icon: React.ReactNode }) {
  return (
    <div className="glass-card p-8 md:p-10">
      <div className="flex items-center gap-3 mb-6">
        {icon}
        <h3 className="font-serif text-2xl text-gold-light">{title}</h3>
      </div>
      <p className="text-text-muted text-sm mb-6">{description}</p>

      {/* Embed Slot */}
      <div className="relative rounded-xl border-2 border-dashed border-navy-700 bg-navy-950/50 min-h-[400px] flex items-center justify-center">
        <div className="text-center text-text-muted/50 p-8">
          <LayoutDashboard className="w-16 h-16 mx-auto mb-4 opacity-20" />
          <p className="text-lg font-medium text-text-muted/70 mb-2">{title}</p>
          <p className="text-sm max-w-md mx-auto">
            Interactive demo will be embedded here.
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Main Demo Page ─────────────────────────────────────────────────────────
export default function DemoPage() {
  return (
    <div className="relative z-10 py-24 px-6">
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <motion.h1
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="font-serif text-4xl md:text-6xl mb-6"
        >
          Try Our <span className="gold-text">Products</span>
        </motion.h1>
        <motion.p
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="text-text-muted text-lg max-w-2xl mx-auto"
        >
          Experience our AI-powered solutions firsthand. Interact with live demos
          of the products we build for enterprises.
        </motion.p>
      </div>

      {/* Demo Sections */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-5xl mx-auto flex flex-col gap-12"
      >
        {/* AI Video Generator */}
        <motion.div variants={fadeInUp}>
          <AIVideoDemo />
        </motion.div>

        {/* Booking System */}
        <motion.div variants={fadeInUp}>
          <BookingSystemDemo />
        </motion.div>

        {/* Additional Product Slots */}
        <motion.div variants={fadeInUp}>
          <ProductSlot
            title="AI Chat Assistant"
            description="A context-aware conversational AI that understands your business documents and answers questions in real-time."
            icon={<Bot className="w-6 h-6 text-gold" />}
          />
        </motion.div>

        <motion.div variants={fadeInUp}>
          <ProductSlot
            title="Analytics Dashboard"
            description="Real-time data visualization with predictive insights — see how our AI dashboards turn raw data into actionable intelligence."
            icon={<LayoutDashboard className="w-6 h-6 text-gold" />}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
