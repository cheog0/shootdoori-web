import React from 'react';
import styled, { keyframes } from 'styled-components';

import { theme } from '@/theme';

// 애니메이션 정의
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const StyledCard = styled.div<{ level?: 0 | 1 | 2 }>`
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 24px;
  margin: 0;
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.1),
    0 2px 8px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.3);
  animation: ${fadeInUp} 0.6s ease-out;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-2px);
    box-shadow:
      0 12px 40px rgba(0, 0, 0, 0.15),
      0 4px 12px rgba(0, 0, 0, 0.08);
  }

  ${({ level }) => {
    if (level === undefined) return '';

    const colors = {
      0: theme.colors.grass[500],
      1: theme.colors.orange[500],
      2: theme.colors.red[500],
    };

    return `
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 4px;
        height: 100%;
        background: ${colors[level]};
        border-radius: 0 2px 2px 0;
      }
    `;
  }}
`;

const TitleContainer = styled.div`
  margin-bottom: 16px;
`;

const Title = styled.div`
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 8px;
  background: linear-gradient(
    135deg,
    ${theme.colors.brand.main} 0%,
    ${theme.colors.grass[600]} 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.02em;
`;

const Subtitle = styled.div`
  font-size: 0.9rem;
  color: ${theme.colors.text.sub};
  opacity: 0.8;
`;

const ContentContainer = styled.div`
  margin-top: 12px;
`;

interface CardProps {
  title?: string;
  subtitle?: string;
  level?: 0 | 1 | 2;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export const Card = ({
  title,
  subtitle,
  level,
  children,
  style,
}: CardProps) => {
  return (
    <StyledCard level={level} style={style}>
      {(title || subtitle) && (
        <TitleContainer>
          {title && <Title>{title}</Title>}
          {subtitle && <Subtitle>{subtitle}</Subtitle>}
        </TitleContainer>
      )}
      {children && <ContentContainer>{children}</ContentContainer>}
    </StyledCard>
  );
};
