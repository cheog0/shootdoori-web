import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import styled, { keyframes } from 'styled-components';
import { IoMdSchool, IoMdMail } from 'react-icons/io';

import { UNIVERSITIES } from '@/constants/universities';
import type { RegisterFormData } from '@/hooks/useRegisterForm';
import {
  useRegisterValidation,
  emailValidationRules,
} from '@/hooks/useRegisterValidation';
import { theme } from '@/theme';

interface Props {
  data: RegisterFormData;
  onChange: <K extends keyof RegisterFormData>(
    key: K,
    value: RegisterFormData[K]
  ) => void;
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
  margin-bottom: 1px;
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

// 드롭다운 컨테이너
const DropdownContainer = styled.div`
  width: 100%;
  position: relative;
`;

// 커스텀 Input 스타일 - 드롭다운과 통합된 디자인
const CustomInput = styled.input`
  width: 100%;
  padding: 16px 20px;
  font-size: 16px;
  color: ${theme.colors.text.main};
  background: rgba(255, 255, 255, 0.8);
  border: 2px solid ${theme.colors.gray[300]};
  border-radius: 12px;
  outline: none;
  transition: all 0.3s ease;
  position: relative;

  &::placeholder {
    color: ${theme.colors.gray[500]};
  }

  &:focus {
    border-color: ${theme.colors.brand.main};
    box-shadow: 0 0 0 3px rgba(108, 142, 104, 0.1);
    background: rgba(255, 255, 255, 0.95);
  }

  &:read-only {
    cursor: pointer;
    background: rgba(255, 255, 255, 0.8);
  }

  /* 드롭다운 화살표 추가 */
  &::after {
    content: '▼';
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
    color: ${theme.colors.gray[400]};
    font-size: 12px;
    pointer-events: none;
    z-index: -1;
  }
`;

// 포털 드롭다운 스타일 - 더 깔끔한 디자인
const PortalDropdown = styled.div.withConfig({
  shouldForwardProp: prop => prop !== 'position',
})<{
  position: { top: number; left: number; width: number };
}>`
  position: fixed;
  top: ${props => props.position.top}px;
  left: ${props => props.position.left}px;
  width: ${props => props.position.width}px;
  z-index: 99999;
  background: ${theme.colors.white};
  border: 1px solid ${theme.colors.gray[200]};
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  max-height: 200px;
  overflow-y: auto;

  button {
    width: 100%;
    padding: 14px 20px;
    font-size: 15px;
    color: ${theme.colors.text.main};
    border: none;
    background: transparent;
    text-align: left;
    transition: all 0.2s ease;
    cursor: pointer;
    border-bottom: 1px solid ${theme.colors.gray[100]};

    &:hover {
      background: ${theme.colors.gray[50]};
      color: ${theme.colors.brand.main};
    }

    &:last-child {
      border-bottom: none;
      border-radius: 0 0 12px 12px;
    }

    &:first-child {
      border-radius: 12px 12px 0 0;
    }
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

const NextButtonText = styled.span`
  color: ${theme.colors.white};
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.5px;
  position: relative;
  z-index: 1;
`;

export function EmailVerification({ data, onChange, handleNext }: Props) {
  const { validateField, errors } = useRegisterValidation(emailValidationRules);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
  });
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 로컬 상태로 대학교 값 관리
  const [selectedUniversity, setSelectedUniversity] = useState(
    data.university || ''
  );

  const handleFieldChange = (field: keyof RegisterFormData, value: string) => {
    onChange(field, value);
    validateField(field, value, data);
  };

  const calculateDropdownPosition = () => {
    if (dropdownRef.current) {
      const rect = dropdownRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY + 8,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
  };

  const handleDropdownToggle = (isOpen: boolean) => {
    setIsDropdownOpen(isOpen);
    if (isOpen) {
      calculateDropdownPosition();
    }
  };

  const handleUniversitySelect = (university: string) => {
    setSelectedUniversity(university);
    onChange('university', university);
    setIsDropdownOpen(false);
  };

  // data.university가 변경될 때 로컬 상태 동기화
  useEffect(() => {
    setSelectedUniversity(data.university || '');
  }, [data.university]);

  // 드롭다운 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;

      // 드롭다운 컨테이너나 Portal 드롭다운 내부가 아닌 경우 닫기
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(target) &&
        !target.closest('[data-portal-dropdown]')
      ) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  const isValid = () => {
    const universityValid = data.university?.trim() !== '';
    const emailValid =
      data.universityEmail &&
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
        data.universityEmail
      );

    return (
      universityValid &&
      emailValid &&
      !errors.university &&
      !errors.universityEmail
    );
  };

  return (
    <Container>
      <InputGroup hasError={!!errors.university}>
        <InputIcon>
          <IoMdSchool size={22} />
        </InputIcon>
        <DropdownContainer ref={dropdownRef}>
          <CustomInput
            value={selectedUniversity}
            placeholder="대학교를 선택하세요"
            readOnly
            onClick={() => handleDropdownToggle(true)}
          />
        </DropdownContainer>
      </InputGroup>
      {errors.university && <ErrorText>{errors.university}</ErrorText>}

      <InputGroup hasError={!!errors.universityEmail}>
        <InputIcon>
          <IoMdMail size={22} />
        </InputIcon>
        <CustomInput
          type="email"
          placeholder="대학교 이메일을 입력하세요"
          value={data.universityEmail || ''}
          onChange={e => handleFieldChange('universityEmail', e.target.value)}
        />
      </InputGroup>
      {errors.universityEmail && (
        <ErrorText>{errors.universityEmail}</ErrorText>
      )}

      <NextButton onClick={handleNext} disabled={!isValid()}>
        <NextButtonText>다음 단계</NextButtonText>
      </NextButton>

      {/* Portal 드롭다운 */}
      {isDropdownOpen &&
        typeof window !== 'undefined' &&
        createPortal(
          <PortalDropdown position={dropdownPosition} data-portal-dropdown>
            {UNIVERSITIES.map(uni => (
              <button
                key={uni.name}
                type="button"
                onClick={e => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleUniversitySelect(uni.name);
                }}
                onMouseDown={e => {
                  e.preventDefault();
                }}
              >
                {uni.name}
              </button>
            ))}
          </PortalDropdown>,
          document.body
        )}
    </Container>
  );
}
