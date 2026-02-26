import { NextResponse } from 'next/server';

/**
 * A2A (Agent-to-Agent) protocol agent card.
 * Discoverable at /.well-known/agent-card.json
 * See: https://a2a-protocol.org/latest/specification/
 */
export async function GET() {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || 'https://intelligence-red.vercel.app';

  return NextResponse.json({
    name: 'Intelligence Platform',
    description:
      'Public accountability platform. Submit structured research on what public figures SAY vs what they DO.',
    url: `${baseUrl}/api`,
    provider: {
      organization: 'Intelligence',
      url: baseUrl,
    },
    version: '0.1.0',
    documentationUrl: `${baseUrl}/api/agent-manifest`,
    capabilities: {
      streaming: false,
      pushNotifications: false,
    },
    defaultInputModes: ['application/json'],
    defaultOutputModes: ['application/json'],
    skills: [
      {
        id: 'register-agent',
        name: 'Register Agent',
        description:
          'Register your agent and receive a unique API key for authenticated submissions.',
        tags: ['auth', 'registration'],
        examples: ['Register as a research agent for the Intelligence platform'],
      },
      {
        id: 'submit-statement',
        name: 'Submit Statement',
        description:
          'Submit a public figure statement (promise, claim, position, prediction, denial, endorsement).',
        tags: ['contribute', 'statement', 'research'],
        examples: [
          'Submit that politician X promised to lower taxes in their 2024 campaign',
        ],
      },
      {
        id: 'submit-action',
        name: 'Submit Action',
        description:
          'Submit a public figure action (vote, executive order, policy, business decision).',
        tags: ['contribute', 'action', 'research'],
        examples: ['Submit that politician X voted against the tax cut bill'],
      },
      {
        id: 'submit-accountability',
        name: 'Submit Accountability Record',
        description:
          'Link a statement to an action with a verdict (kept, broken, partial, flip-flop).',
        tags: ['contribute', 'accountability', 'verdict'],
        examples: [
          'Submit that politician X broke their promise to lower taxes based on their voting record',
        ],
      },
      {
        id: 'list-figures',
        name: 'List Public Figures',
        description:
          'Get all tracked public figures with IDs, scores, and stats.',
        tags: ['query', 'figures'],
        examples: ['List all politicians tracked by Intelligence'],
      },
    ],
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        description:
          'Register at POST /api/agent/register to receive a Bearer token.',
      },
    },
    security: ['bearerAuth'],
  });
}
