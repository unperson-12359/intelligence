import { format, formatDistanceToNow, parseISO } from "date-fns";

/**
 * Format a date string like "2023-01-15" → "Jan 15, 2023"
 */
export function formatDate(dateStr: string): string {
  try {
    return format(parseISO(dateStr), "MMM d, yyyy");
  } catch {
    return dateStr;
  }
}

/**
 * Format a date string like "2023-01-15" → "2 years ago"
 */
export function formatRelativeDate(dateStr: string): string {
  try {
    return formatDistanceToNow(parseISO(dateStr), { addSuffix: true });
  } catch {
    return dateStr;
  }
}
