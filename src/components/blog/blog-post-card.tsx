import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/format";
import type { BlogPost } from "@/lib/blog";

export type BlogPostCardProps = {
  post?: BlogPost;
  slug?: string;
  title?: string;
  description?: string;
  publishedAt?: string;
  readingTime?: string;
  category?: string;
  className?: string;
};

export function BlogPostCard({
  post,
  slug: slugProp,
  title: titleProp,
  description: descProp,
  publishedAt: dateProp,
  readingTime: timeProp,
  category: catProp,
  className,
}: BlogPostCardProps) {
  const slug = post?.slug ?? slugProp ?? "";
  const title = post?.title ?? titleProp ?? "";
  const description = post?.description ?? descProp ?? "";
  const publishedAt = post?.publishedAt ?? dateProp ?? "";
  const readingTime = post?.readingTime ?? timeProp ?? "";
  const category = post?.category ?? catProp ?? "";
  return (
    <Link href={`/blog/${slug}`}>
      <Card
        className={`h-full transition-all hover:-translate-y-1 hover:shadow-lg cursor-pointer ${className || ""}`}
      >
        <CardContent className="p-5">
          <Badge variant="secondary" className="text-xs mb-3">
            {category}
          </Badge>
          <h3 className="font-semibold text-sm mb-2 line-clamp-2">{title}</h3>
          <p className="text-xs text-muted-foreground line-clamp-3 mb-3">
            {description}
          </p>
          <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
            <span>{formatDate(publishedAt)}</span>
            <span>&middot;</span>
            <span>{readingTime}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
