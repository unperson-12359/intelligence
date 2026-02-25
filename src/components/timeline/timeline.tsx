"use client";

import { cn } from "@/lib/utils";
import { VerdictBadge } from "@/components/accountability/verdict-badge";
import { SourceLink } from "@/components/evidence/source-link";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";

type Verdict = "kept" | "broken" | "partial" | "in_progress" | "flip_flop" | "context_needed";

interface TimelineEvent {
  id: string;
  type: "statement" | "action" | "accountability";
  date: string;
  title: string;
  description: string;
  source?: string;
  sourceUrl?: string;
  sourceType?: string;
  verdict?: Verdict;
  score?: number;
}

interface TimelineProps {
  events: TimelineEvent[];
  className?: string;
}

const typeColors = {
  statement: "bg-blue-500",
  action: "bg-amber-500",
  accountability: "bg-purple-500",
};

const typeLabels = {
  statement: "Statement",
  action: "Action",
  accountability: "Accountability",
};

function TimelineEventCard({ event, index }: { event: TimelineEvent; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      className="relative pl-10"
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : undefined}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {/* Dot */}
      <div
        className={cn(
          "absolute left-[10px] top-1.5 h-3 w-3 rounded-full border-2 border-background",
          typeColors[event.type]
        )}
      />

      <div className="bg-card border rounded-lg p-4 transition-all hover:shadow-md">
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          <span className="text-xs font-medium text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
            {typeLabels[event.type]}
          </span>
          <span className="text-xs text-muted-foreground">
            {event.date}
          </span>
          {event.verdict && <VerdictBadge verdict={event.verdict} />}
          {event.score !== undefined && (
            <span
              className={cn(
                "text-xs font-bold",
                event.score > 0 ? "text-green-600" : event.score < 0 ? "text-red-600" : "text-gray-500"
              )}
            >
              {event.score > 0 ? "+" : ""}
              {event.score}
            </span>
          )}
        </div>
        <h4 className="font-semibold text-sm">{event.title}</h4>
        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
          {event.description}
        </p>
        {event.source && (
          <div className="mt-2">
            {event.sourceUrl ? (
              <SourceLink
                url={event.sourceUrl}
                name={event.source}
                type={event.sourceType}
              />
            ) : (
              <p className="text-xs text-muted-foreground">
                Source: {event.source}
              </p>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export function Timeline({ events, className }: TimelineProps) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      {/* Background line */}
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border/30" />

      {/* Animated progress line */}
      <motion.div
        className="absolute left-4 top-0 bottom-0 w-0.5 bg-foreground/20 origin-top"
        style={{ scaleY }}
      />

      <div className="space-y-6">
        {events.map((event, i) => (
          <TimelineEventCard key={event.id} event={event} index={i} />
        ))}
      </div>
    </div>
  );
}
