import { notFound } from "next/navigation";
import { SayVsDoCard } from "@/components/accountability/say-vs-do-card";
import { EmptyState } from "@/components/ui/empty-state";
import {
  getFigureBySlug,
  getAccountabilityForFigure,
  getStatementsForFigure,
  getActionsForFigure,
  getEvidenceForRecord,
  mockActions,
  mockStatements,
} from "@/lib/mock-data";
import { StatementFilters } from "@/components/figures/statement-filters";
import { ActionFilters } from "@/components/figures/action-filters";
import { Timeline } from "@/components/timeline/timeline";
import { NextSteps } from "@/components/navigation/next-steps";
import { RelatedFigures } from "@/components/figures/related-figures";
import { RelatedBlogPosts } from "@/components/figures/related-blog-posts";
import { FileSearch, MessageSquare, Activity } from "lucide-react";

export default async function FigureProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const figure = getFigureBySlug(slug);
  if (!figure) notFound();

  const accountability = getAccountabilityForFigure(figure.id);
  const statements = getStatementsForFigure(figure.id);
  const actions = getActionsForFigure(figure.id);

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
    <div className="space-y-16">
      {/* Section 1: Accountability Records */}
      <section id="accountability" className="scroll-mt-28">
        <h2 className="text-xl font-bold mb-1">SAY vs DO</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Side-by-side comparison of what {figure.name} said vs what they did.
        </p>

        {accountability.length === 0 ? (
          <EmptyState
            icon={FileSearch}
            title="No one's checked this leader yet"
            description={`Be the first to compare ${figure.name}'s words to their actions. It takes 2 minutes.`}
            action={{ label: "Submit Evidence", href: "/contribute" }}
          />
        ) : (
          <div className="space-y-4">
            {accountability.map((record) => {
              const action = record.actionId
                ? mockActions.find((a) => a.id === record.actionId)
                : null;
              const statement = mockStatements.find(
                (s) => s.id === record.statementId
              );
              const evidenceMedia = getEvidenceForRecord(record.id);
              return (
                <SayVsDoCard
                  key={record.id}
                  statementTitle={record.statement?.title || ""}
                  statementContent={record.statement?.content || ""}
                  statementDate={record.statement?.dateOccurred || ""}
                  statementSource={record.statement?.sourceName || ""}
                  statementSourceUrl={statement?.sourceUrl}
                  statementSourceType={statement?.sourceType}
                  actionTitle={action?.title}
                  actionDescription={action?.description}
                  actionDate={action?.dateOccurred}
                  actionSourceUrl={action?.sourceUrl}
                  actionSourceName={action?.sourceName}
                  verdict={record.verdict}
                  score={record.score}
                  summary={record.summary}
                  evidence={record.evidence}
                  evidenceMedia={evidenceMedia}
                />
              );
            })}
          </div>
        )}
      </section>

      {/* Section 2: Statements */}
      <section id="statements" className="scroll-mt-28">
        <h2 className="text-xl font-bold mb-1">Statements</h2>
        <p className="text-sm text-muted-foreground mb-6">
          What {figure.name} has said publicly — promises, claims, positions,
          and predictions.
        </p>

        {statements.length === 0 ? (
          <EmptyState
            icon={MessageSquare}
            title="No promises on record yet"
            description="Know something they said publicly? Put it on the record so it can't be forgotten."
            action={{ label: "Add a Statement", href: "/contribute" }}
          />
        ) : (
          <StatementFilters statements={statements} />
        )}
      </section>

      {/* Section 3: Actions */}
      <section id="actions" className="scroll-mt-28">
        <h2 className="text-xl font-bold mb-1">Actions</h2>
        <p className="text-sm text-muted-foreground mb-6">
          What {figure.name} has actually done — votes, executive orders,
          business decisions, and more.
        </p>

        {actions.length === 0 ? (
          <EmptyState
            icon={Activity}
            title="No actions documented yet"
            description="Know something they actually did? Add it so their words can be measured against reality."
            action={{ label: "Report an Action", href: "/contribute" }}
          />
        ) : (
          <ActionFilters actions={actions} />
        )}
      </section>

      {/* Section 4: Timeline */}
      <section id="timeline" className="scroll-mt-28">
        <h2 className="text-xl font-bold mb-1">Timeline</h2>
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
      </section>

      {/* Footer sections */}
      <div className="space-y-8">
        <RelatedFigures
          currentFigureId={figure.id}
          topicIds={figure.topicIds}
        />

        <RelatedBlogPosts figureSlug={slug} />

        <NextSteps
          suggestions={[
            { label: "Submit Evidence", href: "/contribute", description: `Help verify ${figure.name}'s accountability record` },
            { label: "Browse All Leaders", href: "/directory", description: "Search and filter every tracked public figure" },
          ]}
        />
      </div>
    </div>
  );
}
