import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle, TrendingUp, Target, Lightbulb } from "lucide-react";
import type { Metadata } from "next";

interface CaseStudy {
  slug: string;
  title: string;
  client: string;
  industry: string;
  summary: string;
  challenge: string;
  approach: string;
  results: string[];
  tags: string[];
  keyMetric: string;
}

const caseStudies: CaseStudy[] = [
  {
    slug: "enterprise-rag-deployment",
    title: "Enterprise RAG Deployment",
    client: "Financial Services Firm",
    industry: "Financial Services",
    summary:
      "Built a fully offline, air-gapped RAG system enabling 500+ analysts to query internal documents securely.",
    challenge:
      "The client had thousands of internal research documents, compliance records, and market analyses scattered across multiple systems. Analysts spent hours manually searching for relevant information, and there were strict data sovereignty requirements preventing the use of cloud-based AI solutions.",
    approach:
      "We designed and deployed a fully air-gapped Retrieval-Augmented Generation system using local embedding models and a vector database. The system processes documents through a custom ingestion pipeline, creating searchable embeddings that never leave the client's infrastructure. A conversational interface allows analysts to query documents in natural language.",
    results: [
      "85% reduction in document search time",
      "500+ analysts onboarded within the first month",
      "Zero data leakage — fully air-gapped deployment",
      "99.7% uptime since deployment",
    ],
    tags: ["Offline RAG", "Vector Databases", "Data Privacy", "Embeddings", "FAISS"],
    keyMetric: "85% faster document retrieval",
  },
  {
    slug: "agentic-workflow-automation",
    title: "Agentic Workflow Automation",
    client: "Insurance Provider",
    industry: "Insurance",
    summary:
      "Multi-agent system that processes claims automatically, reducing manual handling by 70%.",
    challenge:
      "The claims processing department handled thousands of claims daily, each requiring document review, data extraction, validation, and routing to appropriate teams. The manual process was slow, error-prone, and expensive, leading to customer dissatisfaction and operational bottlenecks.",
    approach:
      "We built a multi-agent AI system where specialized agents handle different stages of claims processing: a Document AI agent extracts key information from submitted documents, a validation agent cross-references data against policy databases, and a routing agent makes decisions about claim approval or escalation. Human-in-the-loop checkpoints ensure quality on high-value claims.",
    results: [
      "70% reduction in manual processing time",
      "95% accuracy in automated data extraction",
      "40% improvement in customer satisfaction scores",
      "ROI achieved within 4 months of deployment",
    ],
    tags: ["Agentic AI", "Document AI", "Automation", "LangChain", "Tool Use"],
    keyMetric: "70% less manual processing",
  },
  {
    slug: "ai-powered-analytics-dashboard",
    title: "AI-Powered Analytics Dashboard",
    client: "Healthcare Organization",
    industry: "Healthcare",
    summary:
      "Real-time analytics dashboard with predictive modeling for patient data streams.",
    challenge:
      "The healthcare organization needed to monitor patient outcomes across multiple facilities in real-time. Existing reporting was batch-based, delayed by hours, and lacked predictive capabilities. Leadership needed actionable insights to improve patient care and resource allocation.",
    approach:
      "We delivered a fullstack solution featuring a React dashboard with real-time data visualization, backed by a Node.js API layer and containerized with Docker. Deep learning models provide predictive analytics on patient outcomes, resource utilization, and potential risk factors. The system processes 10,000+ records daily with sub-second query response times.",
    results: [
      "Real-time monitoring across 5 facilities",
      "Predictive alerts for high-risk patients with 92% accuracy",
      "10,000+ daily records processed in real-time",
      "30% improvement in resource allocation efficiency",
    ],
    tags: ["Dashboards", "Deep Learning", "React", "Node.js", "Docker"],
    keyMetric: "10K+ records processed daily",
  },
];

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
