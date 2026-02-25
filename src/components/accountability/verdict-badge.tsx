import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  CheckCircle2,
  XCircle,
  MinusCircle,
  Clock,
  ArrowLeftRight,
  HelpCircle,
} from "lucide-react";

const verdictConfig = {
  kept: {
    style: "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800",
    icon: CheckCircle2,
    label: "Kept",
  },
  broken: {
    style: "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800",
    icon: XCircle,
    label: "Broken",
    pulse: true,
  },
  partial: {
    style: "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-800",
    icon: MinusCircle,
    label: "Partial",
  },
  in_progress: {
    style: "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800",
    icon: Clock,
    label: "In Progress",
  },
  flip_flop: {
    style: "bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/30 dark:text-purple-400 dark:border-purple-800",
    icon: ArrowLeftRight,
    label: "Flip-Flop",
  },
  context_needed: {
    style: "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/30 dark:text-gray-400 dark:border-gray-800",
    icon: HelpCircle,
    label: "Needs Context",
  },
} as const;

type Verdict = keyof typeof verdictConfig;

export function VerdictBadge({
  verdict,
  className,
}: {
  verdict: Verdict;
  className?: string;
}) {
  const config = verdictConfig[verdict];
  const Icon = config.icon;

  return (
    <Badge
      variant="outline"
      className={cn(
        "font-semibold gap-1",
        config.style,
        "pulse" in config && config.pulse && "animate-[pulse-ring_2s_ease-in-out_infinite]",
        className
      )}
    >
      <Icon className="size-3" />
      {config.label}
    </Badge>
  );
}
