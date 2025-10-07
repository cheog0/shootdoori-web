import React, { createContext, useContext, useEffect } from 'react';

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
    'authToken',
    null
  );
  const [refreshToken, setRefreshToken] = useStorageState<string | null>(
    'refreshToken',
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

  // TODO: 백엔드 API 연동 시 활성화
  // const refreshAccessToken = async () => {
  //   if (!refreshToken) {
  //     throw new Error('Refresh token이 없습니다.');
  //   }

  //   try {
  //     const response = await authApi.refreshToken({ refreshToken });
  //     setToken(response.accessToken);
  //     setRefreshToken(response.refreshToken);
  //     apiClient.setToken(response.accessToken);
  //   } catch (error) {
  //     console.error('토큰 갱신 실패:', error);
  //     setToken(null);
  //     setRefreshToken(null);
  //     throw error;
  //   }
  // };

  useEffect(() => {
    apiClient.setOnTokenExpired(async () => {
      // TODO: 백엔드 API 연동 시 활성화
      // try {
      //   await refreshAccessToken();
      // } catch (error) {
      //   console.warn('토큰 갱신 실패, 로그아웃 처리:', error);
      //   setToken(null);
      //   setRefreshToken(null);
      //   queryClient.clear();
      // }

      // 임시 로그아웃 처리
      setToken(null);
      setRefreshToken(null);
      queryClient.clear();
    });
  }, [refreshToken, setRefreshToken, setToken]);

  const login = async (loginData: LoginRequest) => {
    console.log('🔐 Auth Context login 함수 호출됨:', loginData);

    // TODO: 백엔드 API 연동 시 활성화
    // try {
    //   const response = await authApi.login(loginData);
    //   setToken(response.accessToken);
    //   setRefreshToken(response.refreshToken);
    //   apiClient.setToken(response.accessToken);
    // } catch (error) {
    //   console.error('로그인 실패:', error);
    //   throw error;
    // }

    // 임시 Mock 데이터
    const mockToken = 'mock-access-token-' + Date.now();
    const mockRefreshToken = 'mock-refresh-token-' + Date.now();

    console.log('🎫 Mock 토큰 생성:', { mockToken, mockRefreshToken });

    setToken(mockToken);
    setRefreshToken(mockRefreshToken);
    apiClient.setToken(mockToken);

    console.log('✅ 토큰 설정 완료, isAuthenticated:', !!mockToken);
  };

  const register = async (_registerData: RegisterRequest) => {
    // TODO: 백엔드 API 연동 시 활성화
    // try {
    //   const response = await authApi.register(registerData);
    //   setToken(response.accessToken);
    //   setRefreshToken(response.refreshToken);
    //   apiClient.setToken(response.accessToken);
    // } catch (error) {
    //   console.error('회원가입 실패:', error);
    //   throw error;
    // }

    // 임시 Mock 데이터
    const mockToken = 'mock-access-token-' + Date.now();
    const mockRefreshToken = 'mock-refresh-token-' + Date.now();
    setToken(mockToken);
    setRefreshToken(mockRefreshToken);
    apiClient.setToken(mockToken);
  };

  const refreshAccessToken = async () => {
    if (!refreshToken) {
      throw new Error('Refresh token이 없습니다.');
    }

    // TODO: 백엔드 API 연동 시 활성화
    // try {
    //   const response = await authApi.refreshToken({ refreshToken });
    //   setToken(response.accessToken);
    //   setRefreshToken(response.refreshToken);
    //   apiClient.setToken(response.accessToken);
    // } catch (error) {
    //   console.error('토큰 갱신 실패:', error);
    //   setToken(null);
    //   setRefreshToken(null);
    //   throw error;
    // }

    // 임시 Mock 데이터
    const mockToken = 'new-mock-access-token-' + Date.now();
    const mockRefreshToken = 'new-mock-refresh-token-' + Date.now();
    setToken(mockToken);
    setRefreshToken(mockRefreshToken);
    apiClient.setToken(mockToken);
  };

  const logout = async () => {
    // TODO: 백엔드 API 연동 시 활성화
    // try {
    //   await authApi.logoutAll();
    // } catch (error) {
    //   console.warn('로그아웃 API 호출 실패:', error);
    // } finally {
    //   setToken(null);
    //   setRefreshToken(null);
    //   apiClient.setToken(null);
    //   queryClient.clear();
    // }

    // 임시 로그아웃 처리
    setToken(null);
    setRefreshToken(null);
    apiClient.setToken(null);
    queryClient.clear();
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
