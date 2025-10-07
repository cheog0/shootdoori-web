import { useNavigate } from 'react-router-dom';
import { memo, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Users, Plus } from 'lucide-react';

import { useUserProfile } from '@/hooks/queries';
import { useMyJoinWaitingList } from '@/hooks/useTeamJoinRequest';
import { colors } from '@/theme';

import JoinWaitingList from '../join_waiting_list';

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 0 20px;
`;

const CreateButton = styled.div`
  background-color: ${colors.blue[500]};
  border-radius: 16px;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);

  &:hover {
    background-color: ${colors.blue[600]};
  }
`;

const CreateButtonText = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: ${colors.text.white};
`;

const JoinButton = styled.div`
  background-color: white;
  border-radius: 16px;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 2px solid ${colors.blue[200]};
  position: relative;

  &:hover {
    border-color: ${colors.blue[300]};
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.2);
  }
`;

const JoinButtonText = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: ${colors.blue[500]};
`;

const NotificationBadge = styled.div`
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: ${colors.red[500]};
  border-radius: 12px;
  min-width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NotificationText = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: white;
`;

export default memo(function Buttons() {
  const navigate = useNavigate();
  const [showJoinWaitingList, setShowJoinWaitingList] = useState(false);
  const { data: userProfile } = useUserProfile();

  const { data: joinWaitingData, refetch } = useMyJoinWaitingList(0, 1);
  const hasJoinWaiting = joinWaitingData && !joinWaitingData.empty;

  useEffect(() => {
    refetch();
  }, [refetch]);

  const handleJoinTeam = () => {
    if (hasJoinWaiting) {
      setShowJoinWaitingList(true);
    } else {
      navigate('/team/join-university');
    }
  };

  const handleCreateTeam = () => {
    navigate('/team/creation', {
      state: { university: userProfile?.university || '' },
    });
  };

  return (
    <ButtonContainer>
      <JoinButton onClick={handleJoinTeam}>
        <Users size={24} color={colors.blue[500]} />
        <JoinButtonText>
          {hasJoinWaiting ? '팀 신청 현황' : '팀 참여하기'}
        </JoinButtonText>
        {hasJoinWaiting && (
          <NotificationBadge>
            <NotificationText>
              {joinWaitingData?.totalElements || 0}
            </NotificationText>
          </NotificationBadge>
        )}
      </JoinButton>

      <CreateButton onClick={handleCreateTeam}>
        <Plus size={24} color={colors.text.white} />
        <CreateButtonText>팀 생성하기</CreateButtonText>
      </CreateButton>

      {showJoinWaitingList && (
        <JoinWaitingList onClose={() => setShowJoinWaitingList(false)} />
      )}
    </ButtonContainer>
  );
});
