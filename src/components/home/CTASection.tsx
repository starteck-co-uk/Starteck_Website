"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { company } from "@/data/company";

export default function CTASection() {
  return (
    <section className="py-24 px-6 relative z-10">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2 variants={fadeInUp} className="font-serif text-3xl md:text-5xl mb-6">
            Let&apos;s build something{" "}
            <span className="gold-text">exceptional</span> together.
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-text-muted text-lg mb-10">
            If you are looking to transform your data into a powerful, proprietary
            AI asset, we are ready to engineer the solution.
          </motion.p>
          <motion.div variants={fadeInUp}>
            <Link
              href="/contact"
              className="inline-block bg-gradient-to-r from-gold-light to-gold-dark text-navy-950 px-10 py-4 rounded-full font-bold text-lg transition-all hover:scale-105 hover:shadow-[0_10px_20px_rgba(217,165,92,0.3)]"
            >
              Contact Us at {company.email}
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
