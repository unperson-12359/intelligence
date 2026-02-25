import { Camera, Film, Mic } from "lucide-react";

interface EvidenceIndicatorProps {
  screenshotCount: number;
  videoCount: number;
  audioCount: number;
  documentCount: number;
  className?: string;
}

export function EvidenceIndicator({
  screenshotCount,
  videoCount,
  audioCount,
  documentCount,
  className,
}: EvidenceIndicatorProps) {
  const total = screenshotCount + videoCount + audioCount + documentCount;
  if (total === 0) return null;

  return (
    <div className={`flex items-center gap-2 text-xs text-muted-foreground ${className || ""}`}>
      {screenshotCount > 0 && (
        <span className="flex items-center gap-0.5">
          <Camera className="size-3" />
          {screenshotCount}
        </span>
      )}
      {videoCount > 0 && (
        <span className="flex items-center gap-0.5">
          <Film className="size-3" />
          {videoCount}
        </span>
      )}
      {audioCount > 0 && (
        <span className="flex items-center gap-0.5">
          <Mic className="size-3" />
          {audioCount}
        </span>
      )}
      <span className="text-muted-foreground/60">
        {total} evidence {total === 1 ? 'item' : 'items'}
      </span>
    </div>
  );
}
