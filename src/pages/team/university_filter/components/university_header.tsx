import React from 'react';
import styled from 'styled-components';

import { theme } from '@/styles/theme';

// Styled Components
const HeaderSection = styled.div`
  padding: ${theme.spacing.spacing6} ${theme.spacing.spacing4};
  text-align: center;
`;

const Title = styled.h1`
  font-size: ${theme.typography.fontSize['2xl']};
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.textMain};
  margin: 0 0 ${theme.spacing.spacing2} 0;
`;

const Subtitle = styled.p`
  font-size: ${theme.typography.fontSize.base};
  color: ${theme.colors.textSub};
  margin: 0;
`;

export default function UniversityHeader() {
  return (
    <HeaderSection>
      <Title>대학교를 선택해주세요</Title>
      <Subtitle>참여하고 싶은 팀이 있는 대학교를 선택하세요</Subtitle>
    </HeaderSection>
  );
}
