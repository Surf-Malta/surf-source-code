import { redirect } from "next/navigation";
import Link from "next/link";
import { AnimatedSection } from "@/components/AnimatedSection";
import { ArrowLeft, ArrowRight, Clock, Calendar } from "lucide-react";
import { blogPosts } from "@/lib/data/blogPosts";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  return {
    title: post ? `${post.title} | Sourcecode Blog` : "Blog | Sourcecode",
    description: post ? post.excerpt : "Read insights from the Sourcecode engineering team.",
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    redirect("/blog");
  }

  const currentIndex = blogPosts.findIndex((p) => p.slug === slug);
  const nextPost = blogPosts[(currentIndex + 1) % blogPosts.length];
  const prevPost = blogPosts[(currentIndex - 1 + blogPosts.length) % blogPosts.length];

  // Related posts
  const related = blogPosts
    .filter((p) => p.category === post.category && p.slug !== post.slug)
    .slice(0, 2);

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[280px] md:h-[360px] bg-og-code-bg overflow-hidden flex items-end pb-10">
        <div className="absolute inset-0 bg-gradient-to-t from-[#09090F] via-transparent to-transparent" />
        <div className="absolute top-6 left-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[14px] text-white/80 no-underline hover:text-white transition-colors bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10"
          >
            <ArrowLeft size={14} /> Back to Blog
          </Link>
        </div>
        <div className="relative max-w-[800px] mx-auto px-6 w-full">
          <AnimatedSection>
            <span className="inline-block px-3 py-1 rounded-full bg-og-accent/20 text-og-accent text-[12px] mb-4 font-mono font-semibold">
              {post.category}
            </span>
            <h1 className="text-[clamp(28px,4.5vw,48px)] text-white tracking-[-0.03em] mb-3 font-bold">
              {post.title}
            </h1>
          </AnimatedSection>
        </div>
      </section>

      {/* Meta Bar */}
      <section className="bg-og-surface border-b border-og-border">
        <div className="max-w-[800px] mx-auto px-6 py-5">
          <div className="flex flex-wrap items-center gap-5">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-og-accent flex items-center justify-center text-[#09090F] font-bold">
                <span className="text-[11px]">
                  {post.author
                    .split(" ")
                    .map((n: string) => n[0])
                    .join("")}
                </span>
              </div>
              <div>
                <p className="text-[13px] text-og-text font-semibold">
                  {post.author}
                </p>
                <p className="text-[11px] text-og-text-secondary font-normal">
                  {post.authorRole || "Author"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-og-text-secondary">
              <Calendar size={13} />
              <span className="text-[13px] font-normal">
                {post.date}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-og-text-secondary">
              <Clock size={13} />
              <span className="text-[13px] font-normal">
                {post.readTime}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-14 md:py-20 bg-og-bg">
        <div className="max-w-[700px] mx-auto px-6">
          {post.content.map((paragraph: string, i: number) => (
            <AnimatedSection key={i} delay={i * 0.05} className="mb-6">
              <p className="text-[17px] text-og-text leading-[1.8] font-normal">
                {paragraph}
              </p>
            </AnimatedSection>
          ))}

          {/* Related Posts */}
          {related.length > 0 && (
            <AnimatedSection delay={0.4} className="mt-14 pt-8 border-t border-og-border">
              <h3 className="text-[22px] text-og-text mb-6 tracking-[-0.02em] font-bold">
                Related articles
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {related.map((rp: any) => (
                  <Link
                    key={rp.slug}
                    href={`/blog/${rp.slug}`}
                    className="group no-underline block"
                  >
                    <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-3 bg-og-bg-alt flex items-center justify-center border border-og-border font-mono text-[11px] text-og-text-secondary">
                      <span>[ {rp.category} Image ]</span>
                    </div>
                    <p className="text-[12px] text-og-text-secondary mb-1 font-normal">
                      {rp.date} · {rp.readTime}
                    </p>
                    <h4 className="text-[16px] text-og-text group-hover:text-og-accent transition-colors tracking-[-0.01em] font-semibold">
                      {rp.title}
                    </h4>
                  </Link>
                ))}
              </div>
            </AnimatedSection>
          )}
        </div>
      </section>

      {/* Prev/Next Navigation */}
      <section className="bg-og-bg border-t border-og-border">
        <div className="max-w-[800px] mx-auto px-6">
          <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-og-border">
            <Link
              href={`/blog/${prevPost.slug}`}
              className="group py-8 pr-6 no-underline flex items-center gap-4"
            >
              <ArrowLeft size={20} className="text-og-text-secondary group-hover:text-og-accent transition-colors shrink-0 animate-none cursor-pointer" />
              <div>
                <p className="text-[12px] text-og-text-secondary uppercase tracking-wider mb-1 font-mono font-semibold">
                  Previous
                </p>
                <p className="text-[15px] text-og-text group-hover:text-og-accent transition-colors tracking-[-0.01em] line-clamp-1 font-semibold">
                  {prevPost.title}
                </p>
              </div>
            </Link>
            <Link
              href={`/blog/${nextPost.slug}`}
              className="group py-8 md:pl-6 no-underline flex items-center gap-4 justify-end text-right"
            >
              <div>
                <p className="text-[12px] text-og-text-secondary uppercase tracking-wider mb-1 font-mono font-semibold">
                  Next
                </p>
                <p className="text-[15px] text-og-text group-hover:text-og-accent transition-colors tracking-[-0.01em] line-clamp-1 font-semibold">
                  {nextPost.title}
                </p>
              </div>
              <ArrowRight size={20} className="text-og-text-secondary group-hover:text-og-accent transition-colors shrink-0 animate-none cursor-pointer" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
