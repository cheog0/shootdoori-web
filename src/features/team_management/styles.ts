import styled from 'styled-components';

import { theme } from '@/theme';

export const Container = styled.div`
  flex: 1;
  background-color: ${theme.colors.gray[50]};
`;

export const StateContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${theme.spacing.spacing6};
  background-color: ${theme.colors.gray[50]};
`;

export const StateIcon = styled.div`
  font-size: 64px;
  margin-bottom: 16px;
`;

export const StateTitle = styled.h2`
  font-size: ${theme.typography.fontSize.font7};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.gray[900]};
  margin-bottom: ${theme.spacing.spacing3};
  text-align: center;
`;

export const StateSubtitle = styled.h3`
  font-size: ${theme.typography.fontSize.font4};
  color: ${theme.colors.gray[500]};
  text-align: center;
  margin-bottom: ${theme.spacing.spacing2};
`;

export const StateDescription = styled.p`
  font-size: ${theme.typography.fontSize.font3};
  color: ${theme.colors.gray[400]};
  text-align: center;
  line-height: ${theme.typography.lineHeight.line5};
`;

export const LoadingContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${theme.colors.gray[50]};
`;

export const LoadingText = styled.p`
  font-size: ${theme.typography.fontSize.font5};
  color: ${theme.colors.gray[500]};
  margin-top: ${theme.spacing.spacing4};
`;

export const ScrollContainer = styled.div`
  flex: 1;
  padding-top: ${theme.spacing.spacing3};
`;

export const ContentContainer = styled.div`
  padding-left: ${theme.spacing.spacing4};
  padding-right: ${theme.spacing.spacing4};
  padding-bottom: ${theme.spacing.spacing4};
`;

export const ActionButton = styled.button`
  background-color: ${theme.colors.blue[500]};
  padding-top: ${theme.spacing.spacing4};
  padding-bottom: ${theme.spacing.spacing4};
  padding-left: ${theme.spacing.spacing6};
  padding-right: ${theme.spacing.spacing6};
  border-radius: ${theme.spacing.spacing3};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.spacing2};
  border: none;
  cursor: pointer;
`;

export const ActionButtonText = styled.span`
  color: ${theme.colors.white};
  font-size: ${theme.typography.fontSize.font4};
  font-weight: ${theme.typography.fontWeight.semibold};
`;

export const MembersSection = styled.div`
  background-color: ${theme.colors.white};
  border-radius: ${theme.spacing.spacing4};
  padding: ${theme.spacing.spacing5};
  margin-bottom: ${theme.spacing.spacing5};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const SectionTitle = styled.h3`
  font-size: ${theme.typography.fontSize.font6};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.gray[900]};
  margin-bottom: ${theme.spacing.spacing4};
`;

export const MemberList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.spacing3};
`;

export const MemberCard = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: ${theme.spacing.spacing3};
  background-color: ${theme.colors.gray[50]};
  border-radius: ${theme.spacing.spacing2};
`;

export const MemberAvatar = styled.div`
  width: 40px;
  height: 40px;
  background-color: ${theme.colors.blue[500]};
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: ${theme.spacing.spacing3};
`;

export const MemberAvatarText = styled.span`
  color: ${theme.colors.white};
  font-weight: ${theme.typography.fontWeight.semibold};
  font-size: ${theme.typography.fontSize.font4};
`;

export const MemberInfo = styled.div`
  flex: 1;
`;

export const MemberName = styled.div`
  font-size: ${theme.typography.fontSize.font4};
  font-weight: ${theme.typography.fontWeight.semibold};
  color: ${theme.colors.gray[900]};
  margin-bottom: 2px;
`;

export const MemberRole = styled.div`
  font-size: ${theme.typography.fontSize.font3};
  color: ${theme.colors.gray[500]};
`;

export const MemberBadge = styled.div`
  background-color: ${theme.colors.yellow[400]};
  padding-left: ${theme.spacing.spacing2};
  padding-right: ${theme.spacing.spacing2};
  padding-top: 4px;
  padding-bottom: 4px;
  border-radius: ${theme.spacing.spacing3};
`;

export const MemberBadgeText = styled.span`
  color: ${theme.colors.white};
  font-size: ${theme.typography.fontSize.font2};
  font-weight: ${theme.typography.fontWeight.semibold};
`;

export const EmptyState = styled.div`
  display: flex;
  align-items: center;
  padding: ${theme.spacing.spacing8};
  background-color: ${theme.colors.gray[50]};
  border-radius: ${theme.spacing.spacing3};
  border: 2px dashed ${theme.colors.gray[200]};
`;

export const EmptyStateTitle = styled.h3`
  font-size: ${theme.typography.fontSize.font5};
  font-weight: ${theme.typography.fontWeight.semibold};
  color: ${theme.colors.gray[700]};
  margin-bottom: ${theme.spacing.spacing2};
`;

export const EmptyStateText = styled.p`
  font-size: ${theme.typography.fontSize.font3};
  color: ${theme.colors.gray[500]};
  text-align: center;
  line-height: ${theme.typography.lineHeight.line5};
`;

export const ShowMoreButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-top: ${theme.spacing.spacing3};
  padding-bottom: ${theme.spacing.spacing3};
  padding-left: ${theme.spacing.spacing4};
  padding-right: ${theme.spacing.spacing4};
  background-color: ${theme.colors.gray[50]};
  border-radius: ${theme.spacing.spacing2};
  border: 1px solid ${theme.colors.gray[200]};
  margin-top: ${theme.spacing.spacing2};
  cursor: pointer;
`;

export const ShowMoreText = styled.span`
  font-size: ${theme.typography.fontSize.font3};
  font-weight: ${theme.typography.fontWeight.medium};
  color: ${theme.colors.gray[600]};
  margin-right: 4px;
`;

export const ReviewsCard = styled.div`
  background-color: ${theme.colors.white};
  border-radius: ${theme.spacing.spacing3};
  padding: ${theme.spacing.spacing4};
  margin-bottom: ${theme.spacing.spacing5};
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  border: 1px solid ${theme.colors.gray[100]};
`;

export const ReviewsList = styled.div`
  margin-top: ${theme.spacing.spacing4};
`;

export const ReviewItem = styled.div`
  margin-bottom: ${theme.spacing.spacing4};
`;

export const ReviewContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.spacing2};
`;

export const ReviewLabel = styled.div`
  font-size: ${theme.typography.fontSize.font3};
  color: ${theme.colors.gray[900]};
  font-weight: ${theme.typography.fontWeight.medium};
`;

export const ReviewCount = styled.div`
  font-size: ${theme.typography.fontSize.font2};
  color: ${theme.colors.gray[500]};
  text-align: right;
`;

export const StarContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2px;
`;

export const ReviewsSummary = styled.div`
  margin-top: ${theme.spacing.spacing4};
`;

export const AverageRatingContainer = styled.div`
  margin-bottom: ${theme.spacing.spacing5};
`;

export const AverageRatingCard = styled.div`
  background-color: ${theme.colors.white};
  border-radius: ${theme.spacing.spacing3};
  padding: ${theme.spacing.spacing4};
  border: 1px solid ${theme.colors.gray[200]};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

export const AverageRatingHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: ${theme.spacing.spacing3};
  gap: ${theme.spacing.spacing2};
`;

export const AverageRatingLabel = styled.div`
  font-size: ${theme.typography.fontSize.font4};
  font-weight: ${theme.typography.fontWeight.semibold};
  color: ${theme.colors.gray[700]};
`;

export const AverageRatingContent = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.spacing2};
`;

export const AverageRatingText = styled.div`
  font-size: ${theme.typography.fontSize.font7};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.gray[900]};
`;

export const AverageRatingSubtext = styled.div`
  font-size: ${theme.typography.fontSize.font3};
  color: ${theme.colors.gray[500]};
  font-weight: ${theme.typography.fontWeight.medium};
`;

export const ReviewTypeSummary = styled.div`
  margin-bottom: ${theme.spacing.spacing4};
`;

export const ReviewTypeSummaryHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: ${theme.spacing.spacing3};
  gap: ${theme.spacing.spacing2};
`;

export const ReviewTypeSummaryLabel = styled.div`
  font-size: ${theme.typography.fontSize.font4};
  font-weight: ${theme.typography.fontWeight.semibold};
  color: ${theme.colors.gray[700]};
`;

export const ReviewTypeSummaryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.spacing2};
`;

export const ReviewTypeSummaryItem = styled.div`
  background-color: ${theme.colors.white};
  border-radius: ${theme.spacing.spacing2};
  padding: ${theme.spacing.spacing3};
  border: 1px solid ${theme.colors.gray[200]};
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
`;

export const ReviewTypeSummaryContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const ReviewTypeSummaryText = styled.div`
  font-size: ${theme.typography.fontSize.font3};
  color: ${theme.colors.gray[700]};
  font-weight: ${theme.typography.fontWeight.medium};
  flex: 1;
`;

export const ReviewTypeCountBadge = styled.div`
  background-color: ${theme.colors.blue[500]};
  border-radius: ${theme.spacing.spacing3};
  padding-left: ${theme.spacing.spacing2};
  padding-right: ${theme.spacing.spacing2};
  padding-top: 4px;
  padding-bottom: 4px;
  min-width: 24px;
  display: flex;
  align-items: center;
`;

export const ReviewTypeCountText = styled.span`
  font-size: ${theme.typography.fontSize.font2};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.white};
`;

export const ReviewTypesContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: ${theme.spacing.spacing2};
`;

export const ReviewTypeBadge = styled.div`
  background-color: ${theme.colors.blue[50]};
  padding-left: ${theme.spacing.spacing2};
  padding-right: ${theme.spacing.spacing2};
  padding-top: 4px;
  padding-bottom: 4px;
  border-radius: ${theme.spacing.spacing3};
  border: 1px solid ${theme.colors.blue[100]};
`;

export const ReviewTypeText = styled.span`
  font-size: ${theme.typography.fontSize.font2};
  font-weight: ${theme.typography.fontWeight.medium};
  color: ${theme.colors.blue[800]};
`;

export const ReviewDate = styled.div`
  font-size: ${theme.typography.fontSize.font2};
  color: ${theme.colors.gray[400]};
  text-align: right;
`;
