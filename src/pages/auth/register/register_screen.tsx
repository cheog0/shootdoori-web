import { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

import { useRegisterMutation } from '@/hooks/queries';
import { useRegisterForm } from '@/hooks/useRegisterForm';
import { useStep } from '@/hooks/useStep';
import { theme } from '@/theme';

import { AccountSetup } from './account_setup';
import { EmailVerification } from './email_verification.tsx';
import { ProfileInfo } from './profile_info';

type Step = 1 | 2 | 3;

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

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
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
  overflow: visible;
  border: 1px solid rgba(255, 255, 255, 0.2);

  @media (max-width: 768px) {
    max-width: 100%;
    min-height: 100vh;
    border-radius: 0;
    backdrop-filter: blur(10px);
  }
`;

const ScrollContent = styled.div`
  flex: 1;
  padding: 40px 30px 30px 30px;
  overflow-y: visible;
  -webkit-overflow-scrolling: touch;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 1;
  min-height: 100%;
`;

const RegisterContainer = styled.div`
  width: 100%;
  max-width: 320px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${fadeInUp} 0.8s ease-out;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 30px;
  position: relative;
`;

const LogoContainer = styled.div`
  position: relative;
  margin-bottom: 16px;
`;

const LogoText = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  background: linear-gradient(
    135deg,
    ${theme.colors.brand.main} 0%,
    ${theme.colors.grass[600]} 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
  letter-spacing: -0.02em;
  animation: ${float} 3s ease-in-out infinite;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const LogoAccent = styled.div`
  position: absolute;
  top: -8px;
  right: -8px;
  width: 12px;
  height: 12px;
  background: ${theme.colors.grass[400]};
  border-radius: 50%;
  animation: ${float} 3s ease-in-out infinite reverse;
`;

const Tagline = styled.p`
  font-size: 1rem;
  color: ${theme.colors.text.sub};
  margin: 0;
  font-weight: 400;
  opacity: 0.8;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const ProgressContainer = styled.div`
  width: 100%;
  margin-bottom: 30px;
  animation: ${fadeInUp} 0.8s ease-out 0.2s both;
`;

const ProgressBar = styled.div`
  height: 8px;
  background: rgba(108, 142, 104, 0.1);
  border-radius: 4px;
  width: 100%;
  margin-bottom: 12px;
  overflow: hidden;
  position: relative;
`;

const ProgressFill = styled.div<{ width: string }>`
  height: 100%;
  background: linear-gradient(
    90deg,
    ${theme.colors.brand.main} 0%,
    ${theme.colors.grass[500]} 100%
  );
  border-radius: 4px;
  width: ${props => props.width};
  transition: width 0.5s ease;
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.3),
      transparent
    );
    animation: shimmer 2s infinite;
  }

  @keyframes shimmer {
    0% {
      left: -100%;
    }
    100% {
      left: 100%;
    }
  }
`;

const StepText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StepNumber = styled.span`
  font-size: 0.9rem;
  color: ${theme.colors.text.sub};
  font-weight: 500;
`;

const StepTitle = styled.span`
  font-size: 0.85rem;
  color: ${theme.colors.brand.main};
  font-weight: 600;
`;

const FormContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
`;

const LoginSection = styled.div`
  text-align: center;
  margin-top: 30px;
  animation: ${fadeInUp} 0.8s ease-out 0.3s both;
`;

const LoginRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const LoginText = styled.span`
  font-size: 0.9rem;
  color: ${theme.colors.text.sub};
  opacity: 0.8;

  @media (max-width: 768px) {
    font-size: 0.85rem;
  }
`;

const LoginLink = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
  color: ${theme.colors.brand.main};
  text-decoration: none;
  position: relative;
  transition: all 0.3s ease;

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 2px;
    background: ${theme.colors.brand.main};
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }

  &:hover {
    color: ${theme.colors.grass[600]};
  }

  @media (max-width: 768px) {
    font-size: 0.85rem;
  }
`;

const stepTitles = {
  1: '',
  2: '',
  3: '',
};

export default function RegisterScreen() {
  const registerMutation = useRegisterMutation();
  const { step, handlePrev, handleNext } = useStep<Step>(1, 3);
  const { formData, updateForm, getRegisterData } = useRegisterForm();
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsKeyboardVisible(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleSubmit = async () => {
    if (
      !formData.password ||
      !formData.confirmPassword ||
      formData.password !== formData.confirmPassword ||
      !formData.termsAgreed ||
      !formData.privacyAgreed
    ) {
      window.alert('모든 항목을 올바르게 입력해주세요.');
      return;
    }

    try {
      const result = await registerMutation.mutateAsync(getRegisterData());
      if (!result?.accessToken) {
        throw new Error('회원가입 실패');
      }
      window.alert('회원가입이 완료되었습니다.');
    } catch (error: unknown) {
      const errorMessage =
        (error as Error).message || '회원가입에 실패했습니다.';

      if (errorMessage.includes('아이디의 형식이 올바르지 않습니다')) {
        window.alert(
          '카카오톡 아이디 형식을 확인해주세요.\n영문, 숫자, 특수문자(-, _, .)를 포함하여 4~20자이어야 합니다.'
        );
      } else if (errorMessage.includes('이미 존재하는')) {
        window.alert('이미 사용 중인 정보입니다. 다른 정보를 입력해주세요.');
      } else {
        window.alert(errorMessage);
      }
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <EmailVerification
            data={formData}
            onChange={updateForm}
            handleNext={handleNext}
          />
        );
      case 2:
        return (
          <ProfileInfo
            data={formData}
            onChange={updateForm}
            handlePrev={handlePrev}
            handleNext={handleNext}
          />
        );
      case 3:
        return (
          <AccountSetup
            data={formData}
            onChange={updateForm}
            onSubmit={handleSubmit}
            isLoading={registerMutation.isPending}
            handlePrev={handlePrev}
          />
        );
      default:
        return null;
    }
  };

  return (
    <AppContainer>
      <MobileViewport>
        <ScrollContent>
          <RegisterContainer>
            <Header>
              <LogoContainer>
                <LogoText>ShootDoori</LogoText>
                <LogoAccent />
              </LogoContainer>
              <Tagline>새 계정을 만들어보세요</Tagline>
            </Header>

            <ProgressContainer>
              <ProgressBar>
                <ProgressFill width={`${(step / 3) * 100}%`} />
              </ProgressBar>
              <StepText>
                <StepNumber>{step} / 3</StepNumber>
                <StepTitle>{stepTitles[step]}</StepTitle>
              </StepText>
            </ProgressContainer>

            <FormContainer>{renderStep()}</FormContainer>
          </RegisterContainer>

          {!isKeyboardVisible && (
            <LoginSection>
              <LoginRow>
                <LoginText>이미 계정이 있으신가요?</LoginText>
                <LoginLink onClick={() => (window.location.href = '/login')}>
                  로그인
                </LoginLink>
              </LoginRow>
            </LoginSection>
          )}
        </ScrollContent>
      </MobileViewport>
    </AppContainer>
  );
}
