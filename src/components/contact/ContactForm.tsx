"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import { services } from "@/data/services";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  company: z.string().optional(),
  service: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setStatus("success");
        reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card p-10 text-center"
      >
        <CheckCircle className="w-12 h-12 text-gold mx-auto mb-4" />
        <h3 className="font-serif text-2xl text-gold-light mb-2">Message Sent!</h3>
        <p className="text-text-muted">
          Thank you for reaching out. We&apos;ll get back to you shortly.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-6 text-gold hover:text-gold-light transition-colors text-sm"
        >
          Send another message
        </button>
      </motion.div>
    );
  }

  const inputStyles =
    "w-full bg-navy-900/80 border border-navy-700 rounded-xl px-4 py-3 text-text-main placeholder:text-text-muted/50 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 transition-colors";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="glass-card p-8 md:p-10">
      {status === "error" && (
        <div className="flex items-center gap-2 bg-red-900/30 border border-red-500/30 rounded-xl p-4 mb-6">
          <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
          <p className="text-red-300 text-sm">
            Something went wrong. Please try again or email us directly.
          </p>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm text-text-muted mb-2">Name *</label>
          <input
            {...register("name")}
            placeholder="Your name"
            className={inputStyles}
          />
          {errors.name && (
            <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm text-text-muted mb-2">Email *</label>
          <input
            {...register("email")}
            type="email"
            placeholder="your@email.com"
            className={inputStyles}
          />
          {errors.email && (
            <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm text-text-muted mb-2">Company</label>
          <input
            {...register("company")}
            placeholder="Your company"
            className={inputStyles}
          />
        </div>
        <div>
          <label className="block text-sm text-text-muted mb-2">Service Interest</label>
          <select {...register("service")} className={inputStyles}>
            <option value="">Select a service...</option>
            {services.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm text-text-muted mb-2">Message *</label>
        <textarea
          {...register("message")}
          rows={5}
          placeholder="Tell us about your project..."
          className={`${inputStyles} resize-none`}
        />
        {errors.message && (
          <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gradient-to-r from-gold-light to-gold-dark text-navy-950 py-3.5 rounded-xl font-semibold text-lg transition-all hover:scale-[1.02] hover:shadow-[0_10px_20px_rgba(217,165,92,0.3)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          "Sending..."
        ) : (
          <>
            Send Message <Send size={18} />
          </>
        )}
      </button>
    </form>
  );
}
