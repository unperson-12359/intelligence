import { notFound } from "next/navigation";
import { SayVsDoCard } from "@/components/accountability/say-vs-do-card";
import {
  getFigureBySlug,
  getAccountabilityForFigure,
  mockActions,
} from "@/lib/mock-data";

export default async function FigureOverviewPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const figure = getFigureBySlug(slug);
  if (!figure) notFound();

  const accountability = getAccountabilityForFigure(figure.id);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Accountability Records</h2>
      <p className="text-sm text-muted-foreground mb-6">
        Side-by-side comparison of what {figure.name} said vs what they did.
      </p>

      {accountability.length === 0 ? (
        <div className="text-center py-12 border rounded-lg bg-muted/20">
          <p className="text-muted-foreground">
            No accountability records yet for {figure.name}.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {accountability.map((record) => {
            const action = record.actionId
              ? mockActions.find((a) => a.id === record.actionId)
              : null;
            return (
              <SayVsDoCard
                key={record.id}
                statementTitle={record.statement?.title || ""}
                statementContent={record.statement?.content || ""}
                statementDate={record.statement?.dateOccurred || ""}
                statementSource={record.statement?.sourceName || ""}
                actionTitle={action?.title}
                actionDescription={action?.description}
                actionDate={action?.dateOccurred}
                verdict={record.verdict}
                score={record.score}
                summary={record.summary}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
