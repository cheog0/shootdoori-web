import React from 'react';
import styled from 'styled-components';

import { SkillLevel, TeamType, SKILL_LEVELS, TEAM_TYPES } from '@/types/team';

import MemberCountSlider from './member_count_slider';

// Styled Components
const ModalOverlay = styled.div<{ visible: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${props => (props.visible ? 'flex' : 'none')};
  justify-content: flex-end;
  z-index: 1000;
`;

const ModalBackdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const FilterModal = styled.div`
  background-color: white;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  padding-bottom: 40px;
  box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;
`;

const FilterHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px 0 8px 0;
`;

const DragHandle = styled.div`
  width: 40px;
  height: 4px;
  background-color: #d1d5db;
  border-radius: 2px;
  margin-bottom: 8px;
`;

const FilterTitle = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: #111827;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 12px;
  right: 16px;
  background: none;
  border: none;
  font-size: 20px;
  color: #6b7280;
  cursor: pointer;
  padding: 8px;
`;

const FilterContent = styled.div`
  padding: 0 24px;
`;

const FilterSection = styled.div`
  margin-bottom: 24px;
`;

const FilterSectionTitle = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 12px;
  display: block;
`;

const FilterOptions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const FilterOption = styled.button<{ selected: boolean }>`
  background-color: ${props => (props.selected ? '#3b82f6' : '#f3f4f6')};
  border: 1px solid ${props => (props.selected ? '#3b82f6' : '#d1d5db')};
  border-radius: 8px;
  padding: 8px 16px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${props => (props.selected ? '#2563eb' : '#e5e7eb')};
  }
`;

const FilterOptionText = styled.span<{ selected: boolean }>`
  font-size: 14px;
  font-weight: 500;
  color: ${props => (props.selected ? 'white' : '#374151')};
`;

const SliderSection = styled.div`
  padding: 16px 0;
`;

const FilterActions = styled.div`
  display: flex;
  gap: 12px;
  padding: 0 24px;
  margin-top: 24px;
`;

const ResetButton = styled.button`
  flex: 1;
  background-color: #f3f4f6;
  border: 1px solid #d1d5db;
  border-radius: 12px;
  padding: 16px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #e5e7eb;
  }
`;

const ResetButtonText = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: #374151;
`;

const ApplyButton = styled.button`
  flex: 1;
  background-color: #3b82f6;
  border: none;
  border-radius: 12px;
  padding: 16px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 8px rgba(59, 130, 246, 0.3);

  &:hover {
    background-color: #2563eb;
  }
`;

const ApplyButtonText = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: white;
`;

interface FilterOptions {
  skillLevel: SkillLevel[];
  teamType: TeamType[];
  maxMemberCount: number;
}

interface FilterModalProps {
  visible: boolean;
  filterOptions: FilterOptions;
  onClose: () => void;
  onApply: () => void;
  onReset: () => void;
  onToggleSkillLevel: (level: SkillLevel) => void;
  onToggleTeamType: (type: TeamType) => void;
  onMemberCountChange: (value: number) => void;
}

export default function FilterModal({
  visible,
  filterOptions,
  onClose,
  onApply,
  onReset,
  onToggleSkillLevel,
  onToggleTeamType,
  onMemberCountChange,
}: FilterModalProps) {
  return (
    <ModalOverlay visible={visible}>
      <ModalBackdrop onClick={onClose} />
      <FilterModal>
        <FilterHeader>
          <DragHandle />
          <FilterTitle>필터</FilterTitle>
          <CloseButton onClick={onClose}>✕</CloseButton>
        </FilterHeader>

        <FilterContent>
          <FilterSection>
            <FilterSectionTitle>실력 수준</FilterSectionTitle>
            <FilterOptions>
              {SKILL_LEVELS.map(level => (
                <FilterOption
                  key={level}
                  selected={filterOptions.skillLevel.includes(level)}
                  onClick={() => onToggleSkillLevel(level)}
                >
                  <FilterOptionText
                    selected={filterOptions.skillLevel.includes(level)}
                  >
                    {level}
                  </FilterOptionText>
                </FilterOption>
              ))}
            </FilterOptions>
          </FilterSection>

          <FilterSection>
            <FilterSectionTitle>팀 유형</FilterSectionTitle>
            <FilterOptions>
              {TEAM_TYPES.map(type => (
                <FilterOption
                  key={type}
                  selected={filterOptions.teamType.includes(type)}
                  onClick={() => onToggleTeamType(type)}
                >
                  <FilterOptionText
                    selected={filterOptions.teamType.includes(type)}
                  >
                    {type}
                  </FilterOptionText>
                </FilterOption>
              ))}
            </FilterOptions>
          </FilterSection>

          <FilterSection>
            <FilterSectionTitle>멤버 수</FilterSectionTitle>
            <SliderSection>
              <MemberCountSlider
                value={filterOptions.maxMemberCount}
                onValueChange={onMemberCountChange}
              />
            </SliderSection>
          </FilterSection>
        </FilterContent>

        <FilterActions>
          <ResetButton onClick={onReset}>
            <ResetButtonText>초기화</ResetButtonText>
          </ResetButton>
          <ApplyButton
            onClick={() => {
              onApply();
              onClose();
            }}
          >
            <ApplyButtonText>적용</ApplyButtonText>
          </ApplyButton>
        </FilterActions>
      </FilterModal>
    </ModalOverlay>
  );
}
