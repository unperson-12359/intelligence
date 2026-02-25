import { pgTable, text, timestamp, uuid, index, boolean, real, integer, pgEnum } from 'drizzle-orm/pg-core';
import { publicFigures } from './public-figures';
import { statements } from './statements';
import { actions } from './actions';

export const verdictEnum = pgEnum('verdict', [
  'kept', 'broken', 'partial', 'in_progress', 'flip_flop', 'context_needed'
]);

export const accountabilityRecords = pgTable('accountability_records', {
  id: uuid('id').defaultRandom().primaryKey(),
  figureId: uuid('figure_id').notNull().references(() => publicFigures.id, { onDelete: 'cascade' }),
  statementId: uuid('statement_id').notNull().references(() => statements.id, { onDelete: 'cascade' }),
  actionId: uuid('action_id').references(() => actions.id, { onDelete: 'set null' }),
  verdict: verdictEnum('verdict').notNull(),
  score: integer('score').notNull(),
  summary: text('summary').notNull(),
  evidence: text('evidence'),
  aiGenerated: boolean('ai_generated').notNull().default(true),
  isVerified: boolean('is_verified').notNull().default(false),
  aiConfidence: real('ai_confidence'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => [
  index('idx_accountability_figure').on(table.figureId),
  index('idx_accountability_verdict').on(table.verdict),
  index('idx_accountability_statement').on(table.statementId),
]);
