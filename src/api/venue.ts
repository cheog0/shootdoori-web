import * as axios from 'axios';

import { VENUE_API } from '@/constants/endpoints';
import type { Venue } from '@/types/venue';
import environment from '@/config/environment';

interface VenuePage {
  content: Venue[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

export const getVenues = async (): Promise<Venue[]> => {
  const { data } = await axios.get<VenuePage>(VENUE_API.GET_VENUES, {
    baseURL: environment.API_BASE_URL,
  });
  return data.content;
};
