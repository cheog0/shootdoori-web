import { memo } from 'react';
import styled from 'styled-components';

import { Card } from '@/components/card/card';
import { Badge } from '@/screens/profile/components/badge/badge';
import { ReviewStatsType } from './types';

// Styled Components
const ReviewsCard = styled(Card)`
  padding: 20px;
  margin-bottom: 16px;
`;

const SectionTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 16px 0;
`;

const ReviewsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ReviewItem = styled.div`
  display: flex;
  align-items: center;
`;

const ReviewContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const ReviewLabel = styled.span`
  font-size: 14px;
  color: #374151;
`;

export default memo(function ReviewCard({
  reviews,
}: {
  reviews: ReviewStatsType[];
}) {
  return (
    <ReviewsCard>
      <SectionTitle>받은 후기</SectionTitle>
      <ReviewsList>
        {reviews.map((r, idx) => (
          <ReviewItem key={`${r.label}-${idx}`}>
            <ReviewContent>
              <ReviewLabel>{r.label}</ReviewLabel>
              <Badge text={`${r.count}회`} variant="secondary" size="small" />
            </ReviewContent>
          </ReviewItem>
        ))}
      </ReviewsList>
    </ReviewsCard>
  );
});
