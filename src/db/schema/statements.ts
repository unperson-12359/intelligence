import { pgTable, text, timestamp, varchar, uuid, index, boolean, real, jsonb, pgEnum } from 'drizzle-orm/pg-core';
import { publicFigures } from './public-figures';

export const statementTypeEnum = pgEnum('statement_type', [
  'promise', 'claim', 'position', 'prediction', 'denial', 'endorsement', 'other'
]);

export const statements = pgTable('statements', {
  id: uuid('id').defaultRandom().primaryKey(),
  figureId: uuid('figure_id').notNull().references(() => publicFigures.id, { onDelete: 'cascade' }),
  type: statementTypeEnum('type').notNull(),
  title: varchar('title', { length: 500 }).notNull(),
  content: text('content').notNull(),
  context: text('context'),
  dateOccurred: timestamp('date_occurred').notNull(),
  sourceUrl: text('source_url').notNull(),
  sourceName: varchar('source_name', { length: 255 }),
  sourceType: varchar('source_type', { length: 100 }),
  isVerified: boolean('is_verified').notNull().default(false),
  aiConfidence: real('ai_confidence'),
  metadata: jsonb('metadata').$type<{
    originalText?: string;
    videoUrl?: string;
    archivedUrl?: string;
  }>(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => [
  index('idx_statements_figure').on(table.figureId),
  index('idx_statements_date').on(table.dateOccurred),
  index('idx_statements_type').on(table.type),
]);
