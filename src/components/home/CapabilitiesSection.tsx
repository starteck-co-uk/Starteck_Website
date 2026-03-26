"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Sparkles,
  Database,
  Bot,
  Eye,
  Settings,
  LayoutDashboard,
  Shield,
  ArrowRight,
  X,
} from "lucide-react";
import { services } from "@/data/services";
import SectionHeading from "@/components/ui/SectionHeading";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const iconMap: Record<string, React.ReactNode> = {
  Sparkles: <Sparkles className="w-8 h-8" />,
  Database: <Database className="w-8 h-8" />,
  Bot: <Bot className="w-8 h-8" />,
  Eye: <Eye className="w-8 h-8" />,
  Settings: <Settings className="w-8 h-8" />,
  LayoutDashboard: <LayoutDashboard className="w-8 h-8" />,
  Shield: <Shield className="w-8 h-8" />,
};

export default function CapabilitiesSection() {
  const [selected, setSelected] = useState<string | null>(null);
  const activeService = services.find((s) => s.slug === selected);

  return (
    <section className="py-24 px-6 relative z-10">
      <SectionHeading subtitle="From GenAI to cybersecurity, we deliver end-to-end AI solutions.">
        Our <span className="gold-text">Core Capabilities</span>
      </SectionHeading>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {services.map((service) => (
          <motion.div
            key={service.slug}
            variants={fadeInUp}
            layoutId={service.slug}
            onClick={() => setSelected(service.slug)}
            className="glass-card p-8 cursor-pointer transition-all hover:-translate-y-1 group"
          >
            <div className="text-gold mb-4">{iconMap[service.icon]}</div>
            <h3 className="font-serif text-xl text-gold-light mb-3">{service.title}</h3>
            <p className="text-text-muted text-sm leading-relaxed">{service.summary}</p>
            <div className="flex flex-wrap gap-2 mt-4">
              {service.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1 rounded-full bg-navy-700/60 border border-gold/20 text-gold-light"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Expanded Detail Overlay */}
      <AnimatePresence>
        {activeService && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
              className="fixed inset-0 bg-navy-950/80 backdrop-blur-sm z-40"
            />
            <motion.div
              layoutId={activeService.slug}
              className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-2xl z-50 glass-card p-8 md:p-10 overflow-y-auto max-h-[90vh]"
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 text-text-muted hover:text-gold transition-colors"
              >
                <X size={24} />
              </button>
              <div className="text-gold mb-4">{iconMap[activeService.icon]}</div>
              <h2 className="font-serif text-2xl md:text-3xl text-gold-light mb-4">
                {activeService.title}
              </h2>
              <p className="text-text-muted leading-relaxed mb-6">{activeService.description}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {activeService.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-3 py-1 rounded-full bg-navy-700/60 border border-gold/20 text-gold-light"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <Link
                href={`/services/${activeService.slug}`}
                className="inline-flex items-center gap-2 text-gold hover:text-gold-light transition-colors font-medium"
              >
                Learn More <ArrowRight size={16} />
              </Link>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
