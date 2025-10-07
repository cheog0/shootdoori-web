import React from 'react';
import styled from 'styled-components';

import RequestManagementModal, {
  type RequestItem,
} from './request_management_modal';

export interface MatchRequest {
  requestId: number;
  requestTeamId: number;
  requestTeamName: {
    name: string;
  };
  targetTeamId: number;
  targetTeamName: {
    name: string;
  };
  requestMessage: string;
  createdAt: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
}

interface MatchRequestsModalProps {
  visible: boolean;
  matchRequests: MatchRequest[];
  onClose: () => void;
  onAcceptRequest: (requestId: number) => void;
  onRejectRequest: (requestId: number) => void;
  onRefresh: () => void;
}

// Styled Components
const Container = styled.div<{ visible: boolean }>`
  display: ${props => (props.visible ? 'block' : 'none')};
`;

export default function MatchRequestsModal({
  visible,
  matchRequests,
  onClose,
  onAcceptRequest,
  onRejectRequest,
  onRefresh,
}: MatchRequestsModalProps) {
  const requestItems: RequestItem[] = matchRequests.map(request => ({
    id: request.requestId,
    title: `${request.requestTeamName.name} → ${request.targetTeamName.name}`,
    description: request.requestMessage,
    date: request.createdAt,
    status: request.status,
    onAccept: () => onAcceptRequest(request.requestId),
    onReject: () => onRejectRequest(request.requestId),
  }));

  return (
    <Container visible={visible}>
      <RequestManagementModal
        visible={visible}
        title="매치 요청 관리"
        requests={requestItems}
        onClose={onClose}
        onRefresh={onRefresh}
      />
    </Container>
  );
}
