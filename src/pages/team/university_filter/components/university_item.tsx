import React from 'react';
import styled from 'styled-components';
import { IoCheckmarkCircle, IoSchool } from 'react-icons/io5';

import { theme } from '@/styles/theme';

// Styled Components
const Container = styled.div<{ isSelected: boolean }>`
  background-color: ${props =>
    props.isSelected ? theme.colors.brand.main : theme.colors.white};
  border-radius: 12px;
  padding: ${theme.spacing.spacing4};
  margin-bottom: ${theme.spacing.spacing2};
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 2px solid
    ${props => (props.isSelected ? theme.colors.brand.main : 'transparent')};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    transform: translateY(-1px);
  }
`;

const CardContent = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
`;

const UniversityLogo = styled.div<{ isSelected: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: ${props =>
    props.isSelected ? 'rgba(255, 255, 255, 0.2)' : theme.colors.blue500};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: ${theme.spacing.spacing3};
`;

const UniversityInfo = styled.div`
  flex: 1;
`;

const UniversityName = styled.span<{ isSelected: boolean }>`
  font-size: ${theme.typography.fontSize.base};
  font-weight: ${theme.fontWeight.medium};
  color: ${props =>
    props.isSelected ? theme.colors.white : theme.colors.textMain};
`;

const CheckIcon = styled.div<{ isSelected: boolean }>`
  color: ${props => (props.isSelected ? theme.colors.white : 'transparent')};
  font-size: 24px;
`;

interface UniversityItemProps {
  university: string;
  isSelected: boolean;
  onSelect: (university: string) => void;
}

export default function UniversityItem({
  university,
  isSelected,
  onSelect,
}: UniversityItemProps) {
  return (
    <Container isSelected={isSelected} onClick={() => onSelect(university)}>
      <CardContent>
        <UniversityLogo isSelected={isSelected}>
          <IoSchool
            size={24}
            color={isSelected ? theme.colors.white : theme.colors.white}
          />
        </UniversityLogo>
        <UniversityInfo>
          <UniversityName isSelected={isSelected}>{university}</UniversityName>
        </UniversityInfo>
      </CardContent>
      <CheckIcon isSelected={isSelected}>
        <IoCheckmarkCircle />
      </CheckIcon>
    </Container>
  );
}
