"use client";

import { motion } from "framer-motion";
import { company } from "@/data/company";
import SectionHeading from "@/components/ui/SectionHeading";
import { fadeInUp, staggerContainer, slideInLeft, slideInRight } from "@/lib/animations";
import { Target, Lightbulb, Users, Rocket } from "lucide-react";

const teamMembers = [
  { name: "AI Engineering Team", role: "LLM Integration, Prompt Architecture, RAG Systems" },
  { name: "Software Engineering Team", role: "Fullstack Development, API Design, DevOps" },
  { name: "Data Science Team", role: "Deep Learning, Computer Vision, Analytics" },
  { name: "Cybersecurity Team", role: "Security Auditing, Secure Infrastructure, Compliance" },
];

export default function AboutPage() {
  return (
    <div className="relative z-10">
      {/* Hero */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="font-serif text-4xl md:text-6xl mb-6"
          >
            About <span className="gold-text">StarTeck</span>
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="text-text-muted text-lg md:text-xl leading-relaxed"
          >
            {company.description}
          </motion.p>
          <motion.p
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="text-gold-light mt-4 font-medium"
          >
            Headquartered in Manchester, UK, we are dedicated to driving innovation
            within the region&apos;s thriving tech ecosystem.
          </motion.p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-3xl mb-6">
              The Technology Arm of <span className="gold-text">StarFM</span>
            </h2>
            <p className="text-text-muted leading-relaxed mb-4">
              {company.longDescription}
            </p>
            <p className="text-text-muted leading-relaxed">
              Whether you need an intelligent dashboard to visualize data, an autonomous
              agentic workflow, or highly secure, localized data retrieval, our team
              delivers complete end-to-end development.
            </p>
          </motion.div>
          <motion.div
            variants={slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            {[
              { icon: <Target className="w-6 h-6" />, label: "Custom Solutions", value: "100%" },
              { icon: <Lightbulb className="w-6 h-6" />, label: "AI Capabilities", value: "7+" },
              { icon: <Users className="w-6 h-6" />, label: "Expert Teams", value: "4" },
              { icon: <Rocket className="w-6 h-6" />, label: "End-to-End", value: "Delivery" },
            ].map((stat) => (
              <div key={stat.label} className="glass-card p-6 text-center">
                <div className="text-gold mb-2 flex justify-center">{stat.icon}</div>
                <div className="font-serif text-2xl text-gold-light mb-1">{stat.value}</div>
                <div className="text-text-muted text-sm">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="glass-card p-10"
          >
            <h3 className="font-serif text-2xl text-gold-light mb-4">Our Mission</h3>
            <p className="text-text-muted leading-relaxed">{company.mission}</p>
          </motion.div>
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="glass-card p-10"
          >
            <h3 className="font-serif text-2xl text-gold-light mb-4">Our Vision</h3>
            <p className="text-text-muted leading-relaxed">{company.vision}</p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-6">
        <SectionHeading subtitle="The principles that guide every solution we build.">
          Our <span className="gold-text">Values</span>
        </SectionHeading>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8"
        >
          {company.values.map((value) => (
            <motion.div key={value.title} variants={fadeInUp} className="glass-card p-8">
              <h3 className="font-serif text-xl text-gold-light mb-3">{value.title}</h3>
              <p className="text-text-muted text-sm leading-relaxed">{value.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Teams */}
      <section className="py-16 px-6">
        <SectionHeading subtitle="Specialized teams working together to deliver excellence.">
          Our <span className="gold-text">Teams</span>
        </SectionHeading>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-4xl mx-auto grid sm:grid-cols-2 gap-6"
        >
          {teamMembers.map((member) => (
            <motion.div key={member.name} variants={fadeInUp} className="glass-card p-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold-light to-gold-dark mb-4 flex items-center justify-center text-navy-950 font-bold text-lg">
                {member.name.charAt(0)}
              </div>
              <h3 className="text-text-main font-semibold mb-1">{member.name}</h3>
              <p className="text-text-muted text-sm">{member.role}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
}
