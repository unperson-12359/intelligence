"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { STATEMENT_TYPE_LABELS } from "@/lib/constants";
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

type FormStatus = "idle" | "submitting" | "success" | "error";

export function ContributionForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const [figureName, setFigureName] = useState("");
  const [statementType, setStatementType] = useState("");
  const [statementContent, setStatementContent] = useState("");
  const [sourceUrl, setSourceUrl] = useState("");
  const [dateOccurred, setDateOccurred] = useState("");
  const [context, setContext] = useState("");
  const [submitterEmail, setSubmitterEmail] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contribute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          figureName,
          statementType,
          statementContent,
          sourceUrl,
          dateOccurred,
          context,
          submitterEmail: submitterEmail || undefined,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Submission failed");
      }

      setStatus("success");
      // Reset form
      setFigureName("");
      setStatementType("");
      setStatementContent("");
      setSourceUrl("");
      setDateOccurred("");
      setContext("");
      setSubmitterEmail("");
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
        <h3 className="text-lg font-bold mb-2">Submitted Successfully</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Your contribution has been added to the review queue. Once verified by
          our team, it will appear on the public record.
        </p>
        <Button variant="outline" onClick={() => setStatus("idle")}>
          Submit Another
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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

      {/* Figure Name */}
      <div className="space-y-2">
        <Label htmlFor="figureName">
          Public Figure <span className="text-red-500">*</span>
        </Label>
        <Input
          id="figureName"
          placeholder="e.g. Donald Trump, Elon Musk, etc."
          value={figureName}
          onChange={(e) => setFigureName(e.target.value)}
          required
        />
        <p className="text-xs text-muted-foreground">
          The name of the public figure who made this statement
        </p>
      </div>

      {/* Statement Type */}
      <div className="space-y-2">
        <Label htmlFor="statementType">
          Type <span className="text-red-500">*</span>
        </Label>
        <Select value={statementType} onValueChange={setStatementType} required>
          <SelectTrigger>
            <SelectValue placeholder="What kind of statement?" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(STATEMENT_TYPE_LABELS).map(([value, label]) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Statement Content */}
      <div className="space-y-2">
        <Label htmlFor="statementContent">
          What did they say? <span className="text-red-500">*</span>
        </Label>
        <Textarea
          id="statementContent"
          placeholder='e.g. "I will build a wall and Mexico will pay for it"'
          rows={3}
          value={statementContent}
          onChange={(e) => setStatementContent(e.target.value)}
          required
        />
        <p className="text-xs text-muted-foreground">
          Quote or paraphrase the statement as accurately as possible
        </p>
      </div>

      {/* Source URL */}
      <div className="space-y-2">
        <Label htmlFor="sourceUrl">
          Source URL <span className="text-red-500">*</span>
        </Label>
        <Input
          id="sourceUrl"
          type="url"
          placeholder="https://..."
          value={sourceUrl}
          onChange={(e) => setSourceUrl(e.target.value)}
          required
        />
        <p className="text-xs text-muted-foreground">
          Link to where this statement was made (news article, video, tweet,
          etc.)
        </p>
      </div>

      {/* Date */}
      <div className="space-y-2">
        <Label htmlFor="dateOccurred">
          When did they say it? <span className="text-red-500">*</span>
        </Label>
        <Input
          id="dateOccurred"
          type="date"
          value={dateOccurred}
          onChange={(e) => setDateOccurred(e.target.value)}
          required
        />
      </div>

      {/* Context */}
      <div className="space-y-2">
        <Label htmlFor="context">Additional Context</Label>
        <Textarea
          id="context"
          placeholder="Any relevant background information, what they actually did vs. what they promised, etc."
          rows={3}
          value={context}
          onChange={(e) => setContext(e.target.value)}
        />
      </div>

      {/* Email (optional) */}
      <div className="space-y-2">
        <Label htmlFor="submitterEmail">
          Your Email{" "}
          <Badge variant="secondary" className="text-[10px] ml-1">
            Optional
          </Badge>
        </Label>
        <Input
          id="submitterEmail"
          type="email"
          placeholder="you@example.com"
          value={submitterEmail}
          onChange={(e) => setSubmitterEmail(e.target.value)}
        />
        <p className="text-xs text-muted-foreground">
          Only used to notify you when your contribution goes live. Never shared
          or sold.
        </p>
      </div>

      <Button
        type="submit"
        size="lg"
        className="w-full"
        disabled={status === "submitting"}
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="size-4 mr-2 animate-spin" />
            Submitting...
          </>
        ) : (
          <>
            <Send className="size-4 mr-2" />
            Submit to Review Queue
          </>
        )}
      </Button>

      <p className="text-xs text-center text-muted-foreground">
        All submissions go through our three-layer verification process before
        appearing on the public record.
      </p>
    </form>
  );
}
