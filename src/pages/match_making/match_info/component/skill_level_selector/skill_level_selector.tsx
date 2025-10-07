import React, { useState } from 'react';
import styled from 'styled-components';

// Styled Components
const Section = styled.div`
  margin-bottom: 24px;
`;

const Label = styled.label`
  display: block;
  font-size: 16px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 8px;
`;

const SelectedText = styled.span`
  display: block;
  font-size: 14px;
  color: #6b7280;
  margin-bottom: 16px;
`;

const SliderContainer = styled.div`
  background-color: #f9fafb;
  border-radius: 12px;
  padding: 16px;
`;

const DropdownContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const DropdownRow = styled.div`
  display: flex;
  gap: 16px;
`;

const DropdownItem = styled.div`
  flex: 1;
`;

const DropdownLabel = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
`;

const Dropdown = styled.select`
  width: 100%;
  padding: 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  background-color: white;
  font-size: 14px;
  color: #374151;
  cursor: pointer;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  &:hover {
    border-color: #9ca3af;
  }
`;

// 실력 레벨 정의
const LEVELS = [
  { key: 'AMATEUR', label: '아마추어', description: '초보자' },
  { key: 'SEMI_PRO', label: '세미프로', description: '중급자' },
  { key: 'PRO', label: '프로', description: '고급자' },
] as const;

// 드롭다운용 데이터
const DROPDOWN_DATA = LEVELS.map((level, index) => ({
  label: level.label,
  value: index,
}));

type SkillLevel = (typeof LEVELS)[number]['key'];

type Props = {
  onChange: (min: SkillLevel, max: SkillLevel) => void;
};

export default function SkillLevelSelector({ onChange }: Props) {
  const [minLevel, setMinLevel] = useState<number>(0);
  const [maxLevel, setMaxLevel] = useState<number>(2);

  const handleMinLevelChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = parseInt(event.target.value);
    // 최소 레벨이 최대 레벨보다 높아지면 최대 레벨도 함께 조정
    if (value > maxLevel) {
      setMaxLevel(value);
      setMinLevel(value);
      onChange(LEVELS[value].key, LEVELS[value].key);
    } else {
      setMinLevel(value);
      onChange(LEVELS[value].key, LEVELS[maxLevel].key);
    }
  };

  const handleMaxLevelChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = parseInt(event.target.value);
    // 최대 레벨이 최소 레벨보다 낮아지면 최소 레벨도 함께 조정
    if (value < minLevel) {
      setMinLevel(value);
      setMaxLevel(value);
      onChange(LEVELS[value].key, LEVELS[value].key);
    } else {
      setMaxLevel(value);
      onChange(LEVELS[minLevel].key, LEVELS[value].key);
    }
  };

  return (
    <Section>
      <Label>선호하는 수준</Label>
      <SelectedText>
        {LEVELS[minLevel].label} ~ {LEVELS[maxLevel].label}
      </SelectedText>

      <SliderContainer>
        {/* 드롭다운 기반 레벨 선택 */}
        <DropdownContainer>
          <DropdownRow>
            <DropdownItem>
              <DropdownLabel>최소 레벨</DropdownLabel>
              <Dropdown value={minLevel} onChange={handleMinLevelChange}>
                {DROPDOWN_DATA.map(item => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </Dropdown>
            </DropdownItem>

            <DropdownItem>
              <DropdownLabel>최대 레벨</DropdownLabel>
              <Dropdown value={maxLevel} onChange={handleMaxLevelChange}>
                {DROPDOWN_DATA.map(item => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </Dropdown>
            </DropdownItem>
          </DropdownRow>
        </DropdownContainer>
      </SliderContainer>
    </Section>
  );
}
