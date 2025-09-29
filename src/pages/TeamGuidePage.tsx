import React from 'react';
import styled from '@emotion/styled';
import { theme } from '@/theme';
import Header from '../components/features/team-guide/Header';
import Cards from '../components/features/team-guide/Cards';
import Buttons from '../components/features/team-guide/Buttons';

export default function TeamGuideScreen() {
  return (
    <AppContainer>
      <MobileViewport>
        <Header />
        <TopSection>
          <Cards />
        </TopSection>

        <BottomSection>
          <Buttons />
        </BottomSection>
      </MobileViewport>
    </AppContainer>
  );
}

// styled-components
const AppContainer = styled.div`
  height: 100vh;
  background: #f5f5f5;
  display: flex;
  justify-content: center;
  padding: 0 ${theme.spacing.spacing4}px;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 0;
  }
`;

const MobileViewport = styled.div`
  width: 100%;
  max-width: 720px;
  height: 100vh;
  display: flex;
  flex-direction: column;

  background: linear-gradient(to bottom, #60a5fa 0%, #3b82f6 50%, #ffffff 100%);

  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    max-width: 100%;
    box-shadow: none;
  }
`;

const TopSection = styled.div`
  flex: 1;
  padding: 16px;
  padding-top: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow-y: auto;
`;

const BottomSection = styled.div`
  flex-shrink: 0;
  padding: 16px;
  padding-bottom: 30px;
`;
