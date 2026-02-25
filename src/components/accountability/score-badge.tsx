"use client";

import { cn } from "@/lib/utils";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const gradeConfig = {
  A: {
    bg: "bg-green-100 dark:bg-green-900/40",
    text: "text-green-800 dark:text-green-300",
    border: "border-green-300 dark:border-green-700",
    ring: "stroke-green-500",
    glow: "shadow-green-500/20",
  },
  B: {
    bg: "bg-blue-100 dark:bg-blue-900/40",
    text: "text-blue-800 dark:text-blue-300",
    border: "border-blue-300 dark:border-blue-700",
    ring: "stroke-blue-500",
    glow: "shadow-blue-500/20",
  },
  C: {
    bg: "bg-yellow-100 dark:bg-yellow-900/40",
    text: "text-yellow-800 dark:text-yellow-300",
    border: "border-yellow-300 dark:border-yellow-700",
    ring: "stroke-yellow-500",
    glow: "shadow-yellow-500/20",
  },
  D: {
    bg: "bg-orange-100 dark:bg-orange-900/40",
    text: "text-orange-800 dark:text-orange-300",
    border: "border-orange-300 dark:border-orange-700",
    ring: "stroke-orange-500",
    glow: "shadow-orange-500/20",
  },
  F: {
    bg: "bg-red-100 dark:bg-red-900/40",
    text: "text-red-800 dark:text-red-300",
    border: "border-red-300 dark:border-red-700",
    ring: "stroke-red-500",
    glow: "shadow-red-500/20",
  },
} as const;

type Grade = keyof typeof gradeConfig;

const gradePercent: Record<Grade, number> = {
  A: 95,
  B: 75,
  C: 55,
  D: 35,
  F: 15,
};

export function ScoreBadge({
  grade,
  size = "md",
  className,
}: {
  grade: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const g = (grade.charAt(0) in gradeConfig ? grade.charAt(0) : "C") as Grade;
  const config = gradeConfig[g];
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  if (size === "lg") {
    const radius = 26;
    const circumference = 2 * Math.PI * radius;
    const percent = gradePercent[g];
    const dashOffset = circumference - (circumference * percent) / 100;

    return (
      <div ref={ref} className={cn("relative", className)}>
        <svg width="72" height="72" viewBox="0 0 72 72" className="rotate-[-90deg]">
          <circle
            cx="36"
            cy="36"
            r={radius}
            fill="none"
            strokeWidth="5"
            className="stroke-muted/30"
          />
          <motion.circle
            cx="36"
            cy="36"
            r={radius}
            fill="none"
            strokeWidth="5"
            strokeLinecap="round"
            className={config.ring}
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={isInView ? { strokeDashoffset: dashOffset } : undefined}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          />
        </svg>
        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center text-2xl font-bold",
            config.text
          )}
        >
          {grade}
        </div>
      </div>
    );
  }

  const sizeClasses = {
    sm: "h-8 w-8 text-sm",
    md: "h-12 w-12 text-xl shadow-md",
  };

  return (
    <div
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center rounded-full border-2 font-bold",
        sizeClasses[size],
        config.bg,
        config.text,
        config.border,
        size === "md" && config.glow,
        className
      )}
    >
      {grade}
    </div>
  );
}
