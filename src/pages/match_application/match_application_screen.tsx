import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import styled from 'styled-components';

import { CustomHeader } from '@/components/ui/custom_header';
import { ROUTES } from '@/constants/routes';
import { useUserProfile } from '@/hooks/queries';
import { useMatchRequest } from '@/hooks/useMatchRequest';
import { useMatchWaitingList } from '@/hooks/useMatchWaitingList';
import type {
  MatchWaitingListRequestDto,
  MatchRequestRequestDto,
} from '@/types/match';

import FilterCard from '@/components/filter_card';
import MatchCard from '@/components/match_card';

interface MatchApplicationScreenProps {
  teamId?: number;
}

const Container = styled.div`
  ${styles.container}
`;

const ScrollContainer = styled.div`
  ${styles.scrollContainer}
`;

const ScrollContent = styled.div`
  ${styles.scrollContent}
`;

const EmptyState = styled.div`
  ${styles.emptyState}
`;

const EmptyStateIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 40px;
  background-color: #f3f4f6;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
`;

const EmptyStateIconText = styled.div`
  font-size: 24px;
  color: #9ca3af;
  font-weight: 600;
`;

const EmptyStateText = styled.div`
  ${styles.emptyStateText}
`;

const EmptyStateSubtext = styled.div`
  ${styles.emptyStateSubtext}
`;

const LoadingState = styled.div`
  ${styles.loadingState}
`;

const LoadingText = styled.div`
  ${styles.loadingText}
`;

const ErrorState = styled.div`
  ${styles.errorState}
`;

const ErrorText = styled.div`
  ${styles.errorText}
`;

const ErrorSubtext = styled.div`
  ${styles.errorSubtext}
`;

const FilterCardContainer = styled.div`
  ${styles.filterCard}
`;

const FilterCardHeader = styled.div`
  ${styles.filterCardHeader}
`;

const FilterCardTitle = styled.div`
  ${styles.filterCardTitle}
`;

const SelectedFilterText = styled.div`
  ${styles.selectedFilterText}
`;

const BottomSpacing = styled.div`
  ${styles.bottomSpacing}
`;

export default function MatchApplicationScreen({
  teamId: _teamId,
}: MatchApplicationScreenProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const navigate = useNavigate();

  const { data: userProfile, error: profileError, refetch } = useUserProfile();

  const params: MatchWaitingListRequestDto = {
    selectDate: selectedDate
      ? selectedDate.toISOString().split('T')[0]
      : new Date().toISOString().split('T')[0],
    startTime: selectedTime
      ? selectedTime.toTimeString().split(' ')[0]
      : '00:00:00',
  };

  const {
    data,
    isLoading,
    error,
    refetch: refetchData,
  } = useMatchWaitingList(params);
  const { mutate: requestMatch, isPending } = useMatchRequest();

  // const handleRefresh = async () => {
  //   setRefreshing(true);
  //   await Promise.all([refetch(), refetchData()]);
  //   setRefreshing(false);
  // };

  const handlePressRequest = async (waitingId: number) => {
    await refetch();

    const rawTeamId = userProfile?.teamId;

    if (!rawTeamId) {
      window.alert('팀 정보가 없습니다. 팀을 먼저 생성해주세요.');
      return;
    }

    const numericTeamId = Number(rawTeamId);

    if (isNaN(numericTeamId) || numericTeamId <= 0) {
      window.alert('유효하지 않는 팀 ID입니다.');
      return;
    }

    const payload: MatchRequestRequestDto = {
      requestMessage: `${userProfile.name}(${numericTeamId}) 팀이 매치 요청`,
    };

    requestMatch(
      { waitingId, payload },
      {
        onSuccess: res => {
          window.alert(`매치 요청이 전송되었습니다.\n상태: ${res.status}`);
          navigate(ROUTES.HOME);
        },
        onError: () => {
          window.alert('매치 요청 중 문제가 발생했습니다.');
        },
      }
    );
  };

  const renderMatchCard = (item: MatchWaitingResponseDto) => (
    <MatchCard
      key={item.waitingId}
      match={item}
      onPressRequest={() => handlePressRequest(item.waitingId)}
      disabled={isPending}
    />
  );

  const renderEmptyState = () => (
    <EmptyState>
      <EmptyStateIcon>
        <EmptyStateIconText>?</EmptyStateIconText>
      </EmptyStateIcon>
      <EmptyStateText>조건에 맞는 매치가 없습니다</EmptyStateText>
      <EmptyStateSubtext>
        필터를 조정하여 다른 조건으로 검색해보세요
      </EmptyStateSubtext>
    </EmptyState>
  );

  const renderLoadingState = () => (
    <LoadingState>
      <LoadingText>매치를 불러오는 중...</LoadingText>
    </LoadingState>
  );

  const renderErrorState = () => (
    <ErrorState>
      <ErrorText>데이터를 불러올 수 없습니다</ErrorText>
      <ErrorSubtext>네트워크 연결을 확인하고 다시 시도해주세요</ErrorSubtext>
    </ErrorState>
  );

  const renderSelectedFilters = () => {
    const hasFilters = selectedDate || selectedTime;
    if (!hasFilters) return null;

    return (
      <FilterCardContainer>
        <FilterCardHeader>
          <FilterCardTitle>선택된 필터</FilterCardTitle>
        </FilterCardHeader>
        <div style={{ padding: '0 16px 16px 16px' }}>
          {selectedDate && (
            <SelectedFilterText>
              날짜: {selectedDate.toLocaleDateString('ko-KR')}
            </SelectedFilterText>
          )}
          {selectedTime && (
            <SelectedFilterText>
              시간:{' '}
              {selectedTime.toLocaleTimeString('ko-KR', {
                hour: '2-digit',
                minute: '2-digit',
              })}{' '}
              이후
            </SelectedFilterText>
          )}
          {(selectedDate || selectedTime) && (
            <SelectedFilterText style={{ color: 'gray' }}>
              필터를 초기화하려면 필터 버튼을 다시 선택하세요
            </SelectedFilterText>
          )}
        </div>
      </FilterCardContainer>
    );
  };

  return (
    <Container>
      <CustomHeader title="매치 참여" />

      <ScrollContainer>
        <ScrollContent>
          <FilterCard
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            onDateChange={setSelectedDate}
            onTimeChange={setSelectedTime}
          />

          {renderSelectedFilters()}

          {profileError && (
            <ErrorState style={{ marginBottom: 16 }}>
              <ErrorText>사용자 정보를 불러올 수 없습니다</ErrorText>
              <ErrorSubtext>
                네트워크 연결을 확인하고 새로고침해주세요
              </ErrorSubtext>
            </ErrorState>
          )}

          {isLoading && !refreshing ? (
            renderLoadingState()
          ) : error ? (
            renderErrorState()
          ) : (
            <div>
              {data && data.length > 0
                ? data.map(renderMatchCard)
                : renderEmptyState()}
            </div>
          )}
        </ScrollContent>
      </ScrollContainer>

      <BottomSpacing />
    </Container>
  );
}
