import { pgTable, text, timestamp, varchar, uuid, index, boolean, real, jsonb, pgEnum } from 'drizzle-orm/pg-core';
import { publicFigures } from './public-figures';

export const actionTypeEnum = pgEnum('action_type', [
  'vote', 'executive_order', 'legislation_signed', 'legislation_vetoed',
  'policy_enacted', 'business_decision', 'appointment', 'donation', 'other'
]);

export const actions = pgTable('actions', {
  id: uuid('id').defaultRandom().primaryKey(),
  figureId: uuid('figure_id').notNull().references(() => publicFigures.id, { onDelete: 'cascade' }),
  type: actionTypeEnum('type').notNull(),
  title: varchar('title', { length: 500 }).notNull(),
  description: text('description').notNull(),
  outcome: text('outcome'),
  dateOccurred: timestamp('date_occurred').notNull(),
  sourceUrl: text('source_url').notNull(),
  sourceName: varchar('source_name', { length: 255 }),
  sourceType: varchar('source_type', { length: 100 }),
  isVerified: boolean('is_verified').notNull().default(false),
  aiConfidence: real('ai_confidence'),
  metadata: jsonb('metadata').$type<{
    voteDetails?: { bill: string; chamber: string; result: string };
    officialRecord?: string;
  }>(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => [
  index('idx_actions_figure').on(table.figureId),
  index('idx_actions_date').on(table.dateOccurred),
  index('idx_actions_type').on(table.type),
]);
