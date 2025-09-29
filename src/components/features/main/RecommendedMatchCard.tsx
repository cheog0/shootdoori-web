import { memo } from 'react';
import styled from '@emotion/styled';

export default memo(function RecommendedMatchCard() {
  return (
    <Card>
      <Title>금주의 추천 매치</Title>
      <EmptyState>
        <EmptyMessage>추천 매치가 없어요</EmptyMessage>
        <EmptySubMessage>추가로 더 추가된 매치를 찾아보세요!</EmptySubMessage>
        <Ellipsis>⋯</Ellipsis>
      </EmptyState>
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

const Title = styled.h3`
  font-size: 1.1rem;
  font-weight: bold;
  margin: 0 0 20px 0;
  color: black;
`;

const EmptyState = styled.div`
  text-align: center;
  color: #6fa86a;
`;

const EmptyMessage = styled.div`
  font-weight: bold;
  margin-bottom: 8px;
  color: #6fa86a;
`;

const EmptySubMessage = styled.div`
  font-size: 0.9rem;
  color: #666;
  line-height: 1.4;
`;

const Ellipsis = styled.div`
  font-size: 1.5rem;
  margin-top: 16px;
  color: #666;
`;
