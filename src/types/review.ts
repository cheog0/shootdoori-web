export enum ReviewType {
  BETTER = '수준보다 잘해요',
  SAME = '수준과 똑같아요',
  WORSE = '수준보다 아쉬워요',

  MANNER_GOOD = '매너가 좋았어요',
  MANNER_BAD = '매너가 아쉬워요',
  PUNCTUAL = '시간을 잘 지켜요',
  LATE = '시간을 안 지켜요',
  TEAM_PLAYER = '팀워크가 좋았어요',
  TEAMWORK_BAD = '팀워크가 아쉬워요',
}

export interface ReviewData {
  rating: number;
  reviewTypes: ReviewType[];
}

export interface ReviewProps {
  playerName?: string;
  playerLevel?: '아마추어' | '세미프로' | '프로';
  onSubmit: (reviewData: ReviewData) => void;
  onCancel?: () => void;
}

export interface MercenaryProfile {
  id: number;
  name: string;
  age: number;
  position: string;
  level: string;
  region: string;
  university: string;
  experience: number;
  noShowCount: number;
  totalMatches: number;
  feeCondition: string;
  availableTime: string;
  intro: string;
  profileImage?: string;
  kakaoId: string;
  createdAt: string;
}

export interface MercenaryApplication {
  id: number;
  matchId: number;
  matchTitle: string;
  matchDate: string;
  matchTime: string;
  location: string;
  status: 'pending' | 'approved' | 'rejected';
  appliedDate: string;
  fee: string;
}

export interface MercenaryMatch {
  id: string;
  teamName: string;
  opponent: string;
  date: string;
  time: string;
  location: string;
  positions: string[];
  level: string;
  description: string;
}

export interface MercenaryRequest {
  id: number;
  matchId: number;
  mercenaryId: number;
  position: string;
  message?: string;
  status: 'pending' | 'approved' | 'rejected';
  appliedAt: string;
}

export interface MercenaryMatchView {
  matchId: string;
  teamName: string;
  opponent: string;
  date: string;
  time: string;
  location: string;
  positions: string[];
  level: string;
  description: string;
  maxMercenaries: number;
  currentMercenaries: number;
  skillLevel: string;
  matchType: string;
  homeTeam: string;
  awayTeam: string;
  matchDetails: {
    date: string;
    time: string;
    location: string;
    description: string;
    status: string;
  };
  mercenaryPosition: string;
  relationshipStatus:
    | 'none'
    | 'applied'
    | 'approved'
    | 'rejected'
    | 'active'
    | 'completed'
    | 'terminated';
}

export interface TeamReview {
  id: number;
  teamId: number;
  reviewerName: string;
  reviewerTeam: string;
  rating: number;
  reviewTypes: ReviewType[];
  createdAt: string;
}
