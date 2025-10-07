import React, { useState } from 'react';
//
import styled from '@emotion/styled';

// import TeamInfoCard from '@/components/team/cards/team_info_card';
// import MemberDetailModal from '@/components/team/modals/member_detail_modal';
// import TeamMembersSection from '@/components/team/sections/team_members_section';
// import EmptyState from '@/components/team/states/empty_state';
// import LoadingState from '@/components/team/states/loading_state';
// import { CustomHeader } from '@/components/ui/custom_header';
// import { useTeam, useTeamMembers, useUserProfile } from '@/hooks/queries';
import type { TeamMember } from '@/types/team';

// import { styles } from './styles';

interface TeamManagementScreenProps {
  teamId: string | number;
}

export default function TeamManagementScreen({
  teamId,
}: TeamManagementScreenProps) {
  const [showMemberDetailModal, setShowMemberDetailModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  // TODO: 실제 데이터 fetching 로직 구현
  const _userProfile = null;
  const _team = null;
  const isLoading = false;
  if (!teamId || teamId === null || teamId === undefined) {
    return (
      <Container>
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <h2>⚠️ 잘못된 팀 ID</h2>
          <p>유효하지 않은 팀 ID입니다</p>
        </div>
      </Container>
    );
  }

  const numericTeamId = teamId ? Number(teamId) : 0;

  if (
    isNaN(numericTeamId) ||
    !Number.isInteger(numericTeamId) ||
    numericTeamId <= 0
  ) {
    return (
      <Container>
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <h2>⚠️ 잘못된 팀 ID</h2>
          <p>유효하지 않은 팀 ID입니다</p>
        </div>
      </Container>
    );
  }

  if (isLoading || membersLoading) {
    return (
      <Container>
        <div style={{ textAlign: 'center', padding: '50px' }}>로딩 중...</div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <h2>❌ 팀 관리</h2>
          <p>팀 정보를 불러올 수 없습니다</p>
          <button onClick={refetch}>다시 시도</button>
        </div>
      </Container>
    );
  }

  const handleMemberPress = (member: TeamMember) => {
    setSelectedMember(member);
    setShowMemberDetailModal(true);
  };

  return (
    <Container>
      <Header>
        <h1>팀 정보</h1>
      </Header>

      <Content>
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <h2>팀 관리</h2>
          <p>TODO: TeamInfoCard 컴포넌트 구현 필요</p>
        </div>

        <div style={{ padding: '20px', textAlign: 'center' }}>
          <h3>팀 멤버</h3>
          <p>TODO: TeamMembersSection 컴포넌트 구현 필요</p>
        </div>
      </Content>

      {showMemberDetailModal && selectedMember && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              background: 'white',
              padding: '20px',
              borderRadius: '8px',
            }}
          >
            <h3>멤버 상세 정보</h3>
            <p>TODO: MemberDetailModal 컴포넌트 구현 필요</p>
            <button onClick={() => setShowMemberDetailModal(false)}>
              닫기
            </button>
          </div>
        </div>
      )}
    </Container>
  );
}

const Container = styled.div`
  min-height: 100vh;
  background-color: #f5f5f5;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: white;
  border-bottom: 1px solid #eee;
`;

const Content = styled.div`
  padding: 20px;
`;
