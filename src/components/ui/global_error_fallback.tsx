import React from 'react';
import styled from 'styled-components';

import { theme } from '@/styles/theme';

// Styled Components
const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: ${theme.spacing.spacing8};
  min-height: 400px;
`;

const ErrorTitle = styled.h2`
  font-size: ${theme.typography.fontSize.xl};
  color: ${theme.colors.textMain};
  margin: 0 0 ${theme.spacing.spacing3} 0;
  text-align: center;
`;

const ErrorMessage = styled.p`
  font-size: ${theme.typography.fontSize.base};
  color: ${theme.colors.error};
  margin: 0 0 ${theme.spacing.spacing4} 0;
  text-align: center;
  max-width: 400px;
`;

const RetryButton = styled.button`
  background-color: ${theme.colors.brand.main};
  color: ${theme.colors.white};
  border: none;
  border-radius: 8px;
  padding: ${theme.spacing.spacing3} ${theme.spacing.spacing6};
  font-size: ${theme.typography.fontSize.base};
  font-weight: ${theme.fontWeight.medium};
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${theme.colors.brand.dark};
  }

  &:active {
    transform: translateY(1px);
  }
`;

type Props = {
  error: Error;
  resetError: () => void;
};

export default function GlobalErrorFallback({ error, resetError }: Props) {
  return (
    <Container>
      <ErrorTitle>예상치 못한 오류가 발생했습니다 ⚠️</ErrorTitle>
      <ErrorMessage>{error.message}</ErrorMessage>
      <RetryButton onClick={resetError}>다시 시도</RetryButton>
    </Container>
  );
}
