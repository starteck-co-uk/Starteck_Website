"use client";

import { motion } from "framer-motion";
import { company } from "@/data/company";
import SectionHeading from "@/components/ui/SectionHeading";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export default function ProcessSection() {
  return (
    <section className="py-24 px-6 relative z-10">
      <SectionHeading>
        How We <span className="gold-text">Build</span>
      </SectionHeading>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
      >
        {company.process.map((step) => (
          <motion.div
            key={step.step}
            variants={fadeInUp}
            className="relative text-center p-6"
          >
            <div className="font-serif text-6xl font-bold text-gold/10 absolute -top-4 left-1/2 -translate-x-1/2">
              {step.step}
            </div>
            <h3 className="font-serif text-lg text-text-main mt-8 mb-3">{step.title}</h3>
            <p className="text-text-muted text-sm leading-relaxed">{step.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
