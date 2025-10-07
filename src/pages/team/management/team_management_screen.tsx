import React, { useState } from 'react';
import styled from 'styled-components';

import TeamInfoCard from '@/components/team/cards/team_info_card';
import MemberDetailModal from '@/components/team/modals/member_detail_modal';
import TeamMembersSection from '@/components/team/sections/team_members_section';
import EmptyState from '@/components/team/states/empty_state';
import LoadingState from '@/components/team/states/loading_state';
import { CustomHeader } from '@/components/ui/custom_header';
import {
  useTeam,
  useTeamMembers,
  useUserProfile,
  useTeamExitMutation,
} from '@/hooks/queries';
import type { TeamMember } from '@/types/team';
import { theme } from '@/styles/theme';

// Styled Components
const Container = styled.div`
  flex: 1;
  background-color: ${theme.colors.default};
  display: flex;
  flex-direction: column;
`;

const ScrollContainer = styled.div`
  flex: 1;
  overflow-y: auto;
`;

const ContentContainer = styled.div`
  padding: ${theme.spacing.spacing4};
`;

interface TeamManagementScreenProps {
  teamId: string | number;
}

export default function TeamManagementScreen({
  teamId,
}: TeamManagementScreenProps) {
  const [showMemberDetailModal, setShowMemberDetailModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const { data: userProfile } = useUserProfile();
  const exitTeamMutation = useTeamExitMutation();

  const numericTeamId = teamId ? Number(teamId) : 0;
  const { data: team, isLoading, error, refetch } = useTeam(numericTeamId);
  const {
    data: teamMembersData,
    isLoading: membersLoading,
    error: membersError,
    refetch: _refetchMembers,
  } = useTeamMembers(numericTeamId);

  if (!teamId || teamId === null || teamId === undefined) {
    return (
      <EmptyState
        icon="⚠️"
        title="잘못된 팀 ID"
        subtitle="유효하지 않은 팀 ID입니다"
        description="올바른 팀 ID로 다시 시도해주세요."
      />
    );
  }

  if (
    isNaN(numericTeamId) ||
    !Number.isInteger(numericTeamId) ||
    numericTeamId <= 0
  ) {
    return (
      <EmptyState
        icon="⚠️"
        title="잘못된 팀 ID"
        subtitle="유효하지 않은 팀 ID입니다"
        description="올바른 팀 ID로 다시 시도해주세요."
      />
    );
  }

  if (isLoading || membersLoading) {
    return <LoadingState />;
  }

  if (error || membersError) {
    return (
      <EmptyState
        icon="❌"
        title="팀 관리"
        subtitle="팀 정보를 불러올 수 없습니다"
        description="네트워크 연결을 확인하고\n다시 시도해주세요."
        showRetryButton
        onRetry={() => refetch()}
      />
    );
  }

  const currentUserName = userProfile?.name;
  const teamMembers = teamMembersData?.content || [];
  const currentUserMember = teamMembers.find(
    member => member.name === currentUserName
  );
  const canManageTeam =
    currentUserMember?.role === 'LEADER' ||
    currentUserMember?.role === 'VICE_LEADER';

  if (!team || !teamMembersData) {
    return (
      <EmptyState
        icon="🔍"
        title="팀 관리"
        subtitle="팀을 찾을 수 없습니다"
        description="요청하신 팀이 존재하지 않거나\n접근 권한이 없습니다."
      />
    );
  }

  const handleMemberPress = (member: TeamMember) => {
    setSelectedMember(member);
    setShowMemberDetailModal(true);
  };

  const handleExitTeam = () => {
    const isTeamLeader = currentUserMember?.role === 'LEADER';

    if (isTeamLeader) {
      window.alert(
        '팀장은 팀에서 나갈 수 없습니다.\n팀을 해산하려면 팀 설정에서 팀 삭제 기능을 사용해주세요.'
      );
      return;
    }

    const confirmed = window.confirm(
      '정말로 이 팀에서 나가시겠습니까?\n\n팀에서 나가면 모든 팀 관련 권한이 제거됩니다.'
    );

    if (confirmed) {
      exitTeamMutation.mutate(numericTeamId, {
        onSuccess: () => {
          window.alert('팀에서 성공적으로 나가졌습니다.');
        },
        onError: error => {
          console.error('팀 나가기 실패:', error);
          let errorMessage = '팀 나가기에 실패했습니다. 다시 시도해주세요.';

          if (error && typeof error === 'object' && 'status' in error) {
            const apiError = error as {
              status: number;
              message?: string;
              data?: unknown;
            };

            if (apiError.status === 403) {
              errorMessage = '팀장은 팀에서 나갈 수 없습니다.';
            } else if (apiError.status === 404) {
              errorMessage = '팀을 찾을 수 없습니다.';
            } else if (apiError.status === 400) {
              errorMessage = '마지막 남은 팀원은 나갈 수 없습니다.';
            } else if (apiError.message) {
              errorMessage = apiError.message;
            }
          }

          window.alert(errorMessage);
        },
      });
    }
  };

  return (
    <Container>
      <CustomHeader title="팀 정보" />

      <ScrollContainer>
        <ContentContainer>
          <TeamInfoCard
            team={team}
            canManageTeam={canManageTeam}
            onExitTeam={handleExitTeam}
            isTeamLeader={currentUserMember?.role === 'LEADER'}
          />
          <TeamMembersSection
            teamMembers={teamMembers.sort((a, b) => {
              // 역할 우선순위: 회장(1) > 부회장(2) > 일반멤버(3)
              const roleOrder = { LEADER: 1, VICE_LEADER: 2, MEMBER: 3 };
              const aOrder = roleOrder[a.role] || 3;
              const bOrder = roleOrder[b.role] || 3;

              // 역할이 다르면 역할 순서로 정렬
              if (aOrder !== bOrder) {
                return aOrder - bOrder;
              }

              // 같은 역할이면 이름순으로 정렬
              return a.name.localeCompare(b.name);
            })}
            membersLoading={membersLoading}
            onMemberPress={handleMemberPress}
          />
        </ContentContainer>
      </ScrollContainer>

      <MemberDetailModal
        visible={showMemberDetailModal}
        teamId={numericTeamId}
        userId={selectedMember?.userId || 0}
        onClose={() => setShowMemberDetailModal(false)}
      />
    </Container>
  );
}
