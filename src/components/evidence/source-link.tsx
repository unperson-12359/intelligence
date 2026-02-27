import { Badge } from "@/components/ui/badge";
import { ExternalLink, FileText, Video, Mic, Building2, Newspaper, Camera, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

const sourceTypeConfig: Record<string, { label: string; icon: typeof FileText; className: string }> = {
  government_record: {
    label: "Gov Record",
    icon: Building2,
    className: "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800",
  },
  press_release: {
    label: "Press Release",
    icon: FileText,
    className: "bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/30 dark:text-purple-400 dark:border-purple-800",
  },
  news: {
    label: "Article",
    icon: Newspaper,
    className: "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800",
  },
  podcast: {
    label: "Podcast",
    icon: Mic,
    className: "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800",
  },
  video: {
    label: "Video",
    icon: Video,
    className: "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800",
  },
  reference: {
    label: "Reference",
    icon: BookOpen,
    className: "bg-slate-100 text-slate-800 border-slate-200 dark:bg-slate-900/30 dark:text-slate-400 dark:border-slate-800",
  },
};

interface SourceLinkProps {
  url: string;
  name: string;
  type?: string;
  showTypeBadge?: boolean;
  archivedUrl?: string;
  hasScreenshot?: boolean;
  className?: string;
}

export function SourceLink({
  url,
  name,
  type,
  showTypeBadge = true,
  archivedUrl,
  hasScreenshot,
  className,
}: SourceLinkProps) {
  const config = type ? sourceTypeConfig[type] : undefined;
  const Icon = config?.icon || FileText;

  return (
    <span className={cn("inline-flex items-center gap-1.5 text-xs", className)}>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 group transition-colors text-muted-foreground hover:text-foreground"
        title={`View source: ${name}`}
      >
        {showTypeBadge && config && (
          <Badge
            variant="outline"
            className={cn("text-[10px] px-1.5 py-0 h-4 font-medium", config.className)}
          >
            <Icon className="size-2.5 mr-0.5" />
            {config.label}
          </Badge>
        )}
        <span className="group-hover:underline underline-offset-2">{name}</span>
        <ExternalLink className="size-3 opacity-50 group-hover:opacity-100 transition-opacity" />
      </a>
      {archivedUrl && (
        <a href={archivedUrl} target="_blank" rel="noopener noreferrer" className="ml-1 text-[10px] text-muted-foreground hover:text-foreground">
          [archived]
        </a>
      )}
      {hasScreenshot && (
        <Camera className="size-3 ml-1 text-muted-foreground" />
      )}
    </span>
  );
}
