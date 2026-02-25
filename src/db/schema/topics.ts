import { pgTable, text, timestamp, varchar, uuid, index } from 'drizzle-orm/pg-core';

export const topics = pgTable('topics', {
  id: uuid('id').defaultRandom().primaryKey(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  parentId: uuid('parent_id'),
  iconName: varchar('icon_name', { length: 100 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => [
  index('topics_parent_id_idx').on(table.parentId),
]);
