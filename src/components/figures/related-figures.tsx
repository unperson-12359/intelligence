import { FigureCard } from "@/components/figures/figure-card";
import { mockFigures, getAllFigureStats } from "@/lib/mock-data";

interface RelatedFiguresProps {
  currentFigureId: string;
  figureType: string;
  party?: string;
}

export function RelatedFigures({
  currentFigureId,
  figureType,
  party,
}: RelatedFiguresProps) {
  const allStats = getAllFigureStats();

  // Find related figures: same type or same party, exclude current
  const related = mockFigures
    .filter((f) => f.id !== currentFigureId)
    .filter((f) => f.type === figureType || (party && f.party === party))
    .slice(0, 4);

  if (related.length === 0) return null;

  return (
    <div className="mt-12">
      <h3 className="text-sm font-semibold text-muted-foreground mb-3">
        Similar public figures
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {related.map((figure) => {
          const stats = allStats.get(figure.id)!;
          return (
            <FigureCard
              key={figure.id}
              slug={figure.slug}
              name={figure.name}
              title={figure.title}
              type={figure.type}
              party={figure.party}
              state={figure.state}
              country={figure.country}
              overallScore={figure.overallScore}
              imageUrl={figure.imageUrl}
              totalStatements={stats.totalStatements}
              totalActions={stats.totalActions}
              brokenCount={stats.brokenCount}
            />
          );
        })}
      </div>
    </div>
  );
}
