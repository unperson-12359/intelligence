import { notFound } from "next/navigation";
import { EmptyState } from "@/components/ui/empty-state";
import { ActionFilters } from "@/components/figures/action-filters";
import { getFigureBySlug, getActionsForFigure } from "@/lib/mock-data";
import { Activity } from "lucide-react";

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
        <EmptyState
          icon={Activity}
          title="No actions documented yet"
          description="Know something they actually did? Add it so their words can be measured against reality."
          action={{ label: "Report an Action", href: "/contribute" }}
          secondaryAction={{ label: "View Statements", href: `/figure/${slug}/statements` }}
        />
      ) : (
        <ActionFilters actions={actions} />
      )}
    </div>
  );
}
