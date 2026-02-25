import { getAllBlogPosts } from "@/lib/blog";
import { BlogPostCard } from "@/components/blog/blog-post-card";

interface RelatedBlogPostsProps {
  figureSlug: string;
}

export function RelatedBlogPosts({ figureSlug }: RelatedBlogPostsProps) {
  const allPosts = getAllBlogPosts();
  const related = allPosts
    .filter((post) => post.relatedFigureSlugs.includes(figureSlug))
    .slice(0, 2);

  if (related.length === 0) return null;

  return (
    <div className="mt-12">
      <h3 className="text-sm font-semibold text-muted-foreground mb-3">
        From the blog
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {related.map((post) => (
          <BlogPostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
