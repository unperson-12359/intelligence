'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Check, Copy, Terminal, Key, FileText, Activity, Scale } from 'lucide-react';

function CodeBlock({ code, language = 'bash' }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="relative group">
      <pre className="bg-muted rounded-lg p-4 text-xs overflow-x-auto">
        <code className={`language-${language}`}>{code}</code>
      </pre>
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 p-1.5 rounded-md bg-background/80 border opacity-0 group-hover:opacity-100 transition-opacity hover:bg-accent"
        title="Copy to clipboard"
      >
        {copied ? (
          <Check className="size-3.5 text-green-600" />
        ) : (
          <Copy className="size-3.5 text-muted-foreground" />
        )}
      </button>
    </div>
  );
}

function EndpointSection({
  method,
  path,
  description,
  schema,
  curlExample,
  responseExample,
}: {
  method: string;
  path: string;
  description: string;
  schema: Record<string, string>;
  curlExample: string;
  responseExample: string;
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 flex-wrap">
        <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 font-mono text-xs">
          {method}
        </Badge>
        <code className="text-sm font-mono text-foreground">{path}</code>
      </div>
      <p className="text-sm text-muted-foreground">{description}</p>

      <div>
        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
          Request Body
        </h4>
        <div className="bg-muted rounded-lg p-4 text-xs space-y-1">
          {Object.entries(schema).map(([field, desc]) => (
            <div key={field} className="flex gap-2">
              <code className="text-blue-600 dark:text-blue-400 shrink-0">{field}</code>
              <span className="text-muted-foreground">{desc}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
          curl Example
        </h4>
        <CodeBlock code={curlExample} />
      </div>

      <div>
        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
          Response (201)
        </h4>
        <CodeBlock code={responseExample} language="json" />
      </div>
    </div>
  );
}

export function ApiDocs() {
  return (
    <div className="space-y-6">
      {/* Auth section */}
      <Card>
        <CardContent className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <Key className="size-4 text-muted-foreground" />
            <h3 className="font-semibold text-sm">Authentication</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-3">
            All contribution endpoints require a Bearer token in the Authorization header.
          </p>
          <CodeBlock code={`Authorization: Bearer <your-api-key>`} />
          <p className="text-xs text-muted-foreground mt-2">
            For development and testing, use: <code className="text-foreground bg-muted px-1.5 py-0.5 rounded">dev-api-key-intelligence-2024</code>
          </p>
        </CardContent>
      </Card>

      {/* Endpoints */}
      <Card>
        <CardContent className="p-5">
          <div className="flex items-center gap-2 mb-4">
            <Terminal className="size-4 text-muted-foreground" />
            <h3 className="font-semibold text-sm">Endpoints</h3>
          </div>

          <Tabs defaultValue="statement" className="w-full">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="statement" className="text-xs gap-1.5">
                <FileText className="size-3" />
                Statement
              </TabsTrigger>
              <TabsTrigger value="action" className="text-xs gap-1.5">
                <Activity className="size-3" />
                Action
              </TabsTrigger>
              <TabsTrigger value="accountability" className="text-xs gap-1.5">
                <Scale className="size-3" />
                Accountability
              </TabsTrigger>
            </TabsList>

            <TabsContent value="statement" className="mt-4">
              <EndpointSection
                method="POST"
                path="/api/contribute/statement"
                description="Submit a public figure's statement (promise, claim, position, etc.) with source attribution."
                schema={{
                  'figureId*': '(string) ID of the public figure, e.g. "fig-001"',
                  'type*': '(string) promise | claim | position | prediction | denial | endorsement | other',
                  'title*': '(string) Headline, 5-500 chars',
                  'content*': '(string) What they said, 10+ chars',
                  'context': '(string) When/where it was said',
                  'dateOccurred*': '(string) YYYY-MM-DD',
                  'sourceUrl*': '(string) Valid URL to the source',
                  'sourceName*': '(string) Name of the source',
                  'sourceType': '(string) news | government_record | press_release | podcast | video',
                  'aiConfidence': '(number) 0.0 to 1.0',
                }}
                curlExample={`curl -X POST http://localhost:3000/api/contribute/statement \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer dev-api-key-intelligence-2024" \\
  -d '{
    "figureId": "fig-001",
    "type": "promise",
    "title": "Pledged to cancel student debt",
    "content": "During the campaign rally, stated that all federal student loan debt would be cancelled within the first 100 days of taking office.",
    "context": "Campaign rally in Iowa, 2020",
    "dateOccurred": "2020-03-15",
    "sourceUrl": "https://en.wikipedia.org/wiki/Example",
    "sourceName": "Wikipedia",
    "sourceType": "news",
    "aiConfidence": 0.92
  }'`}
                responseExample={`{
  "success": true,
  "message": "Statement contribution submitted and pending review.",
  "contributionId": "contrib-stmt-1709000000000-abc123",
  "data": { ... }
}`}
              />
            </TabsContent>

            <TabsContent value="action" className="mt-4">
              <EndpointSection
                method="POST"
                path="/api/contribute/action"
                description="Submit an action taken by a public figure (vote, policy, business decision, etc.)."
                schema={{
                  'figureId*': '(string) ID of the public figure',
                  'type*': '(string) vote | executive_order | legislation_signed | legislation_vetoed | policy_enacted | business_decision | appointment | donation | other',
                  'title*': '(string) Headline, 5-500 chars',
                  'description*': '(string) What they did, 10+ chars',
                  'outcome': '(string) Result of the action',
                  'dateOccurred*': '(string) YYYY-MM-DD',
                  'sourceUrl*': '(string) Valid URL to the source',
                  'sourceName*': '(string) Name of the source',
                  'aiConfidence': '(number) 0.0 to 1.0',
                }}
                curlExample={`curl -X POST http://localhost:3000/api/contribute/action \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer dev-api-key-intelligence-2024" \\
  -d '{
    "figureId": "fig-001",
    "type": "policy_enacted",
    "title": "Signed limited student debt relief",
    "description": "Signed an executive order providing up to $10,000 in student loan forgiveness for borrowers earning under $125,000 annually.",
    "outcome": "Supreme Court blocked the broader plan; limited SAVE plan enacted instead.",
    "dateOccurred": "2022-08-24",
    "sourceUrl": "https://en.wikipedia.org/wiki/Example",
    "sourceName": "Wikipedia",
    "aiConfidence": 0.95
  }'`}
                responseExample={`{
  "success": true,
  "message": "Action contribution submitted and pending review.",
  "contributionId": "contrib-act-1709000000000-def456",
  "data": { ... }
}`}
              />
            </TabsContent>

            <TabsContent value="accountability" className="mt-4">
              <EndpointSection
                method="POST"
                path="/api/contribute/accountability"
                description="Submit a SAY vs DO accountability record linking a statement to an action with a verdict."
                schema={{
                  'figureId*': '(string) ID of the public figure',
                  'statementId*': '(string) ID of the statement (mock or contributed)',
                  'actionId': '(string|null) ID of the linked action, or null',
                  'verdict*': '(string) kept | broken | partial | in_progress | flip_flop | context_needed',
                  'score*': '(number) -100 to +100',
                  'summary*': '(string) Explanation of the verdict, 10+ chars',
                  'evidence': '(string) Supporting details',
                  'aiConfidence': '(number) 0.0 to 1.0',
                }}
                curlExample={`curl -X POST http://localhost:3000/api/contribute/accountability \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer dev-api-key-intelligence-2024" \\
  -d '{
    "figureId": "fig-001",
    "statementId": "stmt-001",
    "actionId": "act-001",
    "verdict": "partial",
    "score": 35,
    "summary": "The original promise was for full cancellation but only limited relief was provided, covering a fraction of borrowers.",
    "evidence": "The $10,000 forgiveness covered only federal loans under $125K income threshold.",
    "aiConfidence": 0.88
  }'`}
                responseExample={`{
  "success": true,
  "message": "Accountability record submitted and pending review.",
  "contributionId": "contrib-acc-1709000000000-ghi789",
  "data": { ... }
}`}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Status endpoint */}
      <Card>
        <CardContent className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 font-mono text-xs">
              GET
            </Badge>
            <code className="text-sm font-mono text-foreground">/api/contribute/status</code>
          </div>
          <p className="text-sm text-muted-foreground mb-3">
            Check the contribution queue status. No authentication required. Add <code className="bg-muted px-1 py-0.5 rounded text-foreground">?contributionId=&lt;id&gt;</code> to look up a specific contribution.
          </p>
          <CodeBlock code="curl http://localhost:3000/api/contribute/status" />
        </CardContent>
      </Card>

      {/* Figures reference */}
      <Card>
        <CardContent className="p-5">
          <h3 className="font-semibold text-sm mb-2">Available Figure IDs</h3>
          <p className="text-sm text-muted-foreground mb-3">
            Use <code className="bg-muted px-1 py-0.5 rounded text-foreground">GET /api/figures</code> to list all figures and their IDs. You&apos;ll need a valid <code className="bg-muted px-1 py-0.5 rounded text-foreground">figureId</code> for all contribution endpoints.
          </p>
          <CodeBlock code="curl http://localhost:3000/api/figures" />
        </CardContent>
      </Card>
    </div>
  );
}
