import { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { IoMdSchool, IoMdLock, IoMdEye, IoMdEyeOff } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

import { useLoginMutation } from '@/hooks/queries';
import { useLoginForm } from '@/hooks/useLoginForm';
import { theme } from '@/styles/theme';

// 애니메이션 정의
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

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
`;

// Styled Components
const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
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

const ForgotPassword = styled.button`
  align-self: flex-end;
  margin-top: 8px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px 0;
  transition: all 0.3s ease;
  border-radius: 8px;

  &:hover {
    background: rgba(108, 142, 104, 0.05);
  }
`;

const ForgotPasswordText = styled.span`
  color: ${theme.colors.textSub};
  font-size: 14px;
  font-weight: 500;
  transition: color 0.3s ease;

  ${ForgotPassword}:hover & {
    color: ${theme.colors.brand.main};
  }
`;

const LoginButton = styled.button.withConfig({
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

const LoginButtonText = styled.span`
  color: ${theme.colors.white};
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.5px;
  position: relative;
  z-index: 1;
`;

const ErrorText = styled.div`
  font-size: 13px;
  color: ${theme.colors.error};
  margin-left: 4px;
  animation: ${slideIn} 0.3s ease-out;
  display: flex;
  align-items: center;
  gap: 4px;

  &::before {
    content: '⚠';
    font-size: 12px;
  }
`;

const LoadingSpinner = styled.div`
  width: 24px;
  height: 24px;
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

function LoginForm() {
  const { formData, errors, updateField, validateForm } = useLoginForm();
  const loginMutation = useLoginMutation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState<string>('');

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setPasswordError('');
    try {
      await loginMutation.mutateAsync(formData);
    } catch (error: unknown) {
      const errorMessage = (error as Error).message || '로그인에 실패했습니다.';

      if (
        errorMessage.includes('비밀번호') ||
        errorMessage.includes('password') ||
        errorMessage.includes('인증') ||
        errorMessage.includes('credentials')
      ) {
        setPasswordError('비밀번호가 올바르지 않습니다.');
      } else {
        window.alert(errorMessage);
      }
    }
  };

  const handlePasswordChange = () => {
    setPasswordError('');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container>
      <InputGroup hasError={!!errors.email}>
        <InputIcon>
          <IoMdSchool size={22} />
        </InputIcon>
        <TextInput
          placeholder="이메일을 입력하세요"
          value={formData.email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            updateField('email', e.target.value)
          }
          type="email"
          hasError={!!errors.email}
        />
      </InputGroup>
      {errors.email && <ErrorText>{errors.email}</ErrorText>}

      <InputGroup hasError={!!(errors.password || passwordError)}>
        <InputIcon>
          <IoMdLock size={22} />
        </InputIcon>
        <TextInput
          placeholder="비밀번호를 입력하세요"
          value={formData.password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            updateField('password', e.target.value);
            handlePasswordChange();
          }}
          type={showPassword ? 'text' : 'password'}
          hasError={!!(errors.password || passwordError)}
        />
        <PasswordToggle onClick={togglePasswordVisibility}>
          {showPassword ? <IoMdEye size={20} /> : <IoMdEyeOff size={20} />}
        </PasswordToggle>
      </InputGroup>
      {(errors.password || passwordError) && (
        <ErrorText>{errors.password || passwordError}</ErrorText>
      )}

      <ForgotPassword onClick={() => navigate('/forgot-password')}>
        <ForgotPasswordText>비밀번호를 잊으셨나요?</ForgotPasswordText>
      </ForgotPassword>

      <LoginButton onClick={handleSubmit} disabled={loginMutation.isPending}>
        {loginMutation.isPending ? (
          <LoadingSpinner />
        ) : (
          <LoginButtonText>로그인</LoginButtonText>
        )}
      </LoginButton>
    </Container>
  );
}

export default LoginForm;
