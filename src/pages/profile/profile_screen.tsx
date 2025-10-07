import styled, { keyframes } from 'styled-components';

import { CustomHeader } from '@/components/ui/custom_header';
import GlobalErrorFallback from '@/components/ui/global_error_fallback';
import { useAuth } from '@/contexts/auth_context';
import { useUserProfile } from '@/hooks/queries';
import { theme } from '@/theme';

import ProfileHeader from './components/profileHeader';
import SettingCard from './components/settingTab/setting_card';
import { getDefaultSettingsItems } from './components/settingTab/setting_items';

// 애니메이션 정의
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const gradientShift = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

// Styled Components
const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(
    135deg,
    ${theme.colors.grass[50]} 0%,
    ${theme.colors.cream[100]} 25%,
    ${theme.colors.grass[100]} 50%,
    ${theme.colors.cream[200]} 75%,
    ${theme.colors.grass[50]} 100%
  );
  background-size: 400% 400%;
  animation: ${gradientShift} 15s ease infinite;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background:
      radial-gradient(
        circle at 20% 80%,
        ${theme.colors.brand.main}15 0%,
        transparent 50%
      ),
      radial-gradient(
        circle at 80% 20%,
        ${theme.colors.grass[300]}20 0%,
        transparent 50%
      );
    pointer-events: none;
  }

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const MobileViewport = styled.div`
  width: 100%;
  max-width: 420px;
  min-height: 90vh;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  box-shadow:
    0 20px 40px rgba(0, 0, 0, 0.1),
    0 8px 16px rgba(0, 0, 0, 0.05),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.2);

  @media (max-width: 768px) {
    max-width: 100%;
    min-height: 100vh;
    border-radius: 0;
    backdrop-filter: blur(10px);
  }
`;

const ScrollContent = styled.div.withConfig({
  shouldForwardProp: prop => prop !== 'paddingBottom',
})<{ paddingBottom: string }>`
  flex: 1;
  padding: 20px 20px 20px 20px;
  padding-bottom: ${props => props.paddingBottom};
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  display: flex;
  flex-direction: column;
  gap: 24px;
  position: relative;
  z-index: 1;
  margin-bottom: 40px;
`;

const ProfileCard = styled.div`
  animation: ${fadeInUp} 0.8s ease-out;
`;

const SettingCardContainer = styled.div`
  animation: ${fadeInUp} 0.8s ease-out 0.2s both;
`;

const LoadingContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${theme.spacing.spacing8};

  @media (max-width: 768px) {
    padding: ${theme.spacing.spacing6};
  }
`;

const LoadingSpinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid ${theme.colors.gray[200]};
  border-top: 4px solid ${theme.colors.grass[500]};
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

function ProfileScreen() {
  const { token, logout } = useAuth();

  const { data: userInfo, isLoading, error, refetch } = useUserProfile();

  const displayUser = userInfo;
  const settingsItems = getDefaultSettingsItems(logout, navigate);

  if (!token) {
    return (
      <AppContainer>
        <MobileViewport>
          <LoadingContainer>
            <span>로그인이 필요합니다.</span>
          </LoadingContainer>
        </MobileViewport>
      </AppContainer>
    );
  }

  if (isLoading) {
    return (
      <AppContainer>
        <MobileViewport>
          <LoadingContainer>
            <LoadingSpinner />
          </LoadingContainer>
        </MobileViewport>
      </AppContainer>
    );
  }

  if (error) {
    return <GlobalErrorFallback error={error} resetError={() => refetch()} />;
  }

  if (!displayUser) {
    return (
      <AppContainer>
        <MobileViewport>
          <LoadingContainer>
            <span>사용자 정보를 불러오는 중...</span>
          </LoadingContainer>
        </MobileViewport>
      </AppContainer>
    );
  }

  return (
    <AppContainer>
      <MobileViewport>
        <CustomHeader title="프로필" showBackButton={false} />
        <ScrollContent paddingBottom={`${theme.spacing.spacing1}px`}>
          <ProfileCard>
            <ProfileHeader user={displayUser} />
          </ProfileCard>

          <SettingCardContainer>
            <SettingCard items={settingsItems} />
          </SettingCardContainer>
        </ScrollContent>
      </MobileViewport>
    </AppContainer>
  );
}

export default ProfileScreen;
