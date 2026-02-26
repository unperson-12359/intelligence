import { notFound } from "next/navigation";
import { FigureHeader } from "@/components/figures/figure-header";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { getFigureBySlug, getFigureStats, mockFigures } from "@/lib/mock-data";
import { generatePersonJsonLd } from "@/lib/structured-data";
import { SectionNav } from "@/components/figures/section-nav";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return mockFigures.map((figure) => ({ slug: figure.slug }));
}

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
    openGraph: {
      title: `${figure.name} — Accountability Profile`,
      description: `Track what ${figure.name} says vs what they do. Accountability score: ${figure.overallScore}`,
    },
    twitter: {
      card: "summary",
      title: `${figure.name} — Accountability Profile`,
      description: `Track what ${figure.name} says vs what they do. Accountability score: ${figure.overallScore}`,
    },
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

  const jsonLd = generatePersonJsonLd(figure);

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: "Directory", href: "/directory" },
            { label: figure.name },
          ]}
        />
      </div>
      <FigureHeader
        name={figure.name}
        title={figure.title}
        type={figure.type}
        party={figure.party}
        state={figure.state}
        country={figure.country}
        bio={figure.bio}
        overallScore={figure.overallScore}
        imageUrl={figure.imageUrl}
        metadata={figure.metadata}
        stats={stats}
      />

      {/* Section navigation */}
      <SectionNav />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {children}
      </div>
    </div>
  );
}
