export const MatchLevel = {
  AMATEUR: '아마추어',
  SEMI_PRO: '세미프로',
  PRO: '프로',
} as const;

export type MatchLevel = (typeof MatchLevel)[keyof typeof MatchLevel];
