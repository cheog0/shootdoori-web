import styled from 'styled-components';

import { theme } from '@/styles/theme';
import type { MatchWaitingHistoryResponseDto } from '@/types/match';

interface AppliedMatchCardProps {
  match: MatchWaitingHistoryResponseDto;
  onSelect?: (id: number) => void;
  isSelected?: boolean;
}

// Styled Components
const Card = styled.div<{ isSelected?: boolean }>`
  background-color: ${theme.colors.white};
  border-radius: 12px;
  padding: ${theme.spacing.spacing4};
  margin-bottom: ${theme.spacing.spacing3};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 2px solid
    ${props => (props.isSelected ? theme.colors.blue500 : 'transparent')};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.spacing3};
`;

const TeamInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.spacing1};
`;

const TeamName = styled.h3`
  font-size: ${theme.typography.fontSize.lg};
  font-weight: ${theme.fontWeight.semibold};
  color: ${theme.colors.textMain};
  margin: 0;
`;

const MatchInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.spacing2};
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const InfoLabel = styled.span`
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.textSub};
`;

const InfoValue = styled.span`
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.textMain};
  font-weight: ${theme.fontWeight.medium};
`;

const StatusBadge = styled.div<{ statusColor: string }>`
  background-color: ${props => props.statusColor};
  color: ${theme.colors.white};
  padding: ${theme.spacing.spacing1} ${theme.spacing.spacing2};
  border-radius: 8px;
  font-size: ${theme.typography.fontSize.xs};
  font-weight: ${theme.fontWeight.semibold};
  text-transform: uppercase;
`;

const DateInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.spacing1};
`;

export default function AppliedMatchCard({
  match,
  onSelect,
  isSelected = false,
}: AppliedMatchCardProps) {
  const getName = (nameField: string | { name: string }) => {
    if (!nameField) return '알 수 없음';
    if (typeof nameField === 'object') return nameField.name;
    return nameField;
  };

  const requestTeam = getName(match.requestTeamName);
  const targetTeam = getName(match.targetTeamName);
  const date = match.requestAt?.split('T')[0] || '';
  const time = match.requestAt?.split('T')[1]?.slice(0, 5) || '';
  const status = match.status || 'PENDING';

  const getStatusColor = () => {
    switch (status.toUpperCase()) {
      case 'APPROVED':
        return theme.colors.success;
      case 'REJECTED':
        return theme.colors.error;
      case 'CANCELED':
        return theme.colors.gray600;
      default:
        return theme.colors.yellow600;
    }
  };

  const getStatusText = () => {
    switch (status.toUpperCase()) {
      case 'APPROVED':
        return '승인됨';
      case 'REJECTED':
        return '거절됨';
      case 'CANCELED':
        return '취소됨';
      default:
        return '대기중';
    }
  };

  return (
    <Card isSelected={isSelected} onClick={() => onSelect?.(match.requestId)}>
      <Header>
        <TeamInfo>
          <TeamName>{requestTeam}</TeamName>
          <InfoValue>vs {targetTeam}</InfoValue>
        </TeamInfo>
        <StatusBadge statusColor={getStatusColor()}>
          {getStatusText()}
        </StatusBadge>
      </Header>

      <MatchInfo>
        <InfoRow>
          <InfoLabel>요청일시</InfoLabel>
          <DateInfo>
            <InfoValue>{date}</InfoValue>
            <InfoValue>{time}</InfoValue>
          </DateInfo>
        </InfoRow>

        {match.venue && (
          <InfoRow>
            <InfoLabel>경기장</InfoLabel>
            <InfoValue>{match.venue}</InfoValue>
          </InfoRow>
        )}

        {match.message && (
          <InfoRow>
            <InfoLabel>메시지</InfoLabel>
            <InfoValue>{match.message}</InfoValue>
          </InfoRow>
        )}
      </MatchInfo>
    </Card>
  );
}
