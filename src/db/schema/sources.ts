import { pgTable, text, timestamp, varchar, uuid, integer, index } from 'drizzle-orm/pg-core';
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
  mediaType: varchar('media_type', { length: 50 }),
  mediaUrl: text('media_url'),
  mediaThumbnailUrl: text('media_thumbnail_url'),
  mediaCaption: text('media_caption'),
  fileSize: integer('file_size'),
  mimeType: varchar('mime_type', { length: 100 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => [
  index('sources_statement_id_idx').on(table.statementId),
  index('sources_action_id_idx').on(table.actionId),
  index('sources_accountability_record_id_idx').on(table.accountabilityRecordId),
]);
