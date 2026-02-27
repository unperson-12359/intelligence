import Link from "next/link";
import Image from "next/image";
import { Search, ArrowLeftRight, Scale, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { VerdictBadge } from "@/components/accountability/verdict-badge";
import { FigureCard } from "@/components/figures/figure-card";
import { HeroSearchBar } from "@/components/layout/hero-search-bar";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { StaggerChildren } from "@/components/motion/stagger-children";
import { AnimatedCounter } from "@/components/motion/animated-counter";
import { NextSteps } from "@/components/navigation/next-steps";
import { BlogPostCard } from "@/components/blog/blog-post-card";
import { getAllBlogPosts } from "@/lib/blog";
import {
  mockFigures,
  mockActions,
  mockStatements,
  getTrendingContradictions,
  getAllFigureStats,
} from "@/lib/mock-data";

export default function HomePage() {
  const trending = getTrendingContradictions();
  const recentFigures = mockFigures.slice(0, 4);
  const allStats = getAllFigureStats();

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b">
        <div className="absolute inset-0 bg-[image:var(--gradient-mesh)] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/50 to-background pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-32 lg:px-8">
          <ScrollReveal className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              What they{" "}
              <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                say
              </span>
              {" "}vs what they{" "}
              <span className="bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">
                do
              </span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Every public statement recorded. Every action documented. The complete picture, searchable in seconds.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.3} className="mt-10">
            <HeroSearchBar />
          </ScrollReveal>

          <ScrollReveal delay={0.5} className="mt-10">
            <div className="flex justify-center gap-8 sm:gap-12 text-sm text-muted-foreground">
              <div className="text-center">
                <AnimatedCounter
                  value={mockFigures.length}
                  className="block text-3xl font-bold text-foreground"
                />
                <span>Public Figures Tracked</span>
              </div>
              <div className="text-center">
                <AnimatedCounter
                  value={mockStatements.length}
                  suffix="+"
                  className="block text-3xl font-bold text-foreground"
                />
                <span>Statements on Record</span>
              </div>
              <div className="text-center">
                <AnimatedCounter
                  value={trending.length}
                  className="block text-3xl font-bold text-foreground"
                />
                <span>Records Verified</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Latest Records — Sneak Peek */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold">Latest Records</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Recent accountability records — statements compared to actions.
                </p>
              </div>
              <Button variant="outline" asChild>
                <Link href="/directory">View All</Link>
              </Button>
            </div>
          </ScrollReveal>

          <StaggerChildren
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
            staggerDelay={0.12}
          >
            {trending.slice(0, 3).map((item) => {
              const action = item.actionId
                ? mockActions.find((a) => a.id === item.actionId)
                : null;
              return (
                <Link
                  key={item.id}
                  href={`/figure/${item.figure?.slug}`}
                  className="group"
                >
                  <Card className="h-full transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-foreground/20 bg-[var(--glass-bg)] backdrop-blur-sm border-[var(--glass-border)]">
                    <CardContent className="p-4">
                      {/* Header: avatar + name + verdict */}
                      <div className="flex items-center gap-3 mb-3">
                        {item.figure?.imageUrl ? (
                          <Image
                            src={item.figure.imageUrl}
                            alt={item.figure.name || ""}
                            width={32}
                            height={32}
                            className="rounded-full object-cover shrink-0 border border-border/50"
                            style={{ width: 32, height: 32 }}
                          />
                        ) : (
                          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-muted to-muted/60 flex items-center justify-center text-xs font-bold text-muted-foreground shrink-0 border border-border/50">
                            {item.figure?.name?.charAt(0) || "?"}
                          </div>
                        )}
                        <span className="font-medium text-sm truncate flex-1">
                          {item.figure?.name}
                        </span>
                        <VerdictBadge
                          verdict={item.verdict as "kept" | "broken" | "partial" | "in_progress" | "flip_flop" | "context_needed"}
                        />
                      </div>

                      {/* Said */}
                      <div className="mb-2">
                        <span className="inline-block text-[10px] font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-0.5">
                          Said
                        </span>
                        <p className="text-sm text-foreground line-clamp-1">
                          {item.statement?.title || "—"}
                        </p>
                      </div>

                      {/* Did */}
                      <div>
                        <span className="inline-block text-[10px] font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-0.5">
                          Did
                        </span>
                        <p className="text-sm text-foreground line-clamp-1">
                          {action?.title || "No documented action yet"}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </StaggerChildren>

          <ScrollReveal delay={0.2} className="text-center mt-6">
            <Link
              href="/directory"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              See all records
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-muted/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-2xl font-bold text-center mb-10">
              How It Works
            </h2>
          </ScrollReveal>

          <StaggerChildren
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
            staggerDelay={0.15}
          >
            <div className="rounded-lg border bg-card p-6 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/10">
                <Search className="h-6 w-6 text-blue-500" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Search</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Find any public figure and see their recorded statements — promises, claims, predictions — with dates and sources.
              </p>
            </div>
            <div className="rounded-lg border bg-card p-6 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-amber-500/10">
                <ArrowLeftRight className="h-6 w-6 text-amber-500" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Compare</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                See documented actions alongside original statements. Votes, executive orders, business decisions — all sourced and dated.
              </p>
            </div>
            <div className="rounded-lg border bg-card p-6 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10">
                <Scale className="h-6 w-6 text-emerald-500" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Decide</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Review the evidence and form your own assessment. Every record links to original sources.
              </p>
            </div>
          </StaggerChildren>

          <ScrollReveal delay={0.3} className="text-center mt-8">
            <p className="text-muted-foreground font-medium">
              Decisions are better when the full record is available.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* The Record Speaks */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-2xl font-bold text-center mb-10">
              The Record Speaks
            </h2>
          </ScrollReveal>

          <StaggerChildren
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
            staggerDelay={0.15}
          >
            <div className="rounded-lg border bg-gradient-to-b from-muted/40 to-muted/10 p-6">
              <p className="text-sm text-muted-foreground leading-relaxed">
                A Fortune 500 CEO pledged carbon neutrality by 2030. Three years later, emissions data showed a 12% increase.{" "}
                <span className="font-semibold text-foreground">
                  The pledge and the data are both on the record.
                </span>
              </p>
            </div>
            <div className="rounded-lg border bg-gradient-to-b from-muted/40 to-muted/10 p-6">
              <p className="text-sm text-muted-foreground leading-relaxed">
                A governor promised to fully fund public schools during their campaign. Two years later, education budgets showed a 15% reduction.{" "}
                <span className="font-semibold text-foreground">
                  Both the promise and the budget are documented.
                </span>
              </p>
            </div>
            <div className="rounded-lg border bg-gradient-to-b from-muted/40 to-muted/10 p-6">
              <p className="text-sm text-muted-foreground leading-relaxed">
                A tech executive predicted product delivery &quot;by next year.&quot; That was four years ago.{" "}
                <span className="font-semibold text-foreground">
                  The prediction and the timeline are both tracked.
                </span>
              </p>
            </div>
          </StaggerChildren>

          <ScrollReveal delay={0.3} className="text-center mt-8">
            <p className="text-muted-foreground font-medium">
              Decisions are better when the full record is available.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Explore Any Public Figure */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold">Explore Any Public Figure</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Search any politician, executive, or public figure. See their recorded statements alongside their documented actions.
                </p>
              </div>
              <Button variant="outline" asChild>
                <Link href="/directory">View Directory</Link>
              </Button>
            </div>
          </ScrollReveal>

          <StaggerChildren
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
            staggerDelay={0.1}
          >
            {recentFigures.map((figure) => {
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
        </div>
      </section>

      {/* From the Blog */}
      <section className="py-16 bg-muted/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold">From the Blog</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Deep dives into accountability and why tracking promises matters
                </p>
              </div>
              <Button variant="outline" asChild>
                <Link href="/blog">View All</Link>
              </Button>
            </div>
          </ScrollReveal>
          <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-4" staggerDelay={0.1}>
            {getAllBlogPosts().slice(0, 3).map((post) => (
              <BlogPostCard
                key={post.slug}
                slug={post.slug}
                title={post.title}
                description={post.description}
                publishedAt={post.publishedAt}
                readingTime={post.readingTime}
                category={post.category}
              />
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[image:var(--gradient-cta)] opacity-[0.03]" />
        <div className="absolute inset-0 bg-[image:var(--gradient-mesh)]" />
        <ScrollReveal className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold">See the Full Picture</h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
            Every contribution strengthens the public record. Adding a statement or action takes two minutes and becomes part of a permanent, searchable archive.
          </p>
          <div className="flex gap-3 justify-center mt-8">
            <Button size="lg" asChild>
              <Link href="/contribute">Add to the Record</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/about">See How It Works</Link>
            </Button>
          </div>
        </ScrollReveal>
      </section>

      {/* Next Steps */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <NextSteps
            suggestions={[
              {
                label: "Browse All Figures",
                href: "/directory",
                description: "Search and filter every tracked public figure",
              },
              {
                label: "See the Scorecard",
                href: "/scorecard",
                description: "Public figures ranked by follow-through on stated commitments.",
              },
              {
                label: "How It Works",
                href: "/about",
                description: "Our methodology, scoring, and principles",
              },
            ]}
          />
        </div>
      </section>
    </div>
  );
}
