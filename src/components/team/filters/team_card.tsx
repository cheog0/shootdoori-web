import React, { useMemo } from 'react';
import styled from 'styled-components';
import { IoPeople, IoCalendar, IoLocation } from 'react-icons/io5';

import type { TeamListItem } from '@/types';
import { theme } from '@/styles/theme';

// Styled Components
const Card = styled.div`
  background-color: ${theme.colors.white};
  border-radius: 12px;
  padding: ${theme.spacing.spacing4};
  margin-bottom: ${theme.spacing.spacing3};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${theme.spacing.spacing3};
`;

const TeamName = styled.h3`
  font-size: ${theme.typography.fontSize.lg};
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.textMain};
  margin: 0;
  flex: 1;
`;

const JoinButton = styled.button`
  background-color: ${theme.colors.brand.main};
  color: ${theme.colors.white};
  border: none;
  border-radius: 8px;
  padding: ${theme.spacing.spacing2} ${theme.spacing.spacing4};
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.fontWeight.medium};
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${theme.colors.brand.dark};
  }

  &:active {
    transform: translateY(1px);
  }
`;

const InfoSection = styled.div`
  margin-bottom: ${theme.spacing.spacing3};
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${theme.spacing.spacing2};
`;

const InfoIcon = styled.div`
  color: ${theme.colors.textSub};
  margin-right: ${theme.spacing.spacing2};
  display: flex;
  align-items: center;
`;

const InfoText = styled.span`
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.textSub};
`;

const Description = styled.p`
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.textMain};
  line-height: 1.4;
  margin: 0;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: ${theme.spacing.spacing3};
  padding-top: ${theme.spacing.spacing3};
  border-top: 1px solid ${theme.colors.gray200};
`;

const MemberCount = styled.div`
  display: flex;
  align-items: center;
  color: ${theme.colors.textSub};
  font-size: ${theme.typography.fontSize.sm};
`;

const CreatedDate = styled.span`
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.textSub};
`;

interface TeamCardProps {
  team: TeamListItem;
  onJoin: (teamId: number) => void;
}

interface TeamInfoItem {
  label: string;
  value: string;
}

export default function TeamCard({ team, onJoin }: TeamCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const teamInfo: TeamInfoItem[] = useMemo(() => {
    const info: TeamInfoItem[] = [];

    if (team.university) {
      info.push({
        label: '대학교',
        value: team.university,
      });
    }

    if (team.skillLevel) {
      info.push({
        label: '실력',
        value: team.skillLevel,
      });
    }

    if (team.teamType) {
      info.push({
        label: '팀 유형',
        value: team.teamType,
      });
    }

    return info;
  }, [team]);

  return (
    <Card>
      <Header>
        <TeamName>{team.name}</TeamName>
        <JoinButton onClick={() => onJoin(team.id)}>참여하기</JoinButton>
      </Header>

      <InfoSection>
        {teamInfo.map((item, index) => (
          <InfoItem key={index}>
            <InfoIcon>
              {item.label === '대학교' && <IoLocation size={16} />}
              {item.label === '실력' && <IoPeople size={16} />}
              {item.label === '팀 유형' && <IoCalendar size={16} />}
            </InfoIcon>
            <InfoText>
              {item.label}: {item.value}
            </InfoText>
          </InfoItem>
        ))}
      </InfoSection>

      {team.description && <Description>{team.description}</Description>}

      <Footer>
        <MemberCount>
          <IoPeople size={16} style={{ marginRight: theme.spacing.spacing1 }} />
          {team.memberCount || 0}명
        </MemberCount>
        <CreatedDate>{formatDate(team.createdAt)}</CreatedDate>
      </Footer>
    </Card>
  );
}
