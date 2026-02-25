import type { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FigureCard } from "@/components/figures/figure-card";
import {
  mockFigures,
  mockStatements,
  mockActions,
  getFigureStats,
} from "@/lib/mock-data";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Search",
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const params = await searchParams;
  const query = params.q?.toLowerCase() || "";

  if (!query) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Search</h1>
        <p className="text-muted-foreground mb-8">
          Search for public figures, statements, and actions.
        </p>
        <form action="/search" className="flex max-w-lg mx-auto gap-2">
          <Input
            type="search"
            name="q"
            placeholder="Search..."
            className="h-12 text-base"
            autoFocus
          />
          <Button type="submit" size="lg" className="h-12">
            Search
          </Button>
        </form>
      </div>
    );
  }

  // Search figures
  const figureResults = mockFigures.filter(
    (f) =>
      f.name.toLowerCase().includes(query) ||
      f.title.toLowerCase().includes(query) ||
      f.bio.toLowerCase().includes(query)
  );

  // Search statements
  const statementResults = mockStatements.filter(
    (s) =>
      s.title.toLowerCase().includes(query) ||
      s.content.toLowerCase().includes(query)
  );

  // Search actions
  const actionResults = mockActions.filter(
    (a) =>
      a.title.toLowerCase().includes(query) ||
      a.description.toLowerCase().includes(query)
  );

  const totalResults =
    figureResults.length + statementResults.length + actionResults.length;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Search Results</h1>
        <p className="text-muted-foreground mt-1">
          {totalResults} results for &quot;{params.q}&quot;
        </p>
      </div>

      {/* Figures */}
      {figureResults.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-3">
            Public Figures ({figureResults.length})
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {figureResults.map((figure) => {
              const stats = getFigureStats(figure.id);
              return (
                <FigureCard
                  key={figure.id}
                  slug={figure.slug}
                  name={figure.name}
                  title={figure.title}
                  type={figure.type}
                  party={figure.party}
                  state={figure.state}
                  country={figure.country}
                  overallScore={figure.overallScore}
                  totalStatements={stats.totalStatements}
                  totalActions={stats.totalActions}
                  brokenCount={stats.brokenCount}
                />
              );
            })}
          </div>
        </section>
      )}

      {/* Statements */}
      {statementResults.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-3">
            Statements ({statementResults.length})
          </h2>
          <div className="space-y-3">
            {statementResults.map((stmt) => {
              const figure = mockFigures.find((f) => f.id === stmt.figureId);
              return (
                <Card key={stmt.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      {figure && (
                        <Link
                          href={`/figure/${figure.slug}`}
                          className="text-sm font-semibold hover:underline"
                        >
                          {figure.name}
                        </Link>
                      )}
                      <Badge variant="secondary" className="text-xs">
                        {stmt.type}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {stmt.dateOccurred}
                      </span>
                    </div>
                    <h3 className="font-semibold text-sm">{stmt.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {stmt.content}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>
      )}

      {/* Actions */}
      {actionResults.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-3">
            Actions ({actionResults.length})
          </h2>
          <div className="space-y-3">
            {actionResults.map((action) => {
              const figure = mockFigures.find((f) => f.id === action.figureId);
              return (
                <Card key={action.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      {figure && (
                        <Link
                          href={`/figure/${figure.slug}`}
                          className="text-sm font-semibold hover:underline"
                        >
                          {figure.name}
                        </Link>
                      )}
                      <Badge variant="secondary" className="text-xs">
                        {action.type}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {action.dateOccurred}
                      </span>
                    </div>
                    <h3 className="font-semibold text-sm">{action.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {action.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>
      )}

      {totalResults === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No results found for &quot;{params.q}&quot;. Try a different search
            term.
          </p>
        </div>
      )}
    </div>
  );
}
