import { useState } from 'react';
import styled from '@emotion/styled';
import { theme } from '@/theme';
import { useLoginMutation } from '@/hooks/queries';
import { useLoginForm } from '@/hooks/useLoginForm';

interface LoginFormProps {
  onLoginSuccess?: () => void;
}

export function LoginForm({ onLoginSuccess }: LoginFormProps) {
  const {
    email,
    password,
    emailError,
    passwordError,
    handleEmailChange,
    handlePasswordChange,
    handleEmailBlur,
    handlePasswordBlur,
    isValid,
  } = useLoginForm();
  const loginMutation = useLoginMutation();
  const [passwordErrorCustom, setPasswordErrorCustom] = useState<string>('');

  const handleSubmit = async () => {
    if (!isValid) return;

    setPasswordErrorCustom('');
    // 검증 없이 바로 로그인 성공 처리
    onLoginSuccess?.();
  };

  const handlePasswordChangeInternal = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    handlePasswordChange(e);
    setPasswordErrorCustom('');
  };

  return (
    <LoginContainer>
      <HeaderContainer>
        <LogoText>ShootDoori</LogoText>
        <Tagline>대학교 축구 연결 서비스</Tagline>
      </HeaderContainer>

      <FormContainer>
        <InputGroup>
          <IconWrapper>
            <SchoolIcon />
          </IconWrapper>
          <InputField
            type="email"
            placeholder="이메일을 입력하세요"
            value={email}
            onChange={handleEmailChange}
            onBlur={handleEmailBlur}
            hasError={!!emailError}
            disabled={loginMutation.isPending}
          />
        </InputGroup>
        {emailError && <ErrorMessage>{emailError}</ErrorMessage>}

        <InputGroup>
          <IconWrapper>
            <LockIcon />
          </IconWrapper>
          <InputField
            type="password"
            placeholder="비밀번호를 입력하세요"
            value={password}
            onChange={handlePasswordChangeInternal}
            onBlur={handlePasswordBlur}
            hasError={!!passwordError || !!passwordErrorCustom}
            disabled={loginMutation.isPending}
          />
        </InputGroup>
        {(passwordError || passwordErrorCustom) && (
          <ErrorMessage>{passwordError || passwordErrorCustom}</ErrorMessage>
        )}

        <ForgotPasswordLink href="/forgot-password">
          비밀번호를 잊으셨나요?
        </ForgotPasswordLink>

        <LoginButton
          onClick={handleSubmit}
          disabled={loginMutation.isPending}
          isLoading={loginMutation.isPending}
        >
          {loginMutation.isPending ? '로그인 중...' : '로그인'}
        </LoginButton>

        <SignupSection>
          <SignupRow>
            <SignupText>계정이 없으신가요?</SignupText>
            <SignupLink href="/register">회원가입</SignupLink>
          </SignupRow>
        </SignupSection>
      </FormContainer>
    </LoginContainer>
  );
}

const LoginContainer = styled.div`
  width: 100%;
  padding: 0 ${theme.spacing.spacing8}px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  box-sizing: border-box;
  padding-top: calc(50vh - 100px);
`;

const HeaderContainer = styled.div`
  text-align: center;
  margin-bottom: ${theme.spacing.spacing8}px;
`;

const LogoText = styled.h1`
  font-size: ${theme.spacing.spacing12}px;
  font-weight: 700;
  color: #779966;
  margin: 0 0 ${theme.spacing.spacing2}px 0;
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  letter-spacing: -0.5px;
`;

const Tagline = styled.p`
  font-size: ${theme.spacing.spacing6}px;
  color: #808080;
  text-align: center;
  font-weight: 400;
  line-height: 1.4;
  margin: 0;
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
`;

const FormContainer = styled.div`
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
`;

const InputGroup = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${theme.colors.border.input};
  padding: ${theme.spacing.spacing2}px 0;
  margin-bottom: ${theme.spacing.spacing3}px;
  height: ${theme.spacing.spacing14}px;
`;

const IconWrapper = styled.div`
  margin-right: ${theme.spacing.spacing2}px;
  width: ${theme.spacing.spacing6}px;
  height: ${theme.spacing.spacing6}px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InputField = styled.input<{ hasError?: boolean }>`
  flex: 1;
  font-size: ${theme.typography.text.body.fontSize}px;
  color: ${theme.colors.text.main};
  border: none;
  outline: none;
  background: transparent;
  padding: 0;
  height: ${theme.spacing.spacing6}px;

  &::placeholder {
    color: ${theme.colors.text.sub};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  ${props =>
    props.hasError &&
    `
    color: ${theme.colors.error};
  `}
`;

const ForgotPasswordLink = styled.a`
  align-self: flex-end;
  margin-bottom: ${theme.spacing.spacing4}px;
  color: ${theme.colors.text.sub};
  font-size: ${theme.typography.text.bodySmall.fontSize}px;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const LoginButton = styled.button<{ isLoading?: boolean }>`
  background-color: ${theme.colors.success};
  border-radius: ${theme.spacing.spacing13}px;
  padding: ${theme.spacing.spacing5}px ${theme.spacing.spacing18}px;
  border: none;
  align-self: center;
  opacity: 0.9;
  cursor: pointer;
  transition: all 0.2s ease;
  color: ${theme.colors.white};
  font-size: ${theme.typography.text.button.fontSize}px;
  font-weight: ${theme.typography.text.button.fontWeight};

  ${props =>
    props.disabled &&
    `
    background-color: ${theme.colors.gray[400]};
    cursor: not-allowed;
  `}

  &:hover:not(:disabled) {
    opacity: 1;
  }

  &:active:not(:disabled) {
    transform: translateY(1px);
  }
`;

const SignupSection = styled.div`
  margin-top: ${theme.spacing.spacing5}px;
  text-align: center;
  padding: 0 ${theme.spacing.spacing5}px;
`;

const SignupRow = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: ${theme.spacing.spacing2}px;
`;

const SignupText = styled.span`
  color: ${theme.colors.text.sub};
  font-size: ${theme.typography.text.body.fontSize}px;
  font-weight: ${theme.typography.fontWeight.regular};
  line-height: ${theme.typography.text.body.lineHeight};
`;

const SignupLink = styled.a`
  color: ${theme.colors.brand.main};
  font-size: ${theme.typography.text.body.fontSize}px;
  font-weight: ${theme.typography.fontWeight.semibold};
  text-decoration: underline;
  line-height: ${theme.typography.text.body.lineHeight};

  &:hover {
    text-decoration: none;
  }
`;

const ErrorMessage = styled.div`
  font-size: ${theme.typography.text.caption.fontSize}px;
  color: ${theme.colors.error};
  margin-left: ${theme.spacing.spacing1}px;
  margin-bottom: ${theme.spacing.spacing2}px;
`;

// 아이콘 SVG 컴포넌트들
const SchoolIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#779966"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12v5c3 3 9 3 12 0v-5" />
  </svg>
);

const LockIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#779966"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <circle cx="12" cy="16" r="1" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);
