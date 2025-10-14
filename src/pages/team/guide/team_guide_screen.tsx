import styled from 'styled-components';

import { colors } from '@/theme';

import Buttons from '@/components/buttons';
import Cards from '@/components/cards';
import Header from '@/components/header';

const Container = styled.div`
  flex: 1;
  background: linear-gradient(
    180deg,
    ${colors.blue[300]} 0%,
    ${colors.blue[400]} 50%,
    ${colors.white} 100%
  );
  padding: 20px;
`;

const TopSection = styled.div`
  margin-bottom: 20px;
`;

const BottomSection = styled.div`
  flex: 1;
`;

const TeamGuideScreen = () => {
  return (
    <Container>
      <TopSection>
        <Header />
        <Cards />
      </TopSection>

      <BottomSection>
        <Buttons />
      </BottomSection>
    </Container>
  );
};

export default TeamGuideScreen;
