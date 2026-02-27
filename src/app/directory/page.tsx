import type { Metadata } from "next";
import Link from "next/link";
import { FigureCard } from "@/components/figures/figure-card";
import { Pagination } from "@/components/ui/pagination";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { SortSelect } from "@/components/navigation/sort-select";
import { EmptyState } from "@/components/ui/empty-state";
import { NextSteps } from "@/components/navigation/next-steps";
import { mockFigures, getAllFigureStats } from "@/lib/mock-data";
import { paginate } from "@/lib/pagination";
import { Search } from "lucide-react";

export const metadata: Metadata = {
  title: "Directory",
  description:
    "Browse all tracked public figures — politicians, executives, influencers, and more.",
};

export default async function DirectoryPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string; party?: string; q?: string; page?: string; sort?: string }>;
}) {
  const params = await searchParams;
  const typeFilter = params.type;
  const partyFilter = params.party;
  const searchQuery = params.q?.toLowerCase();
  const page = Number(params.page) || 1;
  const sort = params.sort || "name-asc";

  let figures = [...mockFigures];

  if (typeFilter) {
    figures = figures.filter((f) => f.type === typeFilter);
  }
  if (partyFilter) {
    figures = figures.filter((f) => f.party === partyFilter);
  }
  if (searchQuery) {
    figures = figures.filter(
      (f) =>
        f.name.toLowerCase().includes(searchQuery) ||
        f.title.toLowerCase().includes(searchQuery) ||
        f.bio.toLowerCase().includes(searchQuery)
    );
  }

  const allStats = getAllFigureStats();

  // Sort
  const gradeOrder: Record<string, number> = { A: 5, "A-": 4.7, "B+": 4.3, B: 4, "B-": 3.7, "C+": 3.3, C: 3, "C-": 2.7, "D+": 2.3, D: 2, "D-": 1.7, F: 1 };
  switch (sort) {
    case "name-desc":
      figures.sort((a, b) => b.name.localeCompare(a.name));
      break;
    case "score-desc":
      figures.sort((a, b) => (gradeOrder[b.overallScore] ?? 0) - (gradeOrder[a.overallScore] ?? 0));
      break;
    case "score-asc":
      figures.sort((a, b) => (gradeOrder[a.overallScore] ?? 0) - (gradeOrder[b.overallScore] ?? 0));
      break;
    default: // name-asc
      figures.sort((a, b) => a.name.localeCompare(b.name));
  }

  const { items: paginatedFigures, currentPage, totalPages, totalItems } = paginate(figures, page);
  const types = [...new Set(mockFigures.map((f) => f.type))];
  const parties = [
    ...new Set(mockFigures.map((f) => f.party).filter(Boolean)),
  ] as string[];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Directory" }]} />
      {/* Header */}
      <ScrollReveal className="mb-8">
        <h1 className="text-3xl font-bold">Directory</h1>
        <p className="text-muted-foreground mt-1">
          Browse all tracked public figures. Filter by type, party, or search by
          name.
        </p>
      </ScrollReveal>

      {/* Filters */}
      <ScrollReveal delay={0.1} className="flex flex-wrap gap-2 mb-6">
        <FilterLink href="/directory" active={!typeFilter && !partyFilter}>
          All
        </FilterLink>
        {types.map((type) => (
          <FilterLink
            key={type}
            href={`/directory?type=${type}`}
            active={typeFilter === type}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}s
          </FilterLink>
        ))}
        <span className="border-l mx-1" />
        {parties.map((party) => (
          <FilterLink
            key={party}
            href={`/directory?party=${encodeURIComponent(party)}`}
            active={partyFilter === party}
          >
            {party}
          </FilterLink>
        ))}
      </ScrollReveal>

      {/* Sort */}
      <div className="mb-4">
        <SortSelect
          options={[
            { value: "name-asc", label: "Name A-Z" },
            { value: "name-desc", label: "Name Z-A" },
            { value: "score-desc", label: "Score High-Low" },
            { value: "score-asc", label: "Score Low-High" },
          ]}
          currentValue={sort}
          baseUrl="/directory"
          searchParams={{ type: typeFilter, party: partyFilter, q: params.q }}
        />
      </div>

      {/* Results */}
      {figures.length === 0 ? (
        <EmptyState
          icon={Search}
          title="No figures found"
          description="No public figures match your current filters. Try adjusting your search criteria."
          action={{ label: "Clear filters", href: "/directory" }}
        />
      ) : (
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {paginatedFigures.map((figure) => {
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
        </div>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        baseUrl="/directory"
        searchParams={{ type: typeFilter, party: partyFilter, q: params.q, sort }}
      />

      <NextSteps
        className="mt-12"
        suggestions={[
          { label: "See the Scorecard", href: "/scorecard", description: "Who keeps their word? Ranked by accountability score." },
          { label: "Browse Topics", href: "/topics", description: "Explore accountability by policy area" },
          { label: "Add to the Record", href: "/contribute", description: "Contribute to the public record." },
        ]}
      />
    </div>
  );
}

function FilterLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`px-3 py-1.5 text-sm rounded-md border transition-all ${
        active
          ? "bg-primary text-primary-foreground border-primary shadow-sm"
          : "bg-background text-muted-foreground border-border hover:bg-accent hover:text-accent-foreground hover:shadow-sm"
      }`}
    >
      {children}
    </Link>
  );
}
