import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  baseUrl: string;
  /** Existing search params to preserve (e.g. type, party, q, sort) */
  searchParams?: Record<string, string | undefined>;
  /** Items per page — used to compute "Showing X-Y" range */
  pageSize?: number;
}

/**
 * Server component.  Renders "Showing X–Y of Z" plus Previous / page numbers / Next.
 * All navigation is via <Link> preserving existing query params.
 */
export function Pagination({
  currentPage,
  totalPages,
  totalItems,
  baseUrl,
  searchParams = {},
  pageSize = 12,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const start = (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, totalItems);

  function buildHref(page: number) {
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(searchParams)) {
      if (value !== undefined && key !== "page") {
        params.set(key, value);
      }
    }
    if (page > 1) params.set("page", String(page));
    const qs = params.toString();
    return qs ? `${baseUrl}?${qs}` : baseUrl;
  }

  // Build page number array with ellipsis
  const pages = getPageNumbers(currentPage, totalPages);

  return (
    <nav aria-label="Pagination" className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-8">
      <p className="text-sm text-muted-foreground">
        Showing <span className="font-medium text-foreground">{start}</span>–
        <span className="font-medium text-foreground">{end}</span> of{" "}
        <span className="font-medium text-foreground">{totalItems}</span>
      </p>

      <div className="flex items-center gap-1">
        {/* Previous */}
        {currentPage > 1 ? (
          <Link
            href={buildHref(currentPage - 1)}
            className="inline-flex items-center justify-center h-8 w-8 rounded-md border text-sm hover:bg-accent transition-colors"
            aria-label="Previous page"
          >
            <ChevronLeft className="h-4 w-4" />
          </Link>
        ) : (
          <span className="inline-flex items-center justify-center h-8 w-8 rounded-md border text-sm text-muted-foreground/40 cursor-not-allowed">
            <ChevronLeft className="h-4 w-4" />
          </span>
        )}

        {/* Page numbers */}
        {pages.map((p, i) =>
          p === "..." ? (
            <span key={`ellipsis-${i}`} className="inline-flex items-center justify-center h-8 w-8 text-sm text-muted-foreground">
              ...
            </span>
          ) : (
            <Link
              key={p}
              href={buildHref(p as number)}
              aria-current={p === currentPage ? "page" : undefined}
              className={`inline-flex items-center justify-center h-8 w-8 rounded-md text-sm transition-colors ${
                p === currentPage
                  ? "bg-primary text-primary-foreground font-medium"
                  : "border hover:bg-accent"
              }`}
            >
              {p}
            </Link>
          ),
        )}

        {/* Next */}
        {currentPage < totalPages ? (
          <Link
            href={buildHref(currentPage + 1)}
            className="inline-flex items-center justify-center h-8 w-8 rounded-md border text-sm hover:bg-accent transition-colors"
            aria-label="Next page"
          >
            <ChevronRight className="h-4 w-4" />
          </Link>
        ) : (
          <span className="inline-flex items-center justify-center h-8 w-8 rounded-md border text-sm text-muted-foreground/40 cursor-not-allowed">
            <ChevronRight className="h-4 w-4" />
          </span>
        )}
      </div>
    </nav>
  );
}

/** Returns an array like [1, 2, "...", 5, 6, 7, "...", 10] */
function getPageNumbers(current: number, total: number): (number | "...")[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages: (number | "...")[] = [];

  // Always show first page
  pages.push(1);

  if (current > 3) pages.push("...");

  // Show window around current page
  const windowStart = Math.max(2, current - 1);
  const windowEnd = Math.min(total - 1, current + 1);
  for (let i = windowStart; i <= windowEnd; i++) {
    pages.push(i);
  }

  if (current < total - 2) pages.push("...");

  // Always show last page
  pages.push(total);

  return pages;
}
