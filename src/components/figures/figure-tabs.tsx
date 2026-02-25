"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { LayoutDashboard, MessageSquare, Activity, Clock } from "lucide-react";

const tabs = [
  { label: "Overview", suffix: "", icon: LayoutDashboard },
  { label: "Statements", suffix: "/statements", icon: MessageSquare },
  { label: "Actions", suffix: "/actions", icon: Activity },
  { label: "Timeline", suffix: "/timeline", icon: Clock },
];

export function FigureTabs({ slug }: { slug: string }) {
  const pathname = usePathname();
  const basePath = `/figure/${slug}`;

  return (
    <div className="border-b">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav className="flex gap-1 -mb-px overflow-x-auto">
          {tabs.map((tab) => {
            const href = `${basePath}${tab.suffix}`;
            const isActive =
              tab.suffix === ""
                ? pathname === basePath
                : pathname === href;

            return (
              <Link
                key={tab.label}
                href={href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "relative px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap",
                  isActive
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <tab.icon className="size-4 mr-1.5 inline-block" />
                {tab.label}
                {isActive && (
                  <motion.div
                    layoutId="tab-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-foreground"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
