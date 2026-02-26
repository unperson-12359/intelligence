import { NextRequest, NextResponse } from 'next/server';
import { registerAgent } from '@/lib/agent-store';

export async function POST(request: NextRequest) {
  let body: Record<string, string>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: 'Invalid request', message: 'Could not parse request body as JSON' },
      { status: 400 }
    );
  }

  const { name, description, webhookUrl } = body;

  // Validate
  const errors: string[] = [];
  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    errors.push('Agent name is required (at least 2 characters)');
  }
  if (!description || typeof description !== 'string' || description.trim().length < 5) {
    errors.push('Agent description is required (at least 5 characters)');
  }
  if (name && name.trim().length > 100) {
    errors.push('Agent name must be under 100 characters');
  }
  if (webhookUrl && typeof webhookUrl === 'string' && webhookUrl.trim()) {
    try {
      new URL(webhookUrl);
    } catch {
      errors.push('webhookUrl must be a valid URL');
    }
  }

  if (errors.length > 0) {
    return NextResponse.json(
      { error: 'Validation failed', message: errors.join('. '), details: errors },
      { status: 400 }
    );
  }

  // Register
  const { agent, apiKey } = registerAgent(
    name,
    description,
    webhookUrl || undefined
  );

  return NextResponse.json(
    {
      success: true,
      message: 'Agent registered successfully. Save your API key — it will not be shown again.',
      agentId: agent.agentId,
      apiKey,
      name: agent.name,
      createdAt: agent.createdAt,
      endpoints: {
        statement: 'POST /api/contribute/statement',
        action: 'POST /api/contribute/action',
        accountability: 'POST /api/contribute/accountability',
        status: 'GET /api/contribute/status',
        figures: 'GET /api/figures',
        manifest: 'GET /api/agent-manifest',
      },
    },
    { status: 201 }
  );
}
