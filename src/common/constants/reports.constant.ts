export const REASON = {
  SPAM: 'SPAM',
  ABUSE: 'ABUSE',
  OBSCENE: 'OBSCENE',
  WRONG: 'WRONG',
  OTHER: 'OTHER',
} as const;

type REASON = typeof REASON[keyof typeof REASON];
