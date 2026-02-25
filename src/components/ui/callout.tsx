import { Info, AlertTriangle, Lightbulb } from "lucide-react";

interface CalloutProps {
  type: "info" | "warning" | "example";
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const typeConfig = {
  info: {
    icon: Info,
    bg: "bg-blue-50 dark:bg-blue-950/30",
    border: "border-blue-200 dark:border-blue-800",
    iconColor: "text-blue-600 dark:text-blue-400",
  },
  warning: {
    icon: AlertTriangle,
    bg: "bg-amber-50 dark:bg-amber-950/30",
    border: "border-amber-200 dark:border-amber-800",
    iconColor: "text-amber-600 dark:text-amber-400",
  },
  example: {
    icon: Lightbulb,
    bg: "bg-purple-50 dark:bg-purple-950/30",
    border: "border-purple-200 dark:border-purple-800",
    iconColor: "text-purple-600 dark:text-purple-400",
  },
};

export function Callout({ type, title, children, className }: CalloutProps) {
  const config = typeConfig[type];
  const Icon = config.icon;

  return (
    <div
      className={`rounded-lg border p-4 ${config.bg} ${config.border} ${className || ""}`}
    >
      <div className="flex gap-3">
        <Icon className={`size-5 shrink-0 mt-0.5 ${config.iconColor}`} />
        <div className="text-sm">
          {title && (
            <p className="font-semibold mb-1">{title}</p>
          )}
          <div className="text-muted-foreground">{children}</div>
        </div>
      </div>
    </div>
  );
}
