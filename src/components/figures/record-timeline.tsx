'use client';

import { useState, useMemo, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { VerdictBadge } from '@/components/accountability/verdict-badge';
import { SourceLink } from '@/components/evidence/source-link';
import { formatDate } from '@/lib/format';
import { STATEMENT_TYPE_LABELS, ACTION_TYPE_LABELS } from '@/lib/constants';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { EventSheet } from './event-sheet';

type Verdict = 'kept' | 'broken' | 'partial' | 'in_progress' | 'flip_flop' | 'context_needed';

interface AccountabilityInfo {
  id: string;
  verdict: Verdict;
  score: number;
  summary: string;
  evidence: string;
  actionTitle?: string;
  actionDescription?: string;
  actionDate?: string;
  actionSourceUrl?: string;
  actionSourceName?: string;
  evidenceMedia?: Array<{
    id: string;
    type: 'screenshot' | 'document' | 'audio' | 'video';
    thumbnailUrl: string;
    caption: string;
    url: string;
    sourceUrl: string;
    capturedAt: string;
  }>;
}

export interface RecordEvent {
  id: string;
  type: 'statement' | 'action';
  subType: string;
  date: string;
  title: string;
  content: string;
  context?: string;
  outcome?: string;
  sourceUrl: string;
  sourceName: string;
  sourceType?: string;
  isVerified: boolean;
  accountability?: AccountabilityInfo;
}

interface RecordTimelineProps {
  events: RecordEvent[];
  slug: string;
}

type FilterType = 'all' | 'statements' | 'actions' | 'verdicts';
type SortOrder = 'newest' | 'oldest';

const typeColors = {
  statement: 'bg-blue-500',
  action: 'bg-amber-500',
};

function RecordCard({
  event,
  index,
  onClick,
}: {
  event: RecordEvent;
  index: number;
  onClick: () => void;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const acc = event.accountability;

  const typeLabel = event.type === 'statement'
    ? STATEMENT_TYPE_LABELS[event.subType] || event.subType
    : ACTION_TYPE_LABELS[event.subType] || event.subType;

  return (
    <motion.div
      ref={ref}
      className="relative pl-10"
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : undefined}
      transition={{
        duration: 0.5,
        delay: index * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {/* Timeline dot */}
      <div
        className={cn(
          'absolute left-[10px] top-1.5 h-3 w-3 rounded-full border-2 border-background',
          typeColors[event.type],
        )}
      />

      <Card
        className={cn(
          'transition-all hover:shadow-md cursor-pointer group',
          acc && 'ring-1 ring-muted-foreground/10',
        )}
        onClick={onClick}
      >
        <CardContent className="p-4">
          {/* Top row: badges */}
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <Badge variant="secondary" className="text-xs">
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
            {acc && (
              <>
                <VerdictBadge verdict={acc.verdict} />
                <span
                  className={cn(
                    'text-xs font-bold',
                    acc.score > 0 ? 'text-green-600' : acc.score < 0 ? 'text-red-600' : 'text-gray-500',
                  )}
                >
                  {acc.score > 0 ? '+' : ''}{acc.score}
                </span>
              </>
            )}
            {/* Open indicator */}
            <ChevronRight className="size-4 text-muted-foreground/40 group-hover:text-foreground/60 transition-colors ml-auto shrink-0" />
          </div>

          {/* Title + truncated content */}
          <h4 className="font-semibold text-sm group-hover:text-foreground transition-colors">
            {event.title}
          </h4>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
            {event.content}
          </p>

          {/* Source */}
          <div className="mt-2" onClick={(e) => e.stopPropagation()}>
            <SourceLink
              url={event.sourceUrl}
              name={event.sourceName}
              type={event.sourceType}
            />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function RecordTimeline({ events, slug }: RecordTimelineProps) {
  const [filter, setFilter] = useState<FilterType>('all');
  const [sortOrder, setSortOrder] = useState<SortOrder>('newest');
  const [selectedEvent, setSelectedEvent] = useState<RecordEvent | null>(null);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const filtered = useMemo(() => {
    let result = [...events];

    if (filter === 'statements') {
      result = result.filter((e) => e.type === 'statement');
    } else if (filter === 'actions') {
      result = result.filter((e) => e.type === 'action');
    } else if (filter === 'verdicts') {
      result = result.filter((e) => e.accountability);
    }

    result.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });

    return result;
  }, [events, filter, sortOrder]);

  const verdictCount = events.filter((e) => e.accountability).length;

  return (
    <div>
      {/* Filter bar */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <Select value={sortOrder} onValueChange={(v) => setSortOrder(v as SortOrder)}>
          <SelectTrigger size="sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="oldest">Oldest First</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex gap-1">
          {([
            { value: 'all', label: 'All' },
            { value: 'statements', label: 'Statements' },
            { value: 'actions', label: 'Actions' },
            { value: 'verdicts', label: `Verdicts (${verdictCount})` },
          ] as const).map((btn) => (
            <button
              key={btn.value}
              onClick={() => setFilter(btn.value)}
              className={cn(
                'px-3 py-1 text-xs font-medium rounded-full border transition-colors',
                filter === btn.value
                  ? 'bg-foreground text-background border-foreground'
                  : 'bg-transparent text-muted-foreground border-border hover:text-foreground hover:border-foreground/50',
              )}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {filtered.length !== events.length && (
          <span className="text-xs text-muted-foreground">
            {filtered.length} of {events.length}
          </span>
        )}
      </div>

      {/* Timeline */}
      {filtered.length === 0 ? (
        <div className="text-center py-12 border rounded-lg bg-muted/20">
          <p className="text-muted-foreground text-sm">No events match the selected filter.</p>
        </div>
      ) : (
        <div ref={containerRef} className="relative">
          {/* Background line */}
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border/30" />
          {/* Animated progress line */}
          <motion.div
            className="absolute left-4 top-0 bottom-0 w-0.5 bg-foreground/20 origin-top"
            style={{ scaleY }}
          />

          <div className="space-y-4">
            {filtered.map((event, i) => (
              <RecordCard
                key={event.id}
                event={event}
                index={i}
                onClick={() => setSelectedEvent(event)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Sheet preview */}
      <EventSheet
        event={selectedEvent}
        slug={slug}
        open={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />
    </div>
  );
}
