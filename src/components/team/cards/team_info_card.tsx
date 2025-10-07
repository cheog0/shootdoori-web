import { router } from 'react-router-dom';
import { memo } from 'react';
import styled from 'styled-components';
import {
  Settings,
  Exit,
  Users,
  Star,
  Calendar,
  Football,
  ChevronRight,
} from 'lucide-react';

import {
  getTeamManagementSettingsUrl,
  getTeamManagementRecentMatchesUrl,
} from '@/constants/routes';
import { colors } from '@/theme';
import type { TeamDetailResponse } from '@/types/team';

// Styled Components
const Container = styled.div`
  background-color: white;
  border-radius: 20px;
  margin: 0 0 20px 0;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  overflow: hidden;
`;

const HeaderGradient = styled.div`
  background-color: ${colors.gray[400]};
  padding: 20px 20px 30px 20px;
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const TeamTitleContainer = styled.div`
  flex: 1;
`;

const HeaderButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const TeamTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: white;
  margin: 0 0 4px 0;
`;

const TeamSubtitle = styled.p`
  font-size: 16px;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
  margin: 0;
`;

const HeaderExitButton = styled.button`
  background-color: rgba(255, 255, 255, 0.15);
  border-radius: 12px;
  padding: 6px 12px;
  display: flex;
  align-items: center;
  gap: 4px;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.25);
  }
`;

const HeaderExitButtonText = styled.span`
  color: ${colors.orange[500]};
  font-size: 11px;
  font-weight: 500;
`;

const SettingsButton = styled.button`
  width: 40px;
  height: 40px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }
`;

const MainContent = styled.div`
  padding: 20px;
`;

const DescriptionSection = styled.div`
  margin-bottom: 24px;
`;

const DescriptionLabel = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: ${colors.gray[700]};
  margin: 0 0 8px 0;
`;

const DescriptionText = styled.p`
  font-size: 15px;
  color: ${colors.gray[600]};
  line-height: 22px;
  margin: 0;
`;

const StatsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const StatCard = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${colors.gray[50]};
  border-radius: 12px;
  padding: 8px;
  margin: 0 2px;
`;

const StatIconContainer = styled.div<{ backgroundColor: string }>`
  width: 36px;
  height: 36px;
  border-radius: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 6px;
  background-color: ${props => props.backgroundColor};
`;

const StatValue = styled.span`
  font-size: 10px;
  font-weight: bold;
  color: ${colors.gray[900]};
  margin-bottom: 2px;
  text-align: center;
`;

const StatLabel = styled.span`
  font-size: 9px;
  color: ${colors.gray[500]};
  font-weight: 500;
  text-align: center;
`;

const RecentMatchesButton = styled.button`
  background-color: ${colors.blue[500]};
  border-radius: 16px;
  margin-top: 0;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(59, 130, 246, 0.3);
  opacity: 0.9;
  transition: all 0.2s ease;

  &:hover {
    opacity: 1;
    transform: translateY(-1px);
  }
`;

const RecentMatchesButtonContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 14px 20px;
  gap: 8px;
`;

const RecentMatchesButtonText = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: white;
  flex: 1;
  text-align: center;
`;

interface TeamInfoCardProps {
  team: TeamDetailResponse;
  canManageTeam: boolean;
  onExitTeam?: () => void;
  isTeamLeader?: boolean;
}

export default memo(function TeamInfoCard({
  team,
  canManageTeam,
  onExitTeam,
  isTeamLeader = false,
}: TeamInfoCardProps) {
  const handleTeamManagement = () => {
    navigate(getTeamManagementSettingsUrl(team.id.toString()));
  };

  const handleRecentMatches = () => {
    navigate(getTeamManagementRecentMatchesUrl(team.id.toString()));
  };

  return (
    <Container>
      <HeaderGradient>
        <HeaderContent>
          <TeamTitleContainer>
            <TeamTitle>{team.name}</TeamTitle>
            <TeamSubtitle>{team.university}</TeamSubtitle>
          </TeamTitleContainer>
          <HeaderButtonsContainer>
            {/* 팀장이 아닌 경우에만 팀 탈퇴 버튼 표시 */}
            {onExitTeam && !isTeamLeader && (
              <HeaderExitButton onClick={onExitTeam}>
                <Exit size={16} color={colors.orange[600]} />
                <HeaderExitButtonText>팀 나가기</HeaderExitButtonText>
              </HeaderExitButton>
            )}
            {canManageTeam && (
              <SettingsButton onClick={handleTeamManagement}>
                <Settings size={20} color="white" />
              </SettingsButton>
            )}
          </HeaderButtonsContainer>
        </HeaderContent>
      </HeaderGradient>

      <MainContent>
        <DescriptionSection>
          <DescriptionLabel>팀 소개</DescriptionLabel>
          <DescriptionText>{team.description}</DescriptionText>
        </DescriptionSection>

        <StatsContainer>
          <StatCard>
            <StatIconContainer backgroundColor={colors.blue[50]}>
              <Users size={24} color={colors.blue[700]} />
            </StatIconContainer>
            <StatValue>{team.memberCount}</StatValue>
            <StatLabel>멤버</StatLabel>
          </StatCard>

          <StatCard>
            <StatIconContainer backgroundColor={colors.orange[50]}>
              <Star size={24} color={colors.orange[700]} />
            </StatIconContainer>
            <StatValue>{team.skillLevel}</StatValue>
            <StatLabel>실력</StatLabel>
          </StatCard>

          <StatCard>
            <StatIconContainer backgroundColor={colors.purple[50]}>
              <Calendar size={24} color={colors.purple[700]} />
            </StatIconContainer>
            <StatValue>
              {new Date(team.createdAt).getFullYear()}.
              {String(new Date(team.createdAt).getMonth() + 1).padStart(2, '0')}
            </StatValue>
            <StatLabel>생성</StatLabel>
          </StatCard>
        </StatsContainer>

        <RecentMatchesButton onClick={handleRecentMatches}>
          <RecentMatchesButtonContent>
            <Football size={20} color="white" />
            <RecentMatchesButtonText>최근 경기 보기</RecentMatchesButtonText>
            <ChevronRight size={16} color="white" />
          </RecentMatchesButtonContent>
        </RecentMatchesButton>
      </MainContent>
    </Container>
  );
});
