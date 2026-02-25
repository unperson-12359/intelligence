import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { SourceLink } from "@/components/evidence/source-link";
import { Pagination } from "@/components/ui/pagination";
import { EmptyState } from "@/components/ui/empty-state";
import { paginate } from "@/lib/pagination";
import { formatDate } from "@/lib/format";
import { getFigureBySlug, getActionsForFigure } from "@/lib/mock-data";
import { Activity } from "lucide-react";

const PAGE_SIZE = 10;

const typeLabels: Record<string, string> = {
  vote: "Vote",
  executive_order: "Executive Order",
  legislation_signed: "Legislation Signed",
  legislation_vetoed: "Legislation Vetoed",
  policy_enacted: "Policy Enacted",
  business_decision: "Business Decision",
  appointment: "Appointment",
  donation: "Donation",
  other: "Other",
};

export default async function ActionsPage({
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

  const actions = getActionsForFigure(figure.id);
  const { items: paginatedActions, currentPage, totalPages, totalItems } = paginate(actions, page, PAGE_SIZE);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Actions</h2>
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
          secondaryAction={{ label: "View Statements", href: `/figure/${slug}/statements` }}
        />
      ) : (
        <div className="space-y-3">
          {paginatedActions.map((action) => (
            <Card key={action.id}>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <Badge variant="secondary" className="text-xs">
                    {typeLabels[action.type] || action.type}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {formatDate(action.dateOccurred)}
                  </span>
                  {action.isVerified && (
                    <Badge
                      variant="outline"
                      className="text-xs text-green-700 border-green-300"
                    >
                      Verified
                    </Badge>
                  )}
                </div>
                <h3 className="font-semibold text-sm">{action.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {action.description}
                </p>
                {action.outcome && (
                  <p className="text-xs text-muted-foreground mt-2">
                    Outcome: {action.outcome}
                  </p>
                )}
                <div className="mt-1">
                  {action.sourceUrl ? (
                    <SourceLink
                      url={action.sourceUrl}
                      name={action.sourceName}
                    />
                  ) : (
                    <p className="text-xs text-muted-foreground">
                      Source: {action.sourceName}
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
        baseUrl={`/figure/${slug}/actions`}
        pageSize={PAGE_SIZE}
      />
    </div>
  );
}
