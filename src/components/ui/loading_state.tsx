import React from 'react';
import styled, { keyframes } from 'styled-components';

import { theme } from '@/styles/theme';

// Loading animation
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// Styled Components
const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing.spacing8};
  min-height: 200px;
`;

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid ${theme.colors.gray200};
  border-top: 4px solid ${theme.colors.brand.main};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  margin-bottom: ${theme.spacing.spacing4};
`;

const LoadingText = styled.p`
  font-size: ${theme.typography.fontSize.base};
  color: ${theme.colors.textSub};
  margin: 0;
  text-align: center;
`;

interface LoadingStateProps {
  message?: string;
}

export function LoadingState({ message = '로딩 중...' }: LoadingStateProps) {
  return (
    <LoadingContainer>
      <Spinner />
      <LoadingText>{message}</LoadingText>
    </LoadingContainer>
  );
}
