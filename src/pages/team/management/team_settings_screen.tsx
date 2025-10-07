import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styled from 'styled-components';

import { acceptMatchRequestApi, rejectMatchRequestApi } from '@/api/match';
import { teamJoinRequestApi } from '@/api/team';
import JoinRequestsModal from '@/components/team/modals/join_requests_modal';
import MatchRequestsModal, {
  type MatchRequest,
} from '@/components/team/modals/match_requests_modal';
import ManageSection from '@/components/team/sections/manage_section';
import { CustomHeader } from '@/components/ui/custom_header';
import GlobalErrorFallback from '@/components/ui/global_error_fallback';
import { LoadingState } from '@/components/ui/loading_state';
import {
  useTeamJoinWaitingList,
  useTeamMembers,
  useUserProfile,
  useDeleteTeamMutation,
  useTeam,
  useTeamMatchRequests,
} from '@/hooks/queries';
import { theme } from '@/styles/theme';

// Styled Components
const Container = styled.div`
  flex: 1;
  background-color: ${theme.colors.default};
`;

const Content = styled.div`
  flex: 1;
  padding: ${theme.spacing.spacing4};
`;

const LoadingContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${theme.spacing.spacing8};
`;

interface TeamSettingsScreenProps {
  teamId: string | number;
}

export default function TeamSettingsScreen({
  teamId,
}: TeamSettingsScreenProps) {
  const navigate = useNavigate();
  const [showJoinRequestsModal, setShowJoinRequestsModal] = useState(false);
  const [showMatchRequestsModal, setShowMatchRequestsModal] = useState(false);
  const { data: userProfile } = useUserProfile();
  const deleteTeamMutation = useDeleteTeamMutation();

  const numericTeamId = teamId ? Number(teamId) : 0;
  const {
    data: matchRequestsData,
    isLoading: matchRequestsLoading,
    error: matchRequestsError,
    refetch: refetchMatchRequests,
  } = useTeamMatchRequests();

  const matchRequests: MatchRequest[] = (matchRequestsData || []).map(
    request => ({
      ...request,
      createdAt: new Date().toISOString(), // 임시로 현재 시간 사용
      status:
        request.status === 'CANCELED'
          ? 'REJECTED'
          : (request.status as 'PENDING' | 'ACCEPTED' | 'REJECTED'),
    })
  );
  const { refetch: refetchTeam } = useTeam(numericTeamId);
  const {
    data: teamMembersData,
    isLoading: membersLoading,
    error: membersError,
    refetch: refetchMembers,
  } = useTeamMembers(numericTeamId);
  const {
    data: joinRequestsData,
    isLoading,
    error,
    refetch,
  } = useTeamJoinWaitingList(teamId, 'PENDING', 0, 10);

  const currentUserName = userProfile?.name;
  const teamMembers = teamMembersData?.content || [];
  const currentUserMember = teamMembers.find(
    member => member.name === currentUserName
  );
  const canManageTeam =
    currentUserMember?.role === 'LEADER' ||
    currentUserMember?.role === 'VICE_LEADER';

  // 권한 체크: 회장/부회장이 아니면 알림 표시하고 팀 정보로 이동
  useEffect(() => {
    if (currentUserMember && !canManageTeam) {
      const confirmed = window.confirm(
        '팀 설정에 접근할 권한이 없습니다. 회장과 부회장만 접근할 수 있습니다.\n\n확인을 누르면 팀 정보 화면으로 이동합니다.'
      );
      if (confirmed) {
        navigate(`/team/management/${numericTeamId}`);
      }
    }
  }, [currentUserMember, canManageTeam, numericTeamId, navigate]);

  if (!teamId || teamId === null || teamId === undefined) {
    return (
      <Container>
        <CustomHeader title="팀 관리" />
        <LoadingContainer>
          <span style={{ textAlign: 'center', color: theme.colors.error }}>
            유효하지 않은 팀 ID입니다.
          </span>
        </LoadingContainer>
      </Container>
    );
  }

  if (
    isNaN(numericTeamId) ||
    !Number.isInteger(numericTeamId) ||
    numericTeamId <= 0
  ) {
    return (
      <Container>
        <CustomHeader title="팀 관리" />
        <LoadingContainer>
          <span style={{ textAlign: 'center', color: theme.colors.error }}>
            유효하지 않은 팀 ID입니다.
          </span>
        </LoadingContainer>
      </Container>
    );
  }

  if (isLoading || membersLoading || matchRequestsLoading) {
    return <LoadingState message="팀 정보를 불러오는 중..." />;
  }

  if (error || membersError || matchRequestsError) {
    const errorToShow = error || membersError || matchRequestsError;
    return (
      <GlobalErrorFallback error={errorToShow!} resetError={() => refetch()} />
    );
  }

  if (!joinRequestsData) {
    return (
      <LoadingContainer>
        <span>가입 요청 정보를 불러오는 중...</span>
      </LoadingContainer>
    );
  }

  const joinRequests = joinRequestsData.content;

  const handleJoinRequest = async (
    requestId: number,
    status: 'approved' | 'rejected'
  ) => {
    const action = status === 'approved' ? '승인' : '거절';

    const confirmed = window.confirm(
      `이 사용자의 가입을 ${action}하시겠습니까?`
    );
    if (!confirmed) return;

    try {
      if (status === 'approved') {
        await teamJoinRequestApi.approveJoinRequest(teamId, requestId, {
          role: '일반멤버',
        });
      } else {
        await teamJoinRequestApi.rejectJoinRequest(teamId, requestId, {
          reason: '가입 거절',
        });
      }

      window.alert(`가입을 ${action}했습니다.`);
      refetch();
      if (status === 'approved') {
        refetchMembers();
        refetchTeam();
      }
    } catch {
      window.alert(`${action} 처리 중 오류가 발생했습니다.`);
    }
  };

  const handleMatchRequest = async (
    requestId: number,
    status: 'approved' | 'rejected'
  ) => {
    const action = status === 'approved' ? '수락' : '거절';

    const confirmed = window.confirm(`이 매치 요청을 ${action}하시겠습니까?`);
    if (!confirmed) return;

    try {
      if (status === 'approved') {
        await acceptMatchRequestApi(requestId);
      } else {
        await rejectMatchRequestApi(requestId);
      }

      window.alert(`매치 요청을 ${action}했습니다.`);
      refetchMatchRequests(); // 매치 요청 목록 새로고침
    } catch {
      window.alert(`${action} 처리 중 오류가 발생했습니다.`);
    }
  };

  const handleDeleteTeam = async () => {
    const confirmed = window.confirm(
      '정말로 팀을 삭제하시겠습니까?\n\n이 작업은 되돌릴 수 없습니다.\n\n관련된 작업이 있다면 팀 삭제가 제한될 수 있습니다.'
    );
    if (!confirmed) return;

    deleteTeamMutation.mutate(numericTeamId, {
      onSuccess: () => {
        window.alert('팀이 성공적으로 삭제되었습니다.');
        navigate('/team/guide');
      },
      onError: error => {
        console.error('팀 삭제 실패:', error);
        let errorMessage = '팀 삭제에 실패했습니다. 다시 시도해주세요.';

        if (error && typeof error === 'object' && 'status' in error) {
          const apiError = error as {
            status: number;
            message?: string;
            data?: unknown;
          };

          if (apiError.status === 401) {
            errorMessage = '인증이 필요합니다. 다시 로그인해주세요.';
          } else if (apiError.status === 403) {
            errorMessage = '팀장만 팀을 삭제할 수 있습니다.';
          } else if (apiError.status === 404) {
            errorMessage = '팀을 찾을 수 없습니다.';
          } else if (apiError.status === 500) {
            errorMessage =
              '팀 삭제 중 서버 오류가 발생했습니다.\n\n다음 데이터들이 남아있어 팀을 삭제할 수 없습니다:\n• 팀 가입 대기 목록\n• 진행 중인 매치 요청\n• 팀 관련 업무 데이터\n\n팀에서 먼저 이러한 데이터들을 정리해주세요.';
          } else if (apiError.message) {
            errorMessage = apiError.message;
          }
        }

        window.alert(errorMessage);
      },
    });
  };

  return (
    <Container>
      <CustomHeader title="팀 관리" />
      <Content>
        <ManageSection
          teamId={teamId}
          joinRequests={joinRequests}
          matchRequests={matchRequests}
          onShowJoinRequestsModal={() => setShowJoinRequestsModal(true)}
          onShowMatchRequestsModal={() => setShowMatchRequestsModal(true)}
          onDeleteTeam={handleDeleteTeam}
        />
      </Content>

      <JoinRequestsModal
        visible={showJoinRequestsModal}
        joinRequests={joinRequests}
        onClose={() => setShowJoinRequestsModal(false)}
        onJoinRequest={handleJoinRequest}
      />

      <MatchRequestsModal
        visible={showMatchRequestsModal}
        matchRequests={matchRequests}
        onClose={() => setShowMatchRequestsModal(false)}
        onAcceptRequest={requestId => handleMatchRequest(requestId, 'approved')}
        onRejectRequest={requestId => handleMatchRequest(requestId, 'rejected')}
        onRefresh={refetchMatchRequests}
      />
    </Container>
  );
}
