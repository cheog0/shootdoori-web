import React, { useState } from 'react';
import styled from 'styled-components';

import { UNIVERSITIES } from '@/constants/universities';
import { TeamType, TEAM_TYPES } from '@/types/team';

// Styled Components
const Container = styled.div`
  flex: 1;
  background-color: #f8f9fa;
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormSection = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 20px 0;
`;

const InputGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
`;

const Input = styled.input<{ error?: boolean }>`
  width: 100%;
  padding: 12px;
  border: 1px solid ${props => (props.error ? '#ef4444' : '#d1d5db')};
  border-radius: 8px;
  font-size: 16px;
  color: #374151;
  background-color: white;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  &:disabled {
    background-color: #f9fafb;
    color: #9ca3af;
  }
`;

const ErrorText = styled.span`
  font-size: 14px;
  color: #ef4444;
  margin-top: 4px;
`;

const DropdownContainer = styled.div`
  position: relative;
`;

const DropdownButton = styled.button<{ error?: boolean }>`
  width: 100%;
  padding: 12px;
  border: 1px solid ${props => (props.error ? '#ef4444' : '#d1d5db')};
  border-radius: 8px;
  font-size: 16px;
  color: #374151;
  background-color: white;
  text-align: left;
  cursor: pointer;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const DropdownList = styled.div<{ visible: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: white;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  max-height: 200px;
  overflow-y: auto;
  display: ${props => (props.visible ? 'block' : 'none')};
`;

const DropdownItem = styled.button`
  width: 100%;
  padding: 12px;
  border: none;
  background-color: white;
  text-align: left;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #f3f4f6;
  }

  &:first-child {
    border-radius: 8px 8px 0 0;
  }

  &:last-child {
    border-radius: 0 0 8px 8px;
  }
`;

const TeamTypeContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const TeamTypeOption = styled.button<{ selected: boolean }>`
  padding: 12px 16px;
  border: 1px solid ${props => (props.selected ? '#3b82f6' : '#d1d5db')};
  border-radius: 8px;
  background-color: ${props => (props.selected ? '#3b82f6' : 'white')};
  color: ${props => (props.selected ? 'white' : '#374151')};
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #3b82f6;
    background-color: ${props => (props.selected ? '#2563eb' : '#f8fafc')};
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 12px;
  padding: 20px;
  background-color: white;
  border-top: 1px solid #e5e7eb;
`;

const Button = styled.button<{ variant: 'primary' | 'secondary' }>`
  flex: 1;
  padding: 16px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;

  ${props =>
    props.variant === 'primary'
      ? `
    background-color: #3b82f6;
    color: white;

    &:hover {
      background-color: #2563eb;
    }

    &:disabled {
      background-color: #9ca3af;
      cursor: not-allowed;
    }
  `
      : `
    background-color: #f3f4f6;
    color: #374151;

    &:hover {
      background-color: #e5e7eb;
    }
  `}
`;

interface TeamBasicInfoProps {
  teamName: string;
  university: string;
  teamType: TeamType;
  onTeamNameChange: (name: string) => void;
  onUniversityChange: (university: string) => void;
  onTeamTypeChange: (type: TeamType) => void;
  onNext: () => void;
  onBack: () => void;
  errors: {
    name?: string;
    university?: string;
    teamType?: string;
  };
}

export default function TeamBasicInfo({
  teamName,
  university,
  teamType,
  onTeamNameChange,
  onUniversityChange,
  onTeamTypeChange,
  onNext,
  onBack,
  errors,
}: TeamBasicInfoProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const isValid =
    teamName.trim().length > 0 &&
    teamName.length <= 100 &&
    university.trim().length > 0 &&
    university.length <= 100 &&
    teamType.length > 0;

  const handleUniversitySelect = (selectedUniversity: string) => {
    onUniversityChange(selectedUniversity);
    setIsDropdownOpen(false);
  };

  return (
    <Container>
      <Content>
        <FormSection>
          <SectionTitle>팀 기본 정보</SectionTitle>

          <InputGroup>
            <Label>팀 이름</Label>
            <Input
              placeholder="팀 이름을 입력하세요"
              value={teamName}
              onChange={e => onTeamNameChange(e.target.value)}
              error={!!errors.name}
            />
            {errors.name && <ErrorText>{errors.name}</ErrorText>}
          </InputGroup>

          <InputGroup>
            <Label>대학교</Label>
            <DropdownContainer>
              <DropdownButton
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                error={!!errors.university}
              >
                {university || '대학교를 선택하세요'}
              </DropdownButton>
              <DropdownList visible={isDropdownOpen}>
                {UNIVERSITIES.map(uni => (
                  <DropdownItem
                    key={uni.name}
                    onClick={() => handleUniversitySelect(uni.name)}
                  >
                    {uni.name}
                  </DropdownItem>
                ))}
              </DropdownList>
            </DropdownContainer>
            {errors.university && <ErrorText>{errors.university}</ErrorText>}
          </InputGroup>

          <InputGroup>
            <Label>팀 유형</Label>
            <TeamTypeContainer>
              {TEAM_TYPES.map(type => (
                <TeamTypeOption
                  key={type.value}
                  selected={teamType === type.value}
                  onClick={() => onTeamTypeChange(type.value)}
                >
                  {type.label}
                </TeamTypeOption>
              ))}
            </TeamTypeContainer>
            {errors.teamType && <ErrorText>{errors.teamType}</ErrorText>}
          </InputGroup>
        </FormSection>
      </Content>

      <ButtonContainer>
        <Button variant="secondary" onClick={onBack}>
          이전
        </Button>
        <Button variant="primary" onClick={onNext} disabled={!isValid}>
          다음
        </Button>
      </ButtonContainer>
    </Container>
  );
}
