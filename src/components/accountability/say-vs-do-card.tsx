import { Card, CardContent } from "@/components/ui/card";
import { VerdictBadge } from "./verdict-badge";
import { SourceLink } from "@/components/evidence/source-link";
import { EvidenceGallery } from "@/components/evidence/evidence-gallery";
import { EvidenceIndicator } from "@/components/evidence/evidence-indicator";
import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/format";
import Link from "next/link";

type Verdict = "kept" | "broken" | "partial" | "in_progress" | "flip_flop" | "context_needed";

interface SayVsDoCardProps {
  figureSlug?: string;
  figureName?: string;
  statementTitle: string;
  statementContent: string;
  statementDate: string;
  statementSource: string;
  statementSourceUrl?: string;
  statementSourceType?: string;
  actionTitle?: string;
  actionDescription?: string;
  actionDate?: string;
  actionSourceUrl?: string;
  actionSourceName?: string;
  verdict: Verdict;
  score: number;
  summary: string;
  evidence?: string;
  evidenceMedia?: Array<{
    id: string;
    type: 'screenshot' | 'document' | 'audio' | 'video';
    thumbnailUrl: string;
    caption: string;
    url: string;
    sourceUrl: string;
    capturedAt: string;
  }>;
  className?: string;
}

export function SayVsDoCard({
  figureSlug,
  figureName,
  statementTitle,
  statementContent,
  statementDate,
  statementSource,
  statementSourceUrl,
  statementSourceType,
  actionTitle,
  actionDescription,
  actionDate,
  actionSourceUrl,
  actionSourceName,
  verdict,
  score,
  summary,
  evidence,
  evidenceMedia,
  className,
}: SayVsDoCardProps) {
  return (
    <Card className={cn("overflow-hidden transition-all hover:shadow-lg hover:shadow-[var(--intelligence-blue)]/5", className)}>
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
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 px-2 py-0.5 rounded">
                Said
              </span>
              <span className="text-xs text-muted-foreground">{formatDate(statementDate)}</span>
            </div>
            <h4 className="font-semibold text-sm mb-1">{statementTitle}</h4>
            <p className="text-sm text-muted-foreground line-clamp-3">
              {statementContent}
            </p>
            <div className="mt-2">
              {statementSourceUrl ? (
                <SourceLink
                  url={statementSourceUrl}
                  name={statementSource}
                  type={statementSourceType}
                />
              ) : (
                <p className="text-xs text-muted-foreground">
                  Source: {statementSource}
                </p>
              )}
            </div>
          </div>

          {/* DID */}
          <div className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/30 px-2 py-0.5 rounded">
                Did
              </span>
              {actionDate && (
                <span className="text-xs text-muted-foreground">{formatDate(actionDate)}</span>
              )}
            </div>
            {actionTitle ? (
              <>
                <h4 className="font-semibold text-sm mb-1">{actionTitle}</h4>
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {actionDescription}
                </p>
                {actionSourceUrl && actionSourceName && (
                  <div className="mt-2">
                    <SourceLink url={actionSourceUrl} name={actionSourceName} />
                  </div>
                )}
              </>
            ) : (
              <p className="text-sm text-muted-foreground italic">
                No corresponding action recorded yet.
              </p>
            )}
          </div>
        </div>

        {/* Summary + Evidence */}
        <div className="px-4 py-3 bg-muted/20 border-t space-y-2">
          <p className="text-sm text-muted-foreground">{summary}</p>
          {evidence && (
            <details className="text-xs text-muted-foreground">
              <summary className="cursor-pointer hover:text-foreground transition-colors font-medium">
                View detailed evidence
              </summary>
              <p className="mt-1 pl-3 border-l-2 border-muted leading-relaxed">
                {evidence}
              </p>
            </details>
          )}
          {evidenceMedia && evidenceMedia.length > 0 && (
            <>
              <EvidenceIndicator
                screenshotCount={evidenceMedia.filter(e => e.type === 'screenshot').length}
                videoCount={evidenceMedia.filter(e => e.type === 'video').length}
                audioCount={evidenceMedia.filter(e => e.type === 'audio').length}
                documentCount={evidenceMedia.filter(e => e.type === 'document').length}
              />
              <details className="text-xs">
                <summary className="cursor-pointer hover:text-foreground transition-colors font-medium text-muted-foreground">
                  View preserved evidence
                </summary>
                <EvidenceGallery items={evidenceMedia} className="mt-2" />
              </details>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
