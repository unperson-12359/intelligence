import { pgTable, text, timestamp, varchar, uuid, index, boolean, integer, pgEnum } from 'drizzle-orm/pg-core';

export const contributorTypeEnum = pgEnum('contributor_type', ['ai_agent', 'human']);

export const contributors = pgTable('contributors', {
  id: uuid('id').defaultRandom().primaryKey(),
  type: contributorTypeEnum('type').notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  apiKeyHash: varchar('api_key_hash', { length: 64 }),
  trustScore: integer('trust_score').notNull().default(0),
  totalSubmissions: integer('total_submissions').notNull().default(0),
  verifiedSubmissions: integer('verified_submissions').notNull().default(0),
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => [
  index('idx_contributors_type').on(table.type),
  index('idx_contributors_trust').on(table.trustScore),
]);
