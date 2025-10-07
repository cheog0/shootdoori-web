import { useMemo, useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import {
  IoMdPerson,
  IoMdChatbubbles,
  IoMdSchool,
  IoMdBusiness,
  IoMdStar,
  IoMdFootball,
} from 'react-icons/io';

import type { RegisterFormData } from '@/hooks/useRegisterForm';
import {
  useRegisterValidation,
  profileValidationRules,
} from '@/hooks/useRegisterValidation';
import { theme } from '@/theme';

interface Props {
  data: RegisterFormData;
  onChange: <K extends keyof RegisterFormData>(
    key: K,
    value: RegisterFormData[K]
  ) => void;
  handlePrev: () => void;
  handleNext: () => void;
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
      props.hasError ? theme.colors.red[500] : 'rgba(108, 142, 104, 0.2)'};
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
      props.hasError ? theme.colors.red[500] : theme.colors.brand.main};
    box-shadow:
      0 8px 24px rgba(108, 142, 104, 0.15),
      inset 0 1px 0 rgba(255, 255, 255, 0.9);
    transform: translateY(-2px);
  }

  &:hover {
    border-color: ${props =>
      props.hasError ? theme.colors.red[500] : 'rgba(108, 142, 104, 0.4)'};
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
  color: ${theme.colors.text.main};
  border: none;
  outline: none;
  background: transparent;
  padding: 0;
  transition: all 0.3s ease;

  &::placeholder {
    color: ${theme.colors.text.sub};
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

const ErrorText = styled.div`
  font-size: 13px;
  color: ${theme.colors.red[500]};
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

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 20px;
`;

const NextButton = styled.button.withConfig({
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

const NextButtonText = styled.span`
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

const DropdownContainer = styled.div`
  position: relative;
  width: 100%;
`;

const DropdownButton = styled.button.withConfig({
  shouldForwardProp: prop => prop !== 'hasError',
})<{ hasError?: boolean }>`
  width: 100%;
  height: 56px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 16px;
  border: 2px solid
    ${props =>
      props.hasError ? theme.colors.red[500] : 'rgba(108, 142, 104, 0.2)'};
  padding: 16px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  box-shadow:
    0 4px 12px rgba(0, 0, 0, 0.05),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
  cursor: pointer;

  &:hover {
    border-color: ${props =>
      props.hasError ? theme.colors.red[500] : 'rgba(108, 142, 104, 0.4)'};
  }

  &:focus {
    border-color: ${props =>
      props.hasError ? theme.colors.red[500] : theme.colors.brand.main};
    box-shadow:
      0 8px 24px rgba(108, 142, 104, 0.15),
      inset 0 1px 0 rgba(255, 255, 255, 0.9);
    transform: translateY(-2px);
  }
`;

const DropdownContent = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  border: 2px solid rgba(108, 142, 104, 0.2);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  z-index: 1000;
  max-height: 200px;
  overflow-y: auto;
  margin-top: 4px;
`;

const DropdownItem = styled.button`
  width: 100%;
  padding: 12px 20px;
  border: none;
  background: transparent;
  text-align: left;
  cursor: pointer;
  transition: background-color 0.2s ease;
  font-size: 16px;
  color: ${theme.colors.text.main};

  &:hover {
    background: rgba(108, 142, 104, 0.1);
  }

  &:first-child {
    border-radius: 10px 10px 0 0;
  }

  &:last-child {
    border-radius: 0 0 10px 10px;
  }
`;

const DropdownText = styled.span`
  color: ${theme.colors.text.main};
  font-size: 16px;
`;

const DropdownIcon = styled.div`
  color: ${theme.colors.brand.main};
  opacity: 0.7;
  transition: all 0.3s ease;
`;

export function ProfileInfo({ data, onChange, handlePrev, handleNext }: Props) {
  const { validateField, errors } = useRegisterValidation(
    profileValidationRules
  );
  const [isSkillLevelDropdownOpen, setIsSkillLevelDropdownOpen] =
    useState(false);
  const [isPositionDropdownOpen, setIsPositionDropdownOpen] = useState(false);

  const skillLevelOptions = ['초급', '중급', '고급', '세미프로', '프로'];
  const positionOptions = [
    '골키퍼',
    '수비수',
    '미드필더',
    '공격수',
    '풀백',
    '윙어',
  ];

  const handleFieldChange = <K extends keyof RegisterFormData>(
    key: K,
    value: string
  ) => {
    onChange(key, value as RegisterFormData[K]);
    validateField(key, value, data);
  };

  const isFormValid = useMemo(() => {
    const nameValid = !errors.name && data.name?.trim() !== '';
    const skillLevelValid =
      !errors.skillLevel && data.skillLevel?.trim() !== '';
    const kakaotalkIdValid =
      !errors.kakaotalkId && data.kakaoTalkId?.trim() !== '';
    const positionValid = !errors.position && data.position?.trim() !== '';
    const studentYearValid =
      !errors.studentYear && data.studentYear?.trim() !== '';
    const departmentValid =
      !errors.department && data.department?.trim() !== '';

    return (
      nameValid &&
      skillLevelValid &&
      kakaotalkIdValid &&
      positionValid &&
      studentYearValid &&
      departmentValid
    );
  }, [data, errors]);

  // 드롭다운 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('[data-dropdown-container]')) {
        setIsSkillLevelDropdownOpen(false);
        setIsPositionDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <Container>
      <InputGroup hasError={!!errors.name}>
        <InputIcon>
          <IoMdPerson size={22} />
        </InputIcon>
        <TextInput
          type="text"
          placeholder="이름을 입력하세요"
          value={data.name}
          onChange={e => handleFieldChange('name', e.target.value)}
          hasError={!!errors.name}
        />
      </InputGroup>
      {errors.name && <ErrorText>{errors.name}</ErrorText>}

      <DropdownContainer data-dropdown-container>
        <DropdownButton
          hasError={!!errors.skillLevel}
          onClick={() => setIsSkillLevelDropdownOpen(!isSkillLevelDropdownOpen)}
        >
          <InputIcon>
            <IoMdStar size={22} />
          </InputIcon>
          <DropdownText>{data.skillLevel || '실력을 선택하세요'}</DropdownText>
          <DropdownIcon>▼</DropdownIcon>
        </DropdownButton>
        {isSkillLevelDropdownOpen && (
          <DropdownContent>
            {skillLevelOptions.map(option => (
              <DropdownItem
                key={option}
                onClick={() => {
                  handleFieldChange('skillLevel', option);
                  setIsSkillLevelDropdownOpen(false);
                }}
              >
                {option}
              </DropdownItem>
            ))}
          </DropdownContent>
        )}
      </DropdownContainer>
      {errors.skillLevel && <ErrorText>{errors.skillLevel}</ErrorText>}

      <InputGroup hasError={!!errors.kakaotalkId}>
        <InputIcon>
          <IoMdChatbubbles size={22} />
        </InputIcon>
        <TextInput
          type="text"
          placeholder="카카오톡 ID를 입력하세요"
          value={data.kakaoTalkId}
          onChange={e => handleFieldChange('kakaoTalkId', e.target.value)}
          hasError={!!errors.kakaotalkId}
        />
      </InputGroup>
      {errors.kakaotalkId && <ErrorText>{errors.kakaotalkId}</ErrorText>}

      <DropdownContainer data-dropdown-container>
        <DropdownButton
          hasError={!!errors.position}
          onClick={() => setIsPositionDropdownOpen(!isPositionDropdownOpen)}
        >
          <InputIcon>
            <IoMdFootball size={22} />
          </InputIcon>
          <DropdownText>{data.position || '포지션을 선택하세요'}</DropdownText>
          <DropdownIcon>▼</DropdownIcon>
        </DropdownButton>
        {isPositionDropdownOpen && (
          <DropdownContent>
            {positionOptions.map(option => (
              <DropdownItem
                key={option}
                onClick={() => {
                  handleFieldChange('position', option);
                  setIsPositionDropdownOpen(false);
                }}
              >
                {option}
              </DropdownItem>
            ))}
          </DropdownContent>
        )}
      </DropdownContainer>
      {errors.position && <ErrorText>{errors.position}</ErrorText>}

      <InputGroup hasError={!!errors.studentYear}>
        <InputIcon>
          <IoMdSchool size={22} />
        </InputIcon>
        <TextInput
          type="text"
          placeholder="학년을 입력하세요 (예: 25)"
          value={data.studentYear}
          onChange={e => {
            const value = e.target.value;
            // 숫자만 입력 가능하고 최대 2자리
            if (/^\d{0,2}$/.test(value)) {
              handleFieldChange('studentYear', value);
            }
          }}
          hasError={!!errors.studentYear}
          maxLength={2}
        />
      </InputGroup>
      {errors.studentYear && <ErrorText>{errors.studentYear}</ErrorText>}

      <InputGroup hasError={!!errors.department}>
        <InputIcon>
          <IoMdBusiness size={22} />
        </InputIcon>
        <TextInput
          type="text"
          placeholder="학과를 입력하세요"
          value={data.department}
          onChange={e => handleFieldChange('department', e.target.value)}
          hasError={!!errors.department}
        />
      </InputGroup>
      {errors.department && <ErrorText>{errors.department}</ErrorText>}

      <ButtonContainer>
        <NextButton disabled={!isFormValid} onClick={handleNext}>
          <NextButtonText>다음 단계</NextButtonText>
        </NextButton>

        <BackButton onClick={handlePrev}>
          <BackButtonText>← 이전</BackButtonText>
        </BackButton>
      </ButtonContainer>
    </Container>
  );
}
