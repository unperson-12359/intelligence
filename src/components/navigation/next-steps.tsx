import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface NextStepsProps {
  suggestions: Array<{
    label: string;
    href: string;
    description: string;
  }>;
  className?: string;
}

export function NextSteps({ suggestions, className }: NextStepsProps) {
  if (suggestions.length === 0) return null;

  return (
    <div className={className}>
      <h3 className="text-sm font-semibold text-muted-foreground mb-3">
        What to do next
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {suggestions.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="group flex items-center gap-3 rounded-lg border bg-card p-3 transition-colors hover:bg-accent/50"
          >
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium group-hover:text-foreground transition-colors">
                {s.label}
              </p>
              <p className="text-xs text-muted-foreground line-clamp-1">
                {s.description}
              </p>
            </div>
            <ArrowRight className="size-4 text-muted-foreground group-hover:text-foreground shrink-0 transition-colors" />
          </Link>
        ))}
      </div>
    </div>
  );
}
