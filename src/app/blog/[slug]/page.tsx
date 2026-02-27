import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBlogPost, getAllBlogPosts } from "@/lib/blog";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { FigureCard } from "@/components/figures/figure-card";
import { BlogPostCard } from "@/components/blog/blog-post-card";
import { NextSteps } from "@/components/navigation/next-steps";
import { ShareButtons } from "@/components/blog/share-buttons";
import { formatDate } from "@/lib/format";
import { getFigureBySlug, getAllFigureStats } from "@/lib/mock-data";
import { SITE_CONFIG } from "@/lib/constants";
import { sanitizeHtml } from "@/lib/sanitize";

export async function generateStaticParams() {
  return getAllBlogPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return { title: "Not Found" };
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const allPosts = getAllBlogPosts();
  const relatedPosts = allPosts
    .filter((p) => p.slug !== slug && p.category === post.category)
    .slice(0, 2);
  const allStats = getAllFigureStats();
  const relatedFigures = post.relatedFigureSlugs
    .map((s) => getFigureBySlug(s))
    .filter(Boolean);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[{ label: "Blog", href: "/blog" }, { label: post.title }]}
      />

      <article>
        <header className="mb-8">
          <Badge variant="secondary" className="mb-3">
            {post.category}
          </Badge>
          <h1 className="text-3xl font-bold mb-3">{post.title}</h1>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span>{post.author}</span>
            <span>&middot;</span>
            <span>{formatDate(post.publishedAt)}</span>
            <span>&middot;</span>
            <span>{post.readingTime}</span>
          </div>
          <div className="mt-4 pt-4 border-t">
            <ShareButtons
              url={`${SITE_CONFIG.url}/blog/${slug}`}
              title={post.title}
              description={post.description}
            />
          </div>
        </header>

        <div
          className="prose prose-sm dark:prose-invert max-w-none [&>h2]:text-xl [&>h2]:font-bold [&>h2]:mt-8 [&>h2]:mb-3 [&>h3]:text-lg [&>h3]:font-semibold [&>h3]:mt-6 [&>h3]:mb-2 [&>p]:text-muted-foreground [&>p]:mb-4 [&>p]:leading-relaxed [&>ul]:text-muted-foreground [&>ul]:mb-4 [&>ul]:list-disc [&>ul]:pl-6 [&>ul>li]:mb-1 [&_a]:text-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-blue-600"
          dangerouslySetInnerHTML={{ __html: sanitizeHtml(post.content) }}
        />

        <div className="mt-8 pt-6 border-t">
          <ShareButtons
            url={`${SITE_CONFIG.url}/blog/${slug}`}
            title={post.title}
            description={post.description}
          />
        </div>
      </article>

      {/* Related Figures */}
      {relatedFigures.length > 0 && (
        <div className="mt-12 border-t pt-8">
          <h3 className="text-sm font-semibold text-muted-foreground mb-3">
            Related public figures
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {relatedFigures.map((figure) => {
              if (!figure) return null;
              const stats = allStats.get(figure.id)!;
              return (
                <FigureCard
                  key={figure.id}
                  slug={figure.slug}
                  name={figure.name}
                  title={figure.title}
                  type={figure.type}
                  party={figure.party}
                  state={figure.state}
                  country={figure.country}
                  overallScore={figure.overallScore}
                  imageUrl={figure.imageUrl}
                  totalStatements={stats.totalStatements}
                  totalActions={stats.totalActions}
                  brokenCount={stats.brokenCount}
                />
              );
            })}
          </div>
        </div>
      )}

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="mt-8 border-t pt-8">
          <h3 className="text-sm font-semibold text-muted-foreground mb-3">
            More from {post.category}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {relatedPosts.map((rp) => (
              <BlogPostCard
                key={rp.slug}
                slug={rp.slug}
                title={rp.title}
                description={rp.description}
                publishedAt={rp.publishedAt}
                readingTime={rp.readingTime}
                category={rp.category}
              />
            ))}
          </div>
        </div>
      )}

      <NextSteps
        className="mt-12"
        suggestions={[
          {
            label: "Browse All Articles",
            href: "/blog",
            description: "More deep dives on accountability",
          },
          {
            label: "Browse Leaders",
            href: "/directory",
            description: "Check any leader's track record",
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
