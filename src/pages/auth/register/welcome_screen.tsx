import React from 'react';
import styled from 'styled-components';
import { ArrowRight } from 'lucide-react';

import { theme } from '@/theme';

// Styled Components
const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fffe 0%, #e8f5e8 50%, #f0f8ff 100%);
  display: flex;
  flex-direction: column;
  position: relative;
`;

const BackgroundPattern = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
`;

const PatternCircle1 = styled.div`
  position: absolute;
  top: 15%;
  right: 10%;
  width: 120px;
  height: 120px;
  border-radius: 60px;
  background-color: ${theme.colors.overlay.brand};
`;

const PatternCircle2 = styled.div`
  position: absolute;
  top: 60%;
  left: 5%;
  width: 80px;
  height: 80px;
  border-radius: 40px;
  background-color: ${theme.colors.grass[100]};
`;

const PatternCircle3 = styled.div`
  position: absolute;
  bottom: 20%;
  right: 20%;
  width: 100px;
  height: 100px;
  border-radius: 50px;
  background-color: ${theme.colors.grass[50]};
`;

const SafeArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: ${theme.spacing.spacing10} ${theme.spacing.spacing6}
    ${theme.spacing.spacing10} ${theme.spacing.spacing6};
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const WelcomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 320px;
`;

const LogoImage = styled.img`
  width: 120px;
  height: 120px;
  margin-bottom: ${theme.spacing.spacing8};
  animation: logoScale 0.8s ease-out;

  @keyframes logoScale {
    0% {
      opacity: 0;
      transform: scale(0);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

const WelcomeTitle = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: ${theme.colors.text.main};
  text-align: center;
  line-height: 32px;
  margin: 0;
`;

const WelcomeSubtitle = styled.p`
  font-size: ${theme.typography.fontSize.font3};
  color: ${theme.colors.text.sub};
  text-align: center;
  line-height: 24px;
  margin-top: ${theme.spacing.spacing4};
  padding: 0 ${theme.spacing.spacing5};
  margin-bottom: 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${theme.spacing.spacing5};
`;

const StartButton = styled.button`
  background-color: ${theme.colors.brand.main};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 18px 50px;
  border-radius: 28px;
  gap: ${theme.spacing.spacing2};
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  transition: all 0.2s ease;

  &:hover {
    transform: scale(0.98);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const StartButtonText = styled.span`
  color: ${theme.colors.text.white};
  font-size: 18px;
  font-weight: 700;
`;

const LoginButton = styled.button`
  padding: ${theme.spacing.spacing2} ${theme.spacing.spacing5};
  background: none;
  border: none;
  cursor: pointer;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
  }
`;

const WelcomeButtonText = styled.span`
  font-size: 16px;
  color: ${theme.colors.text.sub};
  text-align: center;
  line-height: 22px;
`;

const LoginLink = styled.span`
  color: ${theme.colors.brand.main};
  font-weight: 600;
  text-decoration: underline;
`;

interface WelcomeScreenProps {
  onSwitchToLogin: () => void;
}

export function WelcomeScreen({ onSwitchToLogin }: WelcomeScreenProps) {
  const handleStartAuth = () => {
    navigate('/(auth)/register');
  };

  return (
    <Container>
      <BackgroundPattern>
        <PatternCircle1 />
        <PatternCircle2 />
        <PatternCircle3 />
      </BackgroundPattern>

      <SafeArea>
        <Content>
          <MainContent>
            <WelcomeContainer>
              <LogoImage
                src="/src/assets/images/logo_without_background.png"
                alt="Logo"
              />
              <WelcomeTitle>대학생 축구 커뮤니티에</WelcomeTitle>
              <WelcomeTitle>오신 것을 환영합니다!</WelcomeTitle>
              <WelcomeSubtitle>
                대학 이메일 인증을 통해 안전하게 가입하고,{'\n'}
                같은 대학교 축구 동아리원들과 연결하세요.
              </WelcomeSubtitle>
            </WelcomeContainer>
          </MainContent>

          <ButtonContainer>
            <StartButton onClick={handleStartAuth}>
              <StartButtonText>시작하기</StartButtonText>
              <ArrowRight size={20} color="#fff" />
            </StartButton>

            <LoginButton onClick={onSwitchToLogin}>
              <WelcomeButtonText>
                이미 계정이 있으신가요? <LoginLink>로그인</LoginLink>
              </WelcomeButtonText>
            </LoginButton>
          </ButtonContainer>
        </Content>
      </SafeArea>
    </Container>
  );
}
