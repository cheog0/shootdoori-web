import { useCallback, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';

import { useUserProfile, useLogoutMutation } from '@/hooks/queries';
import { theme } from '@/theme';

import BenefitsSection from './components/benefit_section';
import EnvelopeSection from './components/envelope_section';
import GreetingSection from './components/greeting_section';
import HomeHeader from './components/home_header';
import RecommendedMatchCard from './components/recommended_match_card';

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
  padding: 20px 20px 40px 20px;
  padding-bottom: ${props => props.paddingBottom};
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  display: flex;
  flex-direction: column;
  gap: 24px;
  position: relative;
  z-index: 1;
`;

const MainSection = styled.div`
  margin-top: 0;
  position: relative;
  z-index: 1;
  animation: ${fadeInUp} 0.8s ease-out;
`;

const MatchSection = styled.div`
  position: relative;
  z-index: 1;
  animation: ${fadeInUp} 0.8s ease-out 0.2s both;
`;

const ServiceSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: relative;
  z-index: 1;
  animation: ${fadeInUp} 0.8s ease-out 0.4s both;
`;

const LoadingContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px;
  min-height: 100%;
`;

const LoadingSpinner = styled.div`
  width: 50px;
  height: 50px;
  border: 4px solid rgba(108, 142, 104, 0.2);
  border-top: 4px solid ${theme.colors.brand.main};
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 20px;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const LoadingText = styled.div`
  font-size: 16px;
  color: ${theme.colors.text.main};
  font-weight: 500;
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
`;

const HeaderContainer = styled.div`
  position: relative;
  z-index: 2;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
`;

export default function HomeScreen() {
  const { data: userProfile, isLoading, refetch, error } = useUserProfile();
  const logoutMutation = useLogoutMutation();
  const alertShownRef = useRef(false);

  const handleLogoutAndRedirect = useCallback(async () => {
    try {
      await logoutMutation.mutateAsync();
    } catch (error) {
      console.error('로그아웃 처리 중 오류:', error);
    }
  }, [logoutMutation]);

  const handleErrorAlert = useCallback(() => {
    if (alertShownRef.current) {
      return;
    }

    alertShownRef.current = true;

    window.alert('로그인이 필요합니다. 다시 로그인해주세요.');

    alertShownRef.current = false;
    handleLogoutAndRedirect();
  }, [handleLogoutAndRedirect]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    if (error) {
      handleErrorAlert();
    }
  }, [error, handleErrorAlert]);

  if (isLoading) {
    return (
      <AppContainer>
        <MobileViewport>
          <LoadingContainer>
            <LoadingSpinner />
            <LoadingText>로딩 중...</LoadingText>
          </LoadingContainer>
        </MobileViewport>
      </AppContainer>
    );
  }

  return (
    <AppContainer>
      <MobileViewport>
        <HeaderContainer>
          <HomeHeader />
        </HeaderContainer>

        <ContentWrapper>
          <ScrollContent paddingBottom={`${theme.spacing.spacing5}px`}>
            <MainSection>
              <GreetingSection />
            </MainSection>

            <MatchSection>
              <RecommendedMatchCard />
            </MatchSection>

            <ServiceSection>
              <EnvelopeSection teamId={userProfile?.teamId || null} />
              <BenefitsSection teamId={userProfile?.teamId || null} />
            </ServiceSection>
          </ScrollContent>
        </ContentWrapper>
      </MobileViewport>
    </AppContainer>
  );
}
