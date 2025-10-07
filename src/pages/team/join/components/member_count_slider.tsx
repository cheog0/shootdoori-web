import React from 'react';
import styled from 'styled-components';

import { theme } from '@/theme';

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

const SliderContainer = styled.div`
  padding: ${theme.spacing.spacing4};
`;

const SliderTrack = styled.div`
  position: relative;
  height: 8px;
  background-color: ${theme.colors.gray[200]};
  border-radius: 4px;
  margin-bottom: ${theme.spacing.spacing4};
`;

const SliderTrackBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100%;
  background-color: ${theme.colors.gray[200]};
  border-radius: 4px;
`;

const SliderActiveTrack = styled.div<{ width: number }>`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: ${props => props.width}%;
  background-color: ${theme.colors.brand.main};
  border-radius: 4px;
`;

const SliderLabels = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SliderLabel = styled.button<{ active?: boolean }>`
  background: none;
  border: none;
  cursor: pointer;
  padding: ${theme.spacing.spacing2};
  border-radius: ${theme.spacing.spacing2};
  background-color: ${props =>
    props.active ? theme.colors.brand.main : 'transparent'};
`;

const SliderLabelText = styled.span<{ active?: boolean }>`
  font-size: ${theme.typography.fontSize.font2};
  font-weight: ${theme.typography.fontWeight.medium};
  color: ${props =>
    props.active ? theme.colors.white : theme.colors.text.sub};
`;

export default function MemberCountSlider({
  value,
  onValueChange,
}: MemberCountSliderProps) {
  const getSliderValue = (currentValue: number) => {
    const option = MEMBER_COUNT_OPTIONS.find(
      opt => currentValue <= opt.maxCount
    );
    return option ? option.sliderValue : 6;
  };

  const currentSliderValue = getSliderValue(value);
  const sliderWidth = (currentSliderValue / 6) * 100;

  return (
    <SliderContainer>
      <SliderTrack>
        <SliderTrackBackground />
        <SliderActiveTrack width={sliderWidth} />
      </SliderTrack>
      <SliderLabels>
        {MEMBER_COUNT_OPTIONS.map((option, index) => (
          <SliderLabel
            key={index}
            active={value >= option.maxCount}
            onClick={() => onValueChange(option.maxCount)}
          >
            <SliderLabelText active={value >= option.maxCount}>
              {option.label}
            </SliderLabelText>
          </SliderLabel>
        ))}
      </SliderLabels>
    </SliderContainer>
  );
}
