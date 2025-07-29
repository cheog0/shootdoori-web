import styled from '@emotion/styled';
import { theme } from '@/styles/theme';
import { Spinner } from './Spinner';

const SuspenseContainer = styled.div`
  min-height: 100vh;
  background: ${theme.colors.gray200};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 ${theme.spacing.spacing4};

  @media (max-width: 768px) {
    padding: 0;
  }
`;

const LoadingContent = styled.div`
  width: 100%;
  max-width: 720px;
  min-height: 100vh;
  background: ${theme.colors.default};
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    max-width: 100%;
    box-shadow: none;
  }
`;

const LoadingText = styled.p`
  font-size: ${theme.typography.body1Regular.fontSize};
  color: ${theme.colors.textSub};
  margin-top: ${theme.spacing.spacing4};
  text-align: center;
`;

interface SuspenseFallbackProps {
  message?: string;
}

export function SuspenseFallback({
  message = '로딩 중...',
}: SuspenseFallbackProps) {
  return (
    <SuspenseContainer>
      <LoadingContent>
        <Spinner />
        <LoadingText>{message}</LoadingText>
      </LoadingContent>
    </SuspenseContainer>
  );
}
