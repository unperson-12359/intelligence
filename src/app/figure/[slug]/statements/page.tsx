import { notFound } from "next/navigation";
import { EmptyState } from "@/components/ui/empty-state";
import { StatementFilters } from "@/components/figures/statement-filters";
import { getFigureBySlug, getStatementsForFigure } from "@/lib/mock-data";
import { MessageSquare } from "lucide-react";

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
        <EmptyState
          icon={MessageSquare}
          title="No promises on record yet"
          description="Know something they said publicly? Put it on the record so it can't be forgotten."
          action={{ label: "Add a Statement", href: "/contribute" }}
          secondaryAction={{ label: "View Actions", href: `/figure/${slug}/actions` }}
        />
      ) : (
        <StatementFilters statements={statements} />
      )}
    </div>
  );
}
