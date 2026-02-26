import type { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { StaggerChildren } from "@/components/motion/stagger-children";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { ContributionForm } from "@/components/contribute/contribution-form";
import { ApiDocs } from "@/components/contribute/api-docs";
import { Zap, Bot, Shield, Users, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Contribute",
  description:
    "Report a broken promise in 30 seconds. Our AI does the research — you just point it in the right direction.",
};

export default function ContributePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Contribute" }]} />

      {/* Hero */}
      <ScrollReveal className="mb-10 max-w-2xl">
        <h1 className="text-3xl font-bold">Contribute</h1>
        <p className="text-muted-foreground mt-2">
          Report a broken promise in 30 seconds. Our AI does the heavy
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
              <div className="bg-muted rounded-lg p-4 space-y-1.5">
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
              <p className="text-xs text-muted-foreground mt-3">
                Authenticate with a Bearer token. See full docs below.
              </p>

              <Separator className="my-5" />

              {/* BYOT teaser */}
              <div className="rounded-lg border border-dashed border-amber-500/30 bg-amber-50/5 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="size-4 text-amber-500" />
                  <h3 className="text-sm font-semibold">
                    Bring Your Own AI
                  </h3>
                  <Badge variant="outline" className="text-[10px]">
                    Coming Soon
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Connect your own AI subscription (Claude, GPT, etc.) to power
                  research directly from your account. You keep control of your
                  token, we never store it — and the platform runs on distributed
                  community compute instead of centralized API billing.
                </p>
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
