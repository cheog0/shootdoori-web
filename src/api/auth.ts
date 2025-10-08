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
} from '@/types/auth';

export const authApi = {
  login: (loginData: LoginRequest) =>
    apiClient.post<LoginResponse>(AUTH_API.LOGIN, loginData),

  register: (registerData: RegisterRequest) =>
    apiClient.post<RegisterResponse>(AUTH_API.REGISTER, registerData),

  refreshToken: (refreshData: TokenRefreshRequest) =>
    apiClient.post<TokenRefreshResponse>(AUTH_API.REFRESH, refreshData),

  logoutAll: () => apiClient.post(AUTH_API.LOGOUT_ALL, {}),

  sendVerification: (email: string) =>
    apiClient.post<SendVerificationResponse>(AUTH_API.SEND_VERIFICATION, {
      email,
    }),

  verifyEmail: (verifyEmailCode: VerifyEmailRequest) =>
    apiClient.post<VerifyEmailResponse>(AUTH_API.VERIFY_EMAIL, verifyEmailCode),
};
