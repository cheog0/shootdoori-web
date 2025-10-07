import { AUTH_API } from '@/constants/endpoints';
import { apiClient } from '@/lib/api_client';
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  TokenRefreshRequest,
  TokenRefreshResponse,
  SendVerificationResponse,
  VerifyEmailResponse,
  VerifyEmailRequest,
} from '@/types';

export const authApi = {
  /**
   * 로그인 API
   * POST /api/auth/login
   */
  login: (loginData: LoginRequest) =>
    apiClient.post<LoginResponse>(AUTH_API.LOGIN, loginData),

  /**
   * 회원가입 API
   * POST /api/auth/register
   */
  register: (registerData: RegisterRequest) =>
    apiClient.post<RegisterResponse>(AUTH_API.REGISTER, registerData),

  /**
   * Access Token 재발급 API
   * POST /api/auth/refresh
   */
  refreshToken: (refreshData: TokenRefreshRequest) =>
    apiClient.post<TokenRefreshResponse>(AUTH_API.REFRESH, refreshData),

  /**
   * 모든 기기에서 로그아웃 API
   * POST /api/auth/logout-all
   */
  logoutAll: () => apiClient.post(AUTH_API.LOGOUT_ALL, {}),

  /**
   * 이메일 인증 코드 전송 API
   * POST /api/auth/send-verification
   */
  sendVerification: (email: string) =>
    apiClient.post<SendVerificationResponse>(AUTH_API.SEND_VERIFICATION, {
      email,
    }),

  /**
   * 이메일 인증 API
   * POST /api/auth/verify-email
   */
  verifyEmail: (verifyEmailCode: VerifyEmailRequest) =>
    apiClient.post<VerifyEmailResponse>(AUTH_API.VERIFY_EMAIL, verifyEmailCode),
};
