import { useMemo } from 'react';
import styled, { keyframes } from 'styled-components';
import { IoMdMail, IoMdLock } from 'react-icons/io';

import { EXTERNAL_LINKS } from '@/constants/external_links';
import type { RegisterFormData } from '@/hooks/useRegisterForm';
import {
  useRegisterValidation,
  accountValidationRules,
} from '@/hooks/useRegisterValidation';
import { theme } from '@/theme';

interface Props {
  data: RegisterFormData;
  onChange: <K extends keyof RegisterFormData>(
    key: K,
    value: RegisterFormData[K]
  ) => void;
  onSubmit: () => void;
  isLoading: boolean;
  handlePrev: () => void;
}

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

const _fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
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
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 12px;
  transition: all 0.3s ease;

  &:focus-within {
    transform: translateY(-1px);
  }

  &:hover {
    transform: translateY(-1px);
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
  width: 100%;
  padding: 16px 20px;
  font-size: 16px;
  color: ${theme.colors.text.main};
  background: rgba(255, 255, 255, 0.8);
  border: 2px solid ${theme.colors.gray[300]};
  border-radius: 12px;
  outline: none;
  transition: all 0.3s ease;

  &::placeholder {
    color: ${theme.colors.gray[500]};
  }

  &:focus {
    border-color: ${theme.colors.brand.main};
    box-shadow: 0 0 0 3px rgba(108, 142, 104, 0.1);
    background: rgba(255, 255, 255, 0.95);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const ErrorText = styled.div`
  font-size: 13px;
  color: ${theme.colors.red[500]};
  margin-left: 4px;
  margin-bottom: 4px;
  animation: ${slideIn} 0.3s ease-out;
  display: flex;
  align-items: center;
  gap: 4px;

  &::before {
    content: '⚠';
    font-size: 12px;
  }
`;

const AgreementContainer = styled.div`
  width: 100%;
  margin-top: 10px;
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 16px;
  padding: 12px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 12px;
  border: 1px solid rgba(108, 142, 104, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(108, 142, 104, 0.05);
    border-color: rgba(108, 142, 104, 0.2);
  }
`;

const Checkbox = styled.div<{ checked?: boolean }>`
  width: 20px;
  height: 20px;
  border: 2px solid
    ${props =>
      props.checked ? theme.colors.brand.main : theme.colors.gray[400]};
  border-radius: 6px;
  margin-right: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2px;
  background-color: ${props =>
    props.checked ? theme.colors.brand.main : 'transparent'};
  transition: all 0.3s ease;
`;

const Checkmark = styled.span`
  color: ${theme.colors.white};
  font-size: 12px;
  font-weight: bold;
`;

const CheckboxTextContainer = styled.div`
  flex: 1;
`;

const CheckboxText = styled.span`
  font-size: 14px;
  color: ${theme.colors.text.main};
  line-height: 20px;
  font-weight: 500;
`;

const LinkText = styled.button`
  font-size: 13px;
  color: ${theme.colors.brand.main};
  margin-top: 8px;
  text-decoration: underline;
  background: none;
  border: none;
  cursor: pointer;
  font-weight: 500;
  transition: color 0.3s ease;
  display: block;

  &:hover {
    color: ${theme.colors.grass[600]};
  }
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 20px;
`;

const SubmitButton = styled.button.withConfig({
  shouldForwardProp: prop => prop !== 'disabled',
})<{ disabled?: boolean }>`
  width: 100%;
  height: 56px;
  background: ${props =>
    props.disabled
      ? `linear-gradient(135deg, ${theme.colors.gray[400]} 0%, ${theme.colors.gray[500]} 100%)`
      : theme.colors.brand.main};
  border-radius: 16px;
  border: none;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  display: flex;
  align-items: center;
  justify-content: center;
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

const BackButton = styled.button`
  width: 100%;
  height: 48px;
  background: rgba(255, 255, 255, 0.6);
  border: 2px solid rgba(108, 142, 104, 0.2);
  border-radius: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);

  &:hover {
    background: rgba(108, 142, 104, 0.05);
    border-color: rgba(108, 142, 104, 0.4);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const BackButtonText = styled.span`
  color: ${theme.colors.text.sub};
  font-size: 15px;
  font-weight: 500;
  transition: color 0.3s ease;

  ${BackButton}:hover & {
    color: ${theme.colors.brand.main};
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

export function AccountSetup({
  data,
  onChange,
  onSubmit,
  isLoading,
  handlePrev,
}: Props) {
  const { errors, validateField } = useRegisterValidation(
    accountValidationRules
  );

  const handleFieldChange = (field: keyof RegisterFormData, value: string) => {
    onChange(field, value);
    const updatedData = { ...data, [field]: value };
    validateField(field, value, updatedData);

    if (field === 'password' && data.confirmPassword) {
      validateField('confirmPassword', data.confirmPassword, updatedData);
    }
  };

  const isValid = useMemo(() => {
    const emailValid =
      data.email &&
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(data.email);
    const passwordValid = !errors.password && data.password?.trim() !== '';
    const confirmPasswordValid =
      !errors.confirmPassword && data.confirmPassword?.trim() !== '';
    const termsAgreed = data.termsAgreed;
    const privacyAgreed = data.privacyAgreed;

    return (
      emailValid &&
      passwordValid &&
      confirmPasswordValid &&
      termsAgreed &&
      privacyAgreed
    );
  }, [data, errors]);

  return (
    <Container>
      <InputGroup hasError={!!errors.email}>
        <InputIcon>
          <IoMdMail size={22} />
        </InputIcon>
        <TextInput
          type="email"
          placeholder="이메일을 입력하세요"
          value={data.email || ''}
          onChange={e => handleFieldChange('email', e.target.value)}
          hasError={!!errors.email}
        />
      </InputGroup>
      {errors.email && <ErrorText>{errors.email}</ErrorText>}

      <InputGroup hasError={!!errors.password}>
        <InputIcon>
          <IoMdLock size={22} />
        </InputIcon>
        <TextInput
          placeholder="비밀번호를 입력하세요"
          type="password"
          value={data.password}
          onChange={e => handleFieldChange('password', e.target.value)}
          hasError={!!errors.password}
        />
      </InputGroup>
      {errors.password && <ErrorText>{errors.password}</ErrorText>}

      <InputGroup hasError={!!errors.confirmPassword}>
        <InputIcon>
          <IoMdLock size={22} />
        </InputIcon>
        <TextInput
          placeholder="비밀번호 확인"
          type="password"
          value={data.confirmPassword}
          onChange={e => handleFieldChange('confirmPassword', e.target.value)}
          hasError={!!errors.confirmPassword}
        />
      </InputGroup>
      {errors.confirmPassword && (
        <ErrorText>{errors.confirmPassword}</ErrorText>
      )}

      <AgreementContainer>
        <CheckboxContainer
          onClick={() => onChange('termsAgreed', !data.termsAgreed)}
        >
          <Checkbox checked={data.termsAgreed}>
            {data.termsAgreed && <Checkmark>✓</Checkmark>}
          </Checkbox>
          <CheckboxTextContainer>
            <CheckboxText>서비스 이용약관에 동의합니다</CheckboxText>
            <LinkText
              onClick={() => window.open(EXTERNAL_LINKS.TERMS_OF_SERVICE)}
            >
              약관 보기
            </LinkText>
          </CheckboxTextContainer>
        </CheckboxContainer>

        <CheckboxContainer
          onClick={() => onChange('privacyAgreed', !data.privacyAgreed)}
        >
          <Checkbox checked={data.privacyAgreed}>
            {data.privacyAgreed && <Checkmark>✓</Checkmark>}
          </Checkbox>
          <CheckboxTextContainer>
            <CheckboxText>개인정보 처리방침에 동의합니다</CheckboxText>
            <LinkText
              onClick={() => window.open(EXTERNAL_LINKS.PRIVACY_POLICY)}
            >
              정책 보기
            </LinkText>
          </CheckboxTextContainer>
        </CheckboxContainer>
      </AgreementContainer>

      <ButtonContainer>
        <SubmitButton onClick={onSubmit} disabled={!isValid || isLoading}>
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <SubmitButtonText>회원가입 완료</SubmitButtonText>
          )}
        </SubmitButton>

        <BackButton onClick={handlePrev}>
          <BackButtonText>← 이전</BackButtonText>
        </BackButton>
      </ButtonContainer>
    </Container>
  );
}
