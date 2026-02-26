import { NextRequest, NextResponse } from 'next/server';
import { detectProvider } from '@/lib/byot/providers';
import type { ResearchResult } from '@/lib/byot/types';

const RESEARCH_PROMPT = `You are a factual research assistant for a public accountability platform. Your job is to analyze a claim about a public figure and produce structured research.

Given the information below, research and respond with a JSON object containing:
- figureName: the public figure's full name
- statementType: one of "promise", "claim", "position", "prediction", "denial", "endorsement", "other"
- title: a concise headline (5-80 chars) summarizing what was said or done
- content: detailed description of the statement or action (50-500 chars)
- context: when and where this occurred (e.g. "Campaign rally in Iowa, March 2020")
- dateEstimate: best estimate of when this occurred in YYYY-MM-DD format (use best guess if exact date unknown)
- sources: array of objects with { url, name, type } where type is one of "news", "government_record", "press_release", "social_media", "video", "other". Include real, verifiable source URLs you know about. If you cannot provide real URLs, use an empty array.
- aiConfidence: your confidence in the accuracy of this analysis (0.0 to 1.0)
- suggestedVerdict: if you can assess whether the promise/claim was kept, use one of "kept", "broken", "partial", "in_progress", "flip_flop", "context_needed". If not enough info, omit this field.
- rawAnalysis: a 2-3 sentence explanation of your analysis and reasoning

IMPORTANT: Respond ONLY with valid JSON. No markdown, no code blocks, just the JSON object.`;

function buildUserMessage(figureName: string, whatHappened: string, sourceUrl?: string): string {
  let message = `Public figure: ${figureName}\n\nClaim/event: ${whatHappened}`;
  if (sourceUrl) {
    message += `\n\nReference link provided by submitter: ${sourceUrl}`;
  }
  return message;
}

async function callAnthropic(
  apiKey: string,
  figureName: string,
  whatHappened: string,
  sourceUrl?: string
): Promise<ResearchResult> {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      system: RESEARCH_PROMPT,
      messages: [
        {
          role: 'user',
          content: buildUserMessage(figureName, whatHappened, sourceUrl),
        },
      ],
    }),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(
      (error as Record<string, Record<string, string>>)?.error?.message ||
        `Anthropic API error (${res.status})`
    );
  }

  const data = await res.json();
  const text = data.content?.[0]?.text;
  if (!text) throw new Error('Empty response from Anthropic');

  return parseResearchResponse(text);
}

async function callOpenAI(
  apiKey: string,
  figureName: string,
  whatHappened: string,
  sourceUrl?: string
): Promise<ResearchResult> {
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      max_tokens: 1024,
      messages: [
        { role: 'system', content: RESEARCH_PROMPT },
        {
          role: 'user',
          content: buildUserMessage(figureName, whatHappened, sourceUrl),
        },
      ],
    }),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(
      (error as Record<string, Record<string, string>>)?.error?.message ||
        `OpenAI API error (${res.status})`
    );
  }

  const data = await res.json();
  const text = data.choices?.[0]?.message?.content;
  if (!text) throw new Error('Empty response from OpenAI');

  return parseResearchResponse(text);
}

function parseResearchResponse(text: string): ResearchResult {
  // Strip potential markdown code fences
  let cleaned = text.trim();
  if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```(?:json)?\s*/, '').replace(/\s*```$/, '');
  }

  try {
    const parsed = JSON.parse(cleaned);

    // Validate and normalize required fields
    return {
      figureName: String(parsed.figureName || ''),
      statementType: String(parsed.statementType || 'other'),
      title: String(parsed.title || '').slice(0, 80),
      content: String(parsed.content || ''),
      context: String(parsed.context || ''),
      dateEstimate: String(parsed.dateEstimate || ''),
      sources: Array.isArray(parsed.sources)
        ? parsed.sources.map((s: Record<string, string>) => ({
            url: String(s.url || ''),
            name: String(s.name || ''),
            type: s.type || 'other',
          }))
        : [],
      aiConfidence: typeof parsed.aiConfidence === 'number'
        ? Math.min(1, Math.max(0, parsed.aiConfidence))
        : 0.5,
      suggestedVerdict: parsed.suggestedVerdict || undefined,
      rawAnalysis: String(parsed.rawAnalysis || ''),
    };
  } catch {
    throw new Error('Failed to parse AI research response as JSON');
  }
}

export async function POST(request: NextRequest) {
  const apiKey = request.headers.get('X-AI-Token');

  if (!apiKey) {
    return NextResponse.json(
      { success: false, error: 'Missing X-AI-Token header' },
      { status: 400 }
    );
  }

  const provider = detectProvider(apiKey);
  if (!provider) {
    return NextResponse.json(
      { success: false, error: 'Unrecognized key format' },
      { status: 400 }
    );
  }

  let body: Record<string, string>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: 'Invalid JSON body' },
      { status: 400 }
    );
  }

  const { figureName, whatHappened, sourceUrl } = body;

  if (!figureName || !whatHappened) {
    return NextResponse.json(
      { success: false, error: 'figureName and whatHappened are required' },
      { status: 400 }
    );
  }

  try {
    let result: ResearchResult;

    if (provider === 'anthropic') {
      result = await callAnthropic(apiKey, figureName, whatHappened, sourceUrl);
    } else {
      result = await callOpenAI(apiKey, figureName, whatHappened, sourceUrl);
    }

    return NextResponse.json({ success: true, result });
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        error: err instanceof Error ? err.message : 'Research failed',
      },
      { status: 500 }
    );
  }
}
