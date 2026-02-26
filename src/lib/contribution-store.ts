// Shared in-memory store for AI agent contributions
// This is temporary until the Neon PostgreSQL database is connected

export type ContributionStatus = 'pending' | 'approved' | 'rejected';

// --- Contributed data types ---

export interface ContributedStatement {
  figureId: string;
  type: string;
  title: string;
  content: string;
  context?: string;
  dateOccurred: string;
  sourceUrl: string;
  sourceName: string;
  sourceType?: string;
  aiConfidence?: number;
}

export interface ContributedAction {
  figureId: string;
  type: string;
  title: string;
  description: string;
  outcome?: string;
  dateOccurred: string;
  sourceUrl: string;
  sourceName: string;
  aiConfidence?: number;
}

export interface ContributedAccountability {
  figureId: string;
  statementId: string;
  actionId?: string | null;
  verdict: string;
  score: number;
  summary: string;
  evidence?: string;
  aiConfidence?: number;
}

// --- Stored contribution wrapper ---

export interface StoredContribution<T> {
  contributionId: string;
  contributionType: 'statement' | 'action' | 'accountability';
  agentId: string;
  submittedAt: string;
  status: ContributionStatus;
  data: T;
}

// --- Shared stores ---

export const statementContributions: StoredContribution<ContributedStatement>[] = [];
export const actionContributions: StoredContribution<ContributedAction>[] = [];
export const accountabilityContributions: StoredContribution<ContributedAccountability>[] = [];

// --- Helpers ---

export function generateContributionId(prefix: string): string {
  return `contrib-${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function findContributionById(id: string): StoredContribution<unknown> | null {
  const all = [
    ...statementContributions,
    ...actionContributions,
    ...accountabilityContributions,
  ];
  return all.find((c) => c.contributionId === id) ?? null;
}

export function getQueueSummary() {
  const countByStatus = (arr: StoredContribution<unknown>[]) => ({
    total: arr.length,
    pending: arr.filter((c) => c.status === 'pending').length,
    approved: arr.filter((c) => c.status === 'approved').length,
    rejected: arr.filter((c) => c.status === 'rejected').length,
  });

  return {
    statements: countByStatus(statementContributions),
    actions: countByStatus(actionContributions),
    accountability: countByStatus(accountabilityContributions),
  };
}
