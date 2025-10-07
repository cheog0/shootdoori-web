import React from 'react';
import styled from 'styled-components';

import type { SkillLevel, TeamType } from '@/types/team';
import { theme } from '@/styles/theme';

// Styled Components
const FormSectionContainer = styled.div`
  padding: ${theme.spacing.spacing4};
`;

const InputGroup = styled.div`
  margin-bottom: ${theme.spacing.spacing6};
`;

const Label = styled.label`
  font-size: ${theme.typography.fontSize.base};
  font-weight: ${theme.fontWeight.medium};
  color: ${theme.colors.textMain};
  margin-bottom: ${theme.spacing.spacing2};
  display: block;
`;

const Input = styled.input.withConfig({
  shouldForwardProp: prop => prop !== 'hasError',
})<{ hasError?: boolean }>`
  width: 100%;
  padding: ${theme.spacing.spacing3};
  border: 1px solid
    ${props => (props.hasError ? theme.colors.error : theme.colors.borderInput)};
  border-radius: 8px;
  font-size: ${theme.typography.fontSize.base};
  color: ${theme.colors.textMain};
  background-color: ${theme.colors.white};
  transition: border-color 0.2s ease;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${theme.colors.brand.main};
    box-shadow: 0 0 0 2px ${theme.colors.brand.main}20;
  }

  &::placeholder {
    color: ${theme.colors.textSub};
  }
`;

const TextArea = styled.textarea.withConfig({
  shouldForwardProp: prop => prop !== 'hasError',
})<{ hasError?: boolean }>`
  width: 100%;
  padding: ${theme.spacing.spacing3};
  border: 1px solid
    ${props => (props.hasError ? theme.colors.error : theme.colors.borderInput)};
  border-radius: 8px;
  font-size: ${theme.typography.fontSize.base};
  color: ${theme.colors.textMain};
  background-color: ${theme.colors.white};
  transition: border-color 0.2s ease;
  box-sizing: border-box;
  min-height: 100px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: ${theme.colors.brand.main};
    box-shadow: 0 0 0 2px ${theme.colors.brand.main}20;
  }

  &::placeholder {
    color: ${theme.colors.textSub};
  }
`;

const SelectContainer = styled.div`
  display: flex;
  gap: ${theme.spacing.spacing3};
`;

const Select = styled.select.withConfig({
  shouldForwardProp: prop => prop !== 'hasError',
})<{ hasError?: boolean }>`
  flex: 1;
  padding: ${theme.spacing.spacing3};
  border: 1px solid
    ${props => (props.hasError ? theme.colors.error : theme.colors.borderInput)};
  border-radius: 8px;
  font-size: ${theme.typography.fontSize.base};
  color: ${theme.colors.textMain};
  background-color: ${theme.colors.white};
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${theme.colors.brand.main};
    box-shadow: 0 0 0 2px ${theme.colors.brand.main}20;
  }
`;

interface FormSectionProps {
  formData: {
    name: string;
    description: string;
    skillLevel: SkillLevel;
    teamType: TeamType;
  };
  updateFormData: (field: string, value: string) => void;
}

const SKILL_LEVELS: SkillLevel[] = ['아마추어', '세미프로', '프로'];
const TEAM_TYPES: TeamType[] = ['중앙동아리', '과동아리', '기타'];

export default function FormSection({
  formData,
  updateFormData,
}: FormSectionProps) {
  return (
    <FormSectionContainer>
      <InputGroup>
        <Label>팀명</Label>
        <Input
          type="text"
          placeholder="팀명을 입력하세요"
          value={formData.name}
          onChange={e => updateFormData('name', e.target.value)}
        />
      </InputGroup>

      <InputGroup>
        <Label>팀 설명</Label>
        <TextArea
          placeholder="팀에 대한 설명을 입력하세요"
          value={formData.description}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            updateFormData('description', e.target.value)
          }
        />
      </InputGroup>

      <InputGroup>
        <Label>실력 수준</Label>
        <SelectContainer>
          <Select
            value={formData.skillLevel}
            onChange={e => updateFormData('skillLevel', e.target.value)}
          >
            {SKILL_LEVELS.map(level => (
              <option key={level} value={level}>
                {level === '아마추어' && '아마추어'}
                {level === '세미프로' && '세미프로'}
                {level === '프로' && '프로'}
              </option>
            ))}
          </Select>
        </SelectContainer>
      </InputGroup>

      <InputGroup>
        <Label>팀 유형</Label>
        <SelectContainer>
          <Select
            value={formData.teamType}
            onChange={e => updateFormData('teamType', e.target.value)}
          >
            {TEAM_TYPES.map(type => (
              <option key={type} value={type}>
                {type === '중앙동아리' && '중앙동아리'}
                {type === '과동아리' && '과동아리'}
                {type === '기타' && '기타'}
              </option>
            ))}
          </Select>
        </SelectContainer>
      </InputGroup>
    </FormSectionContainer>
  );
}
