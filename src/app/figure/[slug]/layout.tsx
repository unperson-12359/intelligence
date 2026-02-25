import { notFound } from "next/navigation";
import { FigureHeader } from "@/components/figures/figure-header";
import { getFigureBySlug, getFigureStats } from "@/lib/mock-data";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const figure = getFigureBySlug(slug);
  if (!figure) return { title: "Not Found" };

  return {
    title: `${figure.name} — Accountability Profile`,
    description: `Track what ${figure.name} says vs what they do. Accountability score: ${figure.overallScore}`,
  };
}

export default async function FigureLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const figure = getFigureBySlug(slug);

  if (!figure) {
    notFound();
  }

  const stats = getFigureStats(figure.id);

  return (
    <div>
      <FigureHeader
        name={figure.name}
        title={figure.title}
        type={figure.type}
        party={figure.party}
        state={figure.state}
        country={figure.country}
        bio={figure.bio}
        overallScore={figure.overallScore}
        stats={stats}
      />

      {/* Tab navigation */}
      <div className="border-b">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="flex gap-1 -mb-px overflow-x-auto">
            <TabLink href={`/figure/${slug}`} label="Overview" />
            <TabLink href={`/figure/${slug}/statements`} label="Statements" />
            <TabLink href={`/figure/${slug}/actions`} label="Actions" />
            <TabLink href={`/figure/${slug}/timeline`} label="Timeline" />
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {children}
      </div>
    </div>
  );
}

function TabLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className="px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground border-b-2 border-transparent hover:border-foreground/30 transition-colors whitespace-nowrap"
    >
      {label}
    </a>
  );
}
