import { useQuery } from '@tanstack/react-query';

import { getMatchWaitingList } from '@/api/match';
import type {
  MatchWaitingListRequestDto,
  MatchWaitingResponseDto,
} from '@/types/match';

export const useMatchWaitingList = (
  params: MatchWaitingListRequestDto,
  options?: any
) => {
  return useQuery<MatchWaitingResponseDto[]>({
    queryKey: ['match-waiting-list', params],
    queryFn: async () => {
      return getMatchWaitingList(params);
    },
    ...options,
  });
};
