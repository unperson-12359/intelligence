import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SayVsDoCard } from "@/components/accountability/say-vs-do-card";
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
  getEvidenceForRecord,
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
              They promise. They break it. They count on you forgetting.{" "}
              <span className="font-semibold text-foreground">Not anymore.</span>
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
                <span>Leaders You Can Check</span>
              </div>
              <div className="text-center">
                <AnimatedCounter
                  value={mockStatements.length}
                  suffix="+"
                  className="block text-3xl font-bold text-foreground"
                />
                <span>Promises Under Scrutiny</span>
              </div>
              <div className="text-center">
                <AnimatedCounter
                  value={trending.length}
                  className="block text-3xl font-bold text-foreground"
                />
                <span>Lies Exposed</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Trending Contradictions */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold">Caught Red-Handed</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  They said it on camera. Then did the exact opposite. See for yourself.
                </p>
              </div>
              <Button variant="outline" asChild>
                <Link href="/directory">View All</Link>
              </Button>
            </div>
          </ScrollReveal>

          <StaggerChildren className="space-y-4" staggerDelay={0.15}>
            {trending.map((item) => {
              const action = item.actionId
                ? mockActions.find((a) => a.id === item.actionId)
                : null;
              const statement = mockStatements.find(
                (s) => s.id === item.statementId
              );
              const evidenceMedia = getEvidenceForRecord(item.id);
              return (
                <SayVsDoCard
                  key={item.id}
                  figureSlug={item.figure?.slug}
                  figureName={item.figure?.name}
                  statementTitle={item.statement?.title || ""}
                  statementContent={item.statement?.content || ""}
                  statementDate={item.statement?.dateOccurred || ""}
                  statementSource={item.statement?.sourceName || ""}
                  statementSourceUrl={statement?.sourceUrl}
                  statementSourceType={statement?.sourceType}
                  actionTitle={action?.title}
                  actionDescription={action?.description}
                  actionDate={action?.dateOccurred}
                  actionSourceUrl={action?.sourceUrl}
                  actionSourceName={action?.sourceName}
                  verdict={item.verdict}
                  score={item.score}
                  summary={item.summary}
                  evidence={item.evidence}
                  evidenceMedia={evidenceMedia}
                />
              );
            })}
          </StaggerChildren>
        </div>
      </section>

      {/* Why This Matters */}
      <section className="py-16 bg-muted/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-2xl font-bold text-center mb-10">
              Why This Matters
            </h2>
          </ScrollReveal>

          <StaggerChildren
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
            staggerDelay={0.15}
          >
            <div className="rounded-lg border bg-card p-6">
              <p className="text-sm text-muted-foreground leading-relaxed">
                Your senator promises to lower prescription drug costs. Four
                years pass. Prices go up 30%. By re-election, they&apos;re making
                the same promise again — and nobody calls them out.{" "}
                <span className="font-semibold text-foreground">Until now.</span>
              </p>
            </div>
            <div className="rounded-lg border bg-card p-6">
              <p className="text-sm text-muted-foreground leading-relaxed">
                A tech CEO pledges &quot;full self-driving by next year.&quot;
                That was 5 years ago. You bought the car. The feature still
                doesn&apos;t work.{" "}
                <span className="font-semibold text-foreground">
                  Where&apos;s the record of that promise?
                </span>
              </p>
            </div>
            <div className="rounded-lg border bg-card p-6">
              <p className="text-sm text-muted-foreground leading-relaxed">
                A governor declares a climate emergency. Then quietly approves 12
                new drilling permits. The news cycle moves on in 48 hours.{" "}
                <span className="font-semibold text-foreground">
                  The permits don&apos;t.
                </span>
              </p>
            </div>
          </StaggerChildren>

          <ScrollReveal delay={0.3} className="text-center mt-8">
            <p className="text-muted-foreground font-medium">
              They count on your short memory. Intelligence gives you a permanent
              one.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Check Any Leader */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold">Check Any Leader in Seconds</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Pick any politician, CEO, or public figure. See their promises.
                  See what they actually did. Decide for yourself.
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
          <h2 className="text-3xl font-bold">Stop Letting Them Get Away With It</h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
            Every broken promise you expose protects someone else from believing
            the same lie. It takes 2 minutes to contribute evidence — and it
            stays on the record forever.
          </p>
          <div className="flex gap-3 justify-center mt-8">
            <Button size="lg" asChild>
              <Link href="/contribute">Expose a Broken Promise</Link>
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
                label: "Browse All Leaders",
                href: "/directory",
                description: "Search and filter every tracked public figure",
              },
              {
                label: "See the Scorecard",
                href: "/scorecard",
                description: "Who keeps their word? Who doesn't? Ranked.",
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
