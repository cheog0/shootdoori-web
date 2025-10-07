import React from 'react';
import styled from 'styled-components';

import { theme } from '@/styles/theme';

// Styled Components
const Container = styled.div`
  padding: ${theme.spacing.spacing4};
`;

const Title = styled.h3`
  font-size: ${theme.typography.fontSize.lg};
  font-weight: ${theme.fontWeight.semibold};
  color: ${theme.colors.textMain};
  margin: 0 0 ${theme.spacing.spacing4} 0;
`;

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.spacing2};
`;

const OptionButton = styled.button<{ isSelected: boolean }>`
  background-color: ${props =>
    props.isSelected ? theme.colors.brand.main : theme.colors.white};
  border: 1px solid
    ${props =>
      props.isSelected ? theme.colors.brand.main : theme.colors.borderInput};
  border-radius: 8px;
  padding: ${theme.spacing.spacing3};
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;

  &:hover {
    background-color: ${props =>
      props.isSelected ? theme.colors.brand.dark : theme.colors.gray100};
  }
`;

const OptionText = styled.span<{ isSelected: boolean }>`
  font-size: ${theme.typography.fontSize.base};
  color: ${props =>
    props.isSelected ? theme.colors.white : theme.colors.textMain};
  font-weight: ${props =>
    props.isSelected ? theme.fontWeight.semibold : theme.fontWeight.medium};
`;

interface MemberCountSliderProps {
  value: number;
  onValueChange: (value: number) => void;
}

const MEMBER_COUNT_OPTIONS = [
  { label: '11명 이하', maxCount: 11, sliderValue: 1 },
  { label: '15명 이하', maxCount: 15, sliderValue: 2 },
  { label: '20명 이하', maxCount: 20, sliderValue: 3 },
  { label: '25명 이하', maxCount: 25, sliderValue: 4 },
  { label: '30명 이하', maxCount: 30, sliderValue: 5 },
  { label: '30명+', maxCount: 50, sliderValue: 6 },
];

export default function MemberCountSlider({
  value,
  onValueChange,
}: MemberCountSliderProps) {
  return (
    <Container>
      <Title>팀원 수</Title>
      <OptionsContainer>
        {MEMBER_COUNT_OPTIONS.map(option => (
          <OptionButton
            key={option.sliderValue}
            isSelected={value === option.sliderValue}
            onClick={() => onValueChange(option.sliderValue)}
          >
            <OptionText isSelected={value === option.sliderValue}>
              {option.label}
            </OptionText>
          </OptionButton>
        ))}
      </OptionsContainer>
    </Container>
  );
}
