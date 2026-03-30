"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export default function HeroSection() {
  return (
    <section className="min-h-[90vh] flex flex-col items-center justify-center text-center px-6 relative">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center"
      >
        <motion.h1
          variants={fadeInUp}
          className="font-serif text-4xl md:text-6xl lg:text-7xl max-w-4xl leading-[1.1]"
        >
          <span className="gold-text">Customized AI Products.</span>
          <br />
          Engineered for Excellence.
        </motion.h1>

        <motion.p
          variants={fadeInUp}
          className="text-text-muted text-lg md:text-xl max-w-2xl mt-6 leading-relaxed"
        >
          The dedicated technology and AI innovation arm of StarFM. We design,
          engineer, and deploy tailored, scalable solutions that fit your exact
          operational needs.
        </motion.p>

        <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 mt-10">
          <Link
            href="/services"
            className="bg-gradient-to-r from-gold-light to-gold-dark text-navy-950 px-8 py-4 rounded-full font-semibold text-lg transition-all hover:scale-105 hover:shadow-[0_10px_20px_rgba(217,165,92,0.3)]"
          >
            Explore Our Services
          </Link>
          <Link
            href="/contact"
            className="border border-gold text-gold-light px-8 py-4 rounded-full font-semibold text-lg transition-all hover:bg-gold/10"
          >
            Get in Touch
          </Link>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          className="mt-16 text-gold text-sm tracking-[3px] uppercase animate-bounce"
        >
          Explore Below &darr;
        </motion.div>
      </motion.div>
    </section>
  );
}
