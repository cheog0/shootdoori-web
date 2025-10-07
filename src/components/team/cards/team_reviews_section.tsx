import { memo } from 'react';
import styled from 'styled-components';
import { IoStar, IoStarOutline } from 'react-icons/io5';

import { theme } from '@/styles/theme';
import type { TeamReview } from '@/types/review';
import { ReviewType } from '@/types/review';

// Styled Components
const ReviewsSection = styled.div`
  padding: ${theme.spacing.spacing4};
`;

const SectionTitle = styled.h3`
  font-size: ${theme.typography.fontSize.lg};
  font-weight: ${theme.fontWeight.semibold};
  color: ${theme.colors.textMain};
  margin: 0 0 ${theme.spacing.spacing4} 0;
`;

const ReviewsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.spacing3};
`;

const ReviewCard = styled.div`
  background-color: ${theme.colors.white};
  border-radius: 12px;
  padding: ${theme.spacing.spacing4};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.spacing2};
`;

const ReviewerName = styled.h4`
  font-size: ${theme.typography.fontSize.base};
  font-weight: ${theme.fontWeight.semibold};
  color: ${theme.colors.textMain};
  margin: 0;
`;

const ReviewDate = styled.span`
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.textSub};
`;

const StarsContainer = styled.div`
  display: flex;
  gap: ${theme.spacing.spacing1};
  margin-bottom: ${theme.spacing.spacing2};
`;

const StarIcon = styled.div<{ filled: boolean }>`
  color: ${props =>
    props.filled ? theme.colors.yellow500 : theme.colors.gray300};
`;

const ReviewText = styled.p`
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.textMain};
  line-height: 1.4;
  margin: 0;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${theme.spacing.spacing8};
  color: ${theme.colors.textSub};
`;

const EmptyText = styled.p`
  font-size: ${theme.typography.fontSize.base};
  margin: 0;
`;

interface TeamReviewsSectionProps {
  teamReviews: TeamReview[] | undefined;
  reviewsLoading: boolean;
}

export default memo(function TeamReviewsSection({
  teamReviews,
  reviewsLoading,
}: TeamReviewsSectionProps) {
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <StarIcon key={i} filled={i <= rating}>
          {i <= rating ? <IoStar size={16} /> : <IoStarOutline size={16} />}
        </StarIcon>
      );
    }
    return stars;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (reviewsLoading) {
    return (
      <ReviewsSection>
        <SectionTitle>팀 리뷰</SectionTitle>
        <EmptyState>
          <EmptyText>리뷰를 불러오는 중...</EmptyText>
        </EmptyState>
      </ReviewsSection>
    );
  }

  if (!teamReviews || teamReviews.length === 0) {
    return (
      <ReviewsSection>
        <SectionTitle>팀 리뷰</SectionTitle>
        <EmptyState>
          <EmptyText>아직 리뷰가 없습니다.</EmptyText>
        </EmptyState>
      </ReviewsSection>
    );
  }

  return (
    <ReviewsSection>
      <SectionTitle>팀 리뷰</SectionTitle>
      <ReviewsList>
        {teamReviews.map(review => (
          <ReviewCard key={review.id}>
            <ReviewHeader>
              <ReviewerName>{review.reviewerName}</ReviewerName>
              <ReviewDate>{formatDate(review.createdAt)}</ReviewDate>
            </ReviewHeader>
            <StarsContainer>{renderStars(review.rating)}</StarsContainer>
            <ReviewText>{review.content}</ReviewText>
          </ReviewCard>
        ))}
      </ReviewsList>
    </ReviewsSection>
  );
});
