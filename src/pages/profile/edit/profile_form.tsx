import { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { IoCheckmark } from 'react-icons/io5';

import { Dropdown } from '@/components/dropdown';
import { theme } from '@/theme';
import type { UserProfile, UpdateProfileRequest } from '@/types/profile';

// 애니메이션 정의
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.02);
  }
`;

// Styled Components
const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  animation: ${fadeInUp} 0.6s ease-out;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  background: linear-gradient(
    135deg,
    ${theme.colors.brand.main} 0%,
    ${theme.colors.grass[600]} 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0 0 24px 0;
  letter-spacing: -0.02em;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Label = styled.label`
  font-size: 1rem;
  font-weight: 600;
  color: ${theme.colors.text.main};
  opacity: 0.9;
`;

const Input = styled.input`
  padding: 16px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  font-size: 1rem;
  color: ${theme.colors.text.main};
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

  &:focus {
    outline: none;
    border-color: ${theme.colors.brand.main};
    box-shadow:
      0 0 0 3px rgba(59, 130, 246, 0.1),
      0 4px 16px rgba(0, 0, 0, 0.1);
    background: rgba(255, 255, 255, 0.8);
  }

  &:disabled {
    background: rgba(0, 0, 0, 0.05);
    color: ${theme.colors.text.sub};
    opacity: 0.6;
  }

  &::placeholder {
    color: ${theme.colors.text.sub};
    opacity: 0.7;
  }
`;

const TextArea = styled.textarea`
  padding: 16px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  font-size: 1rem;
  color: ${theme.colors.text.main};
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(10px);
  min-height: 120px;
  resize: none;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: ${theme.colors.brand.main};
    box-shadow:
      0 0 0 3px rgba(59, 130, 246, 0.1),
      0 4px 16px rgba(0, 0, 0, 0.1);
    background: rgba(255, 255, 255, 0.8);
  }

  &::placeholder {
    color: ${theme.colors.text.sub};
    opacity: 0.7;
  }
`;

const LevelContainer = styled.div`
  display: flex;
  gap: 12px;
`;

const LevelOption = styled.button<{ selected: boolean }>`
  flex: 1;
  padding: 20px 12px;
  min-height: 60px;
  border: 1px solid
    ${props =>
      props.selected ? theme.colors.brand.main : 'rgba(0, 0, 0, 0.1)'};
  border-radius: 12px;
  background: ${props =>
    props.selected
      ? `linear-gradient(135deg, ${theme.colors.brand.main}, ${theme.colors.grass[600]})`
      : 'rgba(255, 255, 255, 0.6)'};
  backdrop-filter: blur(10px);
  color: ${props => (props.selected ? 'white' : theme.colors.text.main)};
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
    background: ${props =>
      props.selected
        ? `linear-gradient(135deg, ${theme.colors.brand.main}, ${theme.colors.grass[600]})`
        : 'rgba(255, 255, 255, 0.8)'};
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 480px) {
    padding: 18px 8px;
    min-height: 56px;
    font-size: 0.85rem;
    gap: 6px;
  }
`;

const CheckIcon = styled(IoCheckmark)`
  font-size: 1.2rem;
  animation: ${fadeInUp} 0.3s ease-out;
`;

const SaveButton = styled.button<{ disabled?: boolean }>`
  width: 100%;
  padding: 18px;
  background: ${props =>
    props.disabled
      ? 'rgba(0, 0, 0, 0.1)'
      : `linear-gradient(135deg, ${theme.colors.brand.main}, ${theme.colors.grass[600]})`};
  color: ${props => (props.disabled ? theme.colors.text.sub : 'white')};
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  transition: all 0.3s ease;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
    animation: ${pulse} 0.6s ease-in-out;
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
  }
`;

const ErrorText = styled.span`
  font-size: 0.85rem;
  color: ${theme.colors.error || '#ef4444'};
  margin-top: 6px;
  font-weight: 500;
`;

const CharacterCount = styled.div`
  font-size: 0.8rem;
  color: ${theme.colors.text.sub};
  opacity: 0.7;
  text-align: right;
  margin-top: 4px;
`;

interface ProfileFormProps {
  initialData: UserProfile;
  onSave: (data: UpdateProfileRequest) => void;
  isLoading: boolean;
}

export function ProfileForm({
  initialData,
  onSave,
  isLoading,
}: ProfileFormProps) {
  const [formData, setFormData] = useState({
    name: initialData.name || '',
    skillLevel: initialData.skillLevel || 'AMATEUR',
    position: initialData.position || '',
    bio: initialData.bio || '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (formData.skillLevel && formData.skillLevel.length > 4) {
      newErrors.skillLevel = '실력은 4자 이하여야 합니다.';
    }

    if (formData.position && formData.position.length > 10) {
      newErrors.position = '포지션은 10자 이하여야 합니다.';
    }

    if (formData.bio && formData.bio.length > 500) {
      newErrors.bio = '자기소개는 500자 이하여야 합니다.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      const dataToSave = {
        name: initialData.name, // 원본 이름 유지
        skillLevel: formData.skillLevel,
        position: formData.position,
        bio: formData.bio,
      };
      onSave(dataToSave);
    }
  };

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <FormContainer>
      <SectionTitle>프로필 수정</SectionTitle>

      <InputGroup>
        <Label>이름</Label>
        <Input value={formData.name} disabled placeholder="이름" />
      </InputGroup>

      <InputGroup>
        <Label>실력</Label>
        <LevelContainer>
          {['AMATEUR', 'SEMI_PRO', 'PRO'].map(level => (
            <LevelOption
              key={level}
              selected={formData.skillLevel === level}
              onClick={() => updateField('skillLevel', level)}
            >
              {formData.skillLevel === level && <CheckIcon />}
              {level === 'AMATEUR'
                ? '아마추어'
                : level === 'SEMI_PRO'
                  ? '세미프로'
                  : '프로'}
            </LevelOption>
          ))}
        </LevelContainer>
        {errors.skillLevel && <ErrorText>{errors.skillLevel}</ErrorText>}
      </InputGroup>

      <InputGroup>
        <Label>포지션</Label>
        <Dropdown
          items={['골키퍼', '수비수', '미드필더', '공격수'] as const}
          value={formData.position || null}
          onChange={value => updateField('position', value)}
          placeholder="포지션을 선택하세요"
        />
        {errors.position && <ErrorText>{errors.position}</ErrorText>}
      </InputGroup>

      <InputGroup>
        <Label>자기소개</Label>
        <TextArea
          value={formData.bio}
          onChange={e => updateField('bio', e.target.value)}
          placeholder="자기소개를 입력하세요"
        />
        <CharacterCount>{formData.bio.length}/500</CharacterCount>
        {errors.bio && <ErrorText>{errors.bio}</ErrorText>}
      </InputGroup>

      <SaveButton onClick={handleSave} disabled={isLoading}>
        {isLoading ? '저장 중...' : '저장하기'}
      </SaveButton>
    </FormContainer>
  );
}
