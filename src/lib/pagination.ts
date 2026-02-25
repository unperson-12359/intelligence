export interface PaginationResult<T> {
  items: T[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
}

const DEFAULT_PAGE_SIZE = 12;

/**
 * Paginate an array of items.  Page numbers are 1-based.
 * Returns the slice for the requested page plus metadata.
 */
export function paginate<T>(
  items: T[],
  page: number = 1,
  pageSize: number = DEFAULT_PAGE_SIZE,
): PaginationResult<T> {
  const safePage = Math.max(1, Math.floor(page));
  const totalItems = items.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const clampedPage = Math.min(safePage, totalPages);
  const start = (clampedPage - 1) * pageSize;

  return {
    items: items.slice(start, start + pageSize),
    currentPage: clampedPage,
    totalPages,
    totalItems,
  };
}
