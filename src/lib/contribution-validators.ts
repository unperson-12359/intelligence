import { mockFigures, mockStatements, mockActions } from '@/lib/mock-data';
import {
  statementContributions,
  actionContributions,
  type ContributedStatement,
  type ContributedAction,
  type ContributedAccountability,
} from '@/lib/contribution-store';

// --- Valid type enums ---

const VALID_STATEMENT_TYPES = [
  'promise', 'claim', 'position', 'prediction', 'denial', 'endorsement', 'other',
];

const VALID_ACTION_TYPES = [
  'vote', 'executive_order', 'legislation_signed', 'legislation_vetoed',
  'policy_enacted', 'business_decision', 'appointment', 'donation', 'other',
];

const VALID_VERDICTS = [
  'kept', 'broken', 'partial', 'in_progress', 'flip_flop', 'context_needed',
];

// --- Result types ---

type ValidationSuccess<T> = { valid: true; data: T };
type ValidationFailure = { valid: false; errors: string[] };
type ValidationResult<T> = ValidationSuccess<T> | ValidationFailure;

// --- Shared helpers ---

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

function isValidUrl(value: string): boolean {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}

function isValidDate(value: string): boolean {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(value)) return false;
  const date = new Date(value);
  return !isNaN(date.getTime());
}

function figureExists(figureId: string): boolean {
  return mockFigures.some((f) => f.id === figureId);
}

// --- Statement validator ---

export function validateStatement(body: unknown): ValidationResult<ContributedStatement> {
  const errors: string[] = [];

  if (!body || typeof body !== 'object') {
    return { valid: false, errors: ['Request body must be a JSON object'] };
  }

  const b = body as Record<string, unknown>;

  // figureId
  if (!isNonEmptyString(b.figureId)) {
    errors.push('figureId is required');
  } else if (!figureExists(b.figureId)) {
    errors.push(`figureId "${b.figureId}" does not match any known figure`);
  }

  // type
  if (!isNonEmptyString(b.type)) {
    errors.push('type is required');
  } else if (!VALID_STATEMENT_TYPES.includes(b.type)) {
    errors.push(`type must be one of: ${VALID_STATEMENT_TYPES.join(', ')}`);
  }

  // title
  if (!isNonEmptyString(b.title)) {
    errors.push('title is required');
  } else if (b.title.trim().length < 5 || b.title.trim().length > 500) {
    errors.push('title must be between 5 and 500 characters');
  }

  // content
  if (!isNonEmptyString(b.content)) {
    errors.push('content is required');
  } else if (b.content.trim().length < 10) {
    errors.push('content must be at least 10 characters');
  }

  // dateOccurred
  if (!isNonEmptyString(b.dateOccurred)) {
    errors.push('dateOccurred is required (YYYY-MM-DD)');
  } else if (!isValidDate(b.dateOccurred)) {
    errors.push('dateOccurred must be a valid date in YYYY-MM-DD format');
  }

  // sourceUrl
  if (!isNonEmptyString(b.sourceUrl)) {
    errors.push('sourceUrl is required');
  } else if (!isValidUrl(b.sourceUrl)) {
    errors.push('sourceUrl must be a valid URL');
  }

  // sourceName
  if (!isNonEmptyString(b.sourceName)) {
    errors.push('sourceName is required');
  }

  // aiConfidence (optional)
  if (b.aiConfidence !== undefined && b.aiConfidence !== null) {
    if (typeof b.aiConfidence !== 'number' || b.aiConfidence < 0 || b.aiConfidence > 1) {
      errors.push('aiConfidence must be a number between 0 and 1');
    }
  }

  if (errors.length > 0) {
    return { valid: false, errors };
  }

  return {
    valid: true,
    data: {
      figureId: (b.figureId as string).trim(),
      type: (b.type as string).trim(),
      title: (b.title as string).trim(),
      content: (b.content as string).trim(),
      context: isNonEmptyString(b.context) ? (b.context as string).trim() : undefined,
      dateOccurred: (b.dateOccurred as string).trim(),
      sourceUrl: (b.sourceUrl as string).trim(),
      sourceName: (b.sourceName as string).trim(),
      sourceType: isNonEmptyString(b.sourceType) ? (b.sourceType as string).trim() : undefined,
      aiConfidence: typeof b.aiConfidence === 'number' ? b.aiConfidence : undefined,
    },
  };
}

// --- Action validator ---

export function validateAction(body: unknown): ValidationResult<ContributedAction> {
  const errors: string[] = [];

  if (!body || typeof body !== 'object') {
    return { valid: false, errors: ['Request body must be a JSON object'] };
  }

  const b = body as Record<string, unknown>;

  // figureId
  if (!isNonEmptyString(b.figureId)) {
    errors.push('figureId is required');
  } else if (!figureExists(b.figureId)) {
    errors.push(`figureId "${b.figureId}" does not match any known figure`);
  }

  // type
  if (!isNonEmptyString(b.type)) {
    errors.push('type is required');
  } else if (!VALID_ACTION_TYPES.includes(b.type)) {
    errors.push(`type must be one of: ${VALID_ACTION_TYPES.join(', ')}`);
  }

  // title
  if (!isNonEmptyString(b.title)) {
    errors.push('title is required');
  } else if (b.title.trim().length < 5 || b.title.trim().length > 500) {
    errors.push('title must be between 5 and 500 characters');
  }

  // description
  if (!isNonEmptyString(b.description)) {
    errors.push('description is required');
  } else if (b.description.trim().length < 10) {
    errors.push('description must be at least 10 characters');
  }

  // dateOccurred
  if (!isNonEmptyString(b.dateOccurred)) {
    errors.push('dateOccurred is required (YYYY-MM-DD)');
  } else if (!isValidDate(b.dateOccurred)) {
    errors.push('dateOccurred must be a valid date in YYYY-MM-DD format');
  }

  // sourceUrl
  if (!isNonEmptyString(b.sourceUrl)) {
    errors.push('sourceUrl is required');
  } else if (!isValidUrl(b.sourceUrl)) {
    errors.push('sourceUrl must be a valid URL');
  }

  // sourceName
  if (!isNonEmptyString(b.sourceName)) {
    errors.push('sourceName is required');
  }

  // aiConfidence (optional)
  if (b.aiConfidence !== undefined && b.aiConfidence !== null) {
    if (typeof b.aiConfidence !== 'number' || b.aiConfidence < 0 || b.aiConfidence > 1) {
      errors.push('aiConfidence must be a number between 0 and 1');
    }
  }

  if (errors.length > 0) {
    return { valid: false, errors };
  }

  return {
    valid: true,
    data: {
      figureId: (b.figureId as string).trim(),
      type: (b.type as string).trim(),
      title: (b.title as string).trim(),
      description: (b.description as string).trim(),
      outcome: isNonEmptyString(b.outcome) ? (b.outcome as string).trim() : undefined,
      dateOccurred: (b.dateOccurred as string).trim(),
      sourceUrl: (b.sourceUrl as string).trim(),
      sourceName: (b.sourceName as string).trim(),
      aiConfidence: typeof b.aiConfidence === 'number' ? b.aiConfidence : undefined,
    },
  };
}

// --- Accountability validator ---

export function validateAccountability(body: unknown): ValidationResult<ContributedAccountability> {
  const errors: string[] = [];

  if (!body || typeof body !== 'object') {
    return { valid: false, errors: ['Request body must be a JSON object'] };
  }

  const b = body as Record<string, unknown>;

  // figureId
  if (!isNonEmptyString(b.figureId)) {
    errors.push('figureId is required');
  } else if (!figureExists(b.figureId)) {
    errors.push(`figureId "${b.figureId}" does not match any known figure`);
  }

  // statementId — check mock data AND contributed statements
  if (!isNonEmptyString(b.statementId)) {
    errors.push('statementId is required');
  } else {
    const existsInMock = mockStatements.some((s) => s.id === b.statementId);
    const existsInContributed = statementContributions.some(
      (c) => c.contributionId === b.statementId
    );
    if (!existsInMock && !existsInContributed) {
      errors.push(`statementId "${b.statementId}" does not match any known or contributed statement`);
    }
  }

  // actionId (optional — null allowed)
  if (b.actionId !== undefined && b.actionId !== null && isNonEmptyString(b.actionId)) {
    const existsInMock = mockActions.some((a) => a.id === b.actionId);
    const existsInContributed = actionContributions.some(
      (c) => c.contributionId === b.actionId
    );
    if (!existsInMock && !existsInContributed) {
      errors.push(`actionId "${b.actionId}" does not match any known or contributed action`);
    }
  }

  // verdict
  if (!isNonEmptyString(b.verdict)) {
    errors.push('verdict is required');
  } else if (!VALID_VERDICTS.includes(b.verdict)) {
    errors.push(`verdict must be one of: ${VALID_VERDICTS.join(', ')}`);
  }

  // score
  if (b.score === undefined || b.score === null || typeof b.score !== 'number') {
    errors.push('score is required and must be a number');
  } else if (b.score < -100 || b.score > 100) {
    errors.push('score must be between -100 and 100');
  }

  // summary
  if (!isNonEmptyString(b.summary)) {
    errors.push('summary is required');
  } else if (b.summary.trim().length < 10) {
    errors.push('summary must be at least 10 characters');
  }

  // aiConfidence (optional)
  if (b.aiConfidence !== undefined && b.aiConfidence !== null) {
    if (typeof b.aiConfidence !== 'number' || b.aiConfidence < 0 || b.aiConfidence > 1) {
      errors.push('aiConfidence must be a number between 0 and 1');
    }
  }

  if (errors.length > 0) {
    return { valid: false, errors };
  }

  return {
    valid: true,
    data: {
      figureId: (b.figureId as string).trim(),
      statementId: (b.statementId as string).trim(),
      actionId: isNonEmptyString(b.actionId) ? (b.actionId as string).trim() : null,
      verdict: (b.verdict as string).trim(),
      score: b.score as number,
      summary: (b.summary as string).trim(),
      evidence: isNonEmptyString(b.evidence) ? (b.evidence as string).trim() : undefined,
      aiConfidence: typeof b.aiConfidence === 'number' ? b.aiConfidence : undefined,
    },
  };
}
