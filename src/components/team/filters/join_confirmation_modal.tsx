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
  background-color: white;
  border-radius: 20px 20px 0 0;
  width: 100%;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
`;

const DragHandle = styled.div`
  width: 40px;
  height: 4px;
  background-color: #d1d5db;
  border-radius: 2px;
  margin: 16px auto;
`;

const ModalHeader = styled.div`
  padding: 0 20px 20px;
  text-align: center;
`;

const IconContainer = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #f0f9ff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
`;

const ModalTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 8px 0;
`;

const ModalSubtitle = styled.p`
  font-size: 14px;
  color: #6b7280;
  margin: 0;
`;

const TeamInfoContainer = styled.div`
  padding: 0 20px 20px;
`;

const TeamInfoCard = styled.div`
  background-color: #f8f9fa;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 20px;
`;

const TeamInfoHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

const TeamName = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 0 8px;
`;

const TeamTypeBadge = styled.div`
  background-color: #e0f2fe;
  color: #0277bd;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
`;

const TeamTypeText = styled.span`
  font-size: 12px;
`;

const ModalActions = styled.div`
  padding: 20px;
  border-top: 1px solid #e5e7eb;
  display: flex;
  gap: 12px;
`;

const CancelButton = styled.button`
  flex: 1;
  padding: 16px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  background-color: white;
  color: #374151;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #f3f4f6;
  }
`;

const CancelButtonText = styled.span`
  font-size: 16px;
  font-weight: 600;
`;

const ConfirmButton = styled.button`
  flex: 1;
  padding: 16px;
  border: none;
  border-radius: 8px;
  background-color: #3b82f6;
  color: white;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #2563eb;
  }
`;

const ConfirmButtonText = styled.span`
  font-size: 16px;
  font-weight: 600;
`;

interface JoinConfirmationModalProps {
  visible: boolean;
  teamName: string;
  teamType: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function JoinConfirmationModal({
  visible,
  teamName,
  teamType,
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
            <Users size={24} color={colors.blue[500]} />
          </IconContainer>
          <ModalTitle>팀 가입 신청</ModalTitle>
          <ModalSubtitle>정말로 이 팀에 가입하시겠습니까?</ModalSubtitle>
        </ModalHeader>

        <TeamInfoContainer>
          <TeamInfoCard>
            <TeamInfoHeader>
              <Users size={16} color={colors.gray[600]} />
              <TeamName>{teamName}</TeamName>
            </TeamInfoHeader>
            <TeamTypeBadge>
              <TeamTypeText>{teamType}</TeamTypeText>
            </TeamTypeBadge>
          </TeamInfoCard>
        </TeamInfoContainer>

        <ModalActions>
          <CancelButton onClick={onCancel}>
            <CancelButtonText>취소</CancelButtonText>
          </CancelButton>
          <ConfirmButton onClick={onConfirm}>
            <ConfirmButtonText>가입 신청</ConfirmButtonText>
          </ConfirmButton>
        </ModalActions>
      </ModalContainer>
    </ModalOverlay>
  );
}
