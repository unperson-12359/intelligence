import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getFigureBySlug, getStatementsForFigure } from "@/lib/mock-data";

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
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const figure = getFigureBySlug(slug);
  if (!figure) notFound();

  const statements = getStatementsForFigure(figure.id);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Statements</h2>
      <p className="text-sm text-muted-foreground mb-6">
        What {figure.name} has said publicly — promises, claims, positions,
        and predictions.
      </p>

      {statements.length === 0 ? (
        <div className="text-center py-12 border rounded-lg bg-muted/20">
          <p className="text-muted-foreground">
            No statements recorded yet.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {statements.map((stmt) => (
            <Card key={stmt.id}>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <Badge variant="secondary" className="text-xs">
                    {typeLabels[stmt.type] || stmt.type}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {stmt.dateOccurred}
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
                <p className="text-xs text-muted-foreground mt-1">
                  Source: {stmt.sourceName}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
