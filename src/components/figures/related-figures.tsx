import { FigureCard } from "@/components/figures/figure-card";
import { mockFigures, getAllFigureStats } from "@/lib/mock-data";

interface RelatedFiguresProps {
  currentFigureId: string;
  topicIds: string[];
}

export function RelatedFigures({
  currentFigureId,
  topicIds,
}: RelatedFiguresProps) {
  const allStats = getAllFigureStats();
  const currentTopics = new Set(topicIds);

  // Find related figures by shared topics, ranked by overlap count
  const related = mockFigures
    .filter((f) => f.id !== currentFigureId)
    .map((f) => {
      const sharedCount = f.topicIds.filter((t) => currentTopics.has(t)).length;
      return { figure: f, sharedCount };
    })
    .filter((entry) => entry.sharedCount > 0)
    .sort((a, b) => b.sharedCount - a.sharedCount)
    .slice(0, 3)
    .map((entry) => entry.figure);

  if (related.length === 0) return null;

  return (
    <div className="mt-12">
      <h3 className="text-lg font-semibold mb-4">Related Figures</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
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
