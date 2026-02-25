import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { ScoreBadge } from "@/components/accountability/score-badge";

interface FigureHeaderProps {
  name: string;
  title: string;
  type: string;
  party?: string;
  state?: string;
  country: string;
  bio: string;
  overallScore: string;
  imageUrl?: string;
  stats: {
    totalStatements: number;
    totalActions: number;
    keptCount: number;
    brokenCount: number;
    partialCount: number;
    flipFlopCount: number;
  };
}

const typeLabels: Record<string, string> = {
  politician: "Politician",
  executive: "Executive",
  influencer: "Influencer",
  journalist: "Journalist",
  activist: "Activist",
  other: "Other",
};

export function FigureHeader({
  name,
  title,
  type,
  party,
  state,
  country,
  bio,
  overallScore,
  imageUrl,
  stats,
}: FigureHeaderProps) {
  const total = stats.keptCount + stats.brokenCount + stats.partialCount + stats.flipFlopCount;
  const keptPct = total > 0 ? Math.round((stats.keptCount / total) * 100) : 0;
  const brokenPct = total > 0 ? Math.round((stats.brokenCount / total) * 100) : 0;

  return (
    <div className="relative border-b overflow-hidden">
      {/* Gradient accent bar */}
      <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-red-500" />

      <div className="relative mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start gap-4">
          {/* Avatar */}
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={name}
              width={72}
              height={72}
              className="rounded-full object-cover shrink-0 border-2 border-border/50 shadow-lg"
              style={{ width: 72, height: 72 }}
            />
          ) : (
            <div
              className="h-[72px] w-[72px] rounded-full bg-gradient-to-br from-muted to-muted/60 flex items-center justify-center text-2xl font-bold text-muted-foreground shrink-0 border-2 border-border/50 shadow-lg"
              role="img"
              aria-label={`Avatar for ${name}`}
            >
              {name.charAt(0)}
            </div>
          )}

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:justify-between">
              <div>
                <h1 className="text-2xl font-bold">{name}</h1>
                <p className="text-sm text-muted-foreground">{title}</p>
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  <Badge variant="secondary" className="text-xs">{typeLabels[type] || type}</Badge>
                  {party && <Badge variant="outline" className="text-xs">{party}</Badge>}
                  {state && <Badge variant="outline" className="text-xs">{state}</Badge>}
                  <Badge variant="outline" className="text-xs">{country}</Badge>
                </div>
              </div>
              <ScoreBadge grade={overallScore} size="md" />
            </div>

            <p className="text-sm text-muted-foreground mt-2 max-w-2xl line-clamp-2">
              {bio}
            </p>

            {/* Compact stats row */}
            <div className="flex flex-wrap gap-2 mt-3">
              <Badge variant="outline" className="text-xs font-normal">
                <span className="font-semibold text-blue-600 dark:text-blue-400 mr-1">{stats.totalStatements}</span> statements
              </Badge>
              <Badge variant="outline" className="text-xs font-normal">
                <span className="font-semibold text-amber-600 dark:text-amber-400 mr-1">{stats.totalActions}</span> actions
              </Badge>
              <Badge variant="outline" className="text-xs font-normal">
                <span className="font-semibold text-green-600 dark:text-green-400 mr-1">{stats.keptCount}</span> kept ({keptPct}%)
              </Badge>
              <Badge variant="outline" className="text-xs font-normal">
                <span className="font-semibold text-red-600 dark:text-red-400 mr-1">{stats.brokenCount}</span> broken ({brokenPct}%)
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
