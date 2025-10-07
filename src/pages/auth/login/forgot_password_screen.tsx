import { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import {
  IoMdMail,
  IoMdKey,
  IoMdLock,
  IoMdEye,
  IoMdEyeOff,
} from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

import { theme } from '@/theme';

type ForgotPasswordStep = 'email' | 'verification' | 'newPassword';

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

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
`;

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
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

const ScrollContent = styled.div`
  flex: 1;
  padding: 40px 30px 30px 30px;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 1;
  min-height: 100%;
`;

const ForgotPasswordContainer = styled.div`
  width: 100%;
  max-width: 320px;
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
  margin-bottom: 40px;
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

const InputGroup = styled.div.withConfig({
  shouldForwardProp: prop => prop !== 'hasError',
})<{ hasError?: boolean }>`
  position: relative;
  width: 100%;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 16px;
  border: 2px solid
    ${props =>
      props.hasError ? theme.colors.error : 'rgba(108, 142, 104, 0.2)'};
  padding: 16px 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  box-shadow:
    0 4px 12px rgba(0, 0, 0, 0.05),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
  margin-bottom: 20px;

  &:focus-within {
    border-color: ${props =>
      props.hasError ? theme.colors.error : theme.colors.brand.main};
    box-shadow:
      0 8px 24px rgba(108, 142, 104, 0.15),
      inset 0 1px 0 rgba(255, 255, 255, 0.9);
    transform: translateY(-2px);
  }

  &:hover {
    border-color: ${props =>
      props.hasError ? theme.colors.error : 'rgba(108, 142, 104, 0.4)'};
  }
`;

const InputIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.brand.main};
  opacity: 0.7;
  transition: all 0.3s ease;

  ${InputGroup}:focus-within & {
    opacity: 1;
    animation: ${pulse} 0.6s ease-in-out;
  }
`;

const TextInput = styled.input.withConfig({
  shouldForwardProp: prop => prop !== 'hasError',
})<{ hasError?: boolean }>`
  flex: 1;
  font-size: 16px;
  color: ${theme.colors.textMain};
  border: none;
  outline: none;
  background: transparent;
  padding: 0;
  transition: all 0.3s ease;

  &::placeholder {
    color: ${theme.colors.textSub};
    opacity: 0.6;
  }

  &:focus {
    &::placeholder {
      opacity: 0.4;
    }
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const PasswordToggle = styled.button`
  padding: 4px;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.brand.main};
  opacity: 0.6;
  transition: all 0.3s ease;
  border-radius: 8px;

  &:hover {
    opacity: 1;
    background: rgba(108, 142, 104, 0.1);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const SubmitButton = styled.button.withConfig({
  shouldForwardProp: prop => prop !== 'disabled',
})<{ disabled?: boolean }>`
  width: 100%;
  height: 56px;
  background: ${props =>
    props.disabled
      ? `linear-gradient(135deg, ${theme.colors.gray400} 0%, ${theme.colors.gray500} 100%)`
      : theme.colors.brand.main};
  border-radius: 16px;
  border: none;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  box-shadow:
    0 8px 24px rgba(108, 142, 104, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);

  &::before {
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
    transition: left 0.5s ease;
  }

  &:hover:not(:disabled) {
    transform: translateY(-3px);
    box-shadow:
      0 12px 32px rgba(108, 142, 104, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.3);

    &::before {
      left: 100%;
    }
  }

  &:active:not(:disabled) {
    transform: translateY(-1px);
  }

  ${props =>
    props.disabled &&
    `
    opacity: 0.6;
    cursor: not-allowed;
  `}
`;

const SubmitButtonText = styled.span`
  color: ${theme.colors.white};
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.5px;
  position: relative;
  z-index: 1;
`;

const LoadingSpinner = styled.div`
  width: 32px;
  height: 32px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top: 3px solid ${theme.colors.white};
  border-radius: 50%;
  animation: spin 1s linear infinite;
  position: relative;
  z-index: 1;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const BackSection = styled.div`
  text-align: center;
  margin-top: 30px;
  animation: ${fadeInUp} 0.8s ease-out 0.3s both;
`;

const BackRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const BackText = styled.span`
  font-size: 0.9rem;
  color: ${theme.colors.text.sub};
  opacity: 0.8;

  @media (max-width: 768px) {
    font-size: 0.85rem;
  }
`;

const BackLink = styled.button`
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

const ErrorText = styled.div`
  font-size: 13px;
  color: ${theme.colors.error};
  margin-left: 4px;
  animation: ${slideIn} 0.3s ease-out;
  display: flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 8px;

  &::before {
    content: '⚠';
    font-size: 12px;
  }
`;

const stepTitles = {
  email: '이메일 입력',
  verification: '인증코드 확인',
  newPassword: '비밀번호 재설정',
};

const stepNumbers = {
  email: 1,
  verification: 2,
  newPassword: 3,
};

interface ForgotPasswordScreenProps {
  onBackToLogin: () => void;
}

function ForgotPasswordScreen({ onBackToLogin }: ForgotPasswordScreenProps) {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<ForgotPasswordStep>('email');
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
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

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      return '이메일을 입력해주세요.';
    }
    if (!emailRegex.test(email)) {
      return '올바른 이메일 형식을 입력해주세요.';
    }
    return '';
  };

  const validatePassword = (password: string) => {
    if (!password.trim()) {
      return '비밀번호를 입력해주세요.';
    }
    if (password.length < 8) {
      return '비밀번호는 8자 이상이어야 합니다.';
    }
    return '';
  };

  const handleEmailSubmit = async () => {
    const emailError = validateEmail(email);
    if (emailError) {
      setErrors({ email: emailError });
      return;
    }

    setErrors({});
    setIsLoading(true);
    try {
      // TODO: API 호출 - 이메일로 인증코드 발송
      // const response = await sendVerificationCode(email);
      window.alert('입력하신 이메일로 인증코드를 발송했습니다.');
      setCurrentStep('verification');
    } catch {
      window.alert('인증코드 발송에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerificationSubmit = async () => {
    if (!verificationCode.trim()) {
      setErrors({ verificationCode: '인증코드를 입력해주세요.' });
      return;
    }

    setErrors({});
    setIsLoading(true);
    try {
      // TODO: API 호출 - 이메일과 인증코드 검증
      // const response = await verifyCode(email, verificationCode);
      window.alert('인증코드가 확인되었습니다.');
      setCurrentStep('newPassword');
    } catch {
      setErrors({ verificationCode: '인증코드가 올바르지 않습니다.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordSubmit = async () => {
    const passwordError = validatePassword(newPassword);
    const confirmPasswordError =
      newPassword !== confirmPassword ? '비밀번호가 일치하지 않습니다.' : '';

    if (passwordError || confirmPasswordError) {
      setErrors({
        newPassword: passwordError,
        confirmPassword: confirmPasswordError,
      });
      return;
    }

    setErrors({});
    setIsLoading(true);
    try {
      // TODO: API 호출 - 새 비밀번호 설정
      // await resetPassword(tempToken, newPassword);
      window.alert('비밀번호가 성공적으로 변경되었습니다.');
      navigate('/login');
    } catch {
      window.alert('비밀번호 변경에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderEmailStep = () => (
    <>
      <FormContainer>
        <InputGroup hasError={!!errors.email}>
          <InputIcon>
            <IoMdMail size={22} />
          </InputIcon>
          <TextInput
            placeholder="이메일을 입력하세요"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setEmail(e.target.value);
              if (errors.email) {
                setErrors({});
              }
            }}
            type="email"
            hasError={!!errors.email}
          />
        </InputGroup>
        {errors.email && <ErrorText>{errors.email}</ErrorText>}

        <SubmitButton onClick={handleEmailSubmit} disabled={isLoading}>
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <SubmitButtonText>인증코드 발송</SubmitButtonText>
          )}
        </SubmitButton>
      </FormContainer>
    </>
  );

  const renderVerificationStep = () => (
    <>
      <FormContainer>
        <InputGroup hasError={!!errors.verificationCode}>
          <InputIcon>
            <IoMdKey size={22} />
          </InputIcon>
          <TextInput
            placeholder="인증코드를 입력하세요"
            value={verificationCode}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setVerificationCode(e.target.value);
              if (errors.verificationCode) {
                setErrors({});
              }
            }}
            type="text"
            hasError={!!errors.verificationCode}
          />
        </InputGroup>
        {errors.verificationCode && (
          <ErrorText>{errors.verificationCode}</ErrorText>
        )}

        <SubmitButton onClick={handleVerificationSubmit} disabled={isLoading}>
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <SubmitButtonText>인증코드 확인</SubmitButtonText>
          )}
        </SubmitButton>
      </FormContainer>
    </>
  );

  const renderNewPasswordStep = () => (
    <>
      <FormContainer>
        <InputGroup hasError={!!errors.newPassword}>
          <InputIcon>
            <IoMdLock size={22} />
          </InputIcon>
          <TextInput
            placeholder="새 비밀번호를 입력하세요"
            value={newPassword}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setNewPassword(e.target.value);
              if (errors.newPassword) {
                setErrors({});
              }
            }}
            type={showPassword ? 'text' : 'password'}
            hasError={!!errors.newPassword}
          />
          <PasswordToggle onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <IoMdEye size={20} /> : <IoMdEyeOff size={20} />}
          </PasswordToggle>
        </InputGroup>
        {errors.newPassword && <ErrorText>{errors.newPassword}</ErrorText>}

        <InputGroup hasError={!!errors.confirmPassword}>
          <InputIcon>
            <IoMdLock size={22} />
          </InputIcon>
          <TextInput
            placeholder="비밀번호를 다시 입력하세요"
            value={confirmPassword}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setConfirmPassword(e.target.value);
              if (errors.confirmPassword) {
                setErrors({});
              }
            }}
            type={showConfirmPassword ? 'text' : 'password'}
            hasError={!!errors.confirmPassword}
          />
          <PasswordToggle
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? (
              <IoMdEye size={20} />
            ) : (
              <IoMdEyeOff size={20} />
            )}
          </PasswordToggle>
        </InputGroup>
        {errors.confirmPassword && (
          <ErrorText>{errors.confirmPassword}</ErrorText>
        )}

        <SubmitButton onClick={handlePasswordSubmit} disabled={isLoading}>
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <SubmitButtonText>비밀번호 변경</SubmitButtonText>
          )}
        </SubmitButton>
      </FormContainer>
    </>
  );

  const getStepDescription = () => {
    switch (currentStep) {
      case 'email':
        return '가입하신 이메일 주소를 입력해주세요';
      case 'verification':
        return `${email}로 발송된 인증코드를 입력해주세요`;
      case 'newPassword':
        return '새로운 비밀번호를 입력해주세요';
      default:
        return '';
    }
  };

  return (
    <AppContainer>
      <MobileViewport>
        <ScrollContent>
          <ForgotPasswordContainer>
            <Header>
              <LogoContainer>
                <LogoText>ShootDoori</LogoText>
                <LogoAccent />
              </LogoContainer>
              <Tagline>{getStepDescription()}</Tagline>
            </Header>

            <ProgressContainer>
              <ProgressBar>
                <ProgressFill
                  width={`${(stepNumbers[currentStep] / 3) * 100}%`}
                />
              </ProgressBar>
              <StepText>
                <StepNumber>{stepNumbers[currentStep]} / 3</StepNumber>
                <StepTitle>{stepTitles[currentStep]}</StepTitle>
              </StepText>
            </ProgressContainer>

            {currentStep === 'email' && renderEmailStep()}
            {currentStep === 'verification' && renderVerificationStep()}
            {currentStep === 'newPassword' && renderNewPasswordStep()}
          </ForgotPasswordContainer>

          {!isKeyboardVisible && (
            <BackSection>
              <BackRow>
                <BackText>
                  {currentStep === 'email'
                    ? '계정이 있으신가요?'
                    : '이전 단계로'}
                </BackText>
                <BackLink
                  onClick={() => {
                    if (currentStep === 'email') {
                      onBackToLogin();
                    } else if (currentStep === 'verification') {
                      setCurrentStep('email');
                    } else if (currentStep === 'newPassword') {
                      setCurrentStep('verification');
                    }
                  }}
                >
                  {currentStep === 'email' ? '로그인' : '돌아가기'}
                </BackLink>
              </BackRow>
            </BackSection>
          )}
        </ScrollContent>
      </MobileViewport>
    </AppContainer>
  );
}

export default ForgotPasswordScreen;
