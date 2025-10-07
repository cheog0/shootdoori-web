import { memo } from 'react';
import styled, { keyframes } from 'styled-components';

import { theme } from '@/theme';

// 애니메이션 정의
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-5px);
  }
`;

const shimmer = keyframes`
  0% {
    left: -100%;
  }
  100% {
    left: 100%;
  }
`;

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.02);
  }
`;

const GreetingSectionContainer = styled.div`
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  padding: 32px 24px;
  text-align: center;
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
  border: 2px solid rgba(108, 142, 104, 0.2);
  position: relative;
  overflow: hidden;
  animation: ${fadeInUp} 0.8s ease-out;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.3),
      transparent
    );
    animation: ${shimmer} 3s infinite;
  }

  &::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(
      circle,
      ${theme.colors.brand.main}10 0%,
      transparent 70%
    );
    animation: ${pulse} 4s ease-in-out infinite;
    z-index: 0;
  }

  @media (max-width: 768px) {
    padding: 28px 20px;
    border-radius: 20px;
  }
`;

const GreetingSubtext = styled.p`
  font-size: 20px;
  color: ${theme.colors.text.main};
  margin: 0;
  line-height: 1.6;
  font-weight: 600;
  position: relative;
  z-index: 1;
  animation: ${float} 3s ease-in-out infinite;

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const HighlightText = styled.span`
  background: linear-gradient(
    135deg,
    ${theme.colors.brand.main} 0%,
    ${theme.colors.grass[600]} 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 700;
  position: relative;
`;

const AccentDot = styled.span`
  position: absolute;
  top: -8px;
  right: -8px;
  width: 8px;
  height: 8px;
  background: ${theme.colors.grass[400]};
  border-radius: 50%;
  animation: ${pulse} 2s ease-in-out infinite;
`;

export default memo(function GreetingSection() {
  return (
    <GreetingSectionContainer>
      <GreetingSubtext>
        편리해진{' '}
        <HighlightText>
          축구 매칭
          <AccentDot />
        </HighlightText>
        을 이용해보세요
      </GreetingSubtext>
    </GreetingSectionContainer>
  );
});
