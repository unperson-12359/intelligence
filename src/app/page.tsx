import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SayVsDoCard } from "@/components/accountability/say-vs-do-card";
import { FigureCard } from "@/components/figures/figure-card";
import {
  mockFigures,
  mockActions,
  getTrendingContradictions,
  getFigureStats,
} from "@/lib/mock-data";

export default function HomePage() {
  const trending = getTrendingContradictions();
  const recentFigures = mockFigures.slice(0, 4);

  return (
    <div>
      {/* Hero Section */}
      <section className="border-b bg-gradient-to-b from-muted/50 to-background">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              What they{" "}
              <span className="text-blue-600">say</span>
              {" "}vs what they{" "}
              <span className="text-red-600">do</span>
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              An AI-powered accountability platform tracking public figures.
              Because humanity deserves to remember.
            </p>

            {/* Search */}
            <form
              action="/search"
              className="mt-8 flex max-w-lg mx-auto gap-2"
            >
              <Input
                type="search"
                name="q"
                placeholder="Search public figures, statements, actions..."
                className="h-12 text-base"
              />
              <Button type="submit" size="lg" className="h-12 px-6">
                Search
              </Button>
            </form>

            {/* Stats */}
            <div className="mt-8 flex justify-center gap-8 text-sm text-muted-foreground">
              <div>
                <span className="block text-2xl font-bold text-foreground">
                  {mockFigures.length}
                </span>
                Figures Tracked
              </div>
              <div>
                <span className="block text-2xl font-bold text-foreground">
                  25+
                </span>
                Statements Analyzed
              </div>
              <div>
                <span className="block text-2xl font-bold text-foreground">
                  {trending.length}
                </span>
                Contradictions Found
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Contradictions */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold">Trending Contradictions</h2>
              <p className="text-sm text-muted-foreground mt-1">
                The most flagrant gaps between what was said and what was done
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/directory">View All</Link>
            </Button>
          </div>

          <div className="space-y-4">
            {trending.map((item) => {
              const action = item.actionId
                ? mockActions.find((a) => a.id === item.actionId)
                : null;
              return (
                <SayVsDoCard
                  key={item.id}
                  figureSlug={item.figure?.slug}
                  figureName={item.figure?.name}
                  statementTitle={item.statement?.title || ""}
                  statementContent={item.statement?.content || ""}
                  statementDate={item.statement?.dateOccurred || ""}
                  statementSource={item.statement?.sourceName || ""}
                  actionTitle={action?.title}
                  actionDescription={action?.description}
                  actionDate={action?.dateOccurred}
                  verdict={item.verdict}
                  score={item.score}
                  summary={item.summary}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* Recently Updated Figures */}
      <section className="py-12 bg-muted/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold">Public Figures</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Browse the directory of tracked public figures
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/directory">View Directory</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {recentFigures.map((figure) => {
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
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold">Help Us Hold Power Accountable</h2>
          <p className="text-muted-foreground mt-2 max-w-xl mx-auto">
            Connect your AI agent or contribute as a human researcher.
            Together, we can build the most comprehensive accountability
            database in the world.
          </p>
          <div className="flex gap-3 justify-center mt-6">
            <Button size="lg" asChild>
              <Link href="/contribute">Contribute</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
