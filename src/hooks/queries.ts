import { useQuery, useMutation, useInfiniteQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import * as api from '@/api';
import { ROUTES } from '@/constants/routes';
import { useAuth } from '@/contexts/auth_context';
import { queryClient } from '@/lib/query_client';
import type { CreateTeamRequest } from '@/types/team';
import type {
  LoginRequest,
  RegisterRequest,
  RegisterResponse,
  VerifyEmailRequest,
} from '@/types/auth';
import type { UpdateProfileRequest } from '@/types/profile';

export const queries = {
  login: {
    key: ['login'] as const,
    fn: (loginData: LoginRequest) => api.authApi.login(loginData),
  },
  register: {
    key: ['register'] as const,
    fn: (registerData: RegisterRequest) => api.authApi.register(registerData),
  },
  sendVerification: {
    key: ['sendVerification'] as const,
    fn: (email: string) => api.authApi.sendVerification(email),
  },
  verifyEmail: {
    key: ['verifyEmail'] as const,
    fn: (verifyEmailCode: VerifyEmailRequest) =>
      api.authApi.verifyEmail(verifyEmailCode),
  },
  userProfile: {
    key: ['user', 'profile'] as const,
    fn: () => api.profileApi.getProfile(),
  },
  userProfileById: {
    key: (id: string | number) => ['user', 'profile', id] as const,
    fn: (id: string | number) => api.profileApi.getProfileById(id),
  },
  user: {
    key: ['user'] as const,
  },
  recommendedMatch: {
    key: ['recommendedMatch'] as const,
    fn: () => api.recommendedMatchApi.getRecommendedMatch(),
  },
  universityTeamList: {
    key: ['university'] as const,
    fn: () => api.universityListApi.getUniversities(),
  },
  teamsByUniversity: {
    key: ['teams', 'university'] as const,
    fn: (university: string, page: number = 0, size: number = 10) =>
      api.teamListApi.getTeamsByUniversity(university, page, size),
  },
  team: {
    key: (teamId: string | number) => ['teams', teamId] as const,
    fn: (teamId: string | number) => api.myTeamApi.getTeamById(teamId),
  },
  teamMembers: {
    key: (teamId: string | number, page: number = 0, size: number = 10) =>
      ['teamMembers', teamId, page, size] as const,
    fn: (teamId: string | number, page: number = 0, size: number = 10) =>
      api.teamMemberApi.getTeamMembers(teamId, page, size),
  },
  teamMember: {
    key: (teamId: string | number, userId: string | number) =>
      ['teamMember', teamId, userId] as const,
    fn: (teamId: string | number, userId: string | number) =>
      api.teamMemberApi.getTeamMember(teamId, userId),
  },
  teamJoinRequests: {
    key: (teamId: string | number) => ['teamJoinRequests', teamId] as const,
    fn: (teamId: string | number) =>
      api.teamJoinRequestApi.getTeamJoinRequests(teamId),
  },
  teamMatches: {
    key: (teamId: string | number) => ['teamMatches', teamId] as const,
    fn: (teamId: string | number) => api.teamMatchApi.getTeamMatches(teamId),
  },
  teamRecentMatches: {
    key: (status?: string) => ['teamRecentMatches', status] as const,
    fn: (status?: string) => api.teamMatchApi.getTeamRecentMatches(status),
  },
  teamJoinWaitingList: {
    key: (
      teamId: string | number,
      status: string = 'PENDING',
      page: number = 0,
      size: number = 10
    ) => ['teamJoinWaitingList', teamId, status, page, size] as const,
    fn: (
      teamId: string | number,
      status: string = 'PENDING',
      page: number = 0,
      size: number = 10
    ) =>
      api.teamJoinRequestApi.getTeamJoinWaitingList(teamId, status, page, size),
  },
  teamMatchRequests: {
    key: ['teamMatchRequests'] as const,
    fn: async () => {
      const response = await api.teamMatchApi.getTeamMatchRequests();
      return response.content;
    },
  },
} as const;

export function useUserProfile() {
  const { token } = useAuth();

  return useQuery({
    queryKey: queries.userProfile.key,
    queryFn: queries.userProfile.fn,
    enabled: !!token,
  });
}

export function useTeamMatchRequests() {
  const { token } = useAuth();

  return useQuery({
    queryKey: queries.teamMatchRequests.key,
    queryFn: queries.teamMatchRequests.fn,
    enabled: !!token,
  });
}

export function useRecommendedMatch() {
  return useQuery({
    queryKey: queries.recommendedMatch.key,
    queryFn: queries.recommendedMatch.fn,
  });
}

export function useUniversityTeamList() {
  return useQuery({
    queryKey: queries.universityTeamList.key,
    queryFn: queries.universityTeamList.fn,
  });
}

export function useTeamsByUniversity(
  university: string,
  page: number = 0,
  size: number = 10
) {
  return useQuery({
    queryKey: queries.teamsByUniversity.key,
    queryFn: () => queries.teamsByUniversity.fn(university, page, size),
    enabled: !!university,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });
}

export function useTeamsByUniversityInfinite(
  university: string,
  size: number = 10
) {
  return useInfiniteQuery({
    queryKey: queries.teamsByUniversity.key,
    queryFn: ({ pageParam }) =>
      queries.teamsByUniversity.fn(university, pageParam, size),
    getNextPageParam: lastPage => {
      if (lastPage.content.length < size) return undefined;
      return lastPage.pageable.pageNumber + 1;
    },
    initialPageParam: 0,
    enabled: !!university,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });
}

export function useTeam(teamId: string | number) {
  return useQuery({
    queryKey: queries.team.key(teamId),
    queryFn: () => queries.team.fn(teamId),
    enabled: !!teamId,
  });
}

export function useTeamMembers(
  teamId: string | number,
  page: number = 0,
  size: number = 10
) {
  return useQuery({
    queryKey: queries.teamMembers.key(teamId, page, size),
    queryFn: () => queries.teamMembers.fn(teamId, page, size),
    enabled: !!teamId,
  });
}

export function useTeamMember(
  teamId: string | number,
  userId: string | number
) {
  return useQuery({
    queryKey: queries.teamMember.key(teamId, userId),
    queryFn: () => queries.teamMember.fn(teamId, userId),
    enabled: !!teamId && !!userId,
  });
}

export function useTeamJoinRequests(teamId: string | number) {
  return useQuery({
    queryKey: queries.teamJoinRequests.key(teamId),
    queryFn: () => queries.teamJoinRequests.fn(teamId),
    enabled: !!teamId,
  });
}

export function useTeamMatches(teamId: string | number) {
  return useQuery({
    queryKey: queries.teamMatches.key(teamId),
    queryFn: () => queries.teamMatches.fn(teamId),
    enabled: !!teamId,
  });
}

export function useTeamRecentMatches(status?: string) {
  return useQuery({
    queryKey: queries.teamRecentMatches.key(status),
    queryFn: () => queries.teamRecentMatches.fn(status),
    enabled: true,
  });
}

export function useTeamJoinWaitingList(
  teamId: string | number,
  status: string = 'PENDING',
  page: number = 0,
  size: number = 10
) {
  return useQuery({
    queryKey: queries.teamJoinWaitingList.key(teamId, status, page, size),
    queryFn: () => queries.teamJoinWaitingList.fn(teamId, status, page, size),
    enabled: !!teamId,
  });
}

export function useUserProfileById(id: string | number) {
  return useQuery({
    queryKey: queries.userProfileById.key(id),
    queryFn: () => queries.userProfileById.fn(id),
    enabled: !!id,
  });
}

export function useUpdateProfileMutation() {
  return useMutation({
    mutationFn: (data: UpdateProfileRequest) =>
      api.profileApi.updateProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queries.userProfile.key });
    },
    onError: (error: unknown) => {
      console.error('프로필 업데이트 실패:', error);
    },
  });
}

export function useDeleteProfileMutation() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => api.profileApi.deleteProfile(),
    onSuccess: () => {
      // 프로필 삭제 성공 시 로그아웃 처리
      queryClient.clear();
      navigate('/auth/login');
    },
    onError: (error: unknown) => {
      console.error('프로필 삭제 실패:', error);
    },
  });
}

export function useSendVerificationMutation() {
  return useMutation({
    mutationFn: (email: string) => api.authApi.sendVerification(email),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queries.userProfile.key });
    },
    onError: (error: unknown) => {
      console.error('인증 이메일 전송 실패:', error);
    },
  });
}

export function useVerifyEmailMutation() {
  return useMutation({
    mutationFn: (verifyEmailCode: VerifyEmailRequest) =>
      api.authApi.verifyEmail(verifyEmailCode),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queries.userProfile.key });
    },
  });
}

export function useLogoutMutation() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: logout,
    onSuccess: async () => {
      await queryClient.clear();
      navigate('/login');
    },
    onError: (error: unknown) => {
      console.error('로그아웃 실패:', error);
    },
  });
}

export function useLoginMutation() {
  const navigate = useNavigate();
  const { login } = useAuth();

  return useMutation({
    // TODO: 백엔드 API 연동 시 활성화
    // mutationFn: queries.login.fn,
    mutationFn: async () => {
      // 임시 Mock 응답
      return {
        accessToken: 'mock-access-token-' + Date.now(),
        refreshToken: 'mock-refresh-token-' + Date.now(),
        accessTokenExpiresIn: 1800,
        refreshTokenExpiresIn: 2592000,
      };
    },
    onSuccess: async () => {
      console.log('🎉 useLoginMutation onSuccess 실행됨');

      // Auth Context를 통해 토큰 설정
      console.log('🔐 Auth Context login 함수 호출 중...');
      await login(formData);
      console.log('✅ Auth Context login 함수 완료');

      console.log('🧹 Query cache 클리어 중...');
      await queryClient.clear();
      console.log('✅ Query cache 클리어 완료');

      console.log('🏠 홈으로 네비게이션 중...');
      navigate('/');
      console.log('✅ 네비게이션 완료');
    },
    onError: (error: unknown) => {
      console.error('로그인 실패:', error);
    },
  });
}

export function useRegisterMutation() {
  const navigate = useNavigate();

  return useMutation({
    // TODO: 백엔드 API 연동 시 활성화
    // mutationFn: queries.register.fn,
    mutationFn: async () => {
      // 임시 Mock 응답
      return {
        accessToken: 'mock-access-token-' + Date.now(),
        refreshToken: 'mock-refresh-token-' + Date.now(),
        accessTokenExpiresIn: 1800,
        refreshTokenExpiresIn: 2592000,
      };
    },
    onSuccess: async (data: RegisterResponse) => {
      // TODO: 백엔드 API 연동 시 활성화
      // localStorage.setItem('authToken', data.accessToken);
      // localStorage.setItem('refreshToken', data.refreshToken);

      // 임시 Mock 데이터 저장
      localStorage.setItem('authToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);

      await queryClient.clear();
      navigate('/');
    },
    onError: (error: unknown) => {
      console.error('회원가입 실패:', error);
    },
  });
}

export function useCreateTeamMutation() {
  return useMutation({
    mutationFn: (data: CreateTeamRequest) => api.createTeam(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queries.userProfile.key });
    },
    onError: (error: unknown) => {
      console.error('팀 생성 실패:', error);
    },
  });
}

export function useJoinTeamMutation() {
  return useMutation({
    mutationFn: (teamId: string | number) =>
      api.joinTeamApi.joinTeam(Number(teamId)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queries.userProfile.key });
    },
    onError: (error: unknown) => {
      console.error('팀 가입 실패:', error);
    },
  });
}

export function useTeamExitMutation() {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (teamId: string | number) => api.teamExitApi.exitTeam(teamId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['team'] });
      queryClient.invalidateQueries({ queryKey: ['teamMembers'] });
      queryClient.invalidateQueries({ queryKey: queries.userProfile.key });
      navigate(ROUTES.TEAM_GUIDE);
    },
    onError: (error: unknown) => {
      console.error('팀 나가기 실패:', error);
    },
  });
}

export function useCreateOrderMutation() {
  return useMutation({
    mutationFn: () => Promise.resolve({ success: true }),
    onSuccess: () => {
      console.log('주문 생성 성공');
    },
  });
}

export function useProductPageDataQuery(productId: string) {
  return useQuery({
    queryKey: ['productPage', productId],
    queryFn: () =>
      Promise.resolve({
        product: { id: productId, name: '임시 상품', price: 10000 },
        reviews: [],
      }),
  });
}
