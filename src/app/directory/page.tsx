import type { Metadata } from "next";
import { FigureCard } from "@/components/figures/figure-card";
import { mockFigures, getFigureStats } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "Directory",
  description:
    "Browse all tracked public figures — politicians, executives, influencers, and more.",
};

export default async function DirectoryPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string; party?: string; q?: string }>;
}) {
  const params = await searchParams;
  const typeFilter = params.type;
  const partyFilter = params.party;
  const searchQuery = params.q?.toLowerCase();

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

  const types = [...new Set(mockFigures.map((f) => f.type))];
  const parties = [
    ...new Set(mockFigures.map((f) => f.party).filter(Boolean)),
  ] as string[];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Directory</h1>
        <p className="text-muted-foreground mt-1">
          Browse all tracked public figures. Filter by type, party, or search by
          name.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
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
      </div>

      {/* Results */}
      {figures.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No figures found matching your filters.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {figures.map((figure) => {
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
      )}

      {/* Count */}
      <p className="text-sm text-muted-foreground mt-6">
        Showing {figures.length} of {mockFigures.length} figures
      </p>
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
    <a
      href={href}
      className={`px-3 py-1.5 text-sm rounded-md border transition-colors ${
        active
          ? "bg-primary text-primary-foreground border-primary"
          : "bg-background text-muted-foreground border-border hover:bg-accent hover:text-accent-foreground"
      }`}
    >
      {children}
    </a>
  );
}
