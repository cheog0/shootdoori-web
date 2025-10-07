import React from 'react';
import styled from 'styled-components';
import { ChevronBack, ChevronForward, Lock } from 'lucide-react';

import { colors, theme } from '@/theme';
import { TeamType, TEAM_TYPES } from '@/types/team';

// Styled Components
const StepContainer = styled.div`
  flex: 1;
  padding: ${theme.spacing.spacing4};
  display: flex;
  flex-direction: column;
`;

const StepHeader = styled.div`
  margin-bottom: ${theme.spacing.spacing6};
`;

const StepTitle = styled.h2`
  font-size: ${theme.typography.fontSize.font6};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.gray[900]};
  margin: 0 0 ${theme.spacing.spacing2} 0;
`;

const StepSubtitle = styled.p`
  font-size: ${theme.typography.fontSize.font4};
  color: ${theme.colors.gray[600]};
  margin: 0;
`;

const StepContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.spacing6};
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.spacing2};
`;

const InputLabel = styled.label`
  font-size: ${theme.typography.fontSize.font4};
  font-weight: ${theme.typography.fontWeight.medium};
  color: ${theme.colors.gray[700]};
`;

const StepTextInput = styled.input`
  padding: ${theme.spacing.spacing3} ${theme.spacing.spacing4};
  border: 1px solid ${theme.colors.gray[300]};
  border-radius: ${theme.spacing.spacing2};
  font-size: ${theme.typography.fontSize.font4};
  background-color: ${theme.colors.white};

  &:focus {
    outline: none;
    border-color: ${theme.colors.brand.main};
  }

  &.error {
    border-color: ${theme.colors.red[500]};
  }
`;

const DropdownButton = styled.div`
  padding: ${theme.spacing.spacing3} ${theme.spacing.spacing4};
  border: 1px solid ${theme.colors.gray[300]};
  border-radius: ${theme.spacing.spacing2};
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${theme.colors.gray[50]};
  cursor: not-allowed;

  &.error {
    border-color: ${theme.colors.red[500]};
  }
`;

const DropdownButtonText = styled.span`
  font-size: ${theme.typography.fontSize.font4};
  color: ${theme.colors.gray[600]};

  &.placeholder {
    color: ${theme.colors.gray[400]};
  }
`;

const SelectorContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing.spacing2};
`;

const StepSelectorButton = styled.button`
  padding: ${theme.spacing.spacing3} ${theme.spacing.spacing4};
  border: 1px solid ${theme.colors.gray[300]};
  border-radius: ${theme.spacing.spacing2};
  background-color: ${theme.colors.white};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: ${theme.colors.brand.main};
  }

  &.active {
    background-color: ${theme.colors.brand.main};
    border-color: ${theme.colors.brand.main};
  }
`;

const StepSelectorButtonText = styled.span`
  font-size: ${theme.typography.fontSize.font4};
  color: ${theme.colors.gray[700]};

  .active & {
    color: ${theme.colors.white};
  }
`;

const StepFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: ${theme.spacing.spacing6};
`;

const NextButton = styled.button`
  padding: ${theme.spacing.spacing3} ${theme.spacing.spacing6};
  background-color: ${theme.colors.brand.main};
  border: none;
  border-radius: ${theme.spacing.spacing2};
  color: ${theme.colors.white};
  font-size: ${theme.typography.fontSize.font4};
  font-weight: ${theme.typography.fontWeight.medium};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.spacing2};
  transition: background-color 0.2s;

  &:hover:not(:disabled) {
    background-color: ${theme.colors.brand.dark};
  }

  &:disabled {
    background-color: ${theme.colors.gray[300]};
    cursor: not-allowed;
  }
`;

const ErrorText = styled.span`
  font-size: ${theme.typography.fontSize.font3};
  color: ${theme.colors.red[500]};
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
  const isValid =
    teamName.trim().length > 0 &&
    teamName.length <= 100 &&
    university.trim().length > 0 &&
    university.length <= 100 &&
    teamType.length > 0;

  return (
    <StepContainer>
      <StepHeader>
        <StepTitle>팀 기본 정보를 입력해주세요</StepTitle>
        <StepSubtitle>팀의 이름과 소속 대학교를 알려주세요</StepSubtitle>
      </StepHeader>

      <StepContent>
        <InputContainer>
          <InputLabel>팀 이름 *</InputLabel>
          <StepTextInput
            className={errors.name ? 'error' : ''}
            value={teamName}
            onChange={e => onTeamNameChange(e.target.value)}
            placeholder="예: 강원대 3팀"
            maxLength={100}
          />
          {errors.name && <ErrorText>{errors.name}</ErrorText>}
        </InputContainer>

        <InputContainer>
          <InputLabel>대학교 *</InputLabel>
          <DropdownButton className={errors.university ? 'error' : ''}>
            <DropdownButtonText className={!university ? 'placeholder' : ''}>
              {university || '대학교 정보를 불러오는 중...'}
            </DropdownButtonText>
            <Lock size={20} color={colors.gray[400]} />
          </DropdownButton>
          {errors.university && <ErrorText>{errors.university}</ErrorText>}
        </InputContainer>

        <InputContainer>
          <InputLabel>팀 유형 *</InputLabel>
          <SelectorContainer>
            {TEAM_TYPES.map(type => (
              <StepSelectorButton
                key={type}
                className={teamType === type ? 'active' : ''}
                onClick={() => onTeamTypeChange(type)}
              >
                <StepSelectorButtonText>{type}</StepSelectorButtonText>
              </StepSelectorButton>
            ))}
          </SelectorContainer>
          {errors.teamType && <ErrorText>{errors.teamType}</ErrorText>}
        </InputContainer>
      </StepContent>

      <StepFooter>
        <NextButton disabled={!isValid} onClick={onNext}>
          <span>다음</span>
          <ChevronForward size={20} color={colors.white} />
        </NextButton>
      </StepFooter>
    </StepContainer>
  );
}
