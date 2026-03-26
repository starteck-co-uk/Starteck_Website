"use client";

import { motion } from "framer-motion";
import { Shield, Settings, Monitor } from "lucide-react";
import { fadeInUp } from "@/lib/animations";

const reasons = [
  {
    icon: <Shield className="w-10 h-10" />,
    title: "Uncompromised Security",
    description:
      "We build highly secure, localized AI systems (like Offline RAG) ensuring your sensitive enterprise data stays entirely in-house and out of public models.",
  },
  {
    icon: <Settings className="w-10 h-10" />,
    title: "Bespoke Engineering",
    description:
      "We don't offer generic, off-the-shelf software. Every product is engineered from the ground up to fit seamlessly into your existing technical architecture and workflows.",
  },
  {
    icon: <Monitor className="w-10 h-10" />,
    title: "End-to-End Delivery",
    description:
      "We bridge the gap between advanced AI modeling and robust software engineering, delivering complete systems right down to the modern, user-friendly UI dashboards.",
  },
];

export default function WhyUsSection() {
  return (
    <section className="py-24 px-6 relative z-10">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16">
        {/* Sticky heading */}
        <div className="lg:w-2/5 lg:sticky lg:top-40 lg:self-start">
          <motion.h2
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="font-serif text-3xl md:text-5xl leading-[1.1]"
          >
            Why Partner With
            <br />
            <span className="gold-text">StarTeck?</span>
          </motion.h2>
        </div>

        {/* Scrolling cards */}
        <div className="lg:w-3/5 flex flex-col gap-12">
          {reasons.map((reason, i) => (
            <motion.div
              key={reason.title}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="glass-card p-8 md:p-10"
            >
              <div className="text-gold mb-5">{reason.icon}</div>
              <h3 className="font-serif text-xl md:text-2xl text-gold-light mb-3">
                {reason.title}
              </h3>
              <p className="text-text-muted leading-relaxed">{reason.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
