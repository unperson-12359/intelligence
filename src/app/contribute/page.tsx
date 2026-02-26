import type { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { StaggerChildren } from "@/components/motion/stagger-children";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { Callout } from "@/components/ui/callout";
import { ContributionForm } from "@/components/contribute/contribution-form";
import { ApiDocs } from "@/components/contribute/api-docs";

export const metadata: Metadata = {
  title: "Contribute",
  description:
    "Every broken promise you expose protects someone else. Contribute evidence in minutes — it stays on the record forever.",
};

export default function ContributePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Contribute" }]} />
      <ScrollReveal className="mb-8 max-w-2xl">
        <h1 className="text-3xl font-bold">Contribute</h1>
        <p className="text-muted-foreground mt-2">
          Every broken promise you document protects someone else from believing
          the same lie. Here&apos;s how you can help — it takes less time than
          scrolling Twitter.
        </p>
      </ScrollReveal>

      <StaggerChildren
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
        staggerDelay={0.15}
      >
        {/* AI Agent */}
        <Card className="transition-all hover:shadow-lg hover:shadow-[var(--intelligence-blue)]/5">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="secondary">AI Agent</Badge>
              <Badge className="bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300 text-[10px]">Live</Badge>
            </div>
            <h2 className="text-xl font-bold mb-2">Let Your AI Do the Research</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Point your AI agent at any public figure. It finds their promises,
              checks the record, and submits evidence automatically. You wake up
              to a more honest world.
            </p>
            <div className="bg-muted rounded-lg p-4 space-y-1.5">
              <code className="text-xs block text-foreground">POST /api/contribute/statement</code>
              <code className="text-xs block text-foreground">POST /api/contribute/action</code>
              <code className="text-xs block text-foreground">POST /api/contribute/accountability</code>
              <code className="text-xs block text-muted-foreground">GET&nbsp; /api/contribute/status</code>
              <p className="text-xs text-muted-foreground mt-2">
                Your agent submits structured research. Our three-layer trust
                system (review queue + reputation + consensus) ensures quality.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Human */}
        <Card className="transition-all hover:shadow-lg hover:shadow-[var(--intelligence-blue)]/5">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="secondary">Human</Badge>
              <Badge className="bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300 text-[10px]">Live</Badge>
            </div>
            <h2 className="text-xl font-bold mb-2">You Spotted a Lie? Report It</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Saw a politician flip-flop on TV? Caught a CEO contradicting last
              quarter&apos;s earnings call? Submit what you found. We&apos;ll
              verify it and add it to the permanent record.
            </p>
          </CardContent>
        </Card>
      </StaggerChildren>

      {/* API Documentation */}
      <ScrollReveal className="mb-12" delay={0.2}>
        <h2 className="text-xl font-bold mb-4">API Documentation</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Use these endpoints to programmatically submit statements, actions, and
          accountability records. Perfect for AI agents and automated research pipelines.
        </p>
        <ApiDocs />
      </ScrollReveal>

      {/* Submission Form */}
      <ScrollReveal className="mb-12 max-w-2xl">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-1">Report a Broken Promise</h2>
            <p className="text-sm text-muted-foreground mb-6">
              Fill out the form below. It takes about 2 minutes — and it stays on the record forever.
            </p>
            <ContributionForm />
          </CardContent>
        </Card>
      </ScrollReveal>

      <Callout type="example" className="mb-12 max-w-2xl">
        Every piece of evidence you submit protects someone else from believing
        the same broken promise. Your 2 minutes of work becomes a permanent
        record that can&apos;t be erased.
      </Callout>

      {/* Trust system explanation */}
      <ScrollReveal delay={0.3} className="max-w-2xl">
        <h2 className="text-xl font-bold mb-4">How Trust Works</h2>
        <StaggerChildren className="space-y-4" staggerDelay={0.1}>
          <TrustLayer
            number={1}
            title="Review Queue"
            description="All new contributions go to a pending queue for review before going live. This ensures nothing slips through unchecked."
          />
          <TrustLayer
            number={2}
            title="Reputation"
            description="As your submissions get verified, your trust score increases. High-trust contributors can auto-publish. Bad submissions decrease your score."
          />
          <TrustLayer
            number={3}
            title="Consensus"
            description="For high-stakes accountability verdicts, data only goes live when multiple independent contributors submit consistent findings."
          />
        </StaggerChildren>
      </ScrollReveal>
    </div>
  );
}

function TrustLayer({
  number,
  title,
  description,
}: {
  number: number;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-4">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold shrink-0">
        {number}
      </div>
      <div>
        <h3 className="font-semibold text-sm">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
