import React from 'react';
import styled from 'styled-components';
import { X, UserPlus, Check, X as XIcon } from 'lucide-react';

import { colors } from '@/theme';
import type { TeamJoinRequest } from '@/types/team';
import { getJoinRequestStatusDisplayName } from '@/utils/team';

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
  border-radius: 20px 20px 0 0;
  width: 100%;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
`;

const ModalHeader = styled.div`
  padding: 20px;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ModalTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
`;

const ModalCloseButton = styled.button`
  background: none;
  border: none;
  color: #6b7280;
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #f3f4f6;
  }
`;

const ModalContent = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  text-align: center;
`;

const EmptyStateIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: #f3f4f6;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
`;

const EmptyStateTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #374151;
  margin: 0 0 8px 0;
`;

const EmptyStateText = styled.p`
  font-size: 14px;
  color: #6b7280;
  margin: 0;
  line-height: 1.5;
`;

const RequestList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const RequestItem = styled.div`
  background-color: #f8f9fa;
  border-radius: 12px;
  padding: 16px;
  border: 1px solid #e5e7eb;
`;

const RequestHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

const RequestName = styled.h4`
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
`;

const RequestStatus = styled.span<{ status: string }>`
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  background-color: ${props => {
    switch (props.status) {
      case 'PENDING':
        return colors.yellow[100];
      case 'APPROVED':
        return colors.green[100];
      case 'REJECTED':
        return colors.red[100];
      default:
        return colors.gray[100];
    }
  }};
  color: ${props => {
    switch (props.status) {
      case 'PENDING':
        return colors.yellow[700];
      case 'APPROVED':
        return colors.green[700];
      case 'REJECTED':
        return colors.red[700];
      default:
        return colors.gray[700];
    }
  }};
`;

const RequestDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
`;

const RequestDetail = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const RequestDetailLabel = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  min-width: 60px;
`;

const RequestDetailValue = styled.span`
  font-size: 14px;
  color: #6b7280;
`;

const RequestActions = styled.div`
  display: flex;
  gap: 8px;
`;

const ActionButton = styled.button<{ variant: 'approve' | 'reject' }>`
  flex: 1;
  padding: 12px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  ${props =>
    props.variant === 'approve'
      ? `
    background-color: #10b981;
    color: white;

    &:hover {
      background-color: #059669;
    }
  `
      : `
    background-color: #ef4444;
    color: white;

    &:hover {
      background-color: #dc2626;
    }
  `}
`;

const ActionButtonText = styled.span`
  font-size: 14px;
  font-weight: 600;
`;

interface JoinRequestsModalProps {
  visible: boolean;
  joinRequests: TeamJoinRequest[];
  onClose: () => void;
  onJoinRequest: (requestId: number, status: 'approved' | 'rejected') => void;
}

export default function JoinRequestsModal({
  visible,
  joinRequests,
  onClose,
  onJoinRequest,
}: JoinRequestsModalProps) {
  return (
    <ModalOverlay visible={visible}>
      <ModalContainer>
        <ModalHeader>
          <ModalTitle>가입 요청 관리</ModalTitle>
          <ModalCloseButton onClick={onClose}>
            <X size={24} color={colors.gray[500]} />
          </ModalCloseButton>
        </ModalHeader>

        <ModalContent>
          {joinRequests.length === 0 ? (
            <EmptyState>
              <EmptyStateIcon>
                <UserPlus size={24} color={colors.gray[400]} />
              </EmptyStateIcon>
              <EmptyStateTitle>가입 요청이 없습니다</EmptyStateTitle>
              <EmptyStateText>
                팀에 가입하고 싶어하는 사람들이 요청을 보내면 여기에 표시됩니다.
              </EmptyStateText>
            </EmptyState>
          ) : (
            <RequestList>
              {joinRequests.map(request => (
                <RequestItem key={request.id}>
                  <RequestHeader>
                    <RequestName>{request.userName}</RequestName>
                    <RequestStatus status={request.status}>
                      {getJoinRequestStatusDisplayName(request.status)}
                    </RequestStatus>
                  </RequestHeader>

                  <RequestDetails>
                    <RequestDetail>
                      <RequestDetailLabel>실력:</RequestDetailLabel>
                      <RequestDetailValue>
                        {request.skillLevel}
                      </RequestDetailValue>
                    </RequestDetail>
                    {request.position && (
                      <RequestDetail>
                        <RequestDetailLabel>포지션:</RequestDetailLabel>
                        <RequestDetailValue>
                          {request.position}
                        </RequestDetailValue>
                      </RequestDetail>
                    )}
                    {request.bio && (
                      <RequestDetail>
                        <RequestDetailLabel>자기소개:</RequestDetailLabel>
                        <RequestDetailValue>{request.bio}</RequestDetailValue>
                      </RequestDetail>
                    )}
                  </RequestDetails>

                  {request.status === 'PENDING' && (
                    <RequestActions>
                      <ActionButton
                        variant="approve"
                        onClick={() => onJoinRequest(request.id, 'approved')}
                      >
                        <Check size={16} />
                        <ActionButtonText>승인</ActionButtonText>
                      </ActionButton>
                      <ActionButton
                        variant="reject"
                        onClick={() => onJoinRequest(request.id, 'rejected')}
                      >
                        <XIcon size={16} />
                        <ActionButtonText>거절</ActionButtonText>
                      </ActionButton>
                    </RequestActions>
                  )}
                </RequestItem>
              ))}
            </RequestList>
          )}
        </ModalContent>
      </ModalContainer>
    </ModalOverlay>
  );
}
