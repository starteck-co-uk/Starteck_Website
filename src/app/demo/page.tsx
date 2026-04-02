"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar, Video, Bot, LayoutDashboard, ChevronRight, Play, Loader2,
  CheckCircle, Sparkles, Send, Clock, User, TrendingUp, Activity,
  Shield, Database, ArrowUpRight, ArrowDownRight, ChevronLeft,
  Users, Wallet, ClipboardCheck, Plus, X, Bell, Search, FileText,
  PenTool, DollarSign, AlertCircle, UserCheck, Settings, Settings2,
  Menu as MenuIcon, Lock, ChevronDown,
  Building2, Ticket, Mail, BarChart3, Zap, Target, Filter,
  MoreHorizontal, Phone, Star, Eye, MousePointerClick, Inbox,
  CheckSquare, GripVertical,
  Reply, Forward, Archive, Trash2, Tag, Circle,
} from "lucide-react";
import {
  ResponsiveContainer, AreaChart, Area, CartesianGrid, XAxis, YAxis,
  Tooltip, PieChart, Pie, Cell, Legend, LineChart, Line,
  BarChart, Bar,
} from "recharts";
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

// ─── CRM Dashboard Demo (Clinic Management) ────────────────────────────────

const CRM_COLORS = ["#0d9488", "#6366f1", "#10b981", "#f59e0b"];

const crmRevenueData = [
  { date: "Mon", amount: 4200 },
  { date: "Tue", amount: 5800 },
  { date: "Wed", amount: 3900 },
  { date: "Thu", amount: 7200 },
  { date: "Fri", amount: 6100 },
  { date: "Sat", amount: 8400 },
  { date: "Sun", amount: 5300 },
];

const crmDistribution = [
  { name: "Consultation", value: 35 },
  { name: "Pre-Op", value: 25 },
  { name: "Surgery", value: 22 },
  { name: "Post-Op", value: 18 },
];

const crmActivityData = [
  { patients: 12, bookings: 8 },
  { patients: 15, bookings: 11 },
  { patients: 9, bookings: 14 },
  { patients: 18, bookings: 10 },
  { patients: 14, bookings: 16 },
  { patients: 20, bookings: 13 },
  { patients: 16, bookings: 18 },
];

const crmAppointments = [
  { name: "Sarah Johnson", service: "Rhinoplasty Consultation", time: "09:00 AM", status: "Confirmed" },
  { name: "Michael Chen", service: "Blepharoplasty Review", time: "10:30 AM", status: "In Review" },
  { name: "Emily Watson", service: "Facelift Pre-Op", time: "11:00 AM", status: "Confirmed" },
  { name: "James Rodriguez", service: "Liposuction Follow-Up", time: "02:00 PM", status: "Pending" },
  { name: "Amara Okafor", service: "Breast Augmentation Consult", time: "03:30 PM", status: "Confirmed" },
];

const crmPendingBreakdown = {
  missingIntake: [
    { id: 1, name: "David Patel" },
    { id: 2, name: "Lisa Montgomery" },
    { id: 3, name: "Robert Kim" },
  ],
  complianceGap: [
    { id: 1, name: "Sarah Johnson", service: "Rhinoplasty" },
    { id: 2, name: "Tom Bradley", service: "Blepharoplasty" },
  ],
  unpaidBalances: [
    { id: 1, name: "Michael Chen", balance: 2400 },
    { id: 2, name: "Emma Sullivan", balance: 1850 },
  ],
  postOpFollowups: [
    { id: 1, name: "James Rodriguez", service: "Liposuction", date: "28 Mar" },
    { id: 2, name: "Nina Kowalski", service: "Abdominoplasty", date: "30 Mar" },
  ],
  bookingBottleneck: [
    { id: 1, name: "Chris Evans" },
    { id: 2, name: "Diana Prince" },
  ],
};

const crmNavItems = [
  { name: "Dashboard", icon: LayoutDashboard },
  { name: "Patients", icon: Users },
  { name: "Assessment", icon: ClipboardCheck },
  { name: "Treatments", icon: FileText },
  { name: "Contract", icon: PenTool },
  { name: "Calendar", icon: Calendar },
  { name: "Financials", icon: DollarSign },
  { name: "Service Manager", icon: Settings2, admin: true },
  { name: "Form Designer", icon: ClipboardCheck, admin: true },
  { name: "Settings", icon: Settings, admin: true },
];

function StarIcon({ className, size }: { className?: string; size?: number }) {
  return (
    <svg width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function BookingSystemDemo() {
  const [isPendingModalOpen, setIsPendingModalOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("Dashboard");

  const statCards = [
    { label: "Total Patients", value: "1,247", change: "+12.5%", up: true, icon: Users, color: "teal" },
    { label: "Surgery Bookings", value: "38", change: "Live", up: true, icon: Calendar, color: "indigo" },
    { label: "Monthly Revenue", value: "\u00A312,840", change: "+8.2%", up: true, icon: Wallet, color: "emerald" },
    { label: "Pending Reports", value: "9", change: "Urgent", up: false, icon: ClipboardCheck, color: "amber", onClick: () => setIsPendingModalOpen(true) },
  ];

  const colorClass = (color: string, type: "bg" | "text") => {
    const map: Record<string, Record<string, string>> = {
      teal: { bg: "bg-teal-50 text-teal-600", text: "text-teal-600" },
      indigo: { bg: "bg-indigo-50 text-indigo-600", text: "text-indigo-600" },
      emerald: { bg: "bg-emerald-50 text-emerald-600", text: "text-emerald-600" },
      amber: { bg: "bg-amber-50 text-amber-600", text: "text-amber-600" },
    };
    return map[color]?.[type] || "";
  };

  return (
    <div className="glass-card p-0 overflow-hidden">
      {/* Header label */}
      <div className="px-8 pt-8 pb-4 border-b border-navy-700/50 flex items-center gap-3">
        <Calendar className="w-6 h-6 text-gold" />
        <h3 className="font-serif text-2xl text-gold-light">Smart Booking System</h3>
      </div>
      <p className="text-text-muted text-sm px-8 pt-4 pb-2">
        A full-stack clinic management CRM we built — patient workflows, real-time analytics, and scheduling in one unified dashboard.
      </p>

      {/* CRM Dashboard Container */}
      <div className="m-4 md:m-6 rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 flex" style={{ minHeight: 700 }}>
        {/* Sidebar */}
        <aside className={`${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 fixed md:static inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white flex flex-col transition-transform duration-300 md:rounded-l-2xl`}>
          <div className="flex h-16 items-center px-6 border-b border-slate-800 shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-gradient-to-br from-teal-400 to-teal-600 rounded-xl flex items-center justify-center shadow-lg shadow-teal-500/20">
                <StarIcon className="text-white fill-white" size={20} />
              </div>
              <span className="text-base font-black tracking-tight text-white uppercase italic">Med<span className="text-teal-400">Flow</span></span>
            </div>
          </div>

          {/* Demo patient banner */}
          <div className="mx-3 mt-6 p-4 bg-teal-500/10 border border-teal-500/20 rounded-xl space-y-3">
            <div className="flex items-center gap-3 text-left">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-tr from-teal-500 to-teal-400 rounded-full flex items-center justify-center font-bold text-slate-900 text-sm shadow-inner">SJ</div>
                <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 border-[3px] border-slate-900 rounded-full" />
              </div>
              <div className="min-w-0">
                <p className="text-[9px] font-black text-teal-400 uppercase tracking-[0.2em] mb-0.5">Active Patient</p>
                <p className="text-xs font-bold truncate text-white">Sarah Johnson</p>
              </div>
            </div>
            <button className="w-full py-2 text-[9px] font-black bg-white/5 hover:bg-white/10 text-teal-100 rounded-lg transition-all uppercase tracking-widest border border-white/5">
              Switch Patient
            </button>
          </div>

          <nav className="p-4 space-y-1 flex-1 overflow-y-auto text-left">
            {crmNavItems.map((item) => (
              <button
                key={item.name}
                onClick={() => setActiveNav(item.name)}
                className={`group flex items-center justify-between gap-2.5 px-3 py-2.5 rounded-lg transition-all w-full relative overflow-hidden text-left ${
                  activeNav === item.name
                    ? "bg-teal-600 text-white shadow-lg shadow-teal-600/20"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-2.5 relative z-10">
                  <item.icon size={17} className={activeNav === item.name ? "text-white" : "text-slate-500 group-hover:text-teal-400"} />
                  <span className="font-bold text-xs tracking-wide">{item.name}</span>
                </div>
                {item.admin && <span className="text-[8px] font-black text-teal-500 uppercase">Admin</span>}
              </button>
            ))}
          </nav>

          <div className="p-4 border-t border-slate-800 shrink-0">
            <div className="flex items-center justify-between px-3">
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Support</span>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                <span className="text-[9px] font-black text-slate-700 uppercase tracking-widest">v1.2.1</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 md:hidden" onClick={() => setSidebarOpen(false)} />
        )}

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Top Navbar */}
          <header className="h-14 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-4 lg:px-6 sticky top-0 z-30 shrink-0">
            <div className="flex items-center gap-3">
              <button className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors" onClick={() => setSidebarOpen(!sidebarOpen)}>
                <MenuIcon size={20} />
              </button>
              <div className="hidden md:flex relative group w-56 lg:w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-teal-500 transition-colors" size={15} />
                <input type="text" placeholder="Search global records..." className="w-full bg-slate-100 border-2 border-transparent focus:bg-white focus:border-teal-500/20 rounded-xl py-2 pl-9 pr-3 text-xs outline-none transition-all placeholder:text-slate-400" />
              </div>
            </div>
            <div className="flex items-center gap-2 lg:gap-4">
              <div className="flex items-center gap-1">
                <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-xl transition-all relative group">
                  <Bell size={17} className="group-hover:rotate-12 transition-transform" />
                  <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-red-500 rounded-full border border-white" />
                </button>
              </div>
              <div className="h-6 w-[1px] bg-slate-200 hidden sm:block" />
              <div className="relative">
                <button onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)} className="flex items-center gap-2 p-1 pr-2 hover:bg-slate-100 rounded-xl transition-all group">
                  <div className="w-8 h-8 bg-gradient-to-br from-slate-800 to-slate-900 text-teal-400 rounded-lg flex items-center justify-center font-black text-xs shadow-lg shadow-slate-200">A</div>
                  <div className="text-left hidden sm:block min-w-0">
                    <p className="text-[10px] font-black text-slate-900 uppercase tracking-tight">Admin</p>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">admin@clinic.co.uk</p>
                  </div>
                  <ChevronDown size={12} className={`text-slate-400 transition-transform duration-300 ${isUserDropdownOpen ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {isUserDropdownOpen && (
                    <motion.div initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.95 }} className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-slate-100 p-1.5 z-50">
                      <div className="p-2.5 mb-1 bg-slate-50 rounded-lg">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.15em] mb-0.5">Clinic Access</p>
                        <p className="text-[10px] font-bold text-slate-900 truncate">admin@clinic.co.uk</p>
                      </div>
                      <button className="flex items-center gap-2 w-full p-2 text-xs font-bold text-slate-600 hover:bg-slate-50 rounded-lg transition-colors text-left">
                        <User size={14} className="text-slate-400" />
                        Role: Admin
                      </button>
                      <div className="h-[1px] bg-slate-100 my-1 mx-1.5" />
                      <button className="flex items-center gap-2 w-full p-2 text-xs font-bold text-red-600 hover:bg-red-50 rounded-lg transition-colors text-left">
                        <Lock size={14} />
                        Lock Session
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </header>

          {/* Dashboard Content */}
          <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 sm:p-5 lg:p-6 bg-[#FBFBFE]">
            <div className="max-w-[1400px] mx-auto space-y-6 text-left">
              {/* Title */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">Executive Overview</h1>
                  <p className="text-slate-500 text-xs font-medium">Clinical analytics synchronized in real-time.</p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <div className="bg-white border border-slate-200 text-slate-400 px-3 py-1.5 rounded-xl font-bold text-[9px] uppercase tracking-widest flex items-center gap-1.5 shadow-sm">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                    Live Cloud Data
                  </div>
                  <button className="bg-teal-600 text-white px-4 py-1.5 rounded-xl font-bold text-xs hover:bg-teal-700 transition-all shadow-lg shadow-teal-600/20 flex items-center gap-1.5">
                    <Plus size={14} />
                    Add Patient
                  </button>
                </div>
              </div>

              {/* Stat Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                {statCards.map((stat) => (
                  <div
                    key={stat.label}
                    onClick={stat.onClick}
                    className={`bg-white p-4 md:p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all group text-left ${stat.onClick ? "cursor-pointer ring-2 ring-transparent hover:ring-teal-500/20 active:scale-[0.98]" : "cursor-default"}`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 duration-300 shrink-0 ${colorClass(stat.color, "bg")}`}>
                        <stat.icon size={20} />
                      </div>
                      <div className={`flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider ${stat.up ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"}`}>
                        {stat.up ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
                        {stat.change}
                      </div>
                    </div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
                    <h2 className="text-xl md:text-2xl font-black text-slate-900 mt-0.5">{stat.value}</h2>
                  </div>
                ))}
              </div>

              {/* Charts Row */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
                {/* Revenue Chart */}
                <div className="lg:col-span-2 bg-white p-5 md:p-6 rounded-2xl border border-slate-100 shadow-sm text-left">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-sm font-black text-slate-900 tracking-tight">Financial Stream</h3>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">7-Day Revenue Trend</p>
                    </div>
                    <div className="bg-teal-50 p-2 rounded-lg text-teal-600"><TrendingUp size={16} /></div>
                  </div>
                  <div className="h-[200px] md:h-[240px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={crmRevenueData}>
                        <defs>
                          <linearGradient id="colorRevDemo" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#0d9488" stopOpacity={0.1} />
                            <stop offset="95%" stopColor="#0d9488" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 10, fontWeight: 800 }} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 10, fontWeight: 800 }} tickFormatter={(v: number) => `\u00A3${v}`} />
                        <Tooltip cursor={{ stroke: "#0d9488", strokeWidth: 2 }} contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)" }} />
                        <Area type="monotone" dataKey="amount" stroke="#0d9488" strokeWidth={3} fillOpacity={1} fill="url(#colorRevDemo)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Pie Chart */}
                <div className="bg-white p-5 md:p-6 rounded-2xl border border-slate-100 shadow-sm text-left">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-sm font-black text-slate-900 tracking-tight">Patient Pipeline</h3>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Lifecycle breakdown</p>
                    </div>
                    <div className="bg-indigo-50 p-2 rounded-lg text-indigo-600"><Activity size={16} /></div>
                  </div>
                  <div className="h-[200px] md:h-[240px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={crmDistribution} cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={8} dataKey="value">
                          {crmDistribution.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={CRM_COLORS[index % CRM_COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)" }} />
                        <Legend verticalAlign="bottom" height={30} iconType="circle" formatter={(value: string) => <span style={{ fontSize: "9px", fontWeight: 800, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.1em", marginLeft: "6px" }}>{value}</span>} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* Appointments + Clinic Pulse */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
                {/* Recent Appointments */}
                <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden text-left">
                  <div className="p-4 md:p-5 border-b border-slate-50 flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-black text-slate-900 tracking-tight">Recent Appointments</h3>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Upcoming surgery queue</p>
                    </div>
                    <button className="text-teal-600 font-bold text-xs hover:bg-teal-50 px-3 py-1.5 rounded-lg transition-all">View Schedule</button>
                  </div>
                  <div className="divide-y divide-slate-50">
                    {crmAppointments.map((app, i) => (
                      <div key={i} className="px-4 md:px-5 py-3 flex items-center justify-between hover:bg-slate-50/50 transition-colors group gap-3">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-9 h-9 bg-slate-100 rounded-xl flex items-center justify-center font-black text-slate-400 text-xs group-hover:bg-teal-100 group-hover:text-teal-600 transition-colors shrink-0">
                            {app.name.split(" ").map((n) => n[0]).join("")}
                          </div>
                          <div className="min-w-0">
                            <p className="font-bold text-slate-900 text-xs truncate">{app.name}</p>
                            <p className="text-[10px] font-medium text-slate-500 mt-0.5 truncate">{app.service} &bull; {app.time}</p>
                          </div>
                        </div>
                        <span className={`px-2.5 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest border shrink-0 whitespace-nowrap ${
                          app.status === "Confirmed" ? "bg-green-50 text-green-700 border-green-100"
                          : app.status === "In Review" ? "bg-blue-50 text-blue-600 border-blue-100"
                          : "bg-amber-50 text-amber-600 border-amber-100"
                        }`}>
                          {app.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Clinic Pulse */}
                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col text-left">
                  <div className="mb-4">
                    <h3 className="text-sm font-black text-slate-900 tracking-tight">Clinic Pulse</h3>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Live activity volume</p>
                  </div>
                  <div className="flex-1 min-h-[140px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={crmActivityData}>
                        <Tooltip contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }} />
                        <Line type="stepAfter" dataKey="patients" stroke="#0d9488" strokeWidth={3} dot={false} />
                        <Line type="stepAfter" dataKey="bookings" stroke="#6366f1" strokeWidth={3} dot={false} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-3 shrink-0">
                    <div className="p-2.5 bg-teal-50 rounded-xl">
                      <p className="text-[9px] font-black text-teal-600 uppercase tracking-wider mb-0.5">Reg Rate</p>
                      <p className="text-base font-black text-teal-900">High</p>
                    </div>
                    <div className="p-2.5 bg-indigo-50 rounded-xl">
                      <p className="text-[9px] font-black text-indigo-600 uppercase tracking-wider mb-0.5">Bookings</p>
                      <p className="text-base font-black text-indigo-900">Steady</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Pending Reports Modal */}
      <AnimatePresence>
        {isPendingModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-hidden">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsPendingModalOpen(false)} className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="relative bg-[#FBFBFE] rounded-3xl shadow-2xl w-full max-w-3xl overflow-hidden max-h-[80vh] flex flex-col">
              <div className="p-6 md:p-8 border-b border-slate-100 bg-white flex items-center justify-between gap-4 shrink-0 text-left">
                <div>
                  <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                    <ClipboardCheck className="text-amber-500" size={24} />
                    Clinical Backlog
                  </h2>
                  <p className="text-slate-500 text-xs font-medium mt-1">Detailed breakdown of pending clinical tasks and bottlenecks.</p>
                </div>
                <button onClick={() => setIsPendingModalOpen(false)} className="bg-slate-100 text-slate-400 hover:text-slate-900 p-2.5 rounded-xl transition-all shrink-0">
                  <X size={20} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 text-left">
                {/* Missing Intakes */}
                <section className="space-y-3">
                  <div className="flex items-center gap-2 px-1">
                    <AlertCircle className="text-amber-500 shrink-0" size={15} />
                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Missing Medical Assessments ({crmPendingBreakdown.missingIntake.length})</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {crmPendingBreakdown.missingIntake.map((p) => (
                      <div key={p.id} className="flex items-center justify-between p-3 bg-white border border-slate-100 rounded-xl shadow-sm hover:border-teal-500/30 transition-all group gap-3">
                        <span className="font-bold text-slate-700 text-sm">{p.name}</span>
                        <ChevronRight size={14} className="text-slate-300 group-hover:text-teal-500 transition-colors shrink-0" />
                      </div>
                    ))}
                  </div>
                </section>
                {/* Compliance Gap */}
                <section className="space-y-3">
                  <div className="flex items-center gap-2 px-1">
                    <PenTool className="text-indigo-500 shrink-0" size={15} />
                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Compliance Gap: Missing Contracts ({crmPendingBreakdown.complianceGap.length})</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {crmPendingBreakdown.complianceGap.map((p) => (
                      <div key={p.id} className="flex items-center justify-between p-3 bg-white border border-slate-100 rounded-xl shadow-sm hover:border-indigo-500/30 transition-all group gap-3">
                        <div>
                          <p className="font-bold text-slate-700 text-sm">{p.name}</p>
                          <p className="text-[9px] text-slate-400 uppercase font-black">{p.service}</p>
                        </div>
                        <ChevronRight size={14} className="text-slate-300 group-hover:text-indigo-500 transition-colors shrink-0" />
                      </div>
                    ))}
                  </div>
                </section>
                {/* Unpaid Balances */}
                <section className="space-y-3">
                  <div className="flex items-center gap-2 px-1">
                    <DollarSign className="text-red-500 shrink-0" size={15} />
                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Unpaid Post-Op Balances ({crmPendingBreakdown.unpaidBalances.length})</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {crmPendingBreakdown.unpaidBalances.map((p) => (
                      <div key={p.id} className="flex items-center justify-between p-3 bg-red-50/30 border border-red-100 rounded-xl shadow-sm hover:bg-red-50 transition-all group gap-3">
                        <span className="font-bold text-slate-700 text-sm">{p.name}</span>
                        <span className="font-black text-red-600 text-xs">{"\u00A3"}{p.balance.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </section>
                {/* Post-Op Follow-ups */}
                <section className="space-y-3">
                  <div className="flex items-center gap-2 px-1">
                    <Activity className="text-teal-500 shrink-0" size={15} />
                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Recent Surgery Follow-ups ({crmPendingBreakdown.postOpFollowups.length})</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {crmPendingBreakdown.postOpFollowups.map((p) => (
                      <div key={p.id} className="flex items-center justify-between p-3 bg-teal-50/30 border border-teal-100 rounded-xl shadow-sm hover:bg-teal-50 transition-all group gap-3">
                        <div>
                          <p className="font-bold text-slate-700 text-sm">{p.name}</p>
                          <p className="text-[9px] text-teal-600 uppercase font-black">{p.service} &bull; {p.date}</p>
                        </div>
                        <UserCheck size={14} className="text-teal-500 shrink-0" />
                      </div>
                    ))}
                  </div>
                </section>
                {/* Booking Bottleneck */}
                <section className="space-y-3">
                  <div className="flex items-center gap-2 px-1">
                    <Clock className="text-orange-500 shrink-0" size={15} />
                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Booking Bottleneck: Date Not Set ({crmPendingBreakdown.bookingBottleneck.length})</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {crmPendingBreakdown.bookingBottleneck.map((p) => (
                      <div key={p.id} className="flex items-center justify-between p-3 bg-white border border-slate-100 rounded-xl shadow-sm hover:border-orange-500/30 transition-all group gap-3">
                        <span className="font-bold text-slate-700 text-sm">{p.name}</span>
                        <ChevronRight size={14} className="text-slate-300 group-hover:text-orange-500 transition-colors shrink-0" />
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
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

// ─── NexusCRM Demo (HubSpot-style) ──────────────────────────────────────────

const NEXUS_COLORS = { primary: "#7c3aed", accent: "#2563eb", success: "#10b981", warning: "#f59e0b", danger: "#ef4444" };

const nexusContacts = [
  { id: 1, name: "Olivia Martinez", email: "olivia@acmecorp.com", company: "Acme Corp", phone: "+44 7700 100001", lifecycle: "Customer", owner: "Sarah K.", lastActivity: "Email opened 2h ago", dealValue: 24000, avatar: "OM" },
  { id: 2, name: "James Whitfield", email: "james@globex.io", company: "Globex Inc", phone: "+44 7700 100002", lifecycle: "Lead", owner: "Tom R.", lastActivity: "Form submitted 5h ago", dealValue: 0, avatar: "JW" },
  { id: 3, name: "Priya Sharma", email: "priya@initech.co", company: "Initech Ltd", phone: "+44 7700 100003", lifecycle: "MQL", owner: "Sarah K.", lastActivity: "Page visited 1d ago", dealValue: 18500, avatar: "PS" },
  { id: 4, name: "Marcus Johnson", email: "marcus@wayneent.com", company: "Wayne Enterprises", phone: "+44 7700 100004", lifecycle: "SQL", owner: "Alex D.", lastActivity: "Meeting booked 3h ago", dealValue: 67000, avatar: "MJ" },
  { id: 5, name: "Elena Petrova", email: "elena@stark.tech", company: "Stark Industries", phone: "+44 7700 100005", lifecycle: "Opportunity", owner: "Tom R.", lastActivity: "Call completed 6h ago", dealValue: 42000, avatar: "EP" },
  { id: 6, name: "David Chen", email: "david@umbrella.co", company: "Umbrella Corp", phone: "+44 7700 100006", lifecycle: "Customer", owner: "Alex D.", lastActivity: "Deal closed 2d ago", dealValue: 95000, avatar: "DC" },
  { id: 7, name: "Aisha Rahman", email: "aisha@oscorp.net", company: "Oscorp", phone: "+44 7700 100007", lifecycle: "Lead", owner: "Sarah K.", lastActivity: "Email clicked 4h ago", dealValue: 0, avatar: "AR" },
  { id: 8, name: "Lucas Brown", email: "lucas@lexcorp.com", company: "LexCorp", phone: "+44 7700 100008", lifecycle: "SQL", owner: "Tom R.", lastActivity: "Proposal viewed 1h ago", dealValue: 31000, avatar: "LB" },
];

const nexusDealStages = [
  { stage: "Appointment Set", color: "#8b5cf6" },
  { stage: "Qualified", color: "#6366f1" },
  { stage: "Proposal Sent", color: "#3b82f6" },
  { stage: "Negotiation", color: "#f59e0b" },
  { stage: "Closed Won", color: "#10b981" },
  { stage: "Closed Lost", color: "#ef4444" },
];

const nexusDeals = [
  { id: 1, name: "Acme Corp - Enterprise Plan", amount: 24000, stage: "Negotiation", contact: "Olivia Martinez", company: "Acme Corp", closeDate: "15 Apr", owner: "Sarah K.", priority: "high" },
  { id: 2, name: "Initech - AI Dashboard", amount: 18500, stage: "Proposal Sent", contact: "Priya Sharma", company: "Initech Ltd", closeDate: "22 Apr", owner: "Sarah K.", priority: "medium" },
  { id: 3, name: "Wayne Ent - Full Suite", amount: 67000, stage: "Qualified", contact: "Marcus Johnson", company: "Wayne Enterprises", closeDate: "30 Apr", owner: "Alex D.", priority: "high" },
  { id: 4, name: "Stark - RAG System", amount: 42000, stage: "Appointment Set", contact: "Elena Petrova", company: "Stark Industries", closeDate: "10 May", owner: "Tom R.", priority: "medium" },
  { id: 5, name: "Umbrella - Security Audit", amount: 95000, stage: "Closed Won", contact: "David Chen", company: "Umbrella Corp", closeDate: "28 Mar", owner: "Alex D.", priority: "high" },
  { id: 6, name: "LexCorp - Automation", amount: 31000, stage: "Proposal Sent", contact: "Lucas Brown", company: "LexCorp", closeDate: "18 Apr", owner: "Tom R.", priority: "low" },
  { id: 7, name: "Globex - Chatbot", amount: 12000, stage: "Appointment Set", contact: "James Whitfield", company: "Globex Inc", closeDate: "25 Apr", owner: "Tom R.", priority: "low" },
  { id: 8, name: "Oscorp - Data Pipeline", amount: 28000, stage: "Closed Lost", contact: "Aisha Rahman", company: "Oscorp", closeDate: "20 Mar", owner: "Sarah K.", priority: "medium" },
];

const nexusTasks = [
  { id: 1, title: "Follow up with Olivia on contract terms", contact: "Olivia Martinez", due: "Today", priority: "high", status: "overdue", type: "call" },
  { id: 2, title: "Send proposal to Priya", contact: "Priya Sharma", due: "Today", priority: "high", status: "due-today", type: "email" },
  { id: 3, title: "Prepare demo for Marcus", contact: "Marcus Johnson", due: "Tomorrow", priority: "medium", status: "upcoming", type: "task" },
  { id: 4, title: "Schedule discovery call with Elena", contact: "Elena Petrova", due: "3 Apr", priority: "medium", status: "upcoming", type: "call" },
  { id: 5, title: "Update CRM notes for Umbrella deal", contact: "David Chen", due: "4 Apr", priority: "low", status: "upcoming", type: "task" },
  { id: 6, title: "Review LexCorp proposal feedback", contact: "Lucas Brown", due: "5 Apr", priority: "medium", status: "upcoming", type: "email" },
];

const nexusEmails = [
  { id: 1, from: "Olivia Martinez", email: "olivia@acmecorp.com", subject: "Re: Enterprise Plan — Contract Review", preview: "Hi Sarah, I've reviewed the contract and have a few questions about the SLA terms. Could we schedule a quick call this week?", time: "2:34 PM", read: false, starred: true, labels: ["Deal"] },
  { id: 2, from: "Marcus Johnson", email: "marcus@wayneent.com", subject: "Demo Request — Full Suite Evaluation", preview: "Hi Alex, our CTO would like to see a live demo of the full suite. Are you available next Thursday at 2 PM?", time: "11:15 AM", read: false, starred: false, labels: ["Lead"] },
  { id: 3, from: "Priya Sharma", email: "priya@initech.co", subject: "AI Dashboard — Feature Questions", preview: "Thanks for the proposal! We're particularly interested in the predictive analytics module. Can you share some case studies?", time: "9:02 AM", read: true, starred: false, labels: ["Proposal"] },
  { id: 4, from: "Lucas Brown", email: "lucas@lexcorp.com", subject: "Automation Scope Clarification", preview: "Regarding the workflow automation proposal, we need to clarify the integration points with our existing SAP system...", time: "Yesterday", read: true, starred: false, labels: ["Proposal"] },
  { id: 5, from: "Elena Petrova", email: "elena@stark.tech", subject: "RAG System — Security Requirements", preview: "Before we proceed, our security team needs documentation on the air-gapped deployment architecture and compliance certifications.", time: "Yesterday", read: true, starred: true, labels: ["Deal", "Security"] },
  { id: 6, from: "James Whitfield", email: "james@globex.io", subject: "Chatbot Enquiry", preview: "We saw your AI chat demo and we're interested. Can you tell us more about custom training on our knowledge base?", time: "2 days ago", read: true, starred: false, labels: ["Lead"] },
];

const nexusPipelineFunnel = [
  { name: "Leads", value: 248, fill: "#8b5cf6" },
  { name: "MQLs", value: 156, fill: "#6366f1" },
  { name: "SQLs", value: 89, fill: "#3b82f6" },
  { name: "Opportunities", value: 47, fill: "#2563eb" },
  { name: "Customers", value: 23, fill: "#10b981" },
];

const nexusRevenueBySource = [
  { source: "Organic", value: 145000 },
  { source: "Referral", value: 98000 },
  { source: "Paid Ads", value: 67000 },
  { source: "Email", value: 54000 },
  { source: "Social", value: 32000 },
  { source: "Direct", value: 28000 },
];

const nexusMonthlyDeals = [
  { month: "Oct", won: 3, lost: 1, value: 42000 },
  { month: "Nov", won: 5, lost: 2, value: 78000 },
  { month: "Dec", won: 4, lost: 1, value: 61000 },
  { month: "Jan", won: 6, lost: 3, value: 95000 },
  { month: "Feb", won: 7, lost: 2, value: 112000 },
  { month: "Mar", won: 8, lost: 1, value: 138000 },
];

const nexusActivityTimeline = [
  { time: "10 min ago", type: "email", text: "Olivia Martinez opened your email", detail: "Enterprise Plan — Contract Review", icon: Mail },
  { time: "32 min ago", type: "deal", text: "Deal stage changed", detail: "Acme Corp - Enterprise Plan → Negotiation", icon: TrendingUp },
  { time: "1h ago", type: "call", text: "Call logged with Elena Petrova", detail: "Discovery call — 23 min duration", icon: Phone },
  { time: "2h ago", type: "task", text: "Task completed by Tom R.", detail: "Send follow-up to LexCorp", icon: CheckSquare },
  { time: "3h ago", type: "meeting", text: "Meeting booked with Marcus Johnson", detail: "Demo — Thu 3 Apr at 2:00 PM", icon: Calendar },
  { time: "5h ago", type: "form", text: "New lead from website form", detail: "James Whitfield — Globex Inc — Chatbot enquiry", icon: ClipboardCheck },
  { time: "6h ago", type: "email", text: "Email clicked by Priya Sharma", detail: "AI Dashboard proposal link clicked 3 times", icon: MousePointerClick },
  { time: "1d ago", type: "deal", text: "Deal closed won", detail: "Umbrella Corp - Security Audit — £95,000", icon: CheckCircle },
];

type NexusView = "dashboard" | "contacts" | "companies" | "deals" | "tickets" | "tasks" | "inbox" | "marketing" | "reports" | "automation" | "settings";

const nexusNavItems: { name: string; icon: React.ComponentType<{ size?: number; className?: string }>; view: NexusView; section?: string }[] = [
  { name: "Dashboard", icon: LayoutDashboard, view: "dashboard" },
  { name: "Contacts", icon: Users, view: "contacts", section: "CRM" },
  { name: "Companies", icon: Building2, view: "companies", section: "CRM" },
  { name: "Deals", icon: DollarSign, view: "deals", section: "CRM" },
  { name: "Tickets", icon: Ticket, view: "tickets", section: "CRM" },
  { name: "Tasks", icon: CheckSquare, view: "tasks", section: "CRM" },
  { name: "Inbox", icon: Inbox, view: "inbox", section: "CRM" },
  { name: "Marketing", icon: Target, view: "marketing", section: "Tools" },
  { name: "Reports", icon: BarChart3, view: "reports", section: "Analytics" },
  { name: "Automation", icon: Zap, view: "automation", section: "Tools" },
  { name: "Settings", icon: Settings, view: "settings" },
];

function NexusCRMDemo() {
  const [activeView, setActiveView] = useState<NexusView>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<typeof nexusContacts[0] | null>(null);
  const [selectedEmail, setSelectedEmail] = useState<typeof nexusEmails[0] | null>(null);
  const [contactSearch, setContactSearch] = useState("");
  const [dealViewMode, setDealViewMode] = useState<"board" | "list">("board");

  const filteredContacts = nexusContacts.filter(c =>
    c.name.toLowerCase().includes(contactSearch.toLowerCase()) ||
    c.email.toLowerCase().includes(contactSearch.toLowerCase()) ||
    c.company.toLowerCase().includes(contactSearch.toLowerCase())
  );

  const lifecycleColor = (lc: string) => {
    const map: Record<string, string> = {
      Lead: "bg-slate-100 text-slate-600 border-slate-200",
      MQL: "bg-blue-50 text-blue-600 border-blue-100",
      SQL: "bg-indigo-50 text-indigo-600 border-indigo-100",
      Opportunity: "bg-violet-50 text-violet-600 border-violet-100",
      Customer: "bg-emerald-50 text-emerald-600 border-emerald-100",
    };
    return map[lc] || "bg-slate-100 text-slate-600 border-slate-200";
  };

  const priorityColor = (p: string) => {
    const map: Record<string, string> = { high: "bg-red-50 text-red-600 border-red-100", medium: "bg-amber-50 text-amber-600 border-amber-100", low: "bg-slate-100 text-slate-500 border-slate-200" };
    return map[p] || "";
  };

  const taskStatusColor = (s: string) => {
    const map: Record<string, string> = { overdue: "text-red-600", "due-today": "text-amber-600", upcoming: "text-slate-500" };
    return map[s] || "text-slate-500";
  };

  // ─── Dashboard View ───
  const DashboardView = () => (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">Sales Dashboard</h1>
          <p className="text-slate-500 text-xs font-medium">Welcome back, Sarah. Here&apos;s your pipeline at a glance.</p>
        </div>
        <div className="flex items-center gap-2">
          <select className="bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-600 outline-none">
            <option>Last 30 days</option>
            <option>Last 7 days</option>
            <option>This quarter</option>
          </select>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {[
          { label: "Total Contacts", value: "1,847", change: "+14.2%", up: true, icon: Users, color: "violet" },
          { label: "Open Deals", value: "£172,500", change: "+22.1%", up: true, icon: DollarSign, color: "blue" },
          { label: "Tasks Due", value: "12", change: "3 overdue", up: false, icon: CheckSquare, color: "amber" },
          { label: "Emails Sent", value: "342", change: "+8.7%", up: true, icon: Mail, color: "emerald" },
        ].map((stat) => {
          const colorMap: Record<string, { bg: string; text: string }> = {
            violet: { bg: "bg-violet-50 text-violet-600", text: "text-violet-600" },
            blue: { bg: "bg-blue-50 text-blue-600", text: "text-blue-600" },
            amber: { bg: "bg-amber-50 text-amber-600", text: "text-amber-600" },
            emerald: { bg: "bg-emerald-50 text-emerald-600", text: "text-emerald-600" },
          };
          return (
            <div key={stat.label} className="bg-white p-4 md:p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all group">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 duration-300 ${colorMap[stat.color]?.bg}`}>
                  <stat.icon size={20} />
                </div>
                <div className={`flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider ${stat.up ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"}`}>
                  {stat.up ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
                  {stat.change}
                </div>
              </div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
              <h2 className="text-xl md:text-2xl font-black text-slate-900 mt-0.5">{stat.value}</h2>
            </div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Deal Revenue Trend */}
        <div className="lg:col-span-2 bg-white p-5 md:p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-sm font-black text-slate-900 tracking-tight">Deal Revenue</h3>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Monthly closed-won value</p>
            </div>
            <div className="bg-violet-50 p-2 rounded-lg text-violet-600"><TrendingUp size={16} /></div>
          </div>
          <div className="h-[200px] md:h-[240px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={nexusMonthlyDeals}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 10, fontWeight: 800 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 10, fontWeight: 800 }} tickFormatter={(v: number) => `£${(v / 1000).toFixed(0)}k`} />
                <Tooltip contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)" }} formatter={(value) => [`£${Number(value).toLocaleString()}`, "Revenue"]} />
                <Bar dataKey="value" fill="#7c3aed" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pipeline Funnel */}
        <div className="bg-white p-5 md:p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-sm font-black text-slate-900 tracking-tight">Pipeline Funnel</h3>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Lead → Customer</p>
            </div>
            <div className="bg-blue-50 p-2 rounded-lg text-blue-600"><Filter size={16} /></div>
          </div>
          <div className="space-y-2">
            {nexusPipelineFunnel.map((item, i) => {
              const maxVal = nexusPipelineFunnel[0].value;
              const pct = (item.value / maxVal) * 100;
              return (
                <div key={item.name} className="flex items-center gap-3">
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider w-20 text-right">{item.name}</span>
                  <div className="flex-1 bg-slate-100 rounded-full h-7 overflow-hidden relative">
                    <div className="h-full rounded-full flex items-center px-3 transition-all duration-700" style={{ width: `${pct}%`, backgroundColor: item.fill }}>
                      <span className="text-[10px] font-black text-white">{item.value}</span>
                    </div>
                  </div>
                  {i < nexusPipelineFunnel.length - 1 && (
                    <span className="text-[9px] font-black text-slate-300 w-10">{Math.round((nexusPipelineFunnel[i + 1].value / item.value) * 100)}%</span>
                  )}
                  {i === nexusPipelineFunnel.length - 1 && <span className="w-10" />}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Activity Timeline + Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-4 md:p-5 border-b border-slate-50 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-black text-slate-900 tracking-tight">Activity Timeline</h3>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Recent CRM activity</p>
            </div>
            <button className="text-violet-600 font-bold text-xs hover:bg-violet-50 px-3 py-1.5 rounded-lg transition-all">View All</button>
          </div>
          <div className="divide-y divide-slate-50 max-h-[320px] overflow-y-auto">
            {nexusActivityTimeline.map((act, i) => (
              <div key={i} className="px-4 md:px-5 py-3 flex items-start gap-3 hover:bg-slate-50/50 transition-colors group">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                  act.type === "email" ? "bg-blue-50 text-blue-500" :
                  act.type === "deal" ? "bg-violet-50 text-violet-500" :
                  act.type === "call" ? "bg-emerald-50 text-emerald-500" :
                  act.type === "task" ? "bg-amber-50 text-amber-500" :
                  act.type === "meeting" ? "bg-indigo-50 text-indigo-500" :
                  act.type === "form" ? "bg-teal-50 text-teal-500" :
                  "bg-slate-50 text-slate-500"
                }`}>
                  <act.icon size={15} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-slate-900 text-xs">{act.text}</p>
                  <p className="text-[10px] text-slate-500 mt-0.5 truncate">{act.detail}</p>
                </div>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider shrink-0 mt-0.5">{act.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Tasks */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
          <div className="p-4 md:p-5 border-b border-slate-50 flex items-center justify-between shrink-0">
            <div>
              <h3 className="text-sm font-black text-slate-900 tracking-tight">My Tasks</h3>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">{nexusTasks.filter(t => t.status === "overdue").length} overdue</p>
            </div>
            <button className="bg-violet-600 text-white p-1.5 rounded-lg hover:bg-violet-700 transition-all"><Plus size={14} /></button>
          </div>
          <div className="divide-y divide-slate-50 flex-1 overflow-y-auto">
            {nexusTasks.slice(0, 4).map((task) => (
              <div key={task.id} className="px-4 py-3 flex items-start gap-3 hover:bg-slate-50/50 transition-colors group">
                <div className={`w-4 h-4 rounded border-2 mt-0.5 shrink-0 cursor-pointer hover:bg-violet-100 transition-colors ${task.status === "overdue" ? "border-red-400" : "border-slate-300"}`} />
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-slate-800 text-xs leading-snug">{task.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-[9px] font-black uppercase ${taskStatusColor(task.status)}`}>{task.due}</span>
                    <span className={`text-[8px] font-black px-1.5 py-0.5 rounded border uppercase ${priorityColor(task.priority)}`}>{task.priority}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // ─── Contacts View ───
  const ContactsView = () => (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-black text-slate-900 tracking-tight">Contacts</h1>
          <p className="text-slate-500 text-xs font-medium">{nexusContacts.length} contacts total</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
            <input type="text" value={contactSearch} onChange={(e) => setContactSearch(e.target.value)} placeholder="Search contacts..." className="bg-white border border-slate-200 rounded-xl py-2 pl-9 pr-3 text-xs outline-none focus:border-violet-400 focus:ring-1 focus:ring-violet-400/20 w-48 lg:w-64" />
          </div>
          <button className="bg-violet-600 text-white px-4 py-2 rounded-xl font-bold text-xs hover:bg-violet-700 transition-all flex items-center gap-1.5"><Plus size={14} /> Add Contact</button>
        </div>
      </div>

      {/* Contact Detail Slide */}
      <AnimatePresence>
        {selectedContact && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
            <div className="bg-white rounded-2xl border border-violet-200 shadow-lg p-5 mb-2">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-violet-500 to-blue-500 rounded-2xl flex items-center justify-center font-black text-white text-lg shadow-lg">{selectedContact.avatar}</div>
                  <div>
                    <h2 className="text-lg font-black text-slate-900">{selectedContact.name}</h2>
                    <p className="text-xs text-slate-500">{selectedContact.email} &bull; {selectedContact.company}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`text-[8px] font-black px-2 py-0.5 rounded-full border uppercase tracking-wider ${lifecycleColor(selectedContact.lifecycle)}`}>{selectedContact.lifecycle}</span>
                      <span className="text-[9px] text-slate-400">Owner: {selectedContact.owner}</span>
                    </div>
                  </div>
                </div>
                <button onClick={() => setSelectedContact(null)} className="p-2 hover:bg-slate-100 rounded-xl transition-colors"><X size={16} className="text-slate-400" /></button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4 pt-4 border-t border-slate-100">
                <div className="p-3 bg-slate-50 rounded-xl"><p className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Phone</p><p className="text-xs font-bold text-slate-700 mt-0.5">{selectedContact.phone}</p></div>
                <div className="p-3 bg-slate-50 rounded-xl"><p className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Deal Value</p><p className="text-xs font-bold text-slate-700 mt-0.5">£{selectedContact.dealValue.toLocaleString()}</p></div>
                <div className="p-3 bg-slate-50 rounded-xl"><p className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Last Activity</p><p className="text-xs font-bold text-slate-700 mt-0.5">{selectedContact.lastActivity}</p></div>
                <div className="flex items-center gap-2 p-3">
                  <button className="flex-1 bg-violet-600 text-white py-2 rounded-xl text-[10px] font-black uppercase hover:bg-violet-700 transition-all">Email</button>
                  <button className="flex-1 bg-blue-600 text-white py-2 rounded-xl text-[10px] font-black uppercase hover:bg-blue-700 transition-all">Call</button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contacts Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px]">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="text-left p-3 pl-5 text-[9px] font-black text-slate-400 uppercase tracking-widest">Name</th>
                <th className="text-left p-3 text-[9px] font-black text-slate-400 uppercase tracking-widest hidden md:table-cell">Company</th>
                <th className="text-left p-3 text-[9px] font-black text-slate-400 uppercase tracking-widest">Stage</th>
                <th className="text-left p-3 text-[9px] font-black text-slate-400 uppercase tracking-widest hidden lg:table-cell">Owner</th>
                <th className="text-left p-3 text-[9px] font-black text-slate-400 uppercase tracking-widest hidden lg:table-cell">Last Activity</th>
                <th className="p-3 pr-5"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredContacts.map((contact) => (
                <tr key={contact.id} onClick={() => setSelectedContact(contact)} className="hover:bg-violet-50/30 cursor-pointer transition-colors group">
                  <td className="p-3 pl-5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-violet-100 to-blue-100 rounded-lg flex items-center justify-center font-black text-violet-600 text-[10px] group-hover:from-violet-200 group-hover:to-blue-200 transition-colors">{contact.avatar}</div>
                      <div>
                        <p className="font-bold text-slate-900 text-xs">{contact.name}</p>
                        <p className="text-[10px] text-slate-400">{contact.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-3 hidden md:table-cell"><span className="text-xs font-medium text-slate-600">{contact.company}</span></td>
                  <td className="p-3"><span className={`text-[8px] font-black px-2 py-0.5 rounded-full border uppercase tracking-wider ${lifecycleColor(contact.lifecycle)}`}>{contact.lifecycle}</span></td>
                  <td className="p-3 hidden lg:table-cell"><span className="text-xs text-slate-500">{contact.owner}</span></td>
                  <td className="p-3 hidden lg:table-cell"><span className="text-[10px] text-slate-400">{contact.lastActivity}</span></td>
                  <td className="p-3 pr-5"><MoreHorizontal size={14} className="text-slate-300 group-hover:text-violet-500 transition-colors" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // ─── Deals View (Kanban) ───
  const DealsView = () => (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-black text-slate-900 tracking-tight">Deal Pipeline</h1>
          <p className="text-slate-500 text-xs font-medium">{nexusDeals.length} deals &bull; £{nexusDeals.reduce((s, d) => s + d.amount, 0).toLocaleString()} total value</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="bg-white border border-slate-200 rounded-xl p-0.5 flex">
            <button onClick={() => setDealViewMode("board")} className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all ${dealViewMode === "board" ? "bg-violet-600 text-white shadow-sm" : "text-slate-500 hover:text-slate-700"}`}>Board</button>
            <button onClick={() => setDealViewMode("list")} className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all ${dealViewMode === "list" ? "bg-violet-600 text-white shadow-sm" : "text-slate-500 hover:text-slate-700"}`}>List</button>
          </div>
          <button className="bg-violet-600 text-white px-4 py-2 rounded-xl font-bold text-xs hover:bg-violet-700 transition-all flex items-center gap-1.5"><Plus size={14} /> Create Deal</button>
        </div>
      </div>

      {dealViewMode === "board" ? (
        <div className="flex gap-3 overflow-x-auto pb-4 -mx-1 px-1">
          {nexusDealStages.filter(s => s.stage !== "Closed Lost").map((stage) => {
            const stageDeals = nexusDeals.filter(d => d.stage === stage.stage);
            const stageTotal = stageDeals.reduce((s, d) => s + d.amount, 0);
            return (
              <div key={stage.stage} className="min-w-[220px] w-[220px] lg:min-w-[240px] lg:w-[240px] flex-shrink-0">
                <div className="flex items-center justify-between mb-3 px-1">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: stage.color }} />
                    <span className="text-[10px] font-black text-slate-600 uppercase tracking-wider">{stage.stage}</span>
                  </div>
                  <span className="text-[9px] font-bold text-slate-400">{stageDeals.length}</span>
                </div>
                <div className="text-[9px] font-black text-slate-400 px-1 mb-2">£{stageTotal.toLocaleString()}</div>
                <div className="space-y-2">
                  {stageDeals.map((deal) => (
                    <div key={deal.id} className="bg-white rounded-xl border border-slate-100 p-3 shadow-sm hover:shadow-md hover:border-violet-200 transition-all cursor-pointer group">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <p className="font-bold text-slate-900 text-xs leading-snug">{deal.name}</p>
                        <GripVertical size={12} className="text-slate-300 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <p className="text-lg font-black text-slate-900">£{deal.amount.toLocaleString()}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-[9px] text-slate-400">{deal.contact}</span>
                        <span className={`text-[8px] font-black px-1.5 py-0.5 rounded border uppercase ${priorityColor(deal.priority)}`}>{deal.priority}</span>
                      </div>
                      <div className="flex items-center gap-1 mt-2 text-[9px] text-slate-400">
                        <Calendar size={10} />
                        <span>Close: {deal.closeDate}</span>
                      </div>
                    </div>
                  ))}
                  {stageDeals.length === 0 && (
                    <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center">
                      <p className="text-[10px] text-slate-400 font-bold">No deals</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px]">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="text-left p-3 pl-5 text-[9px] font-black text-slate-400 uppercase tracking-widest">Deal Name</th>
                  <th className="text-left p-3 text-[9px] font-black text-slate-400 uppercase tracking-widest">Amount</th>
                  <th className="text-left p-3 text-[9px] font-black text-slate-400 uppercase tracking-widest">Stage</th>
                  <th className="text-left p-3 text-[9px] font-black text-slate-400 uppercase tracking-widest hidden md:table-cell">Contact</th>
                  <th className="text-left p-3 text-[9px] font-black text-slate-400 uppercase tracking-widest hidden lg:table-cell">Close Date</th>
                  <th className="text-left p-3 text-[9px] font-black text-slate-400 uppercase tracking-widest hidden lg:table-cell">Priority</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {nexusDeals.map((deal) => {
                  const stageInfo = nexusDealStages.find(s => s.stage === deal.stage);
                  return (
                    <tr key={deal.id} className="hover:bg-violet-50/30 cursor-pointer transition-colors">
                      <td className="p-3 pl-5"><span className="font-bold text-slate-900 text-xs">{deal.name}</span></td>
                      <td className="p-3"><span className="font-black text-slate-900 text-xs">£{deal.amount.toLocaleString()}</span></td>
                      <td className="p-3">
                        <div className="flex items-center gap-1.5">
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: stageInfo?.color }} />
                          <span className="text-[10px] font-bold text-slate-600">{deal.stage}</span>
                        </div>
                      </td>
                      <td className="p-3 hidden md:table-cell"><span className="text-xs text-slate-500">{deal.contact}</span></td>
                      <td className="p-3 hidden lg:table-cell"><span className="text-[10px] text-slate-400">{deal.closeDate}</span></td>
                      <td className="p-3 hidden lg:table-cell"><span className={`text-[8px] font-black px-1.5 py-0.5 rounded border uppercase ${priorityColor(deal.priority)}`}>{deal.priority}</span></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );

  // ─── Tasks View ───
  const TasksView = () => (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-black text-slate-900 tracking-tight">Tasks</h1>
          <p className="text-slate-500 text-xs font-medium">{nexusTasks.length} tasks &bull; {nexusTasks.filter(t => t.status === "overdue").length} overdue</p>
        </div>
        <button className="bg-violet-600 text-white px-4 py-2 rounded-xl font-bold text-xs hover:bg-violet-700 transition-all flex items-center gap-1.5 w-fit"><Plus size={14} /> Add Task</button>
      </div>
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden divide-y divide-slate-50">
        {nexusTasks.map((task) => (
          <div key={task.id} className="p-4 flex items-start gap-3 hover:bg-slate-50/50 transition-colors group">
            <div className={`w-5 h-5 rounded border-2 mt-0.5 shrink-0 cursor-pointer hover:bg-violet-100 transition-colors flex items-center justify-center ${task.status === "overdue" ? "border-red-400" : "border-slate-300"}`} />
            <div className="flex-1 min-w-0">
              <p className="font-bold text-slate-800 text-sm">{task.title}</p>
              <div className="flex flex-wrap items-center gap-2 mt-1.5">
                <span className="text-[9px] font-bold text-slate-500 flex items-center gap-1"><User size={10} />{task.contact}</span>
                <span className={`text-[9px] font-black uppercase flex items-center gap-1 ${taskStatusColor(task.status)}`}><Clock size={10} />{task.due}</span>
                <span className={`text-[8px] font-black px-1.5 py-0.5 rounded border uppercase ${priorityColor(task.priority)}`}>{task.priority}</span>
                <span className="text-[9px] font-bold text-slate-400 flex items-center gap-1">
                  {task.type === "call" ? <Phone size={10} /> : task.type === "email" ? <Mail size={10} /> : <CheckSquare size={10} />}
                  {task.type}
                </span>
              </div>
            </div>
            <MoreHorizontal size={14} className="text-slate-300 group-hover:text-violet-500 transition-colors shrink-0 mt-1" />
          </div>
        ))}
      </div>
    </div>
  );

  // ─── Inbox View ───
  const InboxView = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-slate-900 tracking-tight">Inbox</h1>
          <p className="text-slate-500 text-xs font-medium">{nexusEmails.filter(e => !e.read).length} unread conversations</p>
        </div>
      </div>
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex" style={{ minHeight: 450 }}>
        {/* Email List */}
        <div className={`${selectedEmail ? "hidden md:block" : "block"} w-full md:w-80 lg:w-96 border-r border-slate-100 overflow-y-auto`}>
          {nexusEmails.map((email) => (
            <div
              key={email.id}
              onClick={() => setSelectedEmail(email)}
              className={`p-4 border-b border-slate-50 cursor-pointer transition-all hover:bg-violet-50/30 ${
                selectedEmail?.id === email.id ? "bg-violet-50/50 border-l-2 border-l-violet-500" : ""
              } ${!email.read ? "bg-blue-50/20" : ""}`}
            >
              <div className="flex items-center justify-between gap-2 mb-1">
                <div className="flex items-center gap-2 min-w-0">
                  {!email.read && <Circle size={6} fill="#7c3aed" className="text-violet-500 shrink-0" />}
                  <span className={`text-xs truncate ${!email.read ? "font-black text-slate-900" : "font-bold text-slate-600"}`}>{email.from}</span>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  {email.starred && <Star size={12} fill="#f59e0b" className="text-amber-400" />}
                  <span className="text-[9px] text-slate-400">{email.time}</span>
                </div>
              </div>
              <p className={`text-xs truncate ${!email.read ? "font-bold text-slate-800" : "text-slate-600"}`}>{email.subject}</p>
              <p className="text-[10px] text-slate-400 truncate mt-0.5">{email.preview}</p>
              <div className="flex items-center gap-1.5 mt-1.5">
                {email.labels.map((label) => (
                  <span key={label} className="text-[7px] font-black px-1.5 py-0.5 rounded bg-violet-50 text-violet-500 uppercase tracking-wider">{label}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Email Detail */}
        <div className={`${selectedEmail ? "block" : "hidden md:flex"} flex-1 flex flex-col`}>
          {selectedEmail ? (
            <>
              <div className="p-4 border-b border-slate-100 flex items-center justify-between shrink-0">
                <button onClick={() => setSelectedEmail(null)} className="md:hidden p-2 hover:bg-slate-100 rounded-lg"><ChevronLeft size={16} /></button>
                <div className="flex items-center gap-1.5">
                  <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition-colors"><Reply size={16} /></button>
                  <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition-colors"><Forward size={16} /></button>
                  <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition-colors"><Archive size={16} /></button>
                  <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                </div>
              </div>
              <div className="flex-1 p-5 overflow-y-auto">
                <h2 className="text-lg font-black text-slate-900 mb-4">{selectedEmail.subject}</h2>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-blue-500 rounded-xl flex items-center justify-center font-black text-white text-xs">{selectedEmail.from.split(" ").map(n => n[0]).join("")}</div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">{selectedEmail.from}</p>
                    <p className="text-[10px] text-slate-400">{selectedEmail.email} &bull; {selectedEmail.time}</p>
                  </div>
                </div>
                <div className="prose prose-sm max-w-none text-slate-600 text-sm leading-relaxed">
                  <p>{selectedEmail.preview}</p>
                  <p className="mt-4 text-slate-400 italic text-xs">— This is a demo preview. In a live CRM, the full email thread and attachments would appear here.</p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-2">
                    {selectedEmail.labels.map((label) => (
                      <span key={label} className="flex items-center gap-1 text-[9px] font-black px-2 py-1 rounded-lg bg-violet-50 text-violet-500 uppercase tracking-wider"><Tag size={10} />{label}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="p-4 border-t border-slate-100 shrink-0">
                <div className="flex items-center gap-2">
                  <input type="text" placeholder="Write a reply..." className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-violet-400 focus:ring-1 focus:ring-violet-400/20" />
                  <button className="bg-violet-600 text-white p-2.5 rounded-xl hover:bg-violet-700 transition-all"><Send size={14} /></button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-center p-8">
              <div>
                <Inbox size={40} className="mx-auto text-slate-200 mb-3" />
                <p className="text-sm font-bold text-slate-400">Select a conversation</p>
                <p className="text-xs text-slate-300 mt-1">Choose an email from the left to read it here</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // ─── Reports View ───
  const ReportsView = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-black text-slate-900 tracking-tight">Reports</h1>
        <p className="text-slate-500 text-xs font-medium">Sales performance and pipeline analytics</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* Revenue by Source */}
        <div className="bg-white p-5 md:p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-sm font-black text-slate-900 tracking-tight">Revenue by Source</h3>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Attribution breakdown</p>
            </div>
          </div>
          <div className="h-[220px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={nexusRevenueBySource} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 10, fontWeight: 800 }} tickFormatter={(v: number) => `£${(v / 1000).toFixed(0)}k`} />
                <YAxis type="category" dataKey="source" axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 10, fontWeight: 800 }} width={60} />
                <Tooltip contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)" }} formatter={(value) => [`£${Number(value).toLocaleString()}`, "Revenue"]} />
                <Bar dataKey="value" fill="#7c3aed" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Deals Won vs Lost */}
        <div className="bg-white p-5 md:p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-sm font-black text-slate-900 tracking-tight">Deals Won vs Lost</h3>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Monthly comparison</p>
            </div>
          </div>
          <div className="h-[220px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={nexusMonthlyDeals}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 10, fontWeight: 800 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 10, fontWeight: 800 }} />
                <Tooltip contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)" }} />
                <Bar dataKey="won" fill="#10b981" radius={[8, 8, 0, 0]} name="Won" />
                <Bar dataKey="lost" fill="#ef4444" radius={[8, 8, 0, 0]} name="Lost" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Email Performance */}
        <div className="bg-white p-5 md:p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-sm font-black text-slate-900 tracking-tight">Email Performance</h3>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Open & click tracking</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 mb-4">
            {[
              { label: "Sent", value: "342", icon: Send },
              { label: "Opened", value: "67%", icon: Eye },
              { label: "Clicked", value: "23%", icon: MousePointerClick },
            ].map((m) => (
              <div key={m.label} className="p-3 bg-slate-50 rounded-xl text-center">
                <m.icon size={16} className="mx-auto text-violet-500 mb-1" />
                <p className="text-lg font-black text-slate-900">{m.value}</p>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">{m.label}</p>
              </div>
            ))}
          </div>
          <div className="h-[120px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={[
                { day: "Mon", opens: 45, clicks: 12 },
                { day: "Tue", opens: 52, clicks: 18 },
                { day: "Wed", opens: 38, clicks: 9 },
                { day: "Thu", opens: 61, clicks: 22 },
                { day: "Fri", opens: 55, clicks: 15 },
                { day: "Sat", opens: 28, clicks: 8 },
                { day: "Sun", opens: 19, clicks: 5 },
              ]}>
                <defs>
                  <linearGradient id="colorOpens" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 9, fontWeight: 800 }} />
                <Tooltip contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }} />
                <Area type="monotone" dataKey="opens" stroke="#7c3aed" strokeWidth={2} fillOpacity={1} fill="url(#colorOpens)" name="Opens" />
                <Area type="monotone" dataKey="clicks" stroke="#2563eb" strokeWidth={2} fillOpacity={0} name="Clicks" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sales Rep Leaderboard */}
        <div className="bg-white p-5 md:p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-sm font-black text-slate-900 tracking-tight">Sales Leaderboard</h3>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Rep performance this quarter</p>
            </div>
          </div>
          <div className="space-y-3">
            {[
              { name: "Sarah K.", deals: 12, revenue: 198000, quota: 85, avatar: "SK" },
              { name: "Alex D.", deals: 9, revenue: 162000, quota: 72, avatar: "AD" },
              { name: "Tom R.", deals: 7, revenue: 115000, quota: 58, avatar: "TR" },
            ].map((rep, i) => (
              <div key={rep.name} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                <div className="text-xs font-black text-slate-400 w-4">{i + 1}</div>
                <div className="w-9 h-9 bg-gradient-to-br from-violet-500 to-blue-500 rounded-lg flex items-center justify-center font-black text-white text-[10px]">{rep.avatar}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-slate-900 text-xs">{rep.name}</p>
                    <p className="font-black text-slate-900 text-xs">£{(rep.revenue / 1000).toFixed(0)}k</p>
                  </div>
                  <div className="flex items-center gap-2 mt-1.5">
                    <div className="flex-1 bg-slate-200 rounded-full h-1.5 overflow-hidden">
                      <div className="h-full rounded-full bg-violet-500 transition-all" style={{ width: `${rep.quota}%` }} />
                    </div>
                    <span className="text-[9px] font-black text-slate-500">{rep.quota}%</span>
                  </div>
                  <p className="text-[9px] text-slate-400 mt-0.5">{rep.deals} deals closed</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // ─── Placeholder View for non-built sections ───
  const PlaceholderView = ({ title, description, icon: Icon }: { title: string; description: string; icon: React.ComponentType<{ size?: number; className?: string }> }) => (
    <div className="flex items-center justify-center" style={{ minHeight: 400 }}>
      <div className="text-center">
        <div className="w-16 h-16 bg-violet-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Icon size={28} className="text-violet-400" />
        </div>
        <h2 className="text-lg font-black text-slate-900 mb-1">{title}</h2>
        <p className="text-xs text-slate-500 max-w-xs">{description}</p>
      </div>
    </div>
  );

  const renderView = () => {
    switch (activeView) {
      case "dashboard": return <DashboardView />;
      case "contacts": return <ContactsView />;
      case "deals": return <DealsView />;
      case "tasks": return <TasksView />;
      case "inbox": return <InboxView />;
      case "reports": return <ReportsView />;
      case "companies": return <PlaceholderView title="Companies" description="Manage company records, hierarchies, and account-level insights. View associated contacts and deals." icon={Building2} />;
      case "tickets": return <PlaceholderView title="Tickets" description="Track customer support requests, route tickets to agents, and manage SLA compliance." icon={Ticket} />;
      case "marketing": return <PlaceholderView title="Marketing Hub" description="Create email campaigns, manage social media, track ad performance, and build landing pages." icon={Target} />;
      case "automation": return <PlaceholderView title="Automation" description="Build visual workflows with triggers, conditions, and actions. Automate lead nurturing, deal progression, and task creation." icon={Zap} />;
      case "settings": return <PlaceholderView title="Settings" description="Configure your CRM — manage users, permissions, integrations, and account preferences." icon={Settings} />;
      default: return <DashboardView />;
    }
  };

  return (
    <div className="glass-card p-0 overflow-hidden">
      {/* Header label */}
      <div className="px-8 pt-8 pb-4 border-b border-navy-700/50 flex items-center gap-3">
        <Database className="w-6 h-6 text-gold" />
        <h3 className="font-serif text-2xl text-gold-light">Custom CRM Platform</h3>
      </div>
      <p className="text-text-muted text-sm px-8 pt-4 pb-2">
        A full-featured CRM we built from the ground up — contact management, deal pipelines, email tracking, task automation, and reporting in one unified platform.
      </p>

      {/* CRM Container */}
      <div className="m-4 md:m-6 rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 flex" style={{ minHeight: 700 }}>
        {/* Sidebar */}
        <aside className={`${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 fixed md:static inset-y-0 left-0 z-50 w-60 bg-[#1e1b4b] text-white flex flex-col transition-transform duration-300 md:rounded-l-2xl`}>
          <div className="flex h-14 items-center px-5 border-b border-indigo-900/50 shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-gradient-to-br from-violet-400 to-blue-500 rounded-lg flex items-center justify-center shadow-lg shadow-violet-500/20">
                <Database className="text-white" size={16} />
              </div>
              <span className="text-sm font-black tracking-tight text-white">Nexus<span className="text-violet-400">CRM</span></span>
            </div>
          </div>

          <nav className="p-3 flex-1 overflow-y-auto text-left">
            {(() => {
              let lastSection = "";
              return nexusNavItems.map((item) => {
                const showSection = item.section && item.section !== lastSection;
                if (item.section) lastSection = item.section;
                return (
                  <div key={item.name}>
                    {showSection && (
                      <p className="text-[8px] font-black text-indigo-400/50 uppercase tracking-[0.2em] px-3 pt-4 pb-1">{item.section}</p>
                    )}
                    <button
                      onClick={() => { setActiveView(item.view); setSidebarOpen(false); }}
                      className={`group flex items-center gap-2.5 px-3 py-2 rounded-lg transition-all w-full text-left ${
                        activeView === item.view
                          ? "bg-violet-600 text-white shadow-lg shadow-violet-600/20"
                          : "text-indigo-300/70 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <item.icon size={15} className={activeView === item.view ? "text-white" : "text-indigo-400/50 group-hover:text-violet-400"} />
                      <span className="font-bold text-xs">{item.name}</span>
                    </button>
                  </div>
                );
              });
            })()}
          </nav>

          <div className="p-3 border-t border-indigo-900/50 shrink-0">
            <div className="flex items-center gap-2.5 px-3 py-2">
              <div className="w-7 h-7 bg-gradient-to-br from-violet-500 to-blue-500 rounded-lg flex items-center justify-center font-black text-white text-[9px]">SK</div>
              <div className="min-w-0">
                <p className="text-[10px] font-bold text-white truncate">Sarah K.</p>
                <p className="text-[8px] text-indigo-400/50 font-bold uppercase tracking-wider">Sales Manager</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 md:hidden" onClick={() => setSidebarOpen(false)} />
        )}

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Top Navbar */}
          <header className="h-12 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-4 lg:px-6 sticky top-0 z-30 shrink-0">
            <div className="flex items-center gap-3">
              <button className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors" onClick={() => setSidebarOpen(!sidebarOpen)}>
                <MenuIcon size={18} />
              </button>
              <div className="hidden md:flex relative group w-48 lg:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-violet-500 transition-colors" size={14} />
                <input type="text" placeholder="Search CRM..." className="w-full bg-slate-100 border-2 border-transparent focus:bg-white focus:border-violet-500/20 rounded-xl py-1.5 pl-8 pr-3 text-xs outline-none transition-all placeholder:text-slate-400" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-1.5 text-slate-500 hover:bg-slate-100 rounded-lg transition-all relative">
                <Bell size={16} />
                <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full border border-white" />
              </button>
              <button className="p-1.5 text-slate-500 hover:bg-slate-100 rounded-lg transition-all">
                <Settings size={16} />
              </button>
            </div>
          </header>

          {/* Content */}
          <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 sm:p-5 lg:p-6 bg-[#FBFBFE]">
            <div className="max-w-[1400px] mx-auto text-left">
              {renderView()}
            </div>
          </main>
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
          <NexusCRMDemo />
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
