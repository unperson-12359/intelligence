"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Send,
  CheckCircle,
  AlertCircle,
  Loader2,
  Sparkles,
} from "lucide-react";

type FormStatus = "idle" | "submitting" | "success" | "error";

export function ContributionForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const [figureName, setFigureName] = useState("");
  const [whatHappened, setWhatHappened] = useState("");
  const [sourceUrl, setSourceUrl] = useState("");

  async function handleSubmitTip(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contribute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          figureName,
          whatHappened,
          sourceUrl: sourceUrl || undefined,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Submission failed");
      }

      setStatus("success");
      setFigureName("");
      setWhatHappened("");
      setSourceUrl("");
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong"
      );
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-lg border bg-green-50 dark:bg-green-950/20 p-8 text-center">
        <CheckCircle className="size-12 text-green-600 mx-auto mb-4" />
        <h3 className="text-lg font-bold mb-2">Submitted</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Your tip has been added to the review queue. Our AI will research the
          details and verify the claim.
        </p>
        <Button variant="outline" onClick={() => setStatus("idle")}>
          Submit Another
        </Button>
      </div>
    );
  }

  const isWorking = status === "submitting";

  return (
    <form onSubmit={handleSubmitTip} className="space-y-5">
      {status === "error" && (
        <div className="rounded-lg border border-red-200 bg-red-50 dark:bg-red-950/20 p-4 flex items-start gap-3">
          <AlertCircle className="size-5 text-red-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-red-800 dark:text-red-300">
              Submission failed
            </p>
            <p className="text-xs text-red-600 dark:text-red-400 mt-1">
              {errorMessage}
            </p>
          </div>
        </div>
      )}

      {/* Who */}
      <div className="space-y-1.5">
        <Label htmlFor="figureName">
          Who? <span className="text-red-500">*</span>
        </Label>
        <Input
          id="figureName"
          placeholder="e.g. Donald Trump, Elon Musk, any public figure..."
          value={figureName}
          onChange={(e) => setFigureName(e.target.value)}
          required
          disabled={isWorking}
        />
      </div>

      {/* What */}
      <div className="space-y-1.5">
        <Label htmlFor="whatHappened">
          What did they say or do? <span className="text-red-500">*</span>
        </Label>
        <Textarea
          id="whatHappened"
          placeholder='e.g. "Promised to cancel student debt but only forgave a fraction" or "Said they&#39;d never raise taxes, then voted for a tax increase"'
          rows={4}
          value={whatHappened}
          onChange={(e) => setWhatHappened(e.target.value)}
          required
          disabled={isWorking}
        />
      </div>

      {/* Source (optional) */}
      <div className="space-y-1.5">
        <Label htmlFor="sourceUrl" className="text-muted-foreground">
          Got a link? <span className="text-xs">(optional)</span>
        </Label>
        <Input
          id="sourceUrl"
          type="url"
          placeholder="https://..."
          value={sourceUrl}
          onChange={(e) => setSourceUrl(e.target.value)}
          disabled={isWorking}
        />
      </div>

      {/* Submit */}
      <Button
        type="submit"
        size="lg"
        className="w-full"
        disabled={isWorking}
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="size-4 mr-2 animate-spin" />
            Submitting...
          </>
        ) : (
          <>
            <Send className="size-4 mr-2" />
            Submit Tip
          </>
        )}
      </Button>

      <div className="flex items-start gap-2 rounded-lg bg-muted/50 p-3">
        <Sparkles className="size-4 text-amber-500 shrink-0 mt-0.5" />
        <p className="text-xs text-muted-foreground">
          Just describe what happened in plain language. Our AI will research
          the details, find sources, classify the statement type, and build the
          full accountability record automatically.
        </p>
      </div>
    </form>
  );
}
