import { Badge } from "@/components/ui/badge";
import { Camera, Film, Mic, FileText } from "lucide-react";
import { formatDate } from "@/lib/format";
import Image from "next/image";

interface EvidenceItem {
  id: string;
  type: 'screenshot' | 'document' | 'audio' | 'video';
  thumbnailUrl: string;
  caption: string;
  url: string;
  sourceUrl: string;
  capturedAt: string;
}

interface EvidenceGalleryProps {
  items: EvidenceItem[];
  className?: string;
}

const typeConfig = {
  screenshot: { icon: Camera, label: "Screenshot", color: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-950/30" },
  video: { icon: Film, label: "Video", color: "text-red-600", bg: "bg-red-50 dark:bg-red-950/30" },
  audio: { icon: Mic, label: "Audio", color: "text-green-600", bg: "bg-green-50 dark:bg-green-950/30" },
  document: { icon: FileText, label: "Document", color: "text-purple-600", bg: "bg-purple-50 dark:bg-purple-950/30" },
};

export function EvidenceGallery({ items, className }: EvidenceGalleryProps) {
  if (items.length === 0) return null;

  return (
    <div className={className}>
      <div className="flex gap-3 overflow-x-auto pb-2">
        {items.map((item) => {
          const config = typeConfig[item.type];
          const Icon = config.icon;
          const hasSvgThumbnail = item.thumbnailUrl?.endsWith('.svg');
          return (
            <a
              key={item.id}
              href={item.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group shrink-0 w-44 rounded-lg border bg-card overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className={`relative h-28 ${config.bg} flex items-center justify-center overflow-hidden`}>
                {hasSvgThumbnail ? (
                  <Image
                    src={item.thumbnailUrl}
                    alt={item.caption}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-200"
                    unoptimized
                  />
                ) : (
                  <Icon className={`size-8 ${config.color} opacity-50 group-hover:opacity-80 transition-opacity`} />
                )}
                <Badge variant="secondary" className="absolute top-1.5 left-1.5 text-[10px] px-1.5 py-0 z-10">
                  {config.label}
                </Badge>
              </div>
              <div className="p-2">
                <p className="text-[11px] text-muted-foreground line-clamp-2 leading-tight">
                  {item.caption}
                </p>
                <p className="text-[10px] text-muted-foreground/60 mt-1">
                  Preserved {formatDate(item.capturedAt)}
                </p>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
