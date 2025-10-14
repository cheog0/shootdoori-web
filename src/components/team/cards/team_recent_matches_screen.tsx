import { memo } from 'react';
import styled from 'styled-components';
import { Loader2 } from 'lucide-react';

import { CustomHeader } from './components/ui/custom_header';
import GlobalErrorFallback from './components/ui/global_error_fallback';
import { useTeamRecentMatches, useTeam } from '@/hooks/queries';
import { colors, theme } from '@/theme';
import type { RecentMatchResponse } from '@/types/match';
import { formatDate, formatTime } from '@/utils/date';

// Styled Components
const Container = styled.div`
  flex: 1;
  background-color: ${theme.colors.default};
  display: flex;
  flex-direction: column;
`;

const LoadingContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
`;

const LoadingText = styled.span`
  font-size: 16px;
  color: ${colors.gray[600]};
  text-align: center;
`;

const ErrorContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
`;

const ErrorText = styled.span`
  font-size: 16px;
  color: ${colors.red[500]};
  text-align: center;
`;

const ScrollContainer = styled.div`
  flex: 1;
  overflow-y: auto;
`;

const ContentContainer = styled.div`
  padding: 16px;
`;

const MatchCard = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const MatchHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

const MatchDate = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: ${colors.gray[700]};
`;

const MatchStatus = styled.span<{ status: string }>`
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  background-color: ${props => {
    switch (props.status) {
      case 'WIN':
        return colors.green[100];
      case 'LOSE':
        return colors.red[100];
      case 'DRAW':
        return colors.yellow[100];
      default:
        return colors.gray[100];
    }
  }};
  color: ${props => {
    switch (props.status) {
      case 'WIN':
        return colors.green[700];
      case 'LOSE':
        return colors.red[700];
      case 'DRAW':
        return colors.yellow[700];
      default:
        return colors.gray[700];
    }
  }};
`;

const MatchTeams = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const TeamName = styled.span<{ isHome: boolean }>`
  font-size: 16px;
  font-weight: ${props => (props.isHome ? '600' : '500')};
  color: ${props => (props.isHome ? colors.gray[900] : colors.gray[600])};
`;

const Score = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 18px;
  font-weight: 600;
  color: ${colors.gray[900]};
`;

const MatchDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: ${colors.gray[500]};
`;

const MatchTime = styled.span`
  font-size: 12px;
  color: ${colors.gray[500]};
`;

const MatchVenue = styled.span`
  font-size: 12px;
  color: ${colors.gray[500]};
`;

const EmptyContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px;
`;

const EmptyText = styled.span`
  font-size: 16px;
  color: ${colors.gray[600]};
  text-align: center;
`;

const EmptySubtext = styled.span`
  font-size: 14px;
  color: ${colors.gray[500]};
  text-align: center;
  margin-top: 8px;
`;

interface TeamRecentMatchesScreenProps {
  teamId: string;
}

export default memo(function TeamRecentMatchesScreen({
  teamId,
}: TeamRecentMatchesScreenProps) {
  const {
    data: matches,
    isLoading,
    error,
    refetch,
  } = useTeamRecentMatches('FINISHED');
  useTeam(teamId);

  if (!teamId || teamId === null || teamId === undefined) {
    return (
      <Container>
        <CustomHeader title="최근 경기" />
        <ErrorContainer>
          <ErrorText>유효하지 않은 팀 ID입니다.</ErrorText>
        </ErrorContainer>
      </Container>
    );
  }

  const numericTeamId = Number(teamId);

  if (
    isNaN(numericTeamId) ||
    !Number.isInteger(numericTeamId) ||
    numericTeamId <= 0
  ) {
    return (
      <Container>
        <CustomHeader title="최근 경기" />
        <ErrorContainer>
          <ErrorText>유효하지 않은 팀 ID입니다.</ErrorText>
        </ErrorContainer>
      </Container>
    );
  }

  if (isLoading) {
    return (
      <Container>
        <CustomHeader title="최근 경기" />
        <LoadingContainer>
          <Loader2 size={24} color={colors.gray[600]} />
          <LoadingText>경기 기록을 불러오는 중...</LoadingText>
        </LoadingContainer>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <CustomHeader title="최근 경기" />
        <GlobalErrorFallback error={error as Error} resetError={refetch} />
      </Container>
    );
  }

  if (!matches || matches.length === 0) {
    return (
      <Container>
        <CustomHeader title="최근 경기" />
        <EmptyContainer>
          <EmptyText>최근 경기 기록이 없습니다</EmptyText>
          <EmptySubtext>팀이 경기에 참여하면 기록이 표시됩니다</EmptySubtext>
        </EmptyContainer>
      </Container>
    );
  }

  const getMatchStatus = (match: RecentMatchResponse) => {
    if (match.homeTeamScore > match.awayTeamScore) {
      return match.homeTeamId === numericTeamId ? 'WIN' : 'LOSE';
    } else if (match.homeTeamScore < match.awayTeamScore) {
      return match.homeTeamId === numericTeamId ? 'LOSE' : 'WIN';
    } else {
      return 'DRAW';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'WIN':
        return '승리';
      case 'LOSE':
        return '패배';
      case 'DRAW':
        return '무승부';
      default:
        return '알 수 없음';
    }
  };

  return (
    <Container>
      <CustomHeader title="최근 경기" />

      <ScrollContainer>
        <ContentContainer>
          {matches.map(match => {
            const isHomeTeam = match.homeTeamId === numericTeamId;
            const status = getMatchStatus(match);

            return (
              <MatchCard key={match.id}>
                <MatchHeader>
                  <MatchDate>{formatDate(match.matchDate)}</MatchDate>
                  <MatchStatus status={status}>
                    {getStatusText(status)}
                  </MatchStatus>
                </MatchHeader>

                <MatchTeams>
                  <TeamName isHome={isHomeTeam}>
                    {isHomeTeam ? match.homeTeamName : match.awayTeamName}
                  </TeamName>
                  <Score>
                    {isHomeTeam ? match.homeTeamScore : match.awayTeamScore}
                    <span>:</span>
                    {isHomeTeam ? match.awayTeamScore : match.homeTeamScore}
                  </Score>
                  <TeamName isHome={!isHomeTeam}>
                    {isHomeTeam ? match.awayTeamName : match.homeTeamName}
                  </TeamName>
                </MatchTeams>

                <MatchDetails>
                  <MatchTime>{formatTime(match.matchDate)}</MatchTime>
                  <MatchVenue>{match.venueName}</MatchVenue>
                </MatchDetails>
              </MatchCard>
            );
          })}
        </ContentContainer>
      </ScrollContainer>
    </Container>
  );
});
