import { NextRequest } from 'next/server';

const DEV_API_KEY = 'dev-api-key-intelligence-2024';

interface AuthResult {
  authenticated: boolean;
  agentId: string;
  error?: string;
}

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

  // Check against env var first, then dev fallback
  const validKey = process.env.CONTRIBUTE_API_KEY || DEV_API_KEY;

  if (apiKey !== validKey) {
    return {
      authenticated: false,
      agentId: '',
      error: 'Invalid API key',
    };
  }

  return {
    authenticated: true,
    agentId: `agent-${apiKey.slice(-6)}`,
  };
}
