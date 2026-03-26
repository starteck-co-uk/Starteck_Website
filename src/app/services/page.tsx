"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Sparkles, Database, Bot, Eye, Settings, LayoutDashboard, Shield, ArrowRight,
} from "lucide-react";
import { services } from "@/data/services";
import SectionHeading from "@/components/ui/SectionHeading";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const iconMap: Record<string, React.ReactNode> = {
  Sparkles: <Sparkles className="w-10 h-10" />,
  Database: <Database className="w-10 h-10" />,
  Bot: <Bot className="w-10 h-10" />,
  Eye: <Eye className="w-10 h-10" />,
  Settings: <Settings className="w-10 h-10" />,
  LayoutDashboard: <LayoutDashboard className="w-10 h-10" />,
  Shield: <Shield className="w-10 h-10" />,
};

export default function ServicesPage() {
  return (
    <div className="relative z-10 py-24 px-6">
      <div className="max-w-4xl mx-auto text-center mb-4">
        <motion.h1
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="font-serif text-4xl md:text-6xl mb-6"
        >
          Our <span className="gold-text">Services</span>
        </motion.h1>
        <motion.p
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="text-text-muted text-lg max-w-2xl mx-auto"
        >
          From generative AI integration to secure infrastructure, we deliver
          end-to-end AI solutions tailored to your business.
        </motion.p>
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 mt-16"
      >
        {services.map((service) => (
          <motion.div key={service.slug} variants={fadeInUp}>
            <Link href={`/services/${service.slug}`} className="block group">
              <div className="glass-card p-8 h-full transition-all hover:-translate-y-1">
                <div className="text-gold mb-4">{iconMap[service.icon]}</div>
                <h2 className="font-serif text-xl text-gold-light mb-3 group-hover:text-gold transition-colors">
                  {service.title}
                </h2>
                <p className="text-text-muted text-sm leading-relaxed mb-4">
                  {service.summary}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {service.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1 rounded-full bg-navy-700/60 border border-gold/20 text-gold-light"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="inline-flex items-center gap-1 text-gold text-sm font-medium group-hover:gap-2 transition-all">
                  Learn More <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
