import { PROFILE_API } from '@/constants/endpoints';
import { apiClient } from '@/lib/api_client';
import type {
  UserProfile,
  UpdateProfileRequest,
  UpdateProfileResponse,
} from '@/types/profile';

export const profileApi = {
  getProfile: () => apiClient.get<UserProfile>(PROFILE_API.GET_PROFILE),
  getProfileById: (id: string | number) =>
    apiClient.get<UserProfile>(PROFILE_API.GET_PROFILE_BY_ID(id)),
  updateProfile: (data: UpdateProfileRequest) =>
    apiClient.put<UpdateProfileResponse>(PROFILE_API.UPDATE_PROFILE, data),
  deleteProfile: () => apiClient.delete(PROFILE_API.DELETE_PROFILE),
};
