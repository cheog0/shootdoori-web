import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

interface SpinnerProps {
  size?: number;
}

export function Spinner({ size = 32 }: SpinnerProps) {
  return <SpinnerElement size={size} />;
}

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const SpinnerElement = styled.div<{ size: number }>`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  border: 3px solid #ddd;
  border-top: 3px solid #779966;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;
