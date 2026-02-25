import { cn } from "@/lib/utils";

const gradeStyles = {
  A: "bg-green-100 text-green-800 border-green-300 dark:bg-green-900/40 dark:text-green-300 dark:border-green-700",
  B: "bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-900/40 dark:text-blue-300 dark:border-blue-700",
  C: "bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-900/40 dark:text-yellow-300 dark:border-yellow-700",
  D: "bg-orange-100 text-orange-800 border-orange-300 dark:bg-orange-900/40 dark:text-orange-300 dark:border-orange-700",
  F: "bg-red-100 text-red-800 border-red-300 dark:bg-red-900/40 dark:text-red-300 dark:border-red-700",
} as const;

type Grade = keyof typeof gradeStyles;

export function ScoreBadge({
  grade,
  size = "md",
  className,
}: {
  grade: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const g = (grade in gradeStyles ? grade : "C") as Grade;

  const sizeClasses = {
    sm: "h-8 w-8 text-sm",
    md: "h-12 w-12 text-xl",
    lg: "h-16 w-16 text-3xl",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center justify-center rounded-full border-2 font-bold",
        sizeClasses[size],
        gradeStyles[g],
        className
      )}
    >
      {grade}
    </div>
  );
}
