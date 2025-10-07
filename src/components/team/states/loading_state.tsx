import { memo } from 'react';
import styled from 'styled-components';

// Styled Components
const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  background-color: #f8f9fa;
  border-radius: 12px;
  margin: 20px;
`;

const StateIcon = styled.span`
  font-size: 32px;
  margin-bottom: 16px;
`;

const LoadingText = styled.span`
  font-size: 16px;
  color: #6b7280;
  text-align: center;
`;

interface LoadingStateProps {
  message?: string;
}

export default memo(function LoadingState({
  message = '팀 정보를 불러오는 중...',
}: LoadingStateProps) {
  return (
    <LoadingContainer>
      <StateIcon>⏳</StateIcon>
      <LoadingText>{message}</LoadingText>
    </LoadingContainer>
  );
});
