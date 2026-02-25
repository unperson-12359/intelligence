import { cn } from "@/lib/utils";

interface ConfidenceIndicatorProps {
  confidence: number;
  className?: string;
}

export function ConfidenceIndicator({ confidence, className }: ConfidenceIndicatorProps) {
  const pct = Math.round(confidence * 100);
  const color =
    pct >= 90
      ? "bg-green-500"
      : pct >= 70
        ? "bg-yellow-500"
        : "bg-orange-500";

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 text-[10px] text-muted-foreground",
        className
      )}
    >
      <div className="w-12 h-1.5 rounded-full bg-muted overflow-hidden">
        <div
          className={cn("h-full rounded-full transition-all", color)}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span>{pct}% confidence</span>
    </div>
  );
}
