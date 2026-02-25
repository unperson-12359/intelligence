import { Skeleton } from "@/components/ui/skeleton";

export function TableSkeleton({ rows = 8 }: { rows?: number }) {
  return (
    <div className="border rounded-lg overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="bg-muted/30 border-b">
            <th className="px-4 py-3"><Skeleton className="h-4 w-4" /></th>
            <th className="px-4 py-3"><Skeleton className="h-4 w-20" /></th>
            <th className="px-4 py-3 hidden sm:table-cell"><Skeleton className="h-4 w-12" /></th>
            <th className="px-4 py-3"><Skeleton className="h-4 w-12 mx-auto" /></th>
            <th className="px-4 py-3 hidden md:table-cell"><Skeleton className="h-4 w-8 mx-auto" /></th>
            <th className="px-4 py-3 hidden md:table-cell"><Skeleton className="h-4 w-12 mx-auto" /></th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }).map((_, i) => (
            <tr key={i} className="border-b last:border-b-0">
              <td className="px-4 py-3"><Skeleton className="h-4 w-4" /></td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <div className="space-y-1">
                    <Skeleton className="h-4 w-28" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                </div>
              </td>
              <td className="px-4 py-3 hidden sm:table-cell"><Skeleton className="h-5 w-16 rounded-md" /></td>
              <td className="px-4 py-3"><Skeleton className="h-8 w-8 rounded-full mx-auto" /></td>
              <td className="px-4 py-3 hidden md:table-cell"><Skeleton className="h-4 w-4 mx-auto" /></td>
              <td className="px-4 py-3 hidden md:table-cell"><Skeleton className="h-4 w-4 mx-auto" /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
