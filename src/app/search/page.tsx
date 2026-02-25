import type { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FigureCard } from "@/components/figures/figure-card";
import { SourceLink } from "@/components/evidence/source-link";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { StaggerChildren } from "@/components/motion/stagger-children";
import {
  mockFigures,
  mockStatements,
  mockActions,
  getAllFigureStats,
} from "@/lib/mock-data";
import { paginate } from "@/lib/pagination";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { Pagination } from "@/components/ui/pagination";
import { EmptyState } from "@/components/ui/empty-state";
import { NextSteps } from "@/components/navigation/next-steps";
import { SearchX } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Search",
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string }>;
}) {
  const params = await searchParams;
  const query = params.q?.toLowerCase() || "";
  const page = Number(params.page) || 1;

  if (!query) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 text-center">
        <ScrollReveal>
          <h1 className="text-3xl font-bold mb-4">Search</h1>
          <p className="text-muted-foreground mb-8">
            Search for public figures, statements, and actions.
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
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
        </ScrollReveal>
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

  const allStats = getAllFigureStats();
  const paginatedFigures = paginate(figureResults, page, 6);
  const paginatedStatements = paginate(statementResults, page, 10);
  const paginatedActions = paginate(actionResults, page, 10);
  const totalResults =
    figureResults.length + statementResults.length + actionResults.length;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Search", href: "/search" }, { label: `"${params.q}"` }]} />
      <ScrollReveal className="mb-8">
        <h1 className="text-3xl font-bold">Search Results</h1>
        <p className="text-muted-foreground mt-1">
          {totalResults} results for &quot;{params.q}&quot;
        </p>
      </ScrollReveal>

      {/* Figures */}
      {figureResults.length > 0 && (
        <ScrollReveal delay={0.1}>
          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3">
              Public Figures ({figureResults.length})
            </h2>
            <StaggerChildren
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
              staggerDelay={0.08}
            >
              {paginatedFigures.items.map((figure) => {
                const stats = allStats.get(figure.id)!;
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
                    imageUrl={figure.imageUrl}
                    totalStatements={stats.totalStatements}
                    totalActions={stats.totalActions}
                    brokenCount={stats.brokenCount}
                  />
                );
              })}
            </StaggerChildren>
            <Pagination
              currentPage={paginatedFigures.currentPage}
              totalPages={paginatedFigures.totalPages}
              totalItems={paginatedFigures.totalItems}
              baseUrl="/search"
              searchParams={{ q: params.q }}
              pageSize={6}
            />
          </section>
        </ScrollReveal>
      )}

      {/* Statements */}
      {statementResults.length > 0 && (
        <ScrollReveal delay={0.2}>
          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3">
              Statements ({statementResults.length})
            </h2>
            <StaggerChildren className="space-y-3" staggerDelay={0.08}>
              {paginatedStatements.items.map((stmt) => {
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
                      {stmt.sourceUrl && (
                        <div className="mt-2">
                          <SourceLink
                            url={stmt.sourceUrl}
                            name={stmt.sourceName}
                            type={stmt.sourceType}
                          />
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </StaggerChildren>
            <Pagination
              currentPage={paginatedStatements.currentPage}
              totalPages={paginatedStatements.totalPages}
              totalItems={paginatedStatements.totalItems}
              baseUrl="/search"
              searchParams={{ q: params.q }}
              pageSize={10}
            />
          </section>
        </ScrollReveal>
      )}

      {/* Actions */}
      {actionResults.length > 0 && (
        <ScrollReveal delay={0.3}>
          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3">
              Actions ({actionResults.length})
            </h2>
            <StaggerChildren className="space-y-3" staggerDelay={0.08}>
              {paginatedActions.items.map((action) => {
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
                      {action.sourceUrl && (
                        <div className="mt-2">
                          <SourceLink
                            url={action.sourceUrl}
                            name={action.sourceName}
                          />
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </StaggerChildren>
            <Pagination
              currentPage={paginatedActions.currentPage}
              totalPages={paginatedActions.totalPages}
              totalItems={paginatedActions.totalItems}
              baseUrl="/search"
              searchParams={{ q: params.q }}
              pageSize={10}
            />
          </section>
        </ScrollReveal>
      )}

      {totalResults === 0 && (
        <EmptyState
          icon={SearchX}
          title="No results found"
          description={`We couldn't find anything matching "${params.q}". Try a different search term.`}
          action={{ label: "Browse Directory", href: "/directory" }}
          secondaryAction={{ label: "Browse Topics", href: "/topics" }}
          suggestion={`We're tracking ${mockFigures.length} public figures. Browse the directory or suggest a figure we should add.`}
        />
      )}

      <NextSteps
        className="mt-12"
        suggestions={[
          { label: "Browse All Leaders", href: "/directory", description: "Search and filter every tracked public figure" },
          { label: "Browse Topics", href: "/topics", description: "Explore accountability by policy area" },
        ]}
      />
    </div>
  );
}
