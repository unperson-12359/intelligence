import { Skeleton } from "@/components/ui/skeleton";
import { SayVsDoSkeleton } from "@/components/skeletons/say-vs-do-skeleton";

export default function FigureLoading() {
  return (
    <div>
      {/* Header skeleton */}
      <div className="border-b">
        <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-red-500" />
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <Skeleton className="h-20 w-20 rounded-full shrink-0" />
            <div className="flex-1 space-y-3">
              <Skeleton className="h-7 w-48" />
              <Skeleton className="h-5 w-36" />
              <div className="flex gap-1.5">
                <Skeleton className="h-5 w-16 rounded-md" />
                <Skeleton className="h-5 w-20 rounded-md" />
                <Skeleton className="h-5 w-14 rounded-md" />
              </div>
              <Skeleton className="h-4 w-full max-w-2xl" />
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-16 rounded-lg" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section nav skeleton — 2 items */}
      <div className="border-b">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex gap-4 py-3">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-5 w-24" />
          </div>
        </div>
      </div>

      {/* Content skeleton — Record + Evidence */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-16">
        {/* Record section */}
        <div>
          <Skeleton className="h-7 w-28 mb-2" />
          <Skeleton className="h-4 w-80 mb-6" />
          {/* Filter bar */}
          <div className="flex gap-3 mb-6">
            <Skeleton className="h-8 w-28 rounded-md" />
            <Skeleton className="h-7 w-16 rounded-full" />
            <Skeleton className="h-7 w-24 rounded-full" />
            <Skeleton className="h-7 w-20 rounded-full" />
            <Skeleton className="h-7 w-24 rounded-full" />
          </div>
          {/* Timeline cards */}
          <div className="space-y-4 pl-10 relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border/30" />
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-36 rounded-lg" />
            ))}
          </div>
        </div>

        {/* Evidence section */}
        <div>
          <Skeleton className="h-7 w-32 mb-2" />
          <Skeleton className="h-4 w-96 mb-6" />
          <div className="space-y-4">
            <SayVsDoSkeleton />
            <SayVsDoSkeleton />
          </div>
        </div>
      </div>
    </div>
  );
}
