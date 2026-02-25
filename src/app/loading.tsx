import { FigureCardSkeleton } from "@/components/skeletons/figure-card-skeleton";
import { SayVsDoSkeleton } from "@/components/skeletons/say-vs-do-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div>
      {/* Hero skeleton */}
      <div className="py-20 px-4 text-center">
        <Skeleton className="h-14 w-96 mx-auto mb-4" />
        <Skeleton className="h-5 w-72 mx-auto mb-8" />
        <Skeleton className="h-12 w-full max-w-lg mx-auto rounded-full" />
        <div className="flex justify-center gap-12 mt-8">
          <Skeleton className="h-10 w-20" />
          <Skeleton className="h-10 w-20" />
          <Skeleton className="h-10 w-20" />
        </div>
      </div>

      {/* Trending skeleton */}
      <div className="mx-auto max-w-7xl px-4 py-8">
        <Skeleton className="h-8 w-64 mb-6" />
        <div className="space-y-4">
          <SayVsDoSkeleton />
          <SayVsDoSkeleton />
        </div>
      </div>

      {/* Figures skeleton */}
      <div className="mx-auto max-w-7xl px-4 py-8">
        <Skeleton className="h-8 w-40 mb-6" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <FigureCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
