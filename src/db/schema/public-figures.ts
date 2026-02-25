import { pgTable, text, timestamp, varchar, pgEnum, jsonb, uuid, index, boolean } from 'drizzle-orm/pg-core';

export const figureTypeEnum = pgEnum('figure_type', [
  'politician', 'executive', 'influencer', 'journalist', 'activist', 'other'
]);

export const publicFigures = pgTable('public_figures', {
  id: uuid('id').defaultRandom().primaryKey(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  name: varchar('name', { length: 255 }).notNull(),
  title: varchar('title', { length: 255 }),
  type: figureTypeEnum('type').notNull(),
  party: varchar('party', { length: 100 }),
  state: varchar('state', { length: 100 }),
  country: varchar('country', { length: 100 }).notNull().default('US'),
  imageUrl: text('image_url'),
  bio: text('bio'),
  metadata: jsonb('metadata').$type<{
    socialMedia?: { twitter?: string; facebook?: string; instagram?: string };
    officialWebsite?: string;
    wikipedia?: string;
  }>(),
  overallScore: varchar('overall_score', { length: 10 }),
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => [
  index('idx_figures_slug').on(table.slug),
  index('idx_figures_type').on(table.type),
  index('idx_figures_name').on(table.name),
]);
