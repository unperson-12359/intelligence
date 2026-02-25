import { Card, CardContent } from "@/components/ui/card";
import { VerdictBadge } from "./verdict-badge";
import { cn } from "@/lib/utils";
import Link from "next/link";

type Verdict = "kept" | "broken" | "partial" | "in_progress" | "flip_flop" | "context_needed";

interface SayVsDoCardProps {
  figureSlug?: string;
  figureName?: string;
  statementTitle: string;
  statementContent: string;
  statementDate: string;
  statementSource: string;
  actionTitle?: string;
  actionDescription?: string;
  actionDate?: string;
  verdict: Verdict;
  score: number;
  summary: string;
  className?: string;
}

export function SayVsDoCard({
  figureSlug,
  figureName,
  statementTitle,
  statementContent,
  statementDate,
  statementSource,
  actionTitle,
  actionDescription,
  actionDate,
  verdict,
  score,
  summary,
  className,
}: SayVsDoCardProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-0">
        {/* Header with verdict */}
        <div className="flex items-center justify-between px-4 py-3 bg-muted/30 border-b">
          <div className="flex items-center gap-2">
            {figureName && figureSlug && (
              <Link
                href={`/figure/${figureSlug}`}
                className="text-sm font-semibold hover:underline"
              >
                {figureName}
              </Link>
            )}
            <VerdictBadge verdict={verdict} />
          </div>
          <span
            className={cn(
              "text-sm font-bold",
              score > 0 ? "text-green-600" : score < 0 ? "text-red-600" : "text-gray-500"
            )}
          >
            {score > 0 ? "+" : ""}
            {score}
          </span>
        </div>

        {/* SAY vs DO columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x">
          {/* SAID */}
          <div className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground bg-muted px-2 py-0.5 rounded">
                Said
              </span>
              <span className="text-xs text-muted-foreground">{statementDate}</span>
            </div>
            <h4 className="font-semibold text-sm mb-1">{statementTitle}</h4>
            <p className="text-sm text-muted-foreground line-clamp-3">
              {statementContent}
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              Source: {statementSource}
            </p>
          </div>

          {/* DID */}
          <div className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground bg-muted px-2 py-0.5 rounded">
                Did
              </span>
              {actionDate && (
                <span className="text-xs text-muted-foreground">{actionDate}</span>
              )}
            </div>
            {actionTitle ? (
              <>
                <h4 className="font-semibold text-sm mb-1">{actionTitle}</h4>
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {actionDescription}
                </p>
              </>
            ) : (
              <p className="text-sm text-muted-foreground italic">
                No corresponding action recorded yet.
              </p>
            )}
          </div>
        </div>

        {/* Summary */}
        <div className="px-4 py-3 bg-muted/20 border-t">
          <p className="text-sm text-muted-foreground">{summary}</p>
        </div>
      </CardContent>
    </Card>
  );
}
