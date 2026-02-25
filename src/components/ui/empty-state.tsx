import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    href: string;
  };
  secondaryAction?: {
    label: string;
    href: string;
  };
  suggestion?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  secondaryAction,
  suggestion,
}: EmptyStateProps) {
  return (
    <div className="text-center py-16 border rounded-lg bg-muted/10">
      <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-muted/30 mb-4">
        <Icon className="h-7 w-7 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground max-w-sm mx-auto mb-6">
        {description}
      </p>
      <div className="flex items-center justify-center gap-3 flex-wrap">
        {action && (
          <Button variant="outline" asChild>
            <Link href={action.href}>{action.label}</Link>
          </Button>
        )}
        {secondaryAction && (
          <Button variant="ghost" asChild>
            <Link href={secondaryAction.href}>{secondaryAction.label}</Link>
          </Button>
        )}
      </div>
      {suggestion && (
        <p className="text-xs text-muted-foreground mt-4 max-w-xs mx-auto">
          {suggestion}
        </p>
      )}
    </div>
  );
}
