import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import type { Metadata } from "next";

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  readTime: string;
  tags: string[];
  content: string[];
}

const blogPosts: BlogPost[] = [
  {
    slug: "why-offline-rag-matters",
    title: "Why Offline RAG Matters for Enterprise Security",
    date: "2026-03-15",
    readTime: "5 min read",
    tags: ["RAG", "Security", "Enterprise AI"],
    content: [
      "As enterprises rush to adopt AI, data security has become the defining challenge of the decade. Organizations sit on vast troves of sensitive data — financial records, proprietary research, customer information — and the promise of AI is to unlock insights from that data at unprecedented speed.",
      "But here's the catch: most AI solutions require sending your data to third-party cloud services. For industries with strict compliance requirements — financial services, healthcare, government, legal — this is a non-starter. Data sovereignty isn't optional; it's a regulatory mandate.",
      "This is where Offline RAG (Retrieval-Augmented Generation) systems become essential. Unlike traditional AI deployments that rely on cloud APIs, offline RAG keeps everything in-house. The embedding models, the vector database, the language model — all run on your infrastructure, behind your firewall.",
      "At StarTeck, we've deployed air-gapped RAG systems for financial institutions where even a network request to an external service would trigger a compliance violation. These systems process thousands of documents, creating searchable knowledge bases that analysts can query using natural language — all without a single byte leaving the premises.",
      "The technical architecture involves local embedding models (like BAAI/bge or E5) that convert documents into vector representations, stored in databases like FAISS or ChromaDB. When a user asks a question, the system retrieves the most relevant document chunks and feeds them as context to a locally-hosted language model.",
      "The result? Enterprise-grade AI that's as powerful as cloud solutions but with zero data leakage risk. Our clients report 85% reductions in document search time while maintaining full compliance with their data governance frameworks.",
      "If your organization handles sensitive data and wants to leverage AI without compromising security, offline RAG isn't just an option — it's the only responsible choice.",
    ],
  },
  {
    slug: "agentic-ai-beyond-chatbots",
    title: "Agentic AI: Moving Beyond Simple Chatbots",
    date: "2026-03-01",
    readTime: "7 min read",
    tags: ["Agentic AI", "Automation", "LLMs"],
    content: [
      "The AI landscape is evolving rapidly, and the next frontier isn't better chatbots — it's autonomous AI agents that can reason, plan, and execute complex workflows without constant human supervision.",
      "Traditional chatbots are reactive: they wait for a prompt, generate a response, and stop. Agentic AI is fundamentally different. These systems maintain goals, break them into sub-tasks, use tools, and iterate until objectives are met. Think of them as tireless digital employees who never sleep and never lose context.",
      "At StarTeck, we build agentic systems that integrate deeply with our clients' existing toolchains. A claims processing agent, for example, doesn't just answer questions about claims — it reads submitted documents, extracts key information using Document AI, validates data against policy databases, and routes decisions to the appropriate team. All autonomously.",
      "The key technical components that make agentic AI possible include tool-use capabilities (allowing the AI to call APIs, query databases, and interact with external systems), planning frameworks that decompose complex tasks into manageable steps, and memory systems that maintain context across long-running workflows.",
      "But perhaps the most critical component is the human-in-the-loop checkpoint system. For high-stakes decisions — approving a large insurance claim, flagging a potential compliance issue — the agent pauses and presents its reasoning to a human reviewer. This creates a system that's both highly automated and appropriately supervised.",
      "We've seen agentic workflows reduce manual processing time by 70% in insurance claims, cut document review time by 60% in legal departments, and enable 24/7 customer support operations that previously required round-the-clock staffing.",
      "The age of passive AI assistants is ending. The future belongs to autonomous agents that don't just answer questions — they get things done.",
    ],
  },
  {
    slug: "building-ai-dashboards-that-matter",
    title: "Building AI Dashboards That Actually Drive Decisions",
    date: "2026-02-20",
    readTime: "6 min read",
    tags: ["Dashboards", "UX", "Data Visualization"],
    content: [
      "Here's a hard truth: most dashboards are glorified spreadsheets with prettier colors. They display data, but they don't drive decisions. At StarTeck, we approach AI dashboards differently — as decision-making tools that combine real-time data visualization with predictive intelligence.",
      "The difference between a good dashboard and a great one isn't the chart library — it's the intelligence layer underneath. Our dashboards don't just show you what happened; they tell you what's likely to happen next and suggest what you should do about it.",
      "Consider a healthcare dashboard we built for monitoring patient outcomes across multiple facilities. A traditional dashboard would show admission rates, bed occupancy, and outcome statistics. Our dashboard adds a deep learning layer that identifies patients at high risk of readmission, predicts resource bottlenecks 48 hours in advance, and automatically alerts relevant teams when intervention is needed.",
      "The technical stack matters too. We build with React for responsive, component-driven interfaces that perform well on any device. Node.js backends handle real-time data streaming and API orchestration. Docker containerization ensures consistent deployment across environments. And PostgreSQL with TimescaleDB provides the time-series data backbone that makes real-time analytics possible.",
      "Design principles are equally important. We follow a 'progressive disclosure' pattern: the landing view shows the three to five metrics that matter most, with the ability to drill down into detailed analysis on demand. This respects the user's attention while providing depth when needed.",
      "The result is dashboards that leadership actually uses daily — not quarterly reports that gather dust. When your dashboard predicts a problem before it occurs, it stops being a reporting tool and becomes a competitive advantage.",
    ],
  },
];

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};
  return { title: post.title, description: post.content[0] };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <div className="relative z-10 py-24 px-6">
      <article className="max-w-3xl mx-auto">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-text-muted hover:text-gold transition-colors mb-8"
        >
          <ArrowLeft size={16} /> All Posts
        </Link>

        <div className="flex items-center gap-4 text-text-muted text-sm mb-4">
          <span className="flex items-center gap-1">
            <Calendar size={14} /> {formatDate(post.date)}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={14} /> {post.readTime}
          </span>
        </div>

        <h1 className="font-serif text-3xl md:text-5xl mb-6 leading-[1.15]">
          <span className="gold-text">{post.title}</span>
        </h1>

        <div className="flex flex-wrap gap-2 mb-10">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-sm px-4 py-1.5 rounded-full bg-navy-700/60 border border-gold/20 text-gold-light"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="prose prose-invert max-w-none">
          {post.content.map((paragraph, i) => (
            <p
              key={i}
              className="text-text-muted text-lg leading-relaxed mb-6"
            >
              {paragraph}
            </p>
          ))}
        </div>

        {/* CTA */}
        <div className="glass-card p-8 mt-12 text-center">
          <h3 className="font-serif text-xl mb-3">
            Want to learn more about our <span className="gold-text">capabilities</span>?
          </h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4">
            <Link
              href="/services"
              className="border border-gold text-gold-light px-6 py-2.5 rounded-full font-medium transition-all hover:bg-gold/10"
            >
              Explore Services
            </Link>
            <Link
              href="/contact"
              className="bg-gradient-to-r from-gold-light to-gold-dark text-navy-950 px-6 py-2.5 rounded-full font-semibold transition-all hover:scale-105"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
