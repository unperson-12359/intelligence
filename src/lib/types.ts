import type { publicFigures, statements, actions, accountabilityRecords, topics, contributors } from '@/db/schema';

// Infer types from schema
export type PublicFigure = typeof publicFigures.$inferSelect;
export type NewPublicFigure = typeof publicFigures.$inferInsert;

export type Statement = typeof statements.$inferSelect;
export type NewStatement = typeof statements.$inferInsert;

export type Action = typeof actions.$inferSelect;
export type NewAction = typeof actions.$inferInsert;

export type AccountabilityRecord = typeof accountabilityRecords.$inferSelect;
export type NewAccountabilityRecord = typeof accountabilityRecords.$inferInsert;

export type Topic = typeof topics.$inferSelect;
export type NewTopic = typeof topics.$inferInsert;

export type Contributor = typeof contributors.$inferSelect;
export type NewContributor = typeof contributors.$inferInsert;

// App-specific types
export type Verdict = 'kept' | 'broken' | 'partial' | 'in_progress' | 'flip_flop' | 'context_needed';
export type FigureType = 'politician' | 'executive' | 'influencer' | 'journalist' | 'activist' | 'other';
export type StatementType = 'promise' | 'claim' | 'position' | 'prediction' | 'denial' | 'endorsement' | 'other';

export type FigureWithStats = PublicFigure & {
  totalStatements: number;
  totalActions: number;
  keptCount: number;
  brokenCount: number;
};

export type AccountabilityWithDetails = AccountabilityRecord & {
  statement: Statement;
  action: Action | null;
  figure: PublicFigure;
};

export type ScoreGrade = 'A' | 'B' | 'C' | 'D' | 'F';
