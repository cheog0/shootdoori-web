import { memo } from 'react';
import styled from 'styled-components';

import { HomeData } from '@/types/home';
import { theme } from '@/theme';

interface MatchStatusCardProps {
  homeData: HomeData;
}

const MatchStatusCard = styled.div`
  background-color: ${theme.colors.white};
  border-radius: ${theme.spacing.spacing4};
  padding: ${theme.spacing.spacing4};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: ${theme.spacing.spacing3};
`;

const MatchScheduledContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.spacing3};
`;

const MatchScheduledText = styled.div`
  flex: 1;
`;

const MatchScheduledTitle = styled.h3`
  font-size: ${theme.typography.fontSize.font3};
  font-weight: ${theme.typography.fontWeight.semibold};
  color: ${theme.colors.text.main};
  margin: 0 0 ${theme.spacing.spacing1} 0;
`;

const MatchScheduledSubtitle = styled.p`
  font-size: ${theme.typography.fontSize.font2};
  color: ${theme.colors.text.sub};
  margin: 0;
`;

const NoMatchContainer = styled.div`
  text-align: center;
  padding: ${theme.spacing.spacing4} 0;
`;

const NoMatchText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const NoMatchTitle = styled.h3`
  font-size: ${theme.typography.fontSize.font3};
  font-weight: ${theme.typography.fontWeight.semibold};
  color: ${theme.colors.text.main};
  margin: 0 0 ${theme.spacing.spacing1} 0;
`;

const NoMatchSubtitle = styled.p`
  font-size: ${theme.typography.fontSize.font2};
  color: ${theme.colors.text.sub};
  margin: 0;
`;

export default memo(function MatchStatusCardComponent({
  homeData,
}: MatchStatusCardProps) {
  return (
    <MatchStatusCard>
      {homeData.todayMatch.hasMatch ? (
        <MatchScheduledContainer>
          <MatchScheduledText>
            <MatchScheduledTitle>
              축구 경기가 예정된 날입니다!
            </MatchScheduledTitle>
            <MatchScheduledSubtitle>
              오늘 {homeData.todayMatch.matchInfo?.time}{' '}
              {homeData.todayMatch.matchInfo?.location}
            </MatchScheduledSubtitle>
          </MatchScheduledText>
        </MatchScheduledContainer>
      ) : (
        <NoMatchContainer>
          <NoMatchText>
            <NoMatchTitle>오늘 예정되어 있는 경기가 없습니다</NoMatchTitle>
            <NoMatchSubtitle>매치를 생성해보세요!</NoMatchSubtitle>
          </NoMatchText>
        </NoMatchContainer>
      )}
    </MatchStatusCard>
  );
});
