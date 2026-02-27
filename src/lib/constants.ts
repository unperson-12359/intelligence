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
  'A+': { min: 90, max: 100, color: 'text-green-700', bgColor: 'bg-green-100' },
  A: { min: 80, max: 89, color: 'text-green-700', bgColor: 'bg-green-100' },
  'A-': { min: 70, max: 79, color: 'text-green-700', bgColor: 'bg-green-100' },
  'B+': { min: 60, max: 69, color: 'text-blue-700', bgColor: 'bg-blue-100' },
  B: { min: 50, max: 59, color: 'text-blue-700', bgColor: 'bg-blue-100' },
  'B-': { min: 40, max: 49, color: 'text-blue-700', bgColor: 'bg-blue-100' },
  'C+': { min: 30, max: 39, color: 'text-yellow-700', bgColor: 'bg-yellow-100' },
  C: { min: 20, max: 29, color: 'text-yellow-700', bgColor: 'bg-yellow-100' },
  'C-': { min: 10, max: 19, color: 'text-yellow-700', bgColor: 'bg-yellow-100' },
  'D+': { min: 0, max: 9, color: 'text-orange-700', bgColor: 'bg-orange-100' },
  D: { min: -10, max: -1, color: 'text-orange-700', bgColor: 'bg-orange-100' },
  'D-': { min: -20, max: -11, color: 'text-orange-700', bgColor: 'bg-orange-100' },
  F: { min: -100, max: -21, color: 'text-red-700', bgColor: 'bg-red-100' },
};

const GRADE_THRESHOLDS: { grade: string; min: number }[] = [
  { grade: 'A', min: 70 },
  { grade: 'B', min: 40 },
  { grade: 'C', min: 10 },
  { grade: 'D', min: -20 },
];

export function getGradeFromScore(score: number): string {
  for (const { grade, min } of GRADE_THRESHOLDS) {
    if (score >= min) return grade;
  }
  return 'F';
}

// Grade ordering for sorting (higher = better)
export const GRADE_ORDER: Record<string, number> = {
  'A+': 13, A: 12, 'A-': 11,
  'B+': 10, B: 9, 'B-': 8,
  'C+': 7, C: 6, 'C-': 5,
  'D+': 4, D: 3, 'D-': 2,
  F: 1,
};

export const STATEMENT_TYPE_LABELS: Record<string, string> = {
  promise: 'Promise',
  claim: 'Claim',
  position: 'Position',
  prediction: 'Prediction',
  denial: 'Denial',
  endorsement: 'Endorsement',
  other: 'Other',
};

export const ACTION_TYPE_LABELS: Record<string, string> = {
  vote: 'Vote',
  executive_order: 'Executive Order',
  legislation_signed: 'Legislation Signed',
  legislation_vetoed: 'Legislation Vetoed',
  policy_enacted: 'Policy Enacted',
  business_decision: 'Business Decision',
  appointment: 'Appointment',
  donation: 'Donation',
  other: 'Other',
};

export const SITE_CONFIG = {
  name: 'Indelible',
  description: "Check any leader's track record. See what they promised vs what they did.",
  url: 'https://intelligence-red.vercel.app',
} as const;
