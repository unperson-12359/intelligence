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
  stats,
}: FigureHeaderProps) {
  const total = stats.keptCount + stats.brokenCount + stats.partialCount + stats.flipFlopCount;
  const keptPct = total > 0 ? Math.round((stats.keptCount / total) * 100) : 0;
  const brokenPct = total > 0 ? Math.round((stats.brokenCount / total) * 100) : 0;

  return (
    <div className="border-b bg-muted/20">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start gap-6">
          {/* Avatar */}
          <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center text-3xl font-bold text-muted-foreground shrink-0">
            {name.charAt(0)}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:justify-between">
              <div>
                <h1 className="text-2xl font-bold">{name}</h1>
                <p className="text-muted-foreground">{title}</p>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  <Badge variant="secondary">{typeLabels[type] || type}</Badge>
                  {party && <Badge variant="outline">{party}</Badge>}
                  {state && <Badge variant="outline">{state}</Badge>}
                  <Badge variant="outline">{country}</Badge>
                </div>
              </div>
              <ScoreBadge grade={overallScore} size="lg" />
            </div>

            <p className="text-sm text-muted-foreground mt-3 max-w-2xl">
              {bio}
            </p>

            {/* Stats row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
              <StatBox label="Statements" value={stats.totalStatements} />
              <StatBox label="Actions" value={stats.totalActions} />
              <StatBox
                label="Kept"
                value={`${stats.keptCount} (${keptPct}%)`}
                valueColor="text-green-600"
              />
              <StatBox
                label="Broken"
                value={`${stats.brokenCount} (${brokenPct}%)`}
                valueColor="text-red-600"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatBox({
  label,
  value,
  valueColor,
}: {
  label: string;
  value: string | number;
  valueColor?: string;
}) {
  return (
    <div className="bg-background rounded-lg border px-3 py-2">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className={`text-lg font-bold ${valueColor || ""}`}>{value}</p>
    </div>
  );
}
