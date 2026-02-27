import type { Metadata } from "next";
import { getAllBlogPosts, getBlogPostsByCategory } from "@/lib/blog";
import { BlogPostCard } from "@/components/blog/blog-post-card";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { StaggerChildren } from "@/components/motion/stagger-children";
import { NextSteps } from "@/components/navigation/next-steps";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Deep dives into accountability, political memory, and why tracking promises matters.",
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const params = await searchParams;
  const category = params.category;
  const posts = category
    ? getBlogPostsByCategory(category)
    : getAllBlogPosts();
  const categories = [...new Set(getAllBlogPosts().map((p) => p.category))];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Blog" }]} />

      <ScrollReveal className="mb-8">
        <h1 className="text-3xl font-bold">The Accountability Report</h1>
        <p className="text-muted-foreground mt-1">
          Deep dives into accountability, political memory, and why tracking
          promises matters.
        </p>
      </ScrollReveal>

      {/* Category filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        <Link
          href="/blog"
          className={`px-3 py-1.5 text-sm rounded-md border transition-all ${
            !category
              ? "bg-primary text-primary-foreground border-primary"
              : "bg-background text-muted-foreground border-border hover:bg-accent"
          }`}
        >
          All
        </Link>
        {categories.map((cat) => (
          <Link
            key={cat}
            href={`/blog?category=${encodeURIComponent(cat)}`}
            className={`px-3 py-1.5 text-sm rounded-md border transition-all ${
              category === cat
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-background text-muted-foreground border-border hover:bg-accent"
            }`}
          >
            {cat}
          </Link>
        ))}
      </div>

      <StaggerChildren
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
        staggerDelay={0.1}
      >
        {posts.map((post) => (
          <BlogPostCard
            key={post.slug}
            slug={post.slug}
            title={post.title}
            description={post.description}
            publishedAt={post.publishedAt}
            readingTime={post.readingTime}
            category={post.category}
          />
        ))}
      </StaggerChildren>

      <NextSteps
        className="mt-12"
        suggestions={[
          {
            label: "Browse All Leaders",
            href: "/directory",
            description: "Search and filter every tracked public figure",
          },
          {
            label: "Add to the Record",
            href: "/contribute",
            description: "Contribute to the public record.",
          },
        ]}
      />
    </div>
  );
}
