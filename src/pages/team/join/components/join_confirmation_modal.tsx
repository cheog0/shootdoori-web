import React from 'react';
import styled from 'styled-components';
import { Users, Check } from 'lucide-react';

import { colors } from '@/theme';

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

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const ModalContainer = styled.div`
  background-color: ${colors.white};
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  padding-bottom: 40px;
  box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
`;

const DragHandle = styled.div`
  width: 40px;
  height: 4px;
  background-color: ${colors.gray[300]};
  border-radius: 2px;
  margin: 12px auto 8px auto;
`;

const ModalHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 24px;
`;

const IconContainer = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 32px;
  background-color: ${colors.blue[500]};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  box-shadow: 0 4px 8px rgba(59, 130, 246, 0.3);
`;

const ModalTitle = styled.span`
  font-size: 20px;
  font-weight: bold;
  color: ${colors.gray[900]};
  margin-bottom: 8px;
`;

const ModalSubtitle = styled.span`
  font-size: 14px;
  color: ${colors.gray[600]};
  text-align: center;
  line-height: 20px;
`;

const TeamInfoContainer = styled.div`
  padding: 0 24px;
  margin-bottom: 32px;
`;

const TeamInfoCard = styled.div`
  background-color: ${colors.gray[50]};
  border-radius: 16px;
  padding: 20px;
  border: 1px solid ${colors.gray[200]};
`;

const TeamInfoHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const TeamName = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: ${colors.gray[900]};
  flex: 1;
`;

const TeamTypeBadge = styled.div`
  background-color: ${colors.blue[50]};
  padding: 4px 12px;
  border-radius: 8px;
`;

const TeamTypeText = styled.span`
  font-size: 12px;
  color: ${colors.blue[500]};
  font-weight: 500;
`;

const ModalActions = styled.div`
  display: flex;
  padding: 0 24px;
  gap: 12px;
`;

const CancelButton = styled.button`
  flex: 1;
  background-color: ${colors.gray[100]};
  padding: 16px;
  border-radius: 12px;
  border: 1px solid ${colors.gray[200]};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${colors.gray[200]};
  }
`;

const CancelButtonText = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: ${colors.gray[700]};
`;

const ConfirmButton = styled.button`
  flex: 1;
  background-color: ${colors.blue[500]};
  padding: 16px;
  border-radius: 12px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 8px rgba(59, 130, 246, 0.3);

  &:hover {
    background-color: ${colors.blue[600]};
  }
`;

const ConfirmButtonText = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: ${colors.white};
`;

interface JoinConfirmationModalProps {
  visible: boolean;
  teamName: string;
  teamType: string;
  teamId: number;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function JoinConfirmationModal({
  visible,
  teamName,
  teamType,
  // teamId,
  onConfirm,
  onCancel,
}: JoinConfirmationModalProps) {
  return (
    <ModalOverlay visible={visible}>
      <Backdrop onClick={onCancel} />
      <ModalContainer>
        <DragHandle />

        <ModalHeader>
          <IconContainer>
            <Users size={32} color={colors.white} />
          </IconContainer>
          <ModalTitle>팀 신청 확인</ModalTitle>
          <ModalSubtitle>선택한 팀에 신청하시겠습니까?</ModalSubtitle>
        </ModalHeader>

        <TeamInfoContainer>
          <TeamInfoCard>
            <TeamInfoHeader>
              <TeamName>{teamName}</TeamName>
              <TeamTypeBadge>
                <TeamTypeText>{teamType}</TeamTypeText>
              </TeamTypeBadge>
            </TeamInfoHeader>
          </TeamInfoCard>
        </TeamInfoContainer>

        <ModalActions>
          <CancelButton onClick={onCancel}>
            <CancelButtonText>취소</CancelButtonText>
          </CancelButton>

          <ConfirmButton onClick={onConfirm}>
            <Check size={20} color={colors.white} />
            <ConfirmButtonText>신청하기</ConfirmButtonText>
          </ConfirmButton>
        </ModalActions>
      </ModalContainer>
    </ModalOverlay>
  );
}
