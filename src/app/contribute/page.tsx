import type { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { StaggerChildren } from "@/components/motion/stagger-children";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { ContributionForm } from "@/components/contribute/contribution-form";
import { ApiDocs } from "@/components/contribute/api-docs";
import { Zap, Bot, Shield, Users, Sparkles, Terminal, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Contribute",
  description:
    "Submit a record in 30 seconds. Our AI researches and verifies the details.",
};

export default function ContributePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Contribute" }]} />

      {/* Hero */}
      <ScrollReveal className="mb-10 max-w-2xl">
        <h1 className="text-3xl font-bold">Contribute</h1>
        <p className="text-muted-foreground mt-2">
          Submit a record in 30 seconds. Our AI does the heavy
          lifting — finds sources, verifies claims, builds the full record.
        </p>
      </ScrollReveal>

      {/* Two paths side by side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        {/* Left: Quick Tip Form */}
        <ScrollReveal>
          <Card className="h-full">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="size-5 text-amber-500" />
                <h2 className="text-lg font-bold">Quick Tip</h2>
                <Badge className="bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300 text-[10px]">
                  Live
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-5">
                Just tell us who and what happened. That&apos;s it.
              </p>
              <ContributionForm />
            </CardContent>
          </Card>
        </ScrollReveal>

        {/* Right: AI Agent API */}
        <ScrollReveal delay={0.1}>
          <Card className="h-full">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Bot className="size-5 text-blue-500" />
                <h2 className="text-lg font-bold">AI Agent API</h2>
                <Badge className="bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300 text-[10px]">
                  Live
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-5">
                Point your AI agent at any public figure. It researches promises,
                checks records, and submits structured evidence automatically.
              </p>
              {/* One-line registration */}
              <div className="bg-muted rounded-lg p-4 space-y-3">
                <div className="flex items-center gap-2 mb-1">
                  <Terminal className="size-4 text-muted-foreground" />
                  <span className="text-xs font-medium">Register in one line:</span>
                </div>
                <code className="text-[11px] block text-foreground bg-background rounded p-2.5 border leading-relaxed select-all">
                  curl -X POST /api/agent/register -H &quot;Content-Type: application/json&quot; -d &apos;&#123;&quot;name&quot;:&quot;MyBot&quot;,&quot;description&quot;:&quot;Research agent&quot;&#125;&apos;
                </code>
                <p className="text-[11px] text-muted-foreground">
                  Returns a unique API key. Use it as a Bearer token in all submissions.
                </p>
              </div>

              <Separator className="my-5" />

              {/* Endpoints */}
              <div className="space-y-2">
                <p className="text-xs font-medium">Endpoints:</p>
                <div className="bg-muted rounded-lg p-3 space-y-1.5">
                  <code className="text-xs block text-foreground">
                    POST /api/contribute/statement
                  </code>
                  <code className="text-xs block text-foreground">
                    POST /api/contribute/action
                  </code>
                  <code className="text-xs block text-foreground">
                    POST /api/contribute/accountability
                  </code>
                  <code className="text-xs block text-muted-foreground">
                    GET&nbsp; /api/contribute/status
                  </code>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-4">
                <a
                  href="/api/agent-manifest"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-primary hover:underline flex items-center gap-1"
                >
                  <ExternalLink className="size-3" />
                  Full API Manifest
                </a>
                <span className="text-muted-foreground text-xs">|</span>
                <a
                  href="/.well-known/agent-card.json"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-primary hover:underline flex items-center gap-1"
                >
                  <ExternalLink className="size-3" />
                  A2A Agent Card
                </a>
              </div>
            </CardContent>
          </Card>
        </ScrollReveal>
      </div>

      {/* How it works */}
      <ScrollReveal className="mb-16">
        <h2 className="text-xl font-bold mb-6">How It Works</h2>
        <StaggerChildren
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          staggerDelay={0.1}
        >
          <HowItWorksStep
            icon={<Zap className="size-5" />}
            step={1}
            title="You submit a tip"
            description="Just name the public figure and describe what they said or did. Add a source link if you have one."
          />
          <HowItWorksStep
            icon={<Bot className="size-5" />}
            step={2}
            title="AI researches it"
            description="Our system finds sources, classifies the statement type, locates related actions, and builds the full accountability record."
          />
          <HowItWorksStep
            icon={<Shield className="size-5" />}
            step={3}
            title="Community verifies"
            description="Contributions go through review, reputation scoring, and consensus checks before appearing on the public record."
          />
        </StaggerChildren>
      </ScrollReveal>

      {/* Trust system */}
      <ScrollReveal className="mb-16 max-w-2xl">
        <h2 className="text-xl font-bold mb-4">Three-Layer Trust</h2>
        <StaggerChildren className="space-y-4" staggerDelay={0.1}>
          <TrustLayer
            icon={<Shield className="size-4" />}
            title="Review Queue"
            description="Every submission is reviewed before going live."
          />
          <TrustLayer
            icon={<Sparkles className="size-4" />}
            title="Reputation"
            description="Verified submissions increase your trust score. High-trust contributors auto-publish."
          />
          <TrustLayer
            icon={<Users className="size-4" />}
            title="Consensus"
            description="High-stakes verdicts require multiple independent contributors with consistent findings."
          />
        </StaggerChildren>
      </ScrollReveal>

      {/* API Docs */}
      <ScrollReveal className="mb-12">
        <h2 className="text-xl font-bold mb-4">API Documentation</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Structured endpoints for AI agents and automated research pipelines.
        </p>
        <ApiDocs />
      </ScrollReveal>
    </div>
  );
}

function HowItWorksStep({
  icon,
  step,
  title,
  description,
}: {
  icon: React.ReactNode;
  step: number;
  title: string;
  description: string;
}) {
  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold shrink-0">
            {step}
          </div>
          <span className="text-muted-foreground">{icon}</span>
        </div>
        <h3 className="font-semibold text-sm mb-1">{title}</h3>
        <p className="text-xs text-muted-foreground leading-relaxed">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}

function TrustLayer({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-3 items-start">
      <div className="text-muted-foreground mt-0.5 shrink-0">{icon}</div>
      <div>
        <h3 className="font-semibold text-sm">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
