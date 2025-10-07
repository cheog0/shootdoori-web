import { useNavigate } from 'react-router-dom';
import React from 'react';
import styled from 'styled-components';
import { IoArrowBack } from 'react-icons/io5';

import { theme } from '@/styles/theme';

// Styled Components
const HeaderContainer = styled.div`
  background-color: ${theme.colors.white};
  border-bottom: 1px solid ${theme.colors.borderInput};
  padding: ${theme.spacing.spacing4};
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 100;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  padding: ${theme.spacing.spacing2};
  margin-right: ${theme.spacing.spacing2};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${theme.colors.gray100};
  }
`;

const Title = styled.h1`
  font-size: ${theme.typography.fontSize.lg};
  font-weight: ${theme.fontWeight.semibold};
  color: ${theme.colors.textMain};
  margin: 0;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
`;

interface CustomHeaderProps {
  title: string;
  showBackButton?: boolean;
}

export const CustomHeader = ({
  title,
  showBackButton = true,
}: CustomHeaderProps) => {
  const navigate = useNavigate();

  return (
    <HeaderContainer>
      <LeftSection>
        {showBackButton && (
          <BackButton onClick={() => navigate(-1)}>
            <IoArrowBack size={24} color={theme.colors.textMain} />
          </BackButton>
        )}
        <Title>{title}</Title>
      </LeftSection>
      <RightSection>{/* 추가 액션 버튼들이 있다면 여기에 */}</RightSection>
    </HeaderContainer>
  );
};
