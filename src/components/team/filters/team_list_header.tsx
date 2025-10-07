import React from 'react';
import styled from 'styled-components';
import { IoFilter } from 'react-icons/io5';

import { theme } from '@/styles/theme';

// Styled Components
const HeaderSection = styled.div`
  padding: ${theme.spacing.spacing4};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h2`
  font-size: ${theme.typography.fontSize.xl};
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.textMain};
  margin: 0;
`;

const FilterButton = styled.button`
  background-color: ${theme.colors.white};
  border: 1px solid ${theme.colors.borderInput};
  border-radius: 8px;
  padding: ${theme.spacing.spacing2} ${theme.spacing.spacing3};
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${theme.colors.gray100};
    border-color: ${theme.colors.brand.main};
  }
`;

const FilterText = styled.span`
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.textMain};
  margin-left: ${theme.spacing.spacing1};
`;

interface TeamListHeaderProps {
  university: string;
  onFilterPress: () => void;
}

export default function TeamListHeader({
  university,
  onFilterPress,
}: TeamListHeaderProps) {
  return (
    <HeaderSection>
      <Title>{university} 팀 목록</Title>
      <FilterButton onClick={onFilterPress}>
        <IoFilter size={16} color={theme.colors.textMain} />
        <FilterText>필터</FilterText>
      </FilterButton>
    </HeaderSection>
  );
}
