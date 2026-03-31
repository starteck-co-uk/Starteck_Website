"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Calendar, Video, Bot, LayoutDashboard, ChevronRight, Play, Loader2,
  CheckCircle, Sparkles, Send, Clock, User, TrendingUp, Activity,
  Shield, Database, ArrowUpRight, ArrowDownRight, ChevronLeft,
} from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";

// ─── AI Video Generator Demo ───────────────────────────────────────────────
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
      <div className="mb-6">
        <button
          onClick={handleGenerate}
          disabled={!selectedPrompt || status === "generating"}
          className="w-full sm:w-auto bg-gradient-to-r from-gold-light to-gold-dark text-navy-950 px-8 py-3 rounded-xl font-semibold transition-all hover:scale-105 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
        >
          {status === "generating" ? (
            <><Loader2 size={16} className="animate-spin" /> Generating</>
          ) : (
            <><Play size={16} /> Generate Video</>
          )}
        </button>
      </div>
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
              <video src={generatedVideo} controls autoPlay className="w-full h-full object-cover rounded-xl" />
            ) : (
              <div className="text-center p-8">
                <CheckCircle className="w-12 h-12 text-gold mx-auto mb-3" />
                <p className="text-gold-light font-medium mb-1">Video Generated!</p>
                <p className="text-text-muted text-sm">Video preview slot — add pre-generated video URLs to display here.</p>
                <button onClick={() => { setStatus("idle"); setSelectedPrompt(null); }} className="mt-4 text-gold text-sm hover:text-gold-light transition-colors">
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

// ─── Smart Booking System ───────────────────────────────────────────────────
const timeSlots = ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30"];
const services = [
  { id: "consultation", label: "AI Strategy Consultation", duration: "30 min", icon: "💡" },
  { id: "demo", label: "Product Demo", duration: "45 min", icon: "🖥️" },
  { id: "technical", label: "Technical Assessment", duration: "60 min", icon: "⚙️" },
  { id: "workshop", label: "AI Workshop", duration: "90 min", icon: "🎓" },
];

function BookingSystemDemo() {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [booked, setBooked] = useState(false);

  const today = new Date();
  const days = Array.from({ length: 14 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i + 1);
    return d;
  });

  // Simulate some slots as unavailable
  const unavailable = new Set(["09:00", "11:00", "14:00"]);

  const handleBook = () => {
    if (selectedService && selectedDate !== null && selectedTime) {
      setBooked(true);
    }
  };

  const handleReset = () => {
    setSelectedService(null);
    setSelectedDate(null);
    setSelectedTime(null);
    setBooked(false);
  };

  return (
    <div className="glass-card p-8 md:p-10">
      <div className="flex items-center gap-3 mb-6">
        <Calendar className="w-6 h-6 text-gold" />
        <h3 className="font-serif text-2xl text-gold-light">Smart Booking System</h3>
      </div>
      <p className="text-text-muted text-sm mb-6">
        AI-powered scheduling with conflict detection and smart availability. Try booking a session below.
      </p>

      {booked ? (
        <div className="rounded-xl border border-gold/30 bg-navy-900/60 p-8 text-center">
          <CheckCircle className="w-14 h-14 text-gold mx-auto mb-4" />
          <h4 className="font-serif text-xl text-gold-light mb-2">Booking Confirmed!</h4>
          <p className="text-text-muted text-sm mb-1">
            {services.find((s) => s.id === selectedService)?.label}
          </p>
          <p className="text-text-muted text-sm mb-1">
            {selectedDate !== null && days[selectedDate].toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" })}
          </p>
          <p className="text-gold font-medium">{selectedTime}</p>
          <p className="text-text-muted/50 text-xs mt-4">A confirmation email would be sent to your inbox.</p>
          <button onClick={handleReset} className="mt-6 text-gold text-sm hover:text-gold-light transition-colors">
            Book another session
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Step 1: Service */}
          <div>
            <p className="text-text-muted text-xs uppercase tracking-wider mb-3 font-medium">1. Select a service</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {services.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSelectedService(s.id)}
                  className={`p-4 rounded-xl border text-left transition-all flex items-center gap-3 ${
                    selectedService === s.id
                      ? "border-gold bg-gold/10"
                      : "border-navy-700 bg-navy-900/50 hover:border-gold/50"
                  }`}
                >
                  <span className="text-2xl">{s.icon}</span>
                  <div>
                    <div className={`text-sm font-medium ${selectedService === s.id ? "text-gold-light" : "text-text-main"}`}>{s.label}</div>
                    <div className="text-xs text-text-muted flex items-center gap-1"><Clock size={10} /> {s.duration}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Date */}
          {selectedService && (
            <div>
              <p className="text-text-muted text-xs uppercase tracking-wider mb-3 font-medium">2. Choose a date</p>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {days.map((d, i) => {
                  const isWeekend = d.getDay() === 0 || d.getDay() === 6;
                  return (
                    <button
                      key={i}
                      disabled={isWeekend}
                      onClick={() => { setSelectedDate(i); setSelectedTime(null); }}
                      className={`flex-shrink-0 w-16 py-3 rounded-xl border text-center transition-all ${
                        isWeekend
                          ? "border-navy-800 bg-navy-950/30 opacity-30 cursor-not-allowed"
                          : selectedDate === i
                          ? "border-gold bg-gold/10"
                          : "border-navy-700 bg-navy-900/50 hover:border-gold/50"
                      }`}
                    >
                      <div className={`text-xs ${selectedDate === i ? "text-gold" : "text-text-muted"}`}>
                        {d.toLocaleDateString("en-GB", { weekday: "short" })}
                      </div>
                      <div className={`text-lg font-semibold ${selectedDate === i ? "text-gold-light" : "text-text-main"}`}>
                        {d.getDate()}
                      </div>
                      <div className={`text-xs ${selectedDate === i ? "text-gold" : "text-text-muted"}`}>
                        {d.toLocaleDateString("en-GB", { month: "short" })}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 3: Time */}
          {selectedDate !== null && (
            <div>
              <p className="text-text-muted text-xs uppercase tracking-wider mb-3 font-medium">3. Pick a time</p>
              <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                {timeSlots.map((t) => {
                  const isUnavailable = unavailable.has(t);
                  return (
                    <button
                      key={t}
                      disabled={isUnavailable}
                      onClick={() => setSelectedTime(t)}
                      className={`py-2 rounded-lg border text-sm font-medium transition-all ${
                        isUnavailable
                          ? "border-navy-800 bg-navy-950/30 text-text-muted/30 cursor-not-allowed line-through"
                          : selectedTime === t
                          ? "border-gold bg-gold/10 text-gold-light"
                          : "border-navy-700 bg-navy-900/50 text-text-muted hover:border-gold/50"
                      }`}
                    >
                      {t}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Confirm */}
          {selectedTime && (
            <button
              onClick={handleBook}
              className="w-full bg-gradient-to-r from-gold-light to-gold-dark text-navy-950 py-3.5 rounded-xl font-semibold text-lg transition-all hover:scale-[1.02] hover:shadow-[0_10px_20px_rgba(217,165,92,0.3)] flex items-center justify-center gap-2"
            >
              <CheckCircle size={18} /> Confirm Booking
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// ─── AI Chat Assistant ──────────────────────────────────────────────────────
interface ChatMsg {
  role: "user" | "assistant";
  content: string;
}

const aiResponses: Record<string, string> = {
  default:
    "That's a great question! At StarTeck, we build customised AI solutions tailored to your exact needs. Could you tell me more about your specific use case so I can provide more relevant information?",
  rag:
    "Our Offline RAG systems are deployed entirely on your infrastructure — no data ever leaves your premises. We use local embedding models and vector databases like FAISS or ChromaDB to create searchable knowledge bases from your documents. Typical deployment takes 4-6 weeks.",
  agent:
    "Our Agentic AI workflows go beyond simple chatbots. We build autonomous systems that can reason through multi-step tasks, use tools like APIs and databases, and make decisions with human-in-the-loop checkpoints for high-stakes actions. We've reduced manual processing by up to 70% for our clients.",
  security:
    "Security is foundational to everything we build. Our AI systems feature air-gapped deployments, document-level access controls, prompt injection protection, and comprehensive audit logging. We also offer AI-specific security assessments covering model theft, data extraction, and adversarial attacks.",
  dashboard:
    "Our AI dashboards combine real-time data visualisation with predictive intelligence. Built with React, Node.js, and Docker, they don't just show what happened — they predict what's coming next. We follow progressive disclosure design so leadership sees what matters at a glance.",
  cost:
    "Pricing depends on the scope and complexity of your project. A typical engagement starts with a 2-week Discovery & Strategy phase, followed by architecture design and implementation. We'd be happy to provide a detailed estimate after understanding your requirements — feel free to reach out at info@starteck.co.uk.",
};

function getAIResponse(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes("rag") || lower.includes("retrieval") || lower.includes("document")) return aiResponses.rag;
  if (lower.includes("agent") || lower.includes("automat") || lower.includes("workflow")) return aiResponses.agent;
  if (lower.includes("secur") || lower.includes("privacy") || lower.includes("data protection")) return aiResponses.security;
  if (lower.includes("dashboard") || lower.includes("frontend") || lower.includes("visual")) return aiResponses.dashboard;
  if (lower.includes("cost") || lower.includes("price") || lower.includes("how much") || lower.includes("pricing")) return aiResponses.cost;
  return aiResponses.default;
}

const suggestedQuestions = [
  "Tell me about your RAG systems",
  "How do agentic AI workflows work?",
  "What security measures do you use?",
  "How much does a project cost?",
];

function AIChatDemo() {
  const [messages, setMessages] = useState<ChatMsg[]>([
    { role: "assistant", content: "Hello! I'm StarTeck's AI assistant. I can answer questions about our services, capabilities, and approach. What would you like to know?" },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = (text?: string) => {
    const msg = text || input.trim();
    if (!msg || isTyping) return;

    setMessages((prev) => [...prev, { role: "user", content: msg }]);
    setInput("");
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const response = getAIResponse(msg);
      setMessages((prev) => [...prev, { role: "assistant", content: response }]);
      setIsTyping(false);
    }, 1200 + Math.random() * 800);
  };

  return (
    <div className="glass-card p-8 md:p-10">
      <div className="flex items-center gap-3 mb-6">
        <Bot className="w-6 h-6 text-gold" />
        <h3 className="font-serif text-2xl text-gold-light">AI Chat Assistant</h3>
      </div>
      <p className="text-text-muted text-sm mb-6">
        A context-aware conversational AI. Ask it anything about StarTeck&apos;s services.
      </p>

      {/* Chat Window */}
      <div className="rounded-xl border border-navy-700 bg-navy-950/80 overflow-hidden">
        {/* Messages */}
        <div ref={scrollRef} className="h-[400px] overflow-y-auto p-4 space-y-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              {msg.role === "assistant" && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold-light to-gold-dark flex items-center justify-center flex-shrink-0">
                  <Bot size={14} className="text-navy-950" />
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-gold/15 border border-gold/30 text-text-main rounded-br-md"
                    : "bg-navy-800/60 border border-navy-700 text-text-muted rounded-bl-md"
                }`}
              >
                {msg.content}
              </div>
              {msg.role === "user" && (
                <div className="w-8 h-8 rounded-full bg-navy-700 flex items-center justify-center flex-shrink-0">
                  <User size={14} className="text-text-muted" />
                </div>
              )}
            </div>
          ))}
          {isTyping && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold-light to-gold-dark flex items-center justify-center flex-shrink-0">
                <Bot size={14} className="text-navy-950" />
              </div>
              <div className="bg-navy-800/60 border border-navy-700 rounded-2xl rounded-bl-md px-4 py-3">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-gold/60 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-2 h-2 bg-gold/60 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-2 h-2 bg-gold/60 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Suggested Questions */}
        {messages.length <= 2 && (
          <div className="px-4 pb-3 flex flex-wrap gap-2">
            {suggestedQuestions.map((q) => (
              <button
                key={q}
                onClick={() => handleSend(q)}
                className="text-xs px-3 py-1.5 rounded-full border border-gold/30 text-gold-light hover:bg-gold/10 transition-all"
              >
                {q}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="border-t border-navy-700 p-3 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask about our services..."
            className="flex-1 bg-navy-900/80 border border-navy-700 rounded-xl px-4 py-2.5 text-sm text-text-main placeholder:text-text-muted/50 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 transition-colors"
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || isTyping}
            className="bg-gradient-to-r from-gold-light to-gold-dark text-navy-950 px-4 py-2.5 rounded-xl transition-all hover:scale-105 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Analytics Dashboard ────────────────────────────────────────────────────
const metricData = [
  { label: "Documents Processed", value: "12,847", change: "+12.3%", up: true, icon: <Database size={18} /> },
  { label: "AI Accuracy", value: "99.2%", change: "+0.4%", up: true, icon: <Shield size={18} /> },
  { label: "Avg Response Time", value: "1.2s", change: "-18%", up: true, icon: <Activity size={18} /> },
  { label: "Active Agents", value: "24", change: "+3", up: true, icon: <Bot size={18} /> },
];

const chartData = [35, 42, 38, 55, 48, 62, 58, 72, 68, 85, 78, 92, 88, 95, 91, 98, 94, 105, 100, 112];

const recentEvents = [
  { time: "2 min ago", event: "RAG query processed", status: "success", detail: "Financial report Q4 — 3 documents retrieved" },
  { time: "5 min ago", event: "Agent workflow completed", status: "success", detail: "Claims batch #4821 — 47 claims auto-approved" },
  { time: "8 min ago", event: "Anomaly detected", status: "warning", detail: "Unusual login pattern flagged — user escalated for review" },
  { time: "12 min ago", event: "Model retraining finished", status: "success", detail: "Document classifier v3.2 — accuracy improved to 99.4%" },
  { time: "15 min ago", event: "Pipeline completed", status: "success", detail: "ETL batch processed 2,341 records in 4.2s" },
];

function AnalyticsDashboardDemo() {
  const [activeTab, setActiveTab] = useState<"overview" | "activity">("overview");
  const maxVal = Math.max(...chartData);

  return (
    <div className="glass-card p-8 md:p-10">
      <div className="flex items-center gap-3 mb-6">
        <LayoutDashboard className="w-6 h-6 text-gold" />
        <h3 className="font-serif text-2xl text-gold-light">Analytics Dashboard</h3>
      </div>
      <p className="text-text-muted text-sm mb-6">
        Real-time data visualization with predictive insights — a live preview of how our AI dashboards work.
      </p>

      <div className="rounded-xl border border-navy-700 bg-navy-950/80 overflow-hidden">
        {/* Dashboard Header */}
        <div className="border-b border-navy-700 px-5 py-3 flex items-center justify-between">
          <div className="flex gap-1">
            <button
              onClick={() => setActiveTab("overview")}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === "overview" ? "bg-gold/10 text-gold-light border border-gold/30" : "text-text-muted hover:text-text-main"
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab("activity")}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === "activity" ? "bg-gold/10 text-gold-light border border-gold/30" : "text-text-muted hover:text-text-main"
              }`}
            >
              Activity Feed
            </button>
          </div>
          <div className="flex items-center gap-2 text-xs text-text-muted">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            Live
          </div>
        </div>

        {activeTab === "overview" ? (
          <div className="p-5 space-y-6">
            {/* Metric Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {metricData.map((m) => (
                <div key={m.label} className="bg-navy-900/60 border border-navy-700 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gold/70">{m.icon}</span>
                    <span className={`text-xs font-medium flex items-center gap-0.5 ${m.up ? "text-green-400" : "text-red-400"}`}>
                      {m.up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                      {m.change}
                    </span>
                  </div>
                  <div className="text-xl font-semibold text-text-main">{m.value}</div>
                  <div className="text-xs text-text-muted mt-1">{m.label}</div>
                </div>
              ))}
            </div>

            {/* Chart */}
            <div className="bg-navy-900/60 border border-navy-700 rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-medium text-text-main">Queries Processed (Last 20 hours)</h4>
                <TrendingUp size={16} className="text-gold" />
              </div>
              <div className="flex items-end gap-[3px] h-32">
                {chartData.map((val, i) => (
                  <div key={i} className="flex-1 flex flex-col justify-end">
                    <div
                      className="rounded-t-sm transition-all hover:opacity-80"
                      style={{
                        height: `${(val / maxVal) * 100}%`,
                        background: `linear-gradient(to top, rgba(217,165,92,0.3), rgba(217,165,92,${0.4 + (val / maxVal) * 0.6}))`,
                      }}
                    />
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-2 text-xs text-text-muted/50">
                <span>20h ago</span>
                <span>Now</span>
              </div>
            </div>

            {/* Mini stats row */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-navy-900/60 border border-navy-700 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-gold-light">7</div>
                <div className="text-xs text-text-muted">AI Models Active</div>
              </div>
              <div className="bg-navy-900/60 border border-navy-700 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-gold-light">99.9%</div>
                <div className="text-xs text-text-muted">System Uptime</div>
              </div>
              <div className="bg-navy-900/60 border border-navy-700 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-gold-light">£2.1M</div>
                <div className="text-xs text-text-muted">Cost Savings (YTD)</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-5">
            <div className="space-y-3">
              {recentEvents.map((event, i) => (
                <div key={i} className="flex items-start gap-3 bg-navy-900/40 border border-navy-700/50 rounded-xl p-4">
                  <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                    event.status === "success" ? "bg-green-400" : event.status === "warning" ? "bg-yellow-400" : "bg-red-400"
                  }`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-text-main">{event.event}</span>
                      <span className="text-xs text-text-muted/50 flex-shrink-0 ml-2">{event.time}</span>
                    </div>
                    <p className="text-xs text-text-muted mt-0.5">{event.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Main Demo Page ─────────────────────────────────────────────────────────
export default function DemoPage() {
  return (
    <div className="relative z-10 py-24 px-6">
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

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-5xl mx-auto flex flex-col gap-12"
      >
        <motion.div variants={fadeInUp}>
          <AIVideoDemo />
        </motion.div>

        <motion.div variants={fadeInUp}>
          <BookingSystemDemo />
        </motion.div>

        <motion.div variants={fadeInUp}>
          <AIChatDemo />
        </motion.div>

        <motion.div variants={fadeInUp}>
          <AnalyticsDashboardDemo />
        </motion.div>
      </motion.div>
    </div>
  );
}
