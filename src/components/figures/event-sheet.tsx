'use client';

import Link from 'next/link';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { VerdictBadge } from '@/components/accountability/verdict-badge';
import { SourceLink } from '@/components/evidence/source-link';
import { EvidenceGallery } from '@/components/evidence/evidence-gallery';
import { EvidenceIndicator } from '@/components/evidence/evidence-indicator';
import { formatDate } from '@/lib/format';
import { STATEMENT_TYPE_LABELS, ACTION_TYPE_LABELS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { ArrowRight, MessageSquare, Activity } from 'lucide-react';
import type { RecordEvent } from './record-timeline';

interface EventSheetProps {
  event: RecordEvent | null;
  slug: string;
  open: boolean;
  onClose: () => void;
}

export function EventSheet({ event, slug, open, onClose }: EventSheetProps) {
  if (!event) return null;

  const acc = event.accountability;
  const typeLabel =
    event.type === 'statement'
      ? STATEMENT_TYPE_LABELS[event.subType] || event.subType
      : ACTION_TYPE_LABELS[event.subType] || event.subType;

  const TypeIcon = event.type === 'statement' ? MessageSquare : Activity;

  return (
    <Sheet open={open} onOpenChange={(v) => !v && onClose()}>
      <SheetContent
        side="right"
        className="sm:max-w-lg w-full p-0 flex flex-col"
      >
        <SheetHeader className="px-6 pt-6 pb-0">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="secondary" className="text-xs">
              <TypeIcon className="size-3 mr-1" />
              {typeLabel}
            </Badge>
            <span className="text-xs text-muted-foreground">
              {formatDate(event.date)}
            </span>
            {event.isVerified && (
              <Badge
                variant="outline"
                className="text-xs text-green-700 border-green-300 dark:text-green-400 dark:border-green-700"
              >
                Verified
              </Badge>
            )}
          </div>
          <SheetTitle className="text-lg leading-snug mt-1">
            {event.title}
          </SheetTitle>
          {acc && (
            <div className="flex items-center gap-2 mt-1">
              <VerdictBadge verdict={acc.verdict} />
              <span
                className={cn(
                  'text-sm font-bold',
                  acc.score > 0
                    ? 'text-green-600'
                    : acc.score < 0
                      ? 'text-red-600'
                      : 'text-gray-500',
                )}
              >
                {acc.score > 0 ? '+' : ''}
                {acc.score}
              </span>
            </div>
          )}
          <SheetDescription className="sr-only">
            Details for {event.title}
          </SheetDescription>
        </SheetHeader>

        <ScrollArea className="flex-1 min-h-0 overflow-hidden px-6 pb-6">
          <div className="space-y-5 pt-4">
            {/* Content */}
            <div>
              <p className="text-sm text-foreground leading-relaxed">
                {event.content}
              </p>
              {event.context && (
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                  {event.context}
                </p>
              )}
              {event.outcome && (
                <p className="text-xs text-muted-foreground mt-2">
                  <span className="font-medium">Outcome:</span> {event.outcome}
                </p>
              )}
            </div>

            {/* Source */}
            <div>
              <SourceLink
                url={event.sourceUrl}
                name={event.sourceName}
                type={event.sourceType}
              />
            </div>

            {/* Accountability detail */}
            {acc && (
              <>
                <Separator />

                {/* Linked action (what they DID) */}
                {acc.actionTitle && (
                  <div className="rounded-lg bg-muted/30 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-red-700 dark:text-red-400 bg-red-100 dark:bg-red-900/30 px-2 py-0.5 rounded">
                        Did
                      </span>
                      {acc.actionDate && (
                        <span className="text-xs text-muted-foreground">
                          {formatDate(acc.actionDate)}
                        </span>
                      )}
                    </div>
                    <h4 className="font-semibold text-sm">{acc.actionTitle}</h4>
                    <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                      {acc.actionDescription}
                    </p>
                    {acc.actionSourceUrl && acc.actionSourceName && (
                      <div className="mt-2">
                        <SourceLink
                          url={acc.actionSourceUrl}
                          name={acc.actionSourceName}
                        />
                      </div>
                    )}
                  </div>
                )}

                {/* Summary */}
                <div>
                  <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                    Analysis
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {acc.summary}
                  </p>
                </div>

                {/* Evidence preview */}
                {acc.evidenceMedia && acc.evidenceMedia.length > 0 && (
                  <div>
                    <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                      Evidence
                    </h4>
                    <EvidenceIndicator
                      screenshotCount={
                        acc.evidenceMedia.filter((e) => e.type === 'screenshot')
                          .length
                      }
                      videoCount={
                        acc.evidenceMedia.filter((e) => e.type === 'video')
                          .length
                      }
                      audioCount={
                        acc.evidenceMedia.filter((e) => e.type === 'audio')
                          .length
                      }
                      documentCount={
                        acc.evidenceMedia.filter((e) => e.type === 'document')
                          .length
                      }
                    />
                    <EvidenceGallery
                      items={acc.evidenceMedia}
                      className="mt-2"
                    />
                  </div>
                )}

                <Separator />

                {/* Full report link */}
                <Link
                  href={`/figure/${slug}/record/${acc.id}`}
                  className="flex items-center justify-between rounded-lg border bg-card p-4 transition-colors hover:bg-accent/50 group"
                  onClick={onClose}
                >
                  <div>
                    <p className="text-sm font-medium group-hover:text-foreground transition-colors">
                      View Full Report
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Complete analysis with all evidence and sources
                    </p>
                  </div>
                  <ArrowRight className="size-5 text-muted-foreground group-hover:text-foreground shrink-0 transition-colors" />
                </Link>
              </>
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
