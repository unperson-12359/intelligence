'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { ResearchResult } from '@/lib/byot/types';
import {
  CheckCircle,
  XCircle,
  ExternalLink,
  Loader2,
  Sparkles,
  AlertCircle,
} from 'lucide-react';

const STATEMENT_TYPE_COLORS: Record<string, string> = {
  promise: 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300',
  claim: 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300',
  position: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300',
  prediction: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-950 dark:text-cyan-300',
  denial: 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300',
  endorsement: 'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300',
  other: 'bg-gray-100 text-gray-800 dark:bg-gray-950 dark:text-gray-300',
};

const VERDICT_COLORS: Record<string, string> = {
  kept: 'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300',
  broken: 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300',
  partial: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-300',
  in_progress: 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300',
  flip_flop: 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300',
  context_needed: 'bg-gray-100 text-gray-800 dark:bg-gray-950 dark:text-gray-300',
};

interface AiResearchResultsProps {
  result: ResearchResult;
  onApprove: (result: ResearchResult) => Promise<void>;
  onDiscard: () => void;
}

export function AiResearchResults({
  result,
  onApprove,
  onDiscard,
}: AiResearchResultsProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  async function handleApprove() {
    setIsSubmitting(true);
    setSubmitError('');
    try {
      await onApprove(result);
      setSubmitted(true);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Submission failed');
    } finally {
      setIsSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-lg border bg-green-50 dark:bg-green-950/20 p-6 text-center">
        <CheckCircle className="size-10 text-green-600 mx-auto mb-3" />
        <h3 className="text-base font-bold mb-1">Submitted for Review</h3>
        <p className="text-sm text-muted-foreground mb-4">
          AI-researched contribution is now in the review queue.
        </p>
        <Button variant="outline" size="sm" onClick={onDiscard}>
          Submit Another
        </Button>
      </div>
    );
  }

  const confidence = Math.round(result.aiConfidence * 100);

  return (
    <Card className="border-amber-200 dark:border-amber-800">
      <CardContent className="p-5 space-y-4">
        {/* Header */}
        <div className="flex items-center gap-2">
          <Sparkles className="size-4 text-amber-500" />
          <h3 className="text-sm font-bold">AI Research Result</h3>
        </div>

        {/* Figure + Type */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-medium">{result.figureName}</span>
          <Badge
            className={`text-[10px] ${STATEMENT_TYPE_COLORS[result.statementType] || STATEMENT_TYPE_COLORS.other}`}
          >
            {result.statementType}
          </Badge>
          {result.suggestedVerdict && (
            <Badge
              className={`text-[10px] ${VERDICT_COLORS[result.suggestedVerdict] || VERDICT_COLORS.context_needed}`}
            >
              {result.suggestedVerdict.replace('_', ' ')}
            </Badge>
          )}
        </div>

        {/* Title + Content */}
        <div className="space-y-1">
          <h4 className="text-sm font-semibold">{result.title}</h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {result.content}
          </p>
        </div>

        {/* Context + Date */}
        {(result.context || result.dateEstimate) && (
          <div className="text-xs text-muted-foreground">
            {result.context && <p>{result.context}</p>}
            {result.dateEstimate && (
              <p className="mt-0.5">Date: {result.dateEstimate}</p>
            )}
          </div>
        )}

        {/* Sources */}
        {result.sources.length > 0 && (
          <div className="space-y-1.5">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Sources
            </p>
            {result.sources.map((source, i) => (
              <div key={i} className="flex items-center gap-2 text-xs">
                <ExternalLink className="size-3 text-muted-foreground shrink-0" />
                {source.url ? (
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline truncate"
                  >
                    {source.name || source.url}
                  </a>
                ) : (
                  <span className="text-muted-foreground">{source.name}</span>
                )}
                <Badge variant="outline" className="text-[9px] shrink-0">
                  {source.type}
                </Badge>
              </div>
            ))}
          </div>
        )}

        {/* Confidence */}
        <div className="flex items-center gap-2">
          <div className="flex-1 bg-muted rounded-full h-1.5">
            <div
              className="h-1.5 rounded-full bg-amber-500 transition-all"
              style={{ width: `${confidence}%` }}
            />
          </div>
          <span className="text-[10px] text-muted-foreground font-medium">
            {confidence}% confidence
          </span>
        </div>

        {/* Analysis */}
        {result.rawAnalysis && (
          <div className="rounded-md bg-muted/50 p-3">
            <p className="text-xs text-muted-foreground leading-relaxed">
              {result.rawAnalysis}
            </p>
          </div>
        )}

        {/* Error */}
        {submitError && (
          <div className="flex items-start gap-2 rounded-md bg-red-50 dark:bg-red-950/20 p-2.5 border border-red-200 dark:border-red-900">
            <AlertCircle className="size-3.5 text-red-500 shrink-0 mt-0.5" />
            <p className="text-xs text-red-600 dark:text-red-400">{submitError}</p>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2 pt-1">
          <Button
            onClick={handleApprove}
            disabled={isSubmitting}
            size="sm"
            className="flex-1"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="size-3.5 mr-1.5 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <CheckCircle className="size-3.5 mr-1.5" />
                Approve & Submit
              </>
            )}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onDiscard}
            disabled={isSubmitting}
          >
            <XCircle className="size-3.5 mr-1.5" />
            Discard
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
