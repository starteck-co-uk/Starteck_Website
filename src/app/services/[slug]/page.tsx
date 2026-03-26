import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import { services } from "@/data/services";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.summary,
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const currentIndex = services.findIndex((s) => s.slug === slug);
  const prevService = currentIndex > 0 ? services[currentIndex - 1] : null;
  const nextService = currentIndex < services.length - 1 ? services[currentIndex + 1] : null;

  return (
    <div className="relative z-10 py-24 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Back link */}
        <Link
          href="/services"
          className="inline-flex items-center gap-2 text-text-muted hover:text-gold transition-colors mb-8"
        >
          <ArrowLeft size={16} /> All Services
        </Link>

        {/* Header */}
        <h1 className="font-serif text-3xl md:text-5xl mb-4">
          <span className="gold-text">{service.title}</span>
        </h1>
        <p className="text-text-muted text-lg leading-relaxed mb-8">{service.description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-12">
          {service.tags.map((tag) => (
            <span
              key={tag}
              className="text-sm px-4 py-1.5 rounded-full bg-navy-700/60 border border-gold/20 text-gold-light"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Features */}
        <div className="glass-card p-8 md:p-10 mb-12">
          <h2 className="font-serif text-2xl text-gold-light mb-6">What We Deliver</h2>
          <ul className="space-y-4">
            {service.features.map((feature) => (
              <li key={feature} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                <span className="text-text-muted leading-relaxed">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <div className="glass-card p-8 md:p-10 text-center mb-12">
          <h3 className="font-serif text-2xl mb-4">
            Interested in <span className="gold-text">{service.title}</span>?
          </h3>
          <p className="text-text-muted mb-6">
            Let&apos;s discuss how we can build a custom solution for your needs.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-gradient-to-r from-gold-light to-gold-dark text-navy-950 px-8 py-3 rounded-full font-semibold transition-all hover:scale-105"
          >
            Get in Touch
          </Link>
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          {prevService ? (
            <Link
              href={`/services/${prevService.slug}`}
              className="flex items-center gap-2 text-text-muted hover:text-gold transition-colors"
            >
              <ArrowLeft size={16} /> {prevService.title}
            </Link>
          ) : (
            <div />
          )}
          {nextService && (
            <Link
              href={`/services/${nextService.slug}`}
              className="flex items-center gap-2 text-text-muted hover:text-gold transition-colors"
            >
              {nextService.title} <ArrowRight size={16} />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
