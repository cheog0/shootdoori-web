import React from 'react';
// import { View } from 'react-native-web';
import styled from '@emotion/styled';

// import Buttons from '@/components/team/guide/buttons';
// import Cards from '@/components/team/guide/cards';
// import Header from '@/components/team/guide/header';
import { colors } from '@/theme';

// import { styles } from './styles';

const TeamGuideScreen = () => {
  return (
    <GradientContainer>
      <TopSection>
        {/* TODO: Header 컴포넌트 구현 필요 */}
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <h1>팀 가이드 헤더</h1>
          <p>Header 컴포넌트를 구현해야 합니다.</p>
        </div>
        {/* TODO: Cards 컴포넌트 구현 필요 */}
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <h2>팀 가이드 카드</h2>
          <p>Cards 컴포넌트를 구현해야 합니다.</p>
        </div>
      </TopSection>

      <BottomSection>
        {/* TODO: Buttons 컴포넌트 구현 필요 */}
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <h2>팀 가이드 버튼</h2>
          <p>Buttons 컴포넌트를 구현해야 합니다.</p>
        </div>
      </BottomSection>
    </GradientContainer>
  );
};

const GradientContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(
    to bottom,
    ${colors.blue[300]},
    ${colors.blue[400]},
    ${colors.white}
  );
  display: flex;
  flex-direction: column;
`;

const TopSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const BottomSection = styled.div`
  padding: 20px;
`;

export default TeamGuideScreen;
