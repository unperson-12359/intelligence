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

      {/* Tab skeleton */}
      <div className="border-b">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex gap-4 py-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-5 w-20" />
            ))}
          </div>
        </div>
      </div>

      {/* Content skeleton */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Skeleton className="h-7 w-56 mb-6" />
        <div className="space-y-4">
          <SayVsDoSkeleton />
          <SayVsDoSkeleton />
        </div>
      </div>
    </div>
  );
}
