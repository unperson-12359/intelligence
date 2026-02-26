import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { VerdictBadge } from "@/components/accountability/verdict-badge";
import { SourceLink } from "@/components/evidence/source-link";
import { EvidenceGallery } from "@/components/evidence/evidence-gallery";
import { EvidenceIndicator } from "@/components/evidence/evidence-indicator";
import { formatDate } from "@/lib/format";
import { STATEMENT_TYPE_LABELS, ACTION_TYPE_LABELS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import {
  mockFigures,
  mockStatements,
  mockActions,
  mockAccountabilityRecords,
  getEvidenceForRecord,
  getFigureBySlug,
} from "@/lib/mock-data";
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Bot,
  ShieldCheck,
  Gauge,
} from "lucide-react";

export async function generateStaticParams() {
  const params: { slug: string; recordId: string }[] = [];
  for (const record of mockAccountabilityRecords) {
    const figure = mockFigures.find((f) => f.id === record.figureId);
    if (figure) {
      params.push({ slug: figure.slug, recordId: record.id });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; recordId: string }>;
}): Promise<Metadata> {
  const { slug, recordId } = await params;
  const figure = getFigureBySlug(slug);
  const record = mockAccountabilityRecords.find((r) => r.id === recordId);
  const statement = record
    ? mockStatements.find((s) => s.id === record.statementId)
    : null;

  if (!figure || !record || !statement) {
    return { title: "Report Not Found" };
  }

  return {
    title: `${statement.title} — ${figure.name} | Intelligence`,
    description: record.summary,
  };
}

export default async function CommitmentReportPage({
  params,
}: {
  params: Promise<{ slug: string; recordId: string }>;
}) {
  const { slug, recordId } = await params;
  const figure = getFigureBySlug(slug);
  const record = mockAccountabilityRecords.find((r) => r.id === recordId);

  if (!figure || !record) notFound();

  const statement = mockStatements.find((s) => s.id === record.statementId);
  const action = record.actionId
    ? mockActions.find((a) => a.id === record.actionId)
    : null;
  const evidenceMedia = getEvidenceForRecord(record.id);

  if (!statement) notFound();

  const statementTypeLabel =
    STATEMENT_TYPE_LABELS[statement.type] || statement.type;
  const actionTypeLabel = action
    ? ACTION_TYPE_LABELS[action.type] || action.type
    : null;

  return (
    <div className="min-h-screen">
      {/* Top bar */}
      <div className="border-b">
        <div className="mx-auto max-w-4xl px-4 py-4 sm:px-6">
          <Link
            href={`/figure/${slug}`}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="size-4" />
            Back to {figure.name}
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 space-y-8">
        {/* Verdict header */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <VerdictBadge verdict={record.verdict} className="text-sm px-3 py-1" />
            <span
              className={cn(
                "text-2xl font-bold",
                record.score > 0
                  ? "text-green-600"
                  : record.score < 0
                    ? "text-red-600"
                    : "text-gray-500"
              )}
            >
              {record.score > 0 ? "+" : ""}
              {record.score}
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            {record.isVerified ? (
              <Badge variant="outline" className="text-green-700 border-green-300 dark:text-green-400 dark:border-green-700">
                <CheckCircle2 className="size-3 mr-1" />
                Verified
              </Badge>
            ) : (
              <Badge variant="outline" className="text-amber-700 border-amber-300 dark:text-amber-400 dark:border-amber-700">
                <XCircle className="size-3 mr-1" />
                Unverified
              </Badge>
            )}
          </div>
        </div>

        {/* SAID vs DID side-by-side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* SAID */}
          <Card>
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 px-2.5 py-1 rounded">
                  Said
                </span>
                <Badge variant="secondary" className="text-xs">
                  {statementTypeLabel}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mb-2">
                {formatDate(statement.dateOccurred)}
              </p>
              <h3 className="font-semibold text-base mb-2">
                {statement.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {statement.content}
              </p>
              {statement.context && (
                <p className="text-xs text-muted-foreground mt-3 leading-relaxed border-l-2 border-muted pl-3">
                  {statement.context}
                </p>
              )}
              <div className="mt-3">
                <SourceLink
                  url={statement.sourceUrl}
                  name={statement.sourceName}
                  type={statement.sourceType}
                />
              </div>
            </CardContent>
          </Card>

          {/* DID */}
          <Card>
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-red-700 dark:text-red-400 bg-red-100 dark:bg-red-900/30 px-2.5 py-1 rounded">
                  Did
                </span>
                {actionTypeLabel && (
                  <Badge variant="secondary" className="text-xs">
                    {actionTypeLabel}
                  </Badge>
                )}
              </div>
              {action ? (
                <>
                  <p className="text-xs text-muted-foreground mb-2">
                    {formatDate(action.dateOccurred)}
                  </p>
                  <h3 className="font-semibold text-base mb-2">
                    {action.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {action.description}
                  </p>
                  {action.outcome && (
                    <p className="text-xs text-muted-foreground mt-3 leading-relaxed border-l-2 border-muted pl-3">
                      <span className="font-medium">Outcome:</span>{" "}
                      {action.outcome}
                    </p>
                  )}
                  <div className="mt-3">
                    <SourceLink
                      url={action.sourceUrl}
                      name={action.sourceName}
                    />
                  </div>
                </>
              ) : (
                <p className="text-sm text-muted-foreground italic mt-4">
                  No corresponding action recorded yet.
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        <Separator />

        {/* Analysis */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Analysis</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {record.summary}
          </p>
          {record.evidence && (
            <div className="mt-4 rounded-lg bg-muted/20 p-4">
              <h3 className="text-sm font-medium mb-2">Detailed Evidence</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {record.evidence}
              </p>
            </div>
          )}
        </div>

        {/* Evidence media */}
        {evidenceMedia.length > 0 && (
          <>
            <Separator />
            <div>
              <h2 className="text-lg font-semibold mb-3">
                Preserved Evidence
              </h2>
              <EvidenceIndicator
                screenshotCount={
                  evidenceMedia.filter((e) => e.type === "screenshot").length
                }
                videoCount={
                  evidenceMedia.filter((e) => e.type === "video").length
                }
                audioCount={
                  evidenceMedia.filter((e) => e.type === "audio").length
                }
                documentCount={
                  evidenceMedia.filter((e) => e.type === "document").length
                }
              />
              <EvidenceGallery items={evidenceMedia} className="mt-3" />
            </div>
          </>
        )}

        <Separator />

        {/* Metadata */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Metadata</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Card>
              <CardContent className="p-4 flex items-center gap-3">
                <Bot className="size-5 text-muted-foreground shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">Source</p>
                  <p className="text-sm font-medium">
                    {record.aiGenerated ? "AI-Researched" : "Human-Submitted"}
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex items-center gap-3">
                <ShieldCheck className="size-5 text-muted-foreground shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">Verification</p>
                  <p className="text-sm font-medium">
                    {record.isVerified ? "Verified" : "Pending Review"}
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex items-center gap-3">
                <Gauge className="size-5 text-muted-foreground shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">
                    AI Confidence
                  </p>
                  <p className="text-sm font-medium">
                    {Math.round(record.aiConfidence * 100)}%
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Back link */}
        <div className="pt-4">
          <Link
            href={`/figure/${slug}`}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="size-4" />
            Back to {figure.name}&apos;s profile
          </Link>
        </div>
      </div>
    </div>
  );
}
