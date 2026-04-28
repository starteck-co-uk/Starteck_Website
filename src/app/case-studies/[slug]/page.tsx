import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle, TrendingUp, Target, Lightbulb } from "lucide-react";
import type { Metadata } from "next";
import { caseStudies } from "@/data/case-studies";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return caseStudies.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudies.find((s) => s.slug === slug);
  if (!study) return {};
  return { title: study.title, description: study.summary };
}

export default async function CaseStudyDetailPage({ params }: Props) {
  const { slug } = await params;
  const study = caseStudies.find((s) => s.slug === slug);
  if (!study) notFound();

  return (
    <div className="relative z-10 py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/case-studies"
          className="inline-flex items-center gap-2 text-text-muted hover:text-gold transition-colors mb-8"
        >
          <ArrowLeft size={16} /> All Case Studies
        </Link>

        <p className="text-gold text-sm font-medium mb-2">{study.client} &mdash; {study.industry}</p>
        <h1 className="font-serif text-3xl md:text-5xl mb-4">
          <span className="gold-text">{study.title}</span>
        </h1>
        <p className="text-text-muted text-lg leading-relaxed mb-8">{study.summary}</p>

        <div className="flex flex-wrap gap-2 mb-12">
          {study.tags.map((tag) => (
            <span
              key={tag}
              className="text-sm px-4 py-1.5 rounded-full bg-navy-700/60 border border-gold/20 text-gold-light"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Challenge */}
        <div className="glass-card p-8 md:p-10 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Target className="w-6 h-6 text-gold" />
            <h2 className="font-serif text-2xl text-gold-light">The Challenge</h2>
          </div>
          <p className="text-text-muted leading-relaxed">{study.challenge}</p>
        </div>

        {/* Approach */}
        <div className="glass-card p-8 md:p-10 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Lightbulb className="w-6 h-6 text-gold" />
            <h2 className="font-serif text-2xl text-gold-light">Our Approach</h2>
          </div>
          <p className="text-text-muted leading-relaxed">{study.approach}</p>
        </div>

        {/* Results */}
        <div className="glass-card p-8 md:p-10 mb-12">
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="w-6 h-6 text-gold" />
            <h2 className="font-serif text-2xl text-gold-light">Results</h2>
          </div>
          <ul className="space-y-3">
            {study.results.map((result) => (
              <li key={result} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                <span className="text-text-muted leading-relaxed">{result}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <div className="glass-card p-8 md:p-10 text-center">
          <h3 className="font-serif text-2xl mb-4">
            Want similar <span className="gold-text">results</span>?
          </h3>
          <p className="text-text-muted mb-6">
            Let&apos;s discuss how we can build a custom solution for your organization.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-gradient-to-r from-gold-light to-gold-dark text-navy-950 px-8 py-3 rounded-full font-semibold transition-all hover:scale-105"
          >
            Start a Conversation
          </Link>
        </div>
      </div>
    </div>
  );
}
