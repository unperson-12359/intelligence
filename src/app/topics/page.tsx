import type { Metadata } from "next";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { StaggerChildren } from "@/components/motion/stagger-children";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { NextSteps } from "@/components/navigation/next-steps";
import { mockTopics, mockStatements, mockActions, mockFigures } from "@/lib/mock-data";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Topics",
  description:
    "Browse accountability records by policy area — economy, healthcare, environment, and more.",
};

const topicAccents = [
  "border-l-blue-500",
  "border-l-red-500",
  "border-l-green-500",
  "border-l-purple-500",
  "border-l-amber-500",
  "border-l-cyan-500",
  "border-l-pink-500",
  "border-l-emerald-500",
];

export default function TopicsPage() {
  const topicsWithCounts = mockTopics.map((topic) => {
    const keywords = topic.name.toLowerCase().split(/\s+/);
    const relatedStatements = mockStatements.filter((s) =>
      keywords.some(
        (k) =>
          s.title.toLowerCase().includes(k) ||
          s.content.toLowerCase().includes(k)
      )
    );
    const relatedActions = mockActions.filter((a) =>
      keywords.some(
        (k) =>
          a.title.toLowerCase().includes(k) ||
          a.description.toLowerCase().includes(k)
      )
    );

    // Find figures who have statements or actions related to this topic
    const figureIds = new Set<string>();
    relatedStatements.forEach((s) => figureIds.add(s.figureId));
    relatedActions.forEach((a) => figureIds.add(a.figureId));
    const relatedFigures = mockFigures
      .filter((f) => figureIds.has(f.id))
      .slice(0, 3);

    return {
      ...topic,
      statementCount: relatedStatements.length,
      actionCount: relatedActions.length,
      totalRecords: relatedStatements.length + relatedActions.length,
      relatedFigures,
    };
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Topics" }]} />
      <ScrollReveal className="mb-8">
        <h1 className="text-3xl font-bold">Topics</h1>
        <p className="text-muted-foreground mt-1">
          Browse accountability records organized by policy area and subject
          matter.
        </p>
      </ScrollReveal>

      <StaggerChildren
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        staggerDelay={0.08}
      >
        {topicsWithCounts.map((topic, index) => (
          <Link key={topic.id} href={`/search?q=${encodeURIComponent(topic.name)}`}>
            <Card className="h-full transition-all hover:shadow-lg hover:shadow-[var(--intelligence-blue)]/5 hover:border-foreground/20 cursor-pointer">
              <CardContent className={`p-5 border-l-4 ${topicAccents[index % topicAccents.length]}`}>
                <h2 className="font-semibold text-lg">{topic.name}</h2>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                  {topic.description}
                </p>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex gap-4 text-xs text-muted-foreground">
                    <span>{topic.statementCount} statements</span>
                    <span>{topic.actionCount} actions</span>
                  </div>
                  {topic.relatedFigures.length > 0 && (
                    <div className="flex -space-x-2">
                      {topic.relatedFigures.map((figure) => (
                        <div
                          key={figure.id}
                          className="h-6 w-6 rounded-full border-2 border-card overflow-hidden bg-muted shrink-0"
                          title={figure.name}
                        >
                          {figure.imageUrl ? (
                            <Image
                              src={figure.imageUrl}
                              alt={figure.name}
                              width={24}
                              height={24}
                              className="object-cover"
                            />
                          ) : (
                            <span className="flex items-center justify-center h-full text-[10px] font-bold text-muted-foreground">
                              {figure.name.charAt(0)}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </StaggerChildren>

      <NextSteps
        className="mt-12"
        suggestions={[
          { label: "Browse All Leaders", href: "/directory", description: "Search and filter every tracked public figure" },
          { label: "See the Scorecard", href: "/scorecard", description: "Who keeps their word? Ranked by accountability score." },
        ]}
      />
    </div>
  );
}
