import { useQuery } from '@tanstack/react-query';

import { getMyAppliedMatches } from '@/api/match';
import type { MatchWaitingHistoryResponseDto } from '@/types/match';

export const useMyAppliedMatches = (options?: { enabled?: boolean }) => {
  return useQuery<MatchWaitingHistoryResponseDto[]>({
    queryKey: ['my-applied-matches'],
    queryFn: async () => {
      const result = await getMyAppliedMatches();
      return result;
    },
    ...options,
  });
};
