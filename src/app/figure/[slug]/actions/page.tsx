import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getFigureBySlug, getActionsForFigure } from "@/lib/mock-data";

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
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const figure = getFigureBySlug(slug);
  if (!figure) notFound();

  const actions = getActionsForFigure(figure.id);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Actions</h2>
      <p className="text-sm text-muted-foreground mb-6">
        What {figure.name} has actually done — votes, executive orders,
        business decisions, and more.
      </p>

      {actions.length === 0 ? (
        <div className="text-center py-12 border rounded-lg bg-muted/20">
          <p className="text-muted-foreground">No actions recorded yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {actions.map((action) => (
            <Card key={action.id}>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <Badge variant="secondary" className="text-xs">
                    {typeLabels[action.type] || action.type}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {action.dateOccurred}
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
                <p className="text-xs text-muted-foreground mt-1">
                  Source: {action.sourceName}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
