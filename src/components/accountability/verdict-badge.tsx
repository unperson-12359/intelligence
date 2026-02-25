import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const verdictStyles = {
  kept: "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800",
  broken: "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800",
  partial: "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-800",
  in_progress: "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800",
  flip_flop: "bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/30 dark:text-purple-400 dark:border-purple-800",
  context_needed: "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/30 dark:text-gray-400 dark:border-gray-800",
} as const;

const verdictLabels = {
  kept: "Kept",
  broken: "Broken",
  partial: "Partial",
  in_progress: "In Progress",
  flip_flop: "Flip-Flop",
  context_needed: "Needs Context",
} as const;

type Verdict = keyof typeof verdictStyles;

export function VerdictBadge({
  verdict,
  className,
}: {
  verdict: Verdict;
  className?: string;
}) {
  return (
    <Badge
      variant="outline"
      className={cn("font-semibold", verdictStyles[verdict], className)}
    >
      {verdictLabels[verdict]}
    </Badge>
  );
}
