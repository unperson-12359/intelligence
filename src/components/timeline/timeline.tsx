import { cn } from "@/lib/utils";
import { VerdictBadge } from "@/components/accountability/verdict-badge";

type Verdict = "kept" | "broken" | "partial" | "in_progress" | "flip_flop" | "context_needed";

interface TimelineEvent {
  id: string;
  type: "statement" | "action" | "accountability";
  date: string;
  title: string;
  description: string;
  source?: string;
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

export function Timeline({ events, className }: TimelineProps) {
  return (
    <div className={cn("relative", className)}>
      {/* Vertical line */}
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />

      <div className="space-y-6">
        {events.map((event) => (
          <div key={event.id} className="relative pl-10">
            {/* Dot */}
            <div
              className={cn(
                "absolute left-[10px] top-1.5 h-3 w-3 rounded-full border-2 border-background",
                typeColors[event.type]
              )}
            />

            <div className="bg-card border rounded-lg p-4">
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
                <p className="text-xs text-muted-foreground mt-2">
                  Source: {event.source}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
