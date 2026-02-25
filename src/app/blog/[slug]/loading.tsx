import { Skeleton } from "@/components/ui/skeleton";

export default function BlogPostLoading() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumbs */}
      <Skeleton className="h-4 w-48 mb-6" />

      {/* Badge */}
      <Skeleton className="h-5 w-24 rounded-full mb-3" />

      {/* Title */}
      <Skeleton className="h-9 w-full mb-2" />
      <Skeleton className="h-9 w-3/4 mb-3" />

      {/* Meta */}
      <div className="flex items-center gap-3 mb-8">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-20" />
      </div>

      {/* Content paragraphs */}
      <div className="space-y-4">
        <Skeleton className="h-6 w-2/3 mt-8" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />

        <Skeleton className="h-6 w-1/2 mt-8" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />

        <Skeleton className="h-6 w-3/5 mt-8" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    </div>
  );
}
