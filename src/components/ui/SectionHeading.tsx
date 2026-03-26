"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";

interface SectionHeadingProps {
  children: React.ReactNode;
  subtitle?: string;
  className?: string;
}

export default function SectionHeading({ children, subtitle, className = "" }: SectionHeadingProps) {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className={`text-center mb-16 ${className}`}
    >
      <h2 className="font-serif text-3xl md:text-5xl mb-4">{children}</h2>
      {subtitle && <p className="text-text-muted text-lg max-w-2xl mx-auto">{subtitle}</p>}
    </motion.div>
  );
}
