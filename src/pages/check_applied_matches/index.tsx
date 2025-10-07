import { useState, useCallback } from 'react';
import styled from 'styled-components';

import { CustomHeader } from '@/components/ui/custom_header';
import { useUserProfile } from '@/hooks/queries';
import { useCancelMatchRequest } from '@/hooks/useCancelMatchRequest';
import { useMyAppliedMatches } from '@/hooks/useMyAppliedMatches';
import AppliedMatchCard from './components/applied_match_card';

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
  justify-content: center;
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
  justify-content: center;
  padding: 40px;
`;

const EmptyText = styled.span`
  font-size: 16px;
  color: #6b7280;
`;

const ButtonContainer = styled.div`
  padding: 16px;
  background-color: white;
  border-top: 1px solid #e5e7eb;
`;

const CancelButton = styled.button`
  width: 100%;
  background-color: #ef4444;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 16px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #dc2626;
  }

  &:disabled {
    background-color: #9ca3af;
    cursor: not-allowed;
  }
`;

export default function CheckAppliedMatchesScreen() {
  const [selectedMatchId, setSelectedMatchId] = useState<number | null>(null);

  const { refetch: refetchProfile } = useUserProfile();
  const {
    data: appliedMatches,
    isLoading,
    error,
    refetch: refetchMatches,
  } = useMyAppliedMatches();

  const { mutate: cancelRequest, isPending } = useCancelMatchRequest();

  const handleRefresh = useCallback(async () => {
    await Promise.all([refetchProfile(), refetchMatches()]);
    setSelectedMatchId(null);
  }, [refetchProfile, refetchMatches]);

  const handleSelect = (id: number) => {
    setSelectedMatchId(prev => (prev === id ? null : id));
  };

  // ✅ 취소 버튼 클릭 핸들러
  const handleCancel = () => {
    if (!selectedMatchId) return;

    const confirmed = window.confirm('이 매치 요청을 정말 취소하시겠습니까?');

    if (confirmed) {
      cancelRequest(selectedMatchId, {
        onSuccess: () => {
          window.alert('매치 요청이 취소되었습니다.');
          refetchMatches();
          setSelectedMatchId(null);
        },
        onError: () => {
          window.alert('요청 취소 중 오류가 발생했습니다.');
        },
      });
    }
  };

  return (
    <Container>
      <CustomHeader title="신청한 매치 보기" />

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
          ) : appliedMatches && appliedMatches.length > 0 ? (
            appliedMatches.map((match, index) => (
              <AppliedMatchCard
                key={match.requestId ?? index}
                match={match}
                onSelect={handleSelect}
                isSelected={selectedMatchId === match.requestId}
              />
            ))
          ) : (
            <EmptyContainer>
              <EmptyText>신청한 매치가 없습니다</EmptyText>
            </EmptyContainer>
          )}
        </ContentContainer>
      </ScrollContainer>

      {selectedMatchId && (
        <ButtonContainer>
          <CancelButton onClick={handleCancel} disabled={isPending}>
            {isPending ? '취소 중...' : '매치 요청 취소'}
          </CancelButton>
        </ButtonContainer>
      )}
    </Container>
  );
}
