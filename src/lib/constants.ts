export const VERDICT_CONFIG = {
  kept: { label: 'Kept', color: 'bg-green-500', textColor: 'text-green-700', icon: '✓' },
  broken: { label: 'Broken', color: 'bg-red-500', textColor: 'text-red-700', icon: '✗' },
  partial: { label: 'Partial', color: 'bg-yellow-500', textColor: 'text-yellow-700', icon: '~' },
  in_progress: { label: 'In Progress', color: 'bg-blue-500', textColor: 'text-blue-700', icon: '⟳' },
  flip_flop: { label: 'Flip-Flop', color: 'bg-purple-500', textColor: 'text-purple-700', icon: '⇄' },
  context_needed: { label: 'Needs Context', color: 'bg-gray-500', textColor: 'text-gray-700', icon: '?' },
} as const;

export const FIGURE_TYPE_CONFIG = {
  politician: { label: 'Politician', icon: '🏛' },
  executive: { label: 'Executive', icon: '💼' },
  influencer: { label: 'Influencer', icon: '📱' },
  journalist: { label: 'Journalist', icon: '📰' },
  activist: { label: 'Activist', icon: '✊' },
  other: { label: 'Other', icon: '👤' },
} as const;

export const SCORE_GRADES: Record<string, { min: number; max: number; color: string; bgColor: string }> = {
  A: { min: 70, max: 100, color: 'text-green-700', bgColor: 'bg-green-100' },
  B: { min: 40, max: 69, color: 'text-blue-700', bgColor: 'bg-blue-100' },
  C: { min: 10, max: 39, color: 'text-yellow-700', bgColor: 'bg-yellow-100' },
  D: { min: -20, max: 9, color: 'text-orange-700', bgColor: 'bg-orange-100' },
  F: { min: -100, max: -21, color: 'text-red-700', bgColor: 'bg-red-100' },
};

export function getGradeFromScore(score: number): string {
  for (const [grade, config] of Object.entries(SCORE_GRADES)) {
    if (score >= config.min && score <= config.max) return grade;
  }
  return 'F';
}

export const SITE_CONFIG = {
  name: 'Intelligence',
  description: 'Public Accountability Platform — Track what public figures SAY vs what they DO',
  url: 'https://intelligence.app',
} as const;
