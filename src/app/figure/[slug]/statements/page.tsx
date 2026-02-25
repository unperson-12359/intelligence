import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { SourceLink } from "@/components/evidence/source-link";
import { Pagination } from "@/components/ui/pagination";
import { EmptyState } from "@/components/ui/empty-state";
import { paginate } from "@/lib/pagination";
import { formatDate } from "@/lib/format";
import { getFigureBySlug, getStatementsForFigure } from "@/lib/mock-data";
import { MessageSquare } from "lucide-react";

const PAGE_SIZE = 10;

const typeLabels: Record<string, string> = {
  promise: "Promise",
  claim: "Claim",
  position: "Position",
  prediction: "Prediction",
  denial: "Denial",
  endorsement: "Endorsement",
  other: "Other",
};

export default async function StatementsPage({
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

  const statements = getStatementsForFigure(figure.id);
  const { items: paginatedStatements, currentPage, totalPages, totalItems } = paginate(statements, page, PAGE_SIZE);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Statements</h2>
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
          secondaryAction={{ label: "View Actions", href: `/figure/${slug}/actions` }}
        />
      ) : (
        <div className="space-y-3">
          {paginatedStatements.map((stmt) => (
            <Card key={stmt.id}>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <Badge variant="secondary" className="text-xs">
                    {typeLabels[stmt.type] || stmt.type}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {formatDate(stmt.dateOccurred)}
                  </span>
                  {stmt.isVerified && (
                    <Badge
                      variant="outline"
                      className="text-xs text-green-700 border-green-300"
                    >
                      Verified
                    </Badge>
                  )}
                </div>
                <h3 className="font-semibold text-sm">{stmt.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {stmt.content}
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  {stmt.context}
                </p>
                <div className="mt-1">
                  {stmt.sourceUrl ? (
                    <SourceLink
                      url={stmt.sourceUrl}
                      name={stmt.sourceName}
                      type={stmt.sourceType}
                    />
                  ) : (
                    <p className="text-xs text-muted-foreground">
                      Source: {stmt.sourceName}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        baseUrl={`/figure/${slug}/statements`}
        pageSize={PAGE_SIZE}
      />
    </div>
  );
}
