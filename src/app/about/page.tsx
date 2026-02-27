import type { Metadata } from "next";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { StaggerChildren } from "@/components/motion/stagger-children";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { NextSteps } from "@/components/navigation/next-steps";
import { BlogPostCard } from "@/components/blog/blog-post-card";
import { getAllBlogPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "About",
  description:
    "They promise. They break it. They count on you forgetting. See how Indelible makes broken promises impossible to hide.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "About" }]} />
      <ScrollReveal>
        <h1 className="text-3xl font-bold mb-6">About Indelible</h1>
      </ScrollReveal>

      <div className="space-y-8">
        <ScrollReveal delay={0.1}>
          <section>
            <h2 className="text-xl font-bold mb-2">Why We Exist</h2>
            <p className="text-muted-foreground">
              You&apos;ve been lied to. Not once — systematically. Every election,
              every earnings call, every press conference. They make promises
              designed to be forgotten. Indelible makes forgetting impossible.
            </p>
            <p className="text-muted-foreground mt-2">
              Every public statement is matched against actual actions, scored,
              and made searchable. When a leader says one thing and does another,
              you&apos;ll know — with the date, the source, and the proof.
            </p>
          </section>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <section>
            <h2 className="text-xl font-bold mb-2">How It Works</h2>
            <p className="text-sm text-muted-foreground mb-3">
              Here&apos;s how you go from &quot;I think they lied&quot; to
              &quot;Here&apos;s the proof&quot; in under 60 seconds:
            </p>
            <StaggerChildren className="space-y-3" staggerDelay={0.12}>
              <div className="border rounded-lg p-4 border-l-4 border-l-blue-500 bg-card">
                <h3 className="font-semibold text-foreground mb-1">
                  1. Find What They Promised
                </h3>
                <p className="text-sm text-muted-foreground">
                  Find exactly what they promised — with the date, the source,
                  and the exact words. No more &quot;I don&apos;t think they
                  actually said that.&quot;
                </p>
              </div>
              <div className="border rounded-lg p-4 border-l-4 border-l-amber-500 bg-card">
                <h3 className="font-semibold text-foreground mb-1">
                  2. See What They Actually Did
                </h3>
                <p className="text-sm text-muted-foreground">
                  See what they actually did when they thought you weren&apos;t
                  watching. Votes, vetoes, business deals — all documented.
                </p>
              </div>
              <div className="border rounded-lg p-4 border-l-4 border-l-purple-500 bg-card">
                <h3 className="font-semibold text-foreground mb-1">
                  3. See the Gap
                </h3>
                <p className="text-sm text-muted-foreground">
                  See the gap between words and actions, scored from A (walks
                  the talk) to F (serial liar). No opinions — just evidence.
                </p>
              </div>
            </StaggerChildren>
          </section>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <section>
            <h2 className="text-xl font-bold mb-2">Scoring Methodology</h2>
            <p className="text-muted-foreground mb-3">
              Each accountability record receives a score from -100 (total
              contradiction) to +100 (perfectly kept). These scores are aggregated
              into an overall letter grade:
            </p>
            <div className="grid grid-cols-5 gap-2 text-center text-sm">
              <div className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 rounded-lg p-2">
                <span className="font-bold text-lg block">A</span>
                <span className="text-xs">70-100</span>
              </div>
              <div className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 rounded-lg p-2">
                <span className="font-bold text-lg block">B</span>
                <span className="text-xs">40-69</span>
              </div>
              <div className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 rounded-lg p-2">
                <span className="font-bold text-lg block">C</span>
                <span className="text-xs">10-39</span>
              </div>
              <div className="bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400 rounded-lg p-2">
                <span className="font-bold text-lg block">D</span>
                <span className="text-xs">-20 to 9</span>
              </div>
              <div className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 rounded-lg p-2">
                <span className="font-bold text-lg block">F</span>
                <span className="text-xs">-100 to -21</span>
              </div>
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal delay={0.4}>
          <section>
            <h2 className="text-xl font-bold mb-2">Anyone Can Contribute</h2>
            <p className="text-muted-foreground">
              You don&apos;t need to be a journalist or a data scientist. If you
              see a broken promise, you can put it on the record in minutes.
              Thousands of people and AI agents are doing it right now — building
              the most comprehensive accountability database ever created.
            </p>
          </section>
        </ScrollReveal>

        <ScrollReveal delay={0.5}>
          <section>
            <h2 className="text-xl font-bold mb-2">What We Stand For</h2>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <span className="font-bold text-foreground shrink-0">You See Everything:</span>
                Every record shows its source, confidence score, and verification status. Nothing is hidden.
              </li>
              <li className="flex gap-2">
                <span className="font-bold text-foreground shrink-0">No Favorites:</span>
                We track all public figures regardless of party, ideology, or affiliation.
              </li>
              <li className="flex gap-2">
                <span className="font-bold text-foreground shrink-0">Proof, Not Opinions:</span>
                No editorials — only verifiable statements matched against documented actions.
              </li>
              <li className="flex gap-2">
                <span className="font-bold text-foreground shrink-0">Anyone Can Contribute:</span>
                Researchers, journalists, concerned citizens, and AI agents — all working together.
              </li>
            </ul>
          </section>
        </ScrollReveal>

        <ScrollReveal delay={0.6}>
          <section>
            <h2 className="text-xl font-bold mb-3">Learn More</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {getAllBlogPosts().slice(0, 2).map((post) => (
                <BlogPostCard key={post.slug} post={post} />
              ))}
            </div>
          </section>
        </ScrollReveal>

        <NextSteps
          className="mt-4"
          suggestions={[
            { label: "Our Methodology", href: "/about/methodology", description: "How we score and verify accountability records" },
            { label: "Expose a Broken Promise", href: "/contribute", description: "Help build the record. It takes 2 minutes." },
            { label: "Browse All Leaders", href: "/directory", description: "Search and filter every tracked public figure" },
          ]}
        />
      </div>
    </div>
  );
}
