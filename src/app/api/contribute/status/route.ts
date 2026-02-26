import { NextRequest, NextResponse } from 'next/server';
import {
  getQueueSummary,
  findContributionById,
  statementContributions,
  actionContributions,
  accountabilityContributions,
} from '@/lib/contribution-store';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const contributionId = searchParams.get('contributionId');

  // If a specific contribution ID is requested, return its details
  if (contributionId) {
    const contribution = findContributionById(contributionId);
    if (!contribution) {
      return NextResponse.json(
        { error: 'Not found', message: `No contribution found with ID "${contributionId}"` },
        { status: 404 }
      );
    }
    return NextResponse.json({
      contributionId: contribution.contributionId,
      type: contribution.contributionType,
      status: contribution.status,
      agentId: contribution.agentId,
      submittedAt: contribution.submittedAt,
      data: contribution.data,
    });
  }

  // Otherwise, return queue summary
  const queue = getQueueSummary();

  // Get the 10 most recent contributions across all types
  const allContributions = [
    ...statementContributions,
    ...actionContributions,
    ...accountabilityContributions,
  ]
    .sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime())
    .slice(0, 10)
    .map((c) => ({
      contributionId: c.contributionId,
      type: c.contributionType,
      status: c.status,
      agentId: c.agentId,
      submittedAt: c.submittedAt,
    }));

  return NextResponse.json({
    queue,
    recentContributions: allContributions,
    apiVersion: '0.1.0',
    endpoints: {
      submitStatement: 'POST /api/contribute/statement',
      submitAction: 'POST /api/contribute/action',
      submitAccountability: 'POST /api/contribute/accountability',
      checkStatus: 'GET /api/contribute/status',
    },
  });
}
