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
import { RecordTimeline } from "@/components/figures/record-timeline";
import type { RecordEvent } from "@/components/figures/record-timeline";
import { NextSteps } from "@/components/navigation/next-steps";
import { RelatedFigures } from "@/components/figures/related-figures";
import { RelatedBlogPosts } from "@/components/figures/related-blog-posts";
import { FileSearch } from "lucide-react";

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

  // Build lookup: which actions are already shown via an accountability record?
  const actionsUsedInAccountability = new Set(
    accountability.filter((r) => r.actionId).map((r) => r.actionId as string)
  );

  // Build lookup: statementId → accountability record
  const accountabilityByStatement = new Map(
    accountability.map((r) => [r.statementId, r])
  );

  // Build unified events list — each item appears exactly once
  const recordEvents: RecordEvent[] = [
    // All statements, with accountability info attached if it exists
    ...statements.map((s) => {
      const acc = accountabilityByStatement.get(s.id);
      const linkedAction = acc?.actionId
        ? mockActions.find((a) => a.id === acc.actionId)
        : null;
      const evidenceMedia = acc ? getEvidenceForRecord(acc.id) : undefined;

      return {
        id: s.id,
        type: "statement" as const,
        subType: s.type,
        date: s.dateOccurred,
        title: s.title,
        content: s.content,
        context: s.context,
        sourceUrl: s.sourceUrl,
        sourceName: s.sourceName,
        sourceType: s.sourceType,
        isVerified: s.isVerified,
        ...(acc && {
          accountability: {
            id: acc.id,
            verdict: acc.verdict,
            score: acc.score,
            summary: acc.summary,
            evidence: acc.evidence,
            actionTitle: linkedAction?.title,
            actionDescription: linkedAction?.description,
            actionDate: linkedAction?.dateOccurred,
            actionSourceUrl: linkedAction?.sourceUrl,
            actionSourceName: linkedAction?.sourceName,
            evidenceMedia,
          },
        }),
      };
    }),

    // Only standalone actions (those NOT already shown in a SAY vs DO pair)
    ...actions
      .filter((a) => !actionsUsedInAccountability.has(a.id))
      .map((a) => ({
        id: a.id,
        type: "action" as const,
        subType: a.type,
        date: a.dateOccurred,
        title: a.title,
        content: a.description,
        outcome: a.outcome,
        sourceUrl: a.sourceUrl,
        sourceName: a.sourceName,
        isVerified: a.isVerified,
      })),
  ];

  return (
    <div className="space-y-16">
      {/* Section 1: Unified Record */}
      <section id="record" className="scroll-mt-28">
        <h2 className="text-xl font-bold mb-1">Record</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Everything {figure.name} has said and done, in chronological order.
        </p>

        {recordEvents.length === 0 ? (
          <EmptyState
            icon={FileSearch}
            title="Nothing on the record yet"
            description={`Be the first to document what ${figure.name} has said or done.`}
            action={{ label: "Contribute", href: "/contribute" }}
          />
        ) : (
          <RecordTimeline events={recordEvents} slug={slug} />
        )}
      </section>

      {/* Section 2: Evidence (SAY vs DO deep-dives) */}
      <section id="evidence" className="scroll-mt-28">
        <h2 className="text-xl font-bold mb-1">Evidence</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Side-by-side analysis comparing what {figure.name} promised vs what actually happened.
        </p>

        {accountability.length === 0 ? (
          <EmptyState
            icon={FileSearch}
            title="No accountability records yet"
            description={`Be the first to compare ${figure.name}'s words to their actions.`}
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
