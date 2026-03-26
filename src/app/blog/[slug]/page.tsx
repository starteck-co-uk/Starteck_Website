import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Calendar, Clock } from "lucide-react";
import type { Metadata } from "next";
import { blogPosts } from "@/data/blog";

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
  return { title: post.title, description: post.excerpt };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const currentIndex = blogPosts.findIndex((p) => p.slug === slug);
  const prevPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;

  // Suggest related posts by matching tags
  const relatedPosts = blogPosts
    .filter((p) => p.slug !== slug && p.tags.some((t) => post.tags.includes(t)))
    .slice(0, 3);

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

        {/* Post Navigation */}
        <div className="flex justify-between mt-12 pt-8 border-t border-navy-700/50">
          {prevPost ? (
            <Link
              href={`/blog/${prevPost.slug}`}
              className="flex items-center gap-2 text-text-muted hover:text-gold transition-colors max-w-[45%]"
            >
              <ArrowLeft size={16} className="flex-shrink-0" />
              <span className="truncate">{prevPost.title}</span>
            </Link>
          ) : (
            <div />
          )}
          {nextPost && (
            <Link
              href={`/blog/${nextPost.slug}`}
              className="flex items-center gap-2 text-text-muted hover:text-gold transition-colors max-w-[45%] text-right ml-auto"
            >
              <span className="truncate">{nextPost.title}</span>
              <ArrowRight size={16} className="flex-shrink-0" />
            </Link>
          )}
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-16">
            <h3 className="font-serif text-2xl mb-6">
              Related <span className="gold-text">Articles</span>
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedPosts.map((related) => (
                <Link
                  key={related.slug}
                  href={`/blog/${related.slug}`}
                  className="glass-card p-5 transition-all hover:-translate-y-1 group"
                >
                  <div className="flex items-center gap-2 text-text-muted text-xs mb-2">
                    <Calendar size={12} /> {formatDate(related.date)}
                  </div>
                  <h4 className="font-serif text-sm text-gold-light group-hover:text-gold transition-colors leading-snug">
                    {related.title}
                  </h4>
                </Link>
              ))}
            </div>
          </div>
        )}

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
