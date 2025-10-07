import { useNavigate } from 'react-router-dom';
import React from 'react';
import styled from 'styled-components';
import { AlertTriangle, Users, X, Loader2 } from 'lucide-react';

import { useTeamJoinRequest } from '@/hooks/useTeamJoinRequest';
import { colors } from '@/theme';
import type { UserJoinWaitingItem } from '@/types/team';

// Styled Components
const ModalOverlay = styled.div<{ visible: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${props => (props.visible ? 'flex' : 'none')};
  justify-content: flex-end;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background-color: white;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  width: 100%;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid ${colors.gray[200]};
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const IconContainer = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: ${colors.orange[50]};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: ${colors.gray[900]};
  margin: 0;
`;

const CloseButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: ${colors.gray[100]};
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${colors.gray[200]};
  }
`;

const ModalContent = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
`;

const WarningSection = styled.div`
  background-color: ${colors.orange[50]};
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 20px;
`;

const WarningText = styled.p`
  font-size: 14px;
  color: ${colors.orange[700]};
  margin: 0;
  line-height: 1.5;
`;

const TeamInfoCard = styled.div`
  background-color: ${colors.gray[50]};
  border-radius: 12px;
  padding: 16px;
`;

const TeamInfoHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
`;

const TeamInfoTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: ${colors.gray[900]};
  margin: 0;
`;

const TeamInfoContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TeamIdLabel = styled.span`
  font-size: 14px;
  color: ${colors.gray[600]};
`;

const TeamIdValue = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: ${colors.gray[900]};
`;

const ModalButtonContainer = styled.div`
  display: flex;
  gap: 12px;
  padding: 20px;
  border-top: 1px solid ${colors.gray[200]};
`;

const Button = styled.button<{ variant: 'cancel' | 'confirm' }>`
  flex: 1;
  padding: 16px;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.2s ease;

  ${props =>
    props.variant === 'cancel'
      ? `
    background-color: ${colors.gray[100]};
    color: ${colors.gray[700]};
    
    &:hover {
      background-color: ${colors.gray[200]};
    }
  `
      : `
    background-color: ${colors.red[500]};
    color: white;
    
    &:hover {
      background-color: ${colors.red[600]};
    }
  `}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const ButtonText = styled.span`
  font-size: 16px;
  font-weight: 600;
`;

interface CancelModalProps {
  visible: boolean;
  joinWaitingItem: UserJoinWaitingItem | null;
  onClose: () => void;
  onSuccess: () => void;
  onOuterModalClose: () => void;
}

export default function CancelModal({
  visible,
  joinWaitingItem,
  onClose,
  onSuccess,
  onOuterModalClose,
}: CancelModalProps) {
  const navigate = useNavigate();
  const { cancelJoinRequest, isCanceling } = useTeamJoinRequest();

  const handleCancel = () => {
    if (!joinWaitingItem) return;

    const confirmed = window.confirm('정말로 팀 가입 신청을 취소하시겠습니까?');

    if (confirmed) {
      cancelJoinRequest(
        {
          teamId: joinWaitingItem.teamId,
          joinWaitingId: joinWaitingItem.id,
          data: {},
        },
        {
          onSuccess: () => {
            onSuccess();
            onClose();
            window.alert('팀 가입 신청이 취소되었습니다.');
            onOuterModalClose();
            navigate('/');
          },
          onError: error => {
            window.alert(error?.message || '팀 가입 신청 취소에 실패했습니다.');
          },
        }
      );
    }
  };

  const handleClose = () => {
    onClose();
  };

  if (!joinWaitingItem) return null;

  return (
    <ModalOverlay visible={visible}>
      <ModalContainer>
        <ModalHeader>
          <HeaderContent>
            <IconContainer>
              <AlertTriangle size={24} color={colors.orange[500]} />
            </IconContainer>
            <ModalTitle>팀 가입 신청 취소</ModalTitle>
          </HeaderContent>
          <CloseButton onClick={handleClose}>
            <X size={24} color={colors.gray[600]} />
          </CloseButton>
        </ModalHeader>

        <ModalContent>
          <WarningSection>
            <WarningText>
              팀 가입 신청을 취소하면 다시 신청해야 합니다.
            </WarningText>
          </WarningSection>

          <TeamInfoCard>
            <TeamInfoHeader>
              <Users size={20} color={colors.blue[500]} />
              <TeamInfoTitle>신청한 팀</TeamInfoTitle>
            </TeamInfoHeader>
            <TeamInfoContent>
              <TeamIdLabel>팀명</TeamIdLabel>
              <TeamIdValue>{joinWaitingItem.teamName}</TeamIdValue>
            </TeamInfoContent>
          </TeamInfoCard>
        </ModalContent>

        <ModalButtonContainer>
          <Button variant="cancel" onClick={handleClose} disabled={isCanceling}>
            <ButtonText>돌아가기</ButtonText>
          </Button>

          <Button
            variant="confirm"
            onClick={handleCancel}
            disabled={isCanceling}
          >
            {isCanceling ? (
              <Loader2 size={20} className="animate-spin" />
            ) : (
              <>
                <X size={20} />
                <ButtonText>신청 취소</ButtonText>
              </>
            )}
          </Button>
        </ModalButtonContainer>
      </ModalContainer>
    </ModalOverlay>
  );
}
