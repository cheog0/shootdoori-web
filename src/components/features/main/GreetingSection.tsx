import { memo } from 'react';
import styled from '@emotion/styled';

export default memo(function GreetingSection() {
  return (
    <Card>
      <Subtext>
        편리해진 <HighlightText>축구 매칭</HighlightText>을 이용해보세요
      </Subtext>
    </Card>
  );
});

const Card = styled.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.2s ease;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

const Subtext = styled.p`
  font-size: 1rem;
  margin: 0;
  color: black;
  text-align: center;
`;

const HighlightText = styled.span`
  color: #6fa86a;
  font-weight: bold;
`;
