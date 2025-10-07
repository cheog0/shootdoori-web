import { useQuery } from '@tanstack/react-query';

import { getVenues } from '@/api/venue';
import type { Venue } from '@/types/venue';

export const useVenues = () => {
  return useQuery<Venue[], Error>({
    queryKey: ['venues'],
    queryFn: getVenues,
  });
};
