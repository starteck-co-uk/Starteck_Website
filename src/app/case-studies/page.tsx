"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { caseStudies } from "@/data/case-studies";

export default function CaseStudiesPage() {
  return (
    <div className="relative z-10 py-24 px-6">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <motion.h1
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="font-serif text-4xl md:text-6xl mb-6"
        >
          Case <span className="gold-text">Studies</span>
        </motion.h1>
        <motion.p
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="text-text-muted text-lg max-w-2xl mx-auto"
        >
          Real-world impact through bespoke AI solutions. Explore how we&apos;ve
          helped organizations transform their operations with cutting-edge 2026 systems.
        </motion.p>
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-5xl mx-auto flex flex-col gap-8"
      >
        {caseStudies.map((study) => (
          <motion.div key={study.slug} variants={fadeInUp}>
            <Link href={`/case-studies/${study.slug}`} className="block group">
              <div className="glass-card p-8 md:p-10 transition-all hover:-translate-y-1">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                  <div>
                    <p className="text-gold text-sm font-medium mb-2">{study.client} &mdash; {study.industry}</p>
                    <h2 className="font-serif text-2xl text-gold-light group-hover:text-gold transition-colors">
                      {study.title}
                    </h2>
                  </div>
                  <div className="glass-card px-4 py-2 text-sm text-gold-light whitespace-nowrap border-gold/40">
                    {study.keyMetric}
                  </div>
                </div>
                <p className="text-text-muted leading-relaxed mb-4">{study.summary}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {study.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1 rounded-full bg-navy-700/60 border border-gold/20 text-gold-light"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="inline-flex items-center gap-1 text-gold text-sm font-medium group-hover:gap-2 transition-all">
                  Read Case Study <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
