import type { Metadata } from "next";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { StaggerChildren } from "@/components/motion/stagger-children";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";

export const metadata: Metadata = {
  title: "Methodology",
  description:
    "How Intelligence scores public figures — our data collection process, scoring system, and verification standards.",
};

export default function MethodologyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "About", href: "/about" }, { label: "Methodology" }]} />
      <ScrollReveal>
        <h1 className="text-3xl font-bold mb-6">Methodology</h1>
        <p className="text-muted-foreground mb-8">
          How we collect data, score accountability, and verify results.
          Transparency is core to our mission.
        </p>
      </ScrollReveal>

      <div className="space-y-10">
        <ScrollReveal delay={0.1}>
          <section>
            <h2 className="text-xl font-bold mb-3">Data Collection</h2>
            <p className="text-muted-foreground mb-3">
              We track two categories of data for each public figure:
            </p>
            <StaggerChildren className="space-y-3" staggerDelay={0.1}>
              <div className="border rounded-lg p-4 border-l-4 border-l-blue-500 bg-card">
                <h3 className="font-semibold mb-1">Statements (SAY)</h3>
                <p className="text-sm text-muted-foreground">
                  Promises, claims, positions, predictions, denials, and
                  endorsements made in public. Each statement is sourced from
                  official records, press conferences, social media posts,
                  interviews, or legislative proceedings.
                </p>
              </div>
              <div className="border rounded-lg p-4 border-l-4 border-l-amber-500 bg-card">
                <h3 className="font-semibold mb-1">Actions (DO)</h3>
                <p className="text-sm text-muted-foreground">
                  Votes, executive orders, legislation signed or vetoed, business
                  decisions, appointments, donations, and policy changes.
                  Actions are verified against official government databases,
                  corporate filings, and news reporting.
                </p>
              </div>
            </StaggerChildren>
          </section>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <section>
            <h2 className="text-xl font-bold mb-3">Scoring System</h2>
            <p className="text-muted-foreground mb-3">
              Each accountability record receives a score from -100 to +100
              based on the alignment between what was said and what was done:
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-3 p-3 rounded-lg border">
                <span className="font-bold text-green-600 dark:text-green-400 w-20">+50 to +100</span>
                <span className="font-medium w-20">Kept</span>
                <span className="text-muted-foreground">Action directly fulfills or advances the statement</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg border">
                <span className="font-bold text-yellow-600 dark:text-yellow-400 w-20">+10 to +49</span>
                <span className="font-medium w-20">Partial</span>
                <span className="text-muted-foreground">Some progress toward the statement but incomplete</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg border">
                <span className="font-bold text-blue-600 dark:text-blue-400 w-20">0</span>
                <span className="font-medium w-20">In Progress</span>
                <span className="text-muted-foreground">Statement is recent and actions are still developing</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg border">
                <span className="font-bold text-red-600 dark:text-red-400 w-20">-50 to -100</span>
                <span className="font-medium w-20">Broken</span>
                <span className="text-muted-foreground">Action directly contradicts or abandons the statement</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg border">
                <span className="font-bold text-purple-600 dark:text-purple-400 w-20">-30 to -80</span>
                <span className="font-medium w-20">Flip-Flop</span>
                <span className="text-muted-foreground">Figure reversed position without acknowledging the change</span>
              </div>
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <section>
            <h2 className="text-xl font-bold mb-3">Overall Grades</h2>
            <p className="text-muted-foreground mb-3">
              Individual scores are aggregated into an overall letter grade
              for each public figure:
            </p>
            <div className="grid grid-cols-5 gap-2 text-center text-sm">
              <div className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 rounded-lg p-3">
                <span className="font-bold text-lg block">A</span>
                <span className="text-xs">70 to 100</span>
              </div>
              <div className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 rounded-lg p-3">
                <span className="font-bold text-lg block">B</span>
                <span className="text-xs">40 to 69</span>
              </div>
              <div className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 rounded-lg p-3">
                <span className="font-bold text-lg block">C</span>
                <span className="text-xs">10 to 39</span>
              </div>
              <div className="bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400 rounded-lg p-3">
                <span className="font-bold text-lg block">D</span>
                <span className="text-xs">-20 to 9</span>
              </div>
              <div className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 rounded-lg p-3">
                <span className="font-bold text-lg block">F</span>
                <span className="text-xs">-100 to -21</span>
              </div>
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal delay={0.4}>
          <section>
            <h2 className="text-xl font-bold mb-3">AI Confidence Score</h2>
            <p className="text-muted-foreground">
              Each record includes an AI confidence percentage indicating how
              certain the system is about the match between statement and action.
              Records with confidence below 70% are flagged for human review.
              Records above 90% are considered high-confidence and may be
              auto-published by trusted contributors.
            </p>
          </section>
        </ScrollReveal>

        <ScrollReveal delay={0.5}>
          <section>
            <h2 className="text-xl font-bold mb-3">Verification Standards</h2>
            <p className="text-muted-foreground mb-3">
              Every record must meet these standards:
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <span className="font-bold text-foreground shrink-0">Source required:</span>
                Every statement and action must link to a verifiable source (official record, news article, video, etc.)
              </li>
              <li className="flex gap-2">
                <span className="font-bold text-foreground shrink-0">Date stamped:</span>
                Both the statement date and action date must be documented for timeline accuracy.
              </li>
              <li className="flex gap-2">
                <span className="font-bold text-foreground shrink-0">Context preserved:</span>
                Statements must include surrounding context to prevent misrepresentation.
              </li>
              <li className="flex gap-2">
                <span className="font-bold text-foreground shrink-0">Non-partisan:</span>
                Scoring criteria are identical regardless of party, ideology, or affiliation.
              </li>
            </ul>
          </section>
        </ScrollReveal>
      </div>
    </div>
  );
}
