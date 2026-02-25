import { pgTable, uuid, primaryKey } from 'drizzle-orm/pg-core';
import { statements } from './statements';
import { actions } from './actions';
import { topics } from './topics';

export const statementTopics = pgTable('statement_topics', {
  statementId: uuid('statement_id').notNull().references(() => statements.id, { onDelete: 'cascade' }),
  topicId: uuid('topic_id').notNull().references(() => topics.id, { onDelete: 'cascade' }),
}, (table) => [
  primaryKey({ columns: [table.statementId, table.topicId] }),
]);

export const actionTopics = pgTable('action_topics', {
  actionId: uuid('action_id').notNull().references(() => actions.id, { onDelete: 'cascade' }),
  topicId: uuid('topic_id').notNull().references(() => topics.id, { onDelete: 'cascade' }),
}, (table) => [
  primaryKey({ columns: [table.actionId, table.topicId] }),
]);
