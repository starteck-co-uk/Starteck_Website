"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { blogPosts } from "@/data/blog";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogPage() {
  return (
    <div className="relative z-10 py-24 px-6">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <motion.h1
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="font-serif text-4xl md:text-6xl mb-6"
        >
          <span className="gold-text">Blog</span>
        </motion.h1>
        <motion.p
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="text-text-muted text-lg max-w-2xl mx-auto"
        >
          Insights on AI engineering, enterprise solutions, and the technology
          shaping the future of business.
        </motion.p>
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-4xl mx-auto flex flex-col gap-8"
      >
        {blogPosts.map((post) => (
          <motion.div key={post.slug} variants={fadeInUp}>
            <Link href={`/blog/${post.slug}`} className="block group">
              <article className="glass-card p-8 transition-all hover:-translate-y-1">
                <div className="flex items-center gap-4 text-text-muted text-sm mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar size={14} /> {formatDate(post.date)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={14} /> {post.readTime}
                  </span>
                </div>
                <h2 className="font-serif text-xl md:text-2xl text-gold-light mb-3 group-hover:text-gold transition-colors">
                  {post.title}
                </h2>
                <p className="text-text-muted leading-relaxed mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-3 py-1 rounded-full bg-navy-700/60 border border-gold/20 text-gold-light"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1 text-gold text-sm font-medium group-hover:gap-2 transition-all">
                    Read <ArrowRight size={14} />
                  </span>
                </div>
              </article>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
