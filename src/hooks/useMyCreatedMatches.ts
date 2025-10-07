import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { getMyCreatedMatches } from '@/api/match';
import type { MatchWaitingResponseDto } from '@/types/match';

export const useMyCreatedMatches = (
  options?: UseQueryOptions<
    MatchWaitingResponseDto[], // data type
    Error // error type
  >
) => {
  return useQuery<MatchWaitingResponseDto[], Error>({
    queryKey: ['my-created-matches'],
    queryFn: async () => {
      const result = await getMyCreatedMatches();
      return result;
    },
    ...options,
  });
};
