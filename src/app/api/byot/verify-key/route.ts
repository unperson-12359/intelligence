import { NextRequest, NextResponse } from 'next/server';
import { detectProvider } from '@/lib/byot/providers';

export async function POST(request: NextRequest) {
  const apiKey = request.headers.get('X-AI-Token');

  if (!apiKey) {
    return NextResponse.json(
      { valid: false, error: 'Missing X-AI-Token header' },
      { status: 400 }
    );
  }

  const provider = detectProvider(apiKey);
  if (!provider) {
    return NextResponse.json(
      { valid: false, error: 'Unrecognized key format' },
      { status: 400 }
    );
  }

  try {
    if (provider === 'anthropic') {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 10,
          messages: [{ role: 'user', content: 'Hi' }],
        }),
      });

      if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        const message =
          (error as Record<string, Record<string, string>>)?.error?.message || 'Invalid API key';
        return NextResponse.json(
          { valid: false, error: message },
          { status: 200 }
        );
      }

      return NextResponse.json({ valid: true, provider: 'anthropic' });
    }

    if (provider === 'openai') {
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          max_tokens: 5,
          messages: [{ role: 'user', content: 'Hi' }],
        }),
      });

      if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        const message =
          (error as Record<string, Record<string, string>>)?.error?.message || 'Invalid API key';
        return NextResponse.json(
          { valid: false, error: message },
          { status: 200 }
        );
      }

      return NextResponse.json({ valid: true, provider: 'openai' });
    }

    return NextResponse.json(
      { valid: false, error: 'Unsupported provider' },
      { status: 400 }
    );
  } catch {
    return NextResponse.json(
      { valid: false, error: 'Could not verify key. Network error.' },
      { status: 500 }
    );
  }
}
