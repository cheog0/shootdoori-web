import { RECOMMENDED_MATCH_API } from '@/constants/endpoints';
import { apiClient } from '@/lib/api_client';
import type { RecommendedMatch, RecommendedMatchListData } from '@/types/home';

export type { RecommendedMatch, RecommendedMatchListData };

export const recommendedMatchApi = {
  getRecommendedMatch: () =>
    apiClient.get<RecommendedMatchListData>(
      RECOMMENDED_MATCH_API.GET_RECOMMENDED_MATCH
    ),
};
