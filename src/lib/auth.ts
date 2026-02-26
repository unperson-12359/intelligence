import { NextRequest } from 'next/server';
import { authenticateByKey, incrementSubmissions } from '@/lib/agent-store';

const DEV_API_KEY = 'dev-api-key-intelligence-2024';

interface AuthResult {
  authenticated: boolean;
  agentId: string;
  agentName?: string;
  error?: string;
}

/**
 * Authenticate an agent from the Authorization header.
 * Supports both:
 * - Per-agent keys (int_sk_live_...) from the agent registry
 * - Legacy shared key (CONTRIBUTE_API_KEY env var or dev fallback)
 */
export function authenticateAgent(request: NextRequest): AuthResult {
  const authHeader = request.headers.get('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return {
      authenticated: false,
      agentId: '',
      error: 'Missing or malformed Authorization header. Expected: Bearer <api-key>',
    };
  }

  const apiKey = authHeader.slice(7).trim();

  if (!apiKey) {
    return {
      authenticated: false,
      agentId: '',
      error: 'API key is empty',
    };
  }

  // 1. Try per-agent key from registry (int_sk_live_* prefix)
  if (apiKey.startsWith('int_sk_live_')) {
    const agent = authenticateByKey(apiKey);
    if (agent) {
      incrementSubmissions(agent.agentId);
      return {
        authenticated: true,
        agentId: agent.agentId,
        agentName: agent.name,
      };
    }
    return {
      authenticated: false,
      agentId: '',
      error: 'Invalid or revoked agent API key',
    };
  }

  // 2. Legacy: shared key (env var or dev fallback)
  const validKey = process.env.CONTRIBUTE_API_KEY || DEV_API_KEY;

  if (apiKey !== validKey) {
    return {
      authenticated: false,
      agentId: '',
      error: 'Invalid API key. Register at POST /api/agent/register to get a key.',
    };
  }

  return {
    authenticated: true,
    agentId: `agent-${apiKey.slice(-6)}`,
    agentName: 'Legacy Agent',
  };
}
