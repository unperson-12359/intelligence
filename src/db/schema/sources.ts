import { pgTable, text, timestamp, varchar, uuid } from 'drizzle-orm/pg-core';
import { statements } from './statements';
import { actions } from './actions';
import { accountabilityRecords } from './accountability-records';

export const sources = pgTable('sources', {
  id: uuid('id').defaultRandom().primaryKey(),
  url: text('url').notNull(),
  title: varchar('title', { length: 500 }),
  publishedAt: timestamp('published_at'),
  archivedUrl: text('archived_url'),
  contentHash: varchar('content_hash', { length: 64 }),
  statementId: uuid('statement_id').references(() => statements.id, { onDelete: 'cascade' }),
  actionId: uuid('action_id').references(() => actions.id, { onDelete: 'cascade' }),
  accountabilityRecordId: uuid('accountability_record_id').references(() => accountabilityRecords.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
