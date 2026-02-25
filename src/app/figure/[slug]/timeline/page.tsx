import { notFound } from "next/navigation";
import { Timeline } from "@/components/timeline/timeline";
import {
  getFigureBySlug,
  getStatementsForFigure,
  getActionsForFigure,
  getAccountabilityForFigure,
} from "@/lib/mock-data";

export default async function TimelinePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const figure = getFigureBySlug(slug);
  if (!figure) notFound();

  const statements = getStatementsForFigure(figure.id);
  const actions = getActionsForFigure(figure.id);
  const accountability = getAccountabilityForFigure(figure.id);

  // Build timeline events
  const events = [
    ...statements.map((s) => ({
      id: s.id,
      type: "statement" as const,
      date: s.dateOccurred,
      title: s.title,
      description: s.content,
      source: s.sourceName,
      sourceUrl: s.sourceUrl,
      sourceType: s.sourceType,
    })),
    ...actions.map((a) => ({
      id: a.id,
      type: "action" as const,
      date: a.dateOccurred,
      title: a.title,
      description: a.description,
      source: a.sourceName,
      sourceUrl: a.sourceUrl,
      sourceType: undefined,
    })),
    ...accountability.map((r) => ({
      id: r.id,
      type: "accountability" as const,
      date: r.statement?.dateOccurred || "",
      title: `${r.statement?.title || "Record"} — ${r.verdict.replace("_", " ")}`,
      description: r.summary,
      verdict: r.verdict,
      score: r.score,
    })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Timeline</h2>
      <p className="text-sm text-muted-foreground mb-6">
        A chronological view of {figure.name}&apos;s statements, actions, and
        accountability records.
      </p>

      {events.length === 0 ? (
        <div className="text-center py-12 border rounded-lg bg-muted/20">
          <p className="text-muted-foreground">No events recorded yet.</p>
        </div>
      ) : (
        <Timeline events={events} />
      )}
    </div>
  );
}
