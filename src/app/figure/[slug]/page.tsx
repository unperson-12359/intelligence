import { notFound } from "next/navigation";
import { SayVsDoCard } from "@/components/accountability/say-vs-do-card";
import { Pagination } from "@/components/ui/pagination";
import { EmptyState } from "@/components/ui/empty-state";
import { paginate } from "@/lib/pagination";
import {
  getFigureBySlug,
  getAccountabilityForFigure,
  getEvidenceForRecord,
  mockActions,
  mockStatements,
} from "@/lib/mock-data";
import { NextSteps } from "@/components/navigation/next-steps";
import { RelatedFigures } from "@/components/figures/related-figures";
import { RelatedBlogPosts } from "@/components/figures/related-blog-posts";
import { FileSearch } from "lucide-react";

const PAGE_SIZE = 6;

export default async function FigureOverviewPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { slug } = await params;
  const sp = await searchParams;
  const page = Number(sp.page) || 1;
  const figure = getFigureBySlug(slug);
  if (!figure) notFound();

  const accountability = getAccountabilityForFigure(figure.id);
  const { items: paginatedRecords, currentPage, totalPages, totalItems } = paginate(accountability, page, PAGE_SIZE);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Accountability Records</h2>
      <p className="text-sm text-muted-foreground mb-6">
        Side-by-side comparison of what {figure.name} said vs what they did.
      </p>

      {accountability.length === 0 ? (
        <EmptyState
          icon={FileSearch}
          title="No one's checked this leader yet"
          description={`Be the first to compare ${figure.name}'s words to their actions. It takes 2 minutes.`}
          action={{ label: "Submit Evidence", href: "/contribute" }}
          secondaryAction={{ label: "View Statements", href: `/figure/${slug}/statements` }}
          suggestion="Every record you add protects someone else from believing a broken promise."
        />
      ) : (
        <div className="space-y-4">
          {paginatedRecords.map((record) => {
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

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        baseUrl={`/figure/${slug}`}
        pageSize={PAGE_SIZE}
      />

      <RelatedFigures
        currentFigureId={figure.id}
        figureType={figure.type}
        party={figure.party}
      />

      <RelatedBlogPosts figureSlug={slug} />

      <NextSteps
        className="mt-12"
        suggestions={[
          { label: "View Statements", href: `/figure/${slug}/statements`, description: `Everything ${figure.name} has said publicly` },
          { label: "View Timeline", href: `/figure/${slug}/timeline`, description: "Chronological view of promises and actions" },
          { label: "Browse All Leaders", href: "/directory", description: "Search and filter every tracked public figure" },
        ]}
      />
    </div>
  );
}
