// TODO: React Native 컴포넌트들을 웹용으로 변환 필요
// import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
//
import { useNavigate } from 'react-router-dom';

import { ROUTES } from '@/constants/routes';
// import { useAuth } from '@/contexts/AuthContext';
// import { useUserProfile } from '@/hooks/queries';

interface TeamGuardProps {
  children: React.ReactNode;
  fallbackMessage?: string;
}

export function TeamGuard({ children, fallbackMessage }: TeamGuardProps) {
  const navigate = useNavigate();
  // TODO: 실제 인증 로직 구현
  // const { isAuthenticated } = useAuth();
  // const { data: userProfile, isLoading } = useUserProfile();

  const isAuthenticated = true; // 임시
  const isLoading = false; // 임시
  const userProfile = { teamId: 'temp' }; // 임시

  useEffect(() => {
    // 인증되지 않은 사용자는 TeamGuard를 실행하지 않음
    if (!isAuthenticated) {
      return;
    }

    if (!isLoading && (!userProfile?.teamId || userProfile.teamId === null)) {
      // TODO: 웹용 알림 구현
      console.log(
        '팀 참여 필요:',
        fallbackMessage || '이 기능을 사용하려면 먼저 팀에 가입해야 합니다.'
      );
    }
  }, [
    userProfile?.teamId,
    isLoading,
    navigate,
    fallbackMessage,
    isAuthenticated,
  ]);

  // 인증되지 않은 사용자는 TeamGuard를 실행하지 않음
  if (!isAuthenticated) {
    return <>{children}</>;
  }

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

  if (!userProfile?.teamId || userProfile.teamId === null) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px',
          height: '100vh',
        }}
      >
        <div
          style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px' }}
        >
          팀 참여가 필요합니다
        </div>
        <div
          style={{ textAlign: 'center', marginBottom: '30px', color: '#666' }}
        >
          매치에 참여하려면 먼저 팀에 가입해야 합니다.
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <button
            style={{
              backgroundColor: '#4CAF50',
              padding: '12px 24px',
              borderRadius: '8px',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
            }}
            onClick={() => navigate(ROUTES.TEAM_CREATION)}
          >
            팀 만들기
          </button>

          <button
            style={{
              backgroundColor: '#374151',
              padding: '12px 24px',
              borderRadius: '8px',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
            }}
            onClick={() => navigate(ROUTES.TEAM_GUIDE)}
          >
            팀 참여하기
          </button>

          <button
            onClick={() => navigate('/')}
            style={{
              padding: '12px 24px',
              borderRadius: '8px',
              border: '1px solid #ddd',
              backgroundColor: 'white',
              cursor: 'pointer',
            }}
          >
            홈으로 이동
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
