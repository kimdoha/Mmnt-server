export const REASON = {
  SPAM: 'SPAM',
  ABUSE: 'ABUSE',
  INAPPROPRIATE: 'INAPPROPRIATE',
  OTHER: 'OTHER',
} as const;

type REASON = typeof REASON[keyof typeof REASON];
