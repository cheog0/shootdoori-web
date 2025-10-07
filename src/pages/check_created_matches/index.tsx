import { useCallback } from 'react';
import styled from 'styled-components';

import { CustomHeader } from '@/components/ui/custom_header';
import { useUserProfile } from '@/hooks/queries';
import { useCancelMatch } from '@/hooks/useCancelMatch';
import { useMyCreatedMatches } from '@/hooks/useMyCreatedMatches';
import MatchCard from '../match_application/components/match_card';

// Styled Components
const Container = styled.div`
  flex: 1;
  background-color: #f8f9fa;
  display: flex;
  flex-direction: column;
`;

const ScrollContainer = styled.div`
  flex: 1;
  overflow-y: auto;
`;

const ContentContainer = styled.div`
  padding: 16px;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
`;

const LoadingText = styled.span`
  font-size: 16px;
  color: #6b7280;
`;

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
`;

const ErrorText = styled.span`
  font-size: 16px;
  color: #ef4444;
  margin-bottom: 16px;
`;

const RetryButton = styled.button`
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #2563eb;
  }
`;

const EmptyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
`;

const EmptyText = styled.span`
  font-size: 16px;
  color: #6b7280;
`;

export default function CheckCreatedMatchesScreen() {
  const { refetch: refetchProfile } = useUserProfile();
  const {
    data: createdMatches,
    isLoading,
    error,
    refetch: refetchMatches,
  } = useMyCreatedMatches();

  // ✅ 취소 API 훅
  const { mutate: cancelMatch, isPending } = useCancelMatch();

  // ✅ 매치 취소 함수
  const handleCancelMatch = (waitingId: number) => {
    const confirmed = window.confirm('이 매치를 취소하시겠습니까?');

    if (confirmed) {
      cancelMatch(waitingId, {
        onSuccess: () => {
          window.alert('매치가 취소되었습니다.');
          refetchMatches();
        },
        onError: () => {
          window.alert('매치 취소 중 문제가 발생했습니다.');
        },
      });
    }
  };

  const handleRefresh = useCallback(async () => {
    await Promise.all([refetchProfile(), refetchMatches()]);
  }, [refetchProfile, refetchMatches]);

  const renderMatchCard = (item: MatchWaitingResponseDto) => (
    <MatchCard
      match={item}
      showStatus={true}
      isCancellable={true}
      onPressRequest={() => handleCancelMatch(item.waitingId)}
      disabled={isPending}
    />
  );

  return (
    <Container>
      <CustomHeader title="생성한 매치 확인" />

      <ScrollContainer>
        <ContentContainer>
          {isLoading ? (
            <LoadingContainer>
              <LoadingText>매치를 불러오는 중...</LoadingText>
            </LoadingContainer>
          ) : error ? (
            <ErrorContainer>
              <ErrorText>데이터를 불러올 수 없습니다</ErrorText>
              <RetryButton onClick={handleRefresh}>다시 시도</RetryButton>
            </ErrorContainer>
          ) : createdMatches && createdMatches.length > 0 ? (
            createdMatches.map((match, index) => (
              <div key={match.waitingId || index}>{renderMatchCard(match)}</div>
            ))
          ) : (
            <EmptyContainer>
              <EmptyText>생성된 매치가 없습니다</EmptyText>
            </EmptyContainer>
          )}
        </ContentContainer>
      </ScrollContainer>
    </Container>
  );
}
