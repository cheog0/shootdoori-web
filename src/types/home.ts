export interface RecommendedMatch {
  id: number;
  location: string;
  time: string;
  level: string;
  currentPlayers: number;
  totalPlayers: number;
}

export interface RecommendedMatchListData {
  matches: RecommendedMatch[];
  totalCount: number;
}

export interface HomeData {
  userName: string;
  teamName?: string;
  upcomingMatches: number;
  pendingRequests: number;
  todayMatch: {
    hasMatch: boolean;
    matchInfo?: {
      time: string;
      location: string;
    };
  };
}
