import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import styled from 'styled-components';
import { User, AlertCircle, FileText, X, Loader2 } from 'lucide-react';

import { useMyJoinWaitingList } from '@/hooks/useTeamJoinRequest';
import { colors } from '@/theme';
import type { UserJoinWaitingItem } from '@/types/team';

import CancelModal from './cancel_modal';

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid ${colors.gray[200]};
`;

const Title = styled.h2`
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

const ListContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px;
`;

const JoinWaitingItem = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 12px;
  border: 1px solid ${colors.gray[200]};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const ItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

const TeamNameText = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: ${colors.gray[900]};
`;

const StatusBadge = styled.div<{ backgroundColor: string }>`
  padding: 4px 12px;
  border-radius: 8px;
  background-color: ${props => props.backgroundColor};
`;

const StatusText = styled.span`
  font-size: 12px;
  font-weight: 500;
  color: ${colors.gray[700]};
`;

const TeamDetails = styled.div`
  margin-bottom: 16px;
`;

const DetailRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const DetailText = styled.span`
  font-size: 14px;
  color: ${colors.gray[600]};
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 8px;
`;

const ViewTeamButton = styled.button`
  background-color: ${colors.blue[500]};
  color: white;
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${colors.blue[600]};
  }
`;

const ViewTeamButtonText = styled.span`
  font-size: 14px;
  font-weight: 500;
`;

const CancelButton = styled.button`
  background-color: ${colors.red[500]};
  color: white;
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${colors.red[600]};
  }
`;

const CancelButtonText = styled.span`
  font-size: 14px;
  font-weight: 500;
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
`;

const LoadingText = styled.span`
  font-size: 16px;
  color: ${colors.gray[600]};
  margin-top: 16px;
`;

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
`;

const ErrorText = styled.span`
  font-size: 16px;
  color: ${colors.gray[600]};
  margin: 16px 0;
`;

const RetryButton = styled.button`
  background-color: ${colors.blue[500]};
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${colors.blue[600]};
  }
`;

const RetryButtonText = styled.span`
  font-size: 14px;
  font-weight: 500;
`;

const EmptyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
`;

const EmptyText = styled.span`
  font-size: 16px;
  color: ${colors.gray[600]};
  margin: 16px 0 8px 0;
`;

const EmptySubtext = styled.span`
  font-size: 14px;
  color: ${colors.gray[500]};
  text-align: center;
`;

const FooterLoader = styled.div`
  display: flex;
  justify-content: center;
  padding: 16px;
`;

interface JoinWaitingListProps {
  onClose: () => void;
}

export default function JoinWaitingList({ onClose }: JoinWaitingListProps) {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<UserJoinWaitingItem | null>(
    null
  );
  const { data, isLoading, error, refetch } = useMyJoinWaitingList(page, 10);

  const handleViewTeam = (teamId: number) => {
    navigate(`/team/management/${teamId}`);
    onClose();
  };

  const handleRefresh = () => {
    setPage(0);
    refetch();
  };

  const handleCancelRequest = (item: UserJoinWaitingItem) => {
    setSelectedItem(item);
    setShowCancelModal(true);
  };

  const handleCancelSuccess = () => {
    handleRefresh();
  };

  const renderJoinWaitingItem = (item: UserJoinWaitingItem) => {
    const statusColor = getStatusColor(item.status);
    const statusText = getStatusDisplayName(item.status);

    return (
      <JoinWaitingItem key={item.id}>
        <ItemHeader>
          <TeamNameText>팀명: {item.teamName}</TeamNameText>
          <StatusBadge backgroundColor={statusColor}>
            <StatusText>{statusText}</StatusText>
          </StatusBadge>
        </ItemHeader>

        <TeamDetails>
          <DetailRow>
            <User size={16} color={colors.green[500]} />
            <DetailText>신청자: {item.applicantName}</DetailText>
          </DetailRow>
        </TeamDetails>

        {item.status === 'APPROVED' && (
          <ButtonContainer>
            <ViewTeamButton onClick={() => handleViewTeam(item.teamId)}>
              <ViewTeamButtonText>팀 보기</ViewTeamButtonText>
            </ViewTeamButton>
          </ButtonContainer>
        )}

        {item.status === 'PENDING' && (
          <ButtonContainer>
            <CancelButton onClick={() => handleCancelRequest(item)}>
              <CancelButtonText>신청 취소</CancelButtonText>
            </CancelButton>
          </ButtonContainer>
        )}
      </JoinWaitingItem>
    );
  };

  const getStatusDisplayName = (status: UserJoinWaitingItem['status']) => {
    switch (status) {
      case 'PENDING':
        return '대기중';
      case 'APPROVED':
        return '승인됨';
      case 'REJECTED':
        return '거절됨';
      case 'CANCELED':
        return '취소됨';
      default:
        return '알 수 없음';
    }
  };

  const getStatusColor = (status: UserJoinWaitingItem['status']) => {
    switch (status) {
      case 'PENDING':
        return colors.orange[100];
      case 'APPROVED':
        return colors.green[100];
      case 'REJECTED':
        return colors.red[100];
      case 'CANCELED':
        return colors.gray[100];
      default:
        return colors.gray[100];
    }
  };

  if (isLoading && !data) {
    return (
      <LoadingContainer>
        <Loader2 size={32} className="animate-spin" color={colors.blue[500]} />
        <LoadingText>신청 목록을 불러오는 중...</LoadingText>
      </LoadingContainer>
    );
  }

  if (error) {
    return (
      <ErrorContainer>
        <AlertCircle size={48} color={colors.red[500]} />
        <ErrorText>신청 목록을 불러올 수 없습니다</ErrorText>
        <RetryButton onClick={handleRefresh}>
          <RetryButtonText>다시 시도</RetryButtonText>
        </RetryButton>
      </ErrorContainer>
    );
  }

  if (!data || data.empty) {
    return (
      <EmptyContainer>
        <FileText size={48} color={colors.gray[400]} />
        <EmptyText>신청한 팀이 없습니다</EmptyText>
        <EmptySubtext>팀 참여하기를 통해 팀에 신청해보세요!</EmptySubtext>
      </EmptyContainer>
    );
  }

  return (
    <Container>
      <Header>
        <Title>나의 팀 가입 신청</Title>
        <CloseButton onClick={onClose}>
          <X size={24} color={colors.gray[600]} />
        </CloseButton>
      </Header>

      <ListContainer>
        {data.content.map(renderJoinWaitingItem)}
        {isLoading && data && (
          <FooterLoader>
            <Loader2
              size={20}
              className="animate-spin"
              color={colors.blue[500]}
            />
          </FooterLoader>
        )}
      </ListContainer>

      <CancelModal
        visible={showCancelModal}
        joinWaitingItem={selectedItem}
        onClose={() => {
          setShowCancelModal(false);
          setSelectedItem(null);
        }}
        onSuccess={handleCancelSuccess}
        onOuterModalClose={onClose}
      />
    </Container>
  );
}
