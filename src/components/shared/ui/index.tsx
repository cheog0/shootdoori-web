import React from 'react';
import styled, { keyframes } from 'styled-components';
import { theme } from '@/theme';

// 임시 ProtectedRoute 컴포넌트
export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <>{children}</>;
};

// 임시 ErrorBoundary 컴포넌트
export class ErrorBoundary extends React.Component<
  { children: React.ReactNode; key?: string },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; key?: string }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div>Something went wrong.</div>;
    }

    return this.props.children;
  }
}

// 스피너 애니메이션
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// 로딩 컨테이너 스타일
const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(
    135deg,
    ${theme.colors.grass[50]} 0%,
    ${theme.colors.cream[100]} 25%,
    ${theme.colors.grass[100]} 50%,
    ${theme.colors.cream[200]} 75%,
    ${theme.colors.grass[50]} 100%
  );
`;

const LoadingSpinner = styled.div`
  width: 50px;
  height: 50px;
  border: 4px solid rgba(108, 142, 104, 0.2);
  border-top: 4px solid ${theme.colors.brand.main};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  margin-bottom: 20px;
`;

const LoadingText = styled.div`
  font-size: 16px;
  color: ${theme.colors.text.main};
  font-weight: 500;
`;

// 임시 SuspenseFallback 컴포넌트
export const SuspenseFallback: React.FC = () => {
  return (
    <LoadingContainer>
      <LoadingSpinner />
      <LoadingText>로딩 중...</LoadingText>
    </LoadingContainer>
  );
};

// TODO: 누락된 컴포넌트들 추가
export const Spinner: React.FC = () => {
  return (
    <LoadingContainer>
      <LoadingSpinner />
      <LoadingText>로딩 중...</LoadingText>
    </LoadingContainer>
  );
};

export const FormField: React.FC<{
  label: string;
  children: React.ReactNode;
}> = ({ label, children }) => {
  return (
    <div style={{ marginBottom: '16px' }}>
      <label
        style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}
      >
        {label}
      </label>
      {children}
    </div>
  );
};

export const NotFoundLogo: React.FC = () => {
  return <div>404 Not Found</div>;
};

export const SafeHtml: React.FC<{ content: string }> = ({ content }) => {
  return <div dangerouslySetInnerHTML={{ __html: content }} />;
};
