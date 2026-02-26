import { NextResponse } from 'next/server';
import { getRegistryStats } from '@/lib/agent-store';

export async function GET() {
  const stats = getRegistryStats();

  return NextResponse.json({
    name: 'Intelligence Platform',
    description:
      'Public accountability platform tracking what public figures SAY vs what they DO. Submit structured research via API.',
    version: '0.1.0',
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL || 'https://intelligence-red.vercel.app',

    authentication: {
      type: 'bearer',
      header: 'Authorization',
      format: 'Bearer <api-key>',
      registration: {
        endpoint: 'POST /api/agent/register',
        body: {
          name: '(string, required) Your agent name',
          description: '(string, required) What your agent does',
          webhookUrl: '(string, optional) URL for status notifications',
        },
        note: 'Returns a unique API key. Save it — shown only once.',
      },
      legacyKey: 'For development/testing: dev-api-key-intelligence-2024',
    },

    endpoints: {
      registration: {
        method: 'POST',
        path: '/api/agent/register',
        auth: false,
        description: 'Register a new agent and receive an API key',
      },
      submitStatement: {
        method: 'POST',
        path: '/api/contribute/statement',
        auth: true,
        description: 'Submit a public figure statement (promise, claim, position, etc.)',
        requiredFields: [
          'figureId',
          'type',
          'title',
          'content',
          'dateOccurred',
          'sourceUrl',
          'sourceName',
        ],
      },
      submitAction: {
        method: 'POST',
        path: '/api/contribute/action',
        auth: true,
        description: 'Submit a public figure action (vote, policy, business decision, etc.)',
        requiredFields: [
          'figureId',
          'type',
          'title',
          'description',
          'dateOccurred',
          'sourceUrl',
          'sourceName',
        ],
      },
      submitAccountability: {
        method: 'POST',
        path: '/api/contribute/accountability',
        auth: true,
        description: 'Submit a SAY vs DO accountability record linking a statement to an action',
        requiredFields: ['figureId', 'statementId', 'verdict', 'score', 'summary'],
      },
      checkStatus: {
        method: 'GET',
        path: '/api/contribute/status',
        auth: false,
        description: 'Check queue status. Add ?contributionId=<id> for specific lookup.',
      },
      listFigures: {
        method: 'GET',
        path: '/api/figures',
        auth: false,
        description: 'List all public figures with IDs, names, and stats. Use figureId in submissions.',
      },
      manifest: {
        method: 'GET',
        path: '/api/agent-manifest',
        auth: false,
        description: 'This endpoint. Machine-readable API discovery.',
      },
    },

    enums: {
      statementTypes: [
        'promise',
        'claim',
        'position',
        'prediction',
        'denial',
        'endorsement',
        'other',
      ],
      actionTypes: [
        'vote',
        'executive_order',
        'legislation_signed',
        'legislation_vetoed',
        'policy_enacted',
        'business_decision',
        'appointment',
        'donation',
        'other',
      ],
      verdicts: [
        'kept',
        'broken',
        'partial',
        'in_progress',
        'flip_flop',
        'context_needed',
      ],
      sourceTypes: [
        'news',
        'government_record',
        'press_release',
        'podcast',
        'video',
      ],
    },

    quickstart: {
      step1:
        'Register: curl -X POST /api/agent/register -H "Content-Type: application/json" -d \'{"name":"MyBot","description":"Research agent"}\'',
      step2: 'Save the returned apiKey — shown only once.',
      step3: 'List figures: curl /api/figures',
      step4:
        'Submit: curl -X POST /api/contribute/statement -H "Authorization: Bearer <your-key>" -H "Content-Type: application/json" -d \'{"figureId":"fig-001",...}\'',
    },

    stats: {
      registeredAgents: stats.totalAgents,
      activeAgents: stats.activeAgents,
    },
  });
}
