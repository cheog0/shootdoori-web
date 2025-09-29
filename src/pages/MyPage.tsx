import styled from '@emotion/styled';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { theme } from '@/styles/theme';
import { NavigationHeader } from '@/components/shared/layout';

export default function MyPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  const emailId = user?.email ? user.email.split('@')[0] : '';

  return (
    <AppContainer>
      <MobileViewport>
        <NavigationHeader title="선물하기" />
        <ContentContainer>
          <h3>마이 페이지</h3>
          <p>{emailId}님 안녕하세요!</p>
          <p>이메일 주소는 {user?.email}입니다.</p>
          <GrayButton onClick={handleLogout}>
            <LogoutIcon>
              <svg
                width="20"
                height="20"
                viewBox="0 0 512 512"
                fill="currentColor"
              >
                <path d="M304 336v40a40 40 0 01-40 40H105a40 40 0 01-40-40V136a40 40 0 0140-40h159c22.09 0 48 17.91 48 40v40" />
                <path
                  d="M368 336l80-80-80-80M176 256h256"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="32"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </LogoutIcon>
            로그아웃
          </GrayButton>
        </ContentContainer>
      </MobileViewport>
    </AppContainer>
  );
}

const AppContainer = styled.div`
  min-height: 100vh;
  background: ${theme.colors.gray00};
  display: flex;
  justify-content: center;
  padding: 0 ${theme.spacing.spacing4};

  @media (max-width: 768px) {
    padding: 0;
  }
`;

const MobileViewport = styled.div`
  width: 100%;
  max-width: 720px;
  min-height: 100vh;
  background: ${theme.colors.gray00};
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  position: relative;

  @media (max-width: 768px) {
    max-width: 100%;
    box-shadow: none;
  }
`;

const ContentContainer = styled.div`
  padding: 32px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const GrayButton = styled.button`
  background: ${theme.colors.gray300};
  color: ${theme.colors.gray1000};
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  cursor: pointer;
  margin-top: 16px;
  transition: background 0.2s;
  display: flex;
  align-items: center;
  gap: 8px;
  &:hover {
    background: ${theme.colors.gray400};
  }
  &:active {
    background: ${theme.colors.gray500};
  }
`;

const LogoutIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
