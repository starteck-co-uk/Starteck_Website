"use client";

import { motion } from "framer-motion";
import { Mail, MapPin } from "lucide-react";
import ContactForm from "@/components/contact/ContactForm";
import { company } from "@/data/company";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export default function ContactPage() {
  return (
    <div className="relative z-10 py-24 px-6">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <motion.h1
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="font-serif text-4xl md:text-6xl mb-6"
        >
          Get in <span className="gold-text">Touch</span>
        </motion.h1>
        <motion.p
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="text-text-muted text-lg max-w-2xl mx-auto"
        >
          Ready to transform your data into a powerful AI asset? Tell us about
          your project and we&apos;ll get back to you promptly.
        </motion.p>
      </div>

      <div className="max-w-5xl mx-auto grid lg:grid-cols-3 gap-8">
        {/* Contact Info Sidebar */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="lg:col-span-1 space-y-6"
        >
          <motion.div variants={fadeInUp} className="glass-card p-6">
            <Mail className="w-6 h-6 text-gold mb-3" />
            <h3 className="font-semibold text-text-main mb-1">Contact Details</h3>
            <div className="flex flex-col gap-2">
              <a
                href={`mailto:${company.email}`}
                className="text-text-muted hover:text-gold transition-colors text-sm"
              >
                {company.email}
              </a>
              <a
                href={`tel:${company.phone}`}
                className="text-text-muted hover:text-gold transition-colors text-sm"
              >
                {company.phone}
              </a>
            </div>
          </motion.div>

          <motion.div variants={fadeInUp} className="glass-card p-6">
            <MapPin className="w-6 h-6 text-gold mb-3" />
            <h3 className="font-semibold text-text-main mb-1">Headquarters</h3>
            <p className="text-text-muted text-sm leading-relaxed">
              {company.address}
            </p>
          </motion.div>

          <motion.div variants={fadeInUp} className="glass-card p-6">
            <p className="text-text-muted text-sm leading-relaxed">
              Whether you have a specific project in mind or want to explore
              possibilities, we&apos;d love to hear from you. Our team typically
              responds within 24 hours.
            </p>
          </motion.div>
        </motion.div>

        {/* Form */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="lg:col-span-2"
        >
          <ContactForm />
        </motion.div>
      </div>
    </div>
  );
}
