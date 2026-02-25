import Link from "next/link";
import { ArrowUpDown } from "lucide-react";

interface SortOption {
  value: string;
  label: string;
}

interface SortSelectProps {
  options: SortOption[];
  currentValue: string;
  baseUrl: string;
  searchParams?: Record<string, string | undefined>;
}

export function SortSelect({
  options,
  currentValue,
  baseUrl,
  searchParams = {},
}: SortSelectProps) {
  function buildHref(sortValue: string) {
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(searchParams)) {
      if (value !== undefined && key !== "sort" && key !== "page") {
        params.set(key, value);
      }
    }
    if (sortValue) params.set("sort", sortValue);
    const qs = params.toString();
    return qs ? `${baseUrl}?${qs}` : baseUrl;
  }

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-sm text-muted-foreground inline-flex items-center gap-1">
        <ArrowUpDown className="h-3.5 w-3.5" />
        Sort:
      </span>
      {options.map((option) => (
        <Link
          key={option.value}
          href={buildHref(option.value)}
          className={`px-2.5 py-1 text-xs rounded-md border transition-colors ${
            currentValue === option.value
              ? "bg-primary text-primary-foreground border-primary"
              : "bg-background text-muted-foreground border-border hover:bg-accent"
          }`}
        >
          {option.label}
        </Link>
      ))}
    </div>
  );
}
