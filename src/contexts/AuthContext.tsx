import React, { createContext, useContext, useEffect } from 'react';

import { authApi } from '@/api/auth';
import { AUTH_STORAGE_KEYS } from '@/constants/auth';
import { useStorageState } from '@/hooks/useStorageState';
import { apiClient } from '@/lib/api_client';
import { queryClient } from '@/lib/query_client';
import type { LoginRequest, RegisterRequest } from '@/types';

interface AuthContextType {
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  login: (loginData: LoginRequest) => Promise<void>;
  register: (registerData: RegisterRequest) => Promise<void>;
  logout: () => Promise<void>;
  refreshAccessToken: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken, isLoading] = useStorageState<string | null>(
    AUTH_STORAGE_KEYS.AUTH_TOKEN,
    null
  );
  const [refreshToken, setRefreshToken] = useStorageState<string | null>(
    AUTH_STORAGE_KEYS.REFRESH_TOKEN,
    null
  );

  // 토큰이 변경될 때 API 클라이언트에 설정
  useEffect(() => {
    if (token) {
      apiClient.setToken(token);
    } else {
      apiClient.setToken(null);
    }
  }, [token]);

  // 토큰 갱신 함수
  const refreshAccessToken = async () => {
    if (!refreshToken) {
      throw new Error('Refresh token이 없습니다.');
    }

    try {
      const response = await authApi.refreshToken({ refreshToken });
      setToken(response.accessToken);
      setRefreshToken(response.refreshToken);
      apiClient.setToken(response.accessToken);
    } catch (error) {
      console.error('토큰 갱신 실패:', error);
      setToken(null);
      setRefreshToken(null);
      throw error;
    }
  };

  useEffect(() => {
    apiClient.setOnTokenExpired(async () => {
      try {
        await refreshAccessToken();
      } catch (error) {
        console.warn('토큰 갱신 실패, 로그아웃 처리:', error);
        setToken(null);
        setRefreshToken(null);
        queryClient.clear();
      }
    });
  }, [refreshToken, setRefreshToken, setToken, refreshAccessToken]);

  const login = async (loginData: LoginRequest) => {
    console.log('🔐 Auth Context login 함수 호출됨:', loginData);

    try {
      const response = await authApi.login(loginData);
      setToken(response.accessToken);
      setRefreshToken(response.refreshToken);
      apiClient.setToken(response.accessToken);
      console.log('✅ 로그인 성공, 토큰 설정 완료');
    } catch (error) {
      console.error('로그인 실패:', error);
      throw error;
    }
  };

  const register = async (registerData: RegisterRequest) => {
    try {
      const response = await authApi.register(registerData);
      setToken(response.accessToken);
      setRefreshToken(response.refreshToken);
      apiClient.setToken(response.accessToken);
      console.log('✅ 회원가입 성공, 토큰 설정 완료');
    } catch (error) {
      console.error('회원가입 실패:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authApi.logoutAll();
    } catch (error) {
      console.warn('로그아웃 API 호출 실패:', error);
    } finally {
      setToken(null);
      setRefreshToken(null);
      apiClient.setToken(null);
      queryClient.clear();
      console.log('✅ 로그아웃 완료');
    }
  };

  if (isLoading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <div>로딩 중...</div>
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        refreshToken,
        isAuthenticated: !!token,
        login,
        register,
        logout,
        refreshAccessToken,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth는 반드시 AuthProvider 내부에서 사용해야 합니다.');
  }
  return context;
}
