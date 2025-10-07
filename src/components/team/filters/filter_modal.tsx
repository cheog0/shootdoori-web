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
  border-radius: 20px 20px 0 0;
  width: 100%;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
`;

const FilterHeader = styled.div`
  padding: 20px;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DragHandle = styled.div`
  width: 40px;
  height: 4px;
  background-color: #d1d5db;
  border-radius: 2px;
  margin: 0 auto 16px;
`;

const FilterTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #6b7280;
  font-size: 16px;
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #f3f4f6;
  }
`;

const FilterContent = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
`;

const FilterSection = styled.div`
  margin-bottom: 24px;
`;

const FilterSectionTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #374151;
  margin: 0 0 12px 0;
`;

const FilterOptions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const FilterOption = styled.button<{ selected: boolean }>`
  padding: 8px 16px;
  border: 1px solid ${props => (props.selected ? '#3b82f6' : '#d1d5db')};
  border-radius: 20px;
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

const FilterOptionText = styled.span`
  font-size: 14px;
`;

const SliderSection = styled.div`
  margin-bottom: 24px;
`;

const FilterActions = styled.div`
  padding: 20px;
  border-top: 1px solid #e5e7eb;
  display: flex;
  gap: 12px;
`;

const ResetButton = styled.button`
  flex: 1;
  padding: 16px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  background-color: white;
  color: #374151;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #f3f4f6;
  }
`;

const ResetButtonText = styled.span`
  font-size: 16px;
  font-weight: 600;
`;

const ApplyButton = styled.button`
  flex: 1;
  padding: 16px;
  border: none;
  border-radius: 8px;
  background-color: #3b82f6;
  color: white;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #2563eb;
  }
`;

const ApplyButtonText = styled.span`
  font-size: 16px;
  font-weight: 600;
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
          <CloseButton onClick={onClose}>
            <span>✕</span>
          </CloseButton>
        </FilterHeader>

        <FilterContent>
          <FilterSection>
            <FilterSectionTitle>실력 수준</FilterSectionTitle>
            <FilterOptions>
              {SKILL_LEVELS.map(level => (
                <FilterOption
                  key={level.value}
                  selected={filterOptions.skillLevel.includes(level.value)}
                  onClick={() => onToggleSkillLevel(level.value)}
                >
                  <FilterOptionText>{level.label}</FilterOptionText>
                </FilterOption>
              ))}
            </FilterOptions>
          </FilterSection>

          <FilterSection>
            <FilterSectionTitle>팀 유형</FilterSectionTitle>
            <FilterOptions>
              {TEAM_TYPES.map(type => (
                <FilterOption
                  key={type.value}
                  selected={filterOptions.teamType.includes(type.value)}
                  onClick={() => onToggleTeamType(type.value)}
                >
                  <FilterOptionText>{type.label}</FilterOptionText>
                </FilterOption>
              ))}
            </FilterOptions>
          </FilterSection>

          <SliderSection>
            <FilterSectionTitle>최대 인원</FilterSectionTitle>
            <MemberCountSlider
              value={filterOptions.maxMemberCount}
              onChange={onMemberCountChange}
            />
          </SliderSection>
        </FilterContent>

        <FilterActions>
          <ResetButton onClick={onReset}>
            <ResetButtonText>초기화</ResetButtonText>
          </ResetButton>
          <ApplyButton onClick={onApply}>
            <ApplyButtonText>적용</ApplyButtonText>
          </ApplyButton>
        </FilterActions>
      </FilterModal>
    </ModalOverlay>
  );
}
