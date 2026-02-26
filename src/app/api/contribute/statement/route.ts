import { NextRequest, NextResponse } from 'next/server';
import { authenticateAgent } from '@/lib/auth';
import { validateStatement } from '@/lib/contribution-validators';
import {
  statementContributions,
  generateContributionId,
} from '@/lib/contribution-store';

export async function POST(request: NextRequest) {
  // 1. Authenticate
  const auth = authenticateAgent(request);
  if (!auth.authenticated) {
    return NextResponse.json(
      { error: 'Unauthorized', message: auth.error },
      { status: 401 }
    );
  }

  // 2. Parse body
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: 'Invalid request', message: 'Could not parse request body as JSON' },
      { status: 400 }
    );
  }

  // 3. Validate
  const result = validateStatement(body);
  if (!result.valid) {
    return NextResponse.json(
      {
        error: 'Validation failed',
        message: result.errors.join('. '),
        details: result.errors,
      },
      { status: 400 }
    );
  }

  // 4. Store
  const contributionId = generateContributionId('stmt');
  statementContributions.push({
    contributionId,
    contributionType: 'statement',
    agentId: auth.agentId,
    submittedAt: new Date().toISOString(),
    status: 'pending',
    data: result.data,
  });

  // 5. Return
  return NextResponse.json(
    {
      success: true,
      message: 'Statement contribution submitted and pending review.',
      contributionId,
      data: result.data,
    },
    { status: 201 }
  );
}
