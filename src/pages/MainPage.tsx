import {
  BenefitsSection,
  EnvelopeSection,
  GreetingSection,
  HomeHeader,
  RecommendedMatchCard,
} from '@/components/features/main';
import styled from '@emotion/styled';
import { theme } from '@/theme';

export default function MainPage() {
  return (
    <AppContainer>
      <MobileViewport>
        <HeaderWrapper>
          <HomeHeader />
        </HeaderWrapper>

        <ScrollContent>
          <MainSection>
            <GreetingSection />
          </MainSection>

          <MatchSection>
            <RecommendedMatchCard />
          </MatchSection>

          <ServiceSection>
            <EnvelopeSection />
            <BenefitsSection teamId={null} />
          </ServiceSection>
        </ScrollContent>
      </MobileViewport>
    </AppContainer>
  );
}

const AppContainer = styled.div`
  min-height: 100vh;
  background: #f5f5f5;
  display: flex;
  justify-content: center;
  padding: 0 ${theme.spacing.spacing4}px;

  @media (max-width: 768px) {
    padding: 0;
  }
`;

const MobileViewport = styled.div`
  width: 100%;
  max-width: 720px;
  min-height: 100vh;
  background: #f5f5f5;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  position: relative;

  @media (max-width: 768px) {
    max-width: 100%;
    box-shadow: none;
  }
`;

const HeaderWrapper = styled.div`
  padding: 12px;
`;

const ScrollContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 16px;
`;

const MainSection = styled.div``;
const MatchSection = styled.div``;
const ServiceSection = styled.div``;
