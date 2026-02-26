/**
 * In-memory agent registry for AI agent registration and authentication.
 * Upgradeable to PostgreSQL via Drizzle ORM when database is connected.
 */

import crypto from 'crypto';

export interface RegisteredAgent {
  agentId: string;
  name: string;
  description: string;
  apiKeyHash: string;
  webhookUrl?: string;
  createdAt: string;
  totalSubmissions: number;
  approvedSubmissions: number;
  isActive: boolean;
}

// In-memory storage
export const registeredAgents: RegisteredAgent[] = [];

/**
 * Generate a unique agent API key with the Intelligence prefix.
 */
function generateApiKey(): string {
  const random = crypto.randomBytes(24).toString('base64url');
  return `int_sk_live_${random}`;
}

/**
 * Hash an API key for storage (never store plaintext keys).
 */
function hashKey(apiKey: string): string {
  return crypto.createHash('sha256').update(apiKey).digest('hex');
}

/**
 * Generate a short unique agent ID.
 */
function generateAgentId(): string {
  const random = crypto.randomBytes(4).toString('hex');
  return `agent-${random}`;
}

/**
 * Register a new agent and return the agent info + plaintext API key.
 * The plaintext key is only returned once — we store only the hash.
 */
export function registerAgent(
  name: string,
  description: string,
  webhookUrl?: string
): { agent: RegisteredAgent; apiKey: string } {
  const apiKey = generateApiKey();
  const agent: RegisteredAgent = {
    agentId: generateAgentId(),
    name: name.trim(),
    description: description.trim(),
    apiKeyHash: hashKey(apiKey),
    webhookUrl: webhookUrl?.trim() || undefined,
    createdAt: new Date().toISOString(),
    totalSubmissions: 0,
    approvedSubmissions: 0,
    isActive: true,
  };

  registeredAgents.push(agent);
  return { agent, apiKey };
}

/**
 * Authenticate an agent by API key.
 * Returns the agent if found, null otherwise.
 */
export function authenticateByKey(apiKey: string): RegisteredAgent | null {
  const hash = hashKey(apiKey);
  return registeredAgents.find((a) => a.apiKeyHash === hash && a.isActive) || null;
}

/**
 * Get an agent by ID.
 */
export function getAgentById(agentId: string): RegisteredAgent | null {
  return registeredAgents.find((a) => a.agentId === agentId) || null;
}

/**
 * Increment submission count for an agent.
 */
export function incrementSubmissions(agentId: string): void {
  const agent = registeredAgents.find((a) => a.agentId === agentId);
  if (agent) {
    agent.totalSubmissions++;
  }
}

/**
 * Get registration stats.
 */
export function getRegistryStats(): {
  totalAgents: number;
  activeAgents: number;
} {
  return {
    totalAgents: registeredAgents.length,
    activeAgents: registeredAgents.filter((a) => a.isActive).length,
  };
}
