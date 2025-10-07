import { memo, useMemo } from 'react';
import styled from 'styled-components';
import { Star, StarHalf } from 'lucide-react';

import { Card } from '@/components/card/card';
import { theme } from '@/theme';

// Styled Components
const MannerCard = styled(Card)`
  padding: 20px;
  margin-bottom: 16px;
`;

const MannerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const SectionTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: ${theme.colors.text.main};
  margin: 0;
`;

const MannerScoreContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const MannerScore = styled.span`
  font-size: 24px;
  font-weight: bold;
  color: ${theme.colors.grass[500]};
`;

const StarsContainer = styled.div`
  display: flex;
  gap: 2px;
`;

const ReviewCount = styled.span`
  font-size: 14px;
  color: ${theme.colors.text.sub};
`;

export default memo(function MannerCard({
  mannerScore,
  totalReviews,
  noShowCount,
}: {
  mannerScore: number;
  totalReviews: number;
  noShowCount: number;
}) {
  const stars = useMemo(
    () =>
      Array.from({ length: 5 }).map((_, i) => {
        const starIndex = i + 1;
        const isFilled = starIndex <= Math.floor(mannerScore);
        const isHalfFilled =
          starIndex === Math.ceil(mannerScore) && mannerScore % 1 !== 0;

        if (isFilled) {
          return <Star key={i} size={16} color="#FFD700" fill="#FFD700" />;
        } else if (isHalfFilled) {
          return <StarHalf key={i} size={16} color="#FFD700" fill="#FFD700" />;
        } else {
          return <Star key={i} size={16} color="#FFD700" />;
        }
      }),
    [mannerScore]
  );

  return (
    <MannerCard>
      <MannerHeader>
        <SectionTitle>매너 점수</SectionTitle>
        <MannerScoreContainer>
          <MannerScore>{mannerScore}</MannerScore>
          <StarsContainer>{stars}</StarsContainer>
        </MannerScoreContainer>
      </MannerHeader>
      <ReviewCount>총 {totalReviews}개의 후기 기반</ReviewCount>
    </MannerCard>
  );
});
