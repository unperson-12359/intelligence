import type { Metadata } from "next";
import Image from "next/image";
import { mockFigures, getAllFigureStats } from "@/lib/mock-data";
import { paginate } from "@/lib/pagination";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { ScoreBadge } from "@/components/accountability/score-badge";
import { Pagination } from "@/components/ui/pagination";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { AnimatedTableRow } from "@/components/motion/animated-table-row";
import { NextSteps } from "@/components/navigation/next-steps";
import { Callout } from "@/components/ui/callout";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Scorecard",
  description:
    "Accountability leaderboard — ranking public figures by how well they follow through on what they say.",
};

const rankAccent: Record<number, string> = {
  0: "bg-yellow-50 dark:bg-yellow-900/10",
  1: "bg-gray-50 dark:bg-gray-800/20",
  2: "bg-orange-50 dark:bg-orange-900/10",
};

const PAGE_SIZE = 12;

export default async function ScorecardPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const page = Number(params.page) || 1;

  const allStats = getAllFigureStats();
  const ranked = mockFigures
    .map((figure) => ({
      ...figure,
      stats: allStats.get(figure.id)!,
    }))
    .sort((a, b) => {
      const gradeOrder: Record<string, number> = { A: 5, "A-": 4.7, "B+": 4.3, B: 4, "B-": 3.7, "C+": 3.3, C: 3, "C-": 2.7, "D+": 2.3, D: 2, "D-": 1.7, F: 1 };
      const aVal = gradeOrder[a.overallScore] ?? 0;
      const bVal = gradeOrder[b.overallScore] ?? 0;
      return bVal - aVal;
    });

  const { items: paginatedRanked, currentPage, totalPages, totalItems } = paginate(ranked, page, PAGE_SIZE);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Scorecard" }]} />
      <ScrollReveal className="mb-8">
        <h1 className="text-3xl font-bold">Scorecard</h1>
        <p className="text-muted-foreground mt-1">
          Public figures ranked by accountability score. Higher grades mean
          they follow through on what they say.
        </p>
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-muted/30 border-b text-left text-sm">
                <th className="px-4 py-3 font-medium">#</th>
                <th className="px-4 py-3 font-medium">Figure</th>
                <th className="px-4 py-3 font-medium hidden sm:table-cell">Type</th>
                <th className="px-4 py-3 font-medium text-center">Grade</th>
                <th className="px-4 py-3 font-medium text-center hidden md:table-cell">Kept</th>
                <th className="px-4 py-3 font-medium text-center hidden md:table-cell">Broken</th>
              </tr>
            </thead>
            <tbody>
              {paginatedRanked.map((figure, index) => {
                const globalRank = (currentPage - 1) * PAGE_SIZE + index;
                return (
                  <AnimatedTableRow
                    key={figure.id}
                    index={index}
                    className={`border-b last:border-b-0 hover:bg-muted/20 transition-colors ${rankAccent[globalRank] || ""}`}
                  >
                    <td className="px-4 py-3 text-sm text-muted-foreground font-medium">
                      {globalRank + 1}
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        href={`/figure/${figure.slug}`}
                        className="hover:underline"
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-muted overflow-hidden flex items-center justify-center text-sm font-bold text-muted-foreground shrink-0" role="img" aria-label={`Avatar for ${figure.name}`}>
                            {figure.imageUrl ? (
                              <Image src={figure.imageUrl} alt={figure.name} width={32} height={32} className="object-cover" />
                            ) : (
                              figure.name.charAt(0)
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="font-semibold text-sm truncate">
                              {figure.name}
                            </p>
                            <p className="text-xs text-muted-foreground truncate">
                              {figure.title}
                            </p>
                          </div>
                        </div>
                      </Link>
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell">
                      <Badge variant="secondary" className="text-xs">
                        {figure.type.charAt(0).toUpperCase() + figure.type.slice(1)}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <ScoreBadge grade={figure.overallScore} size="sm" />
                    </td>
                    <td className="px-4 py-3 text-center hidden md:table-cell">
                      <span className="text-sm text-green-600 dark:text-green-400 font-medium">
                        {figure.stats.keptCount}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center hidden md:table-cell">
                      <span className="text-sm text-red-600 dark:text-red-400 font-medium">
                        {figure.stats.brokenCount}
                      </span>
                    </td>
                  </AnimatedTableRow>
                );
              })}
            </tbody>
          </table>
        </div>
      </ScrollReveal>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        baseUrl="/scorecard"
        pageSize={PAGE_SIZE}
      />

      <Callout type="info" title="What do these grades mean?" className="mt-8">
        The average public figure scores a C — meaning they follow through on
        less than half of what they promise.{" "}
        <Link href="/about" className="underline font-medium">
          See how we calculate scores
        </Link>
      </Callout>

      <NextSteps
        className="mt-12"
        suggestions={[
          { label: "Browse All Leaders", href: "/directory", description: "Search and filter every tracked public figure" },
          { label: "Browse Topics", href: "/topics", description: "Explore accountability by policy area" },
          { label: "Expose a Broken Promise", href: "/contribute", description: "Help build the record. It takes 2 minutes." },
        ]}
      />
    </div>
  );
}
