import { useLocalSearchParams, useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import styled from 'styled-components';

import { CustomHeader } from '@/components/ui/custom_header';

// Styled Components
const Container = styled.div`
  flex: 1;
  background-color: #f8f9fa;
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SuccessIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #10b981;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
`;

const SuccessText = styled.h1`
  font-size: 24px;
  font-weight: bold;
  color: #1f2937;
  margin: 0 0 8px 0;
  text-align: center;
`;

const SubText = styled.p`
  font-size: 16px;
  color: #6b7280;
  margin: 0 0 32px 0;
  text-align: center;
`;

const InfoCard = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`;

const InfoItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #f3f4f6;

  &:last-child {
    border-bottom: none;
  }
`;

const InfoLabel = styled.span`
  font-size: 14px;
  color: #6b7280;
`;

const InfoValue = styled.span`
  font-size: 14px;
  color: #1f2937;
  font-weight: 500;
`;

const ButtonContainer = styled.div`
  padding: 20px;
  background-color: white;
  border-top: 1px solid #e5e7eb;
`;

const HomeButton = styled.button`
  width: 100%;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 16px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #2563eb;
  }
`;

type Stadium = {
  id: string;
  name: string;
};

export default function MatchMakingSuccessScreen() {
  const router = useNavigate();
  const {
    stadium,
    date,
    timeStart,
    timeEnd,
    skillLevelMin,
    skillLevelMax,
    message,
    universityOnly,
  } = useLocalSearchParams<{
    stadium: string;
    date: string;
    timeStart: string;
    timeEnd: string;
    skillLevelMin: string;
    skillLevelMax: string;
    message: string;
    universityOnly: string;
  }>();

  const parsedStadium: Stadium | null = stadium ? JSON.parse(stadium) : null;
  const parsedDate: Date | null = date ? new Date(date) : null;
  const parsedTimeStart: Date | null = timeStart ? new Date(timeStart) : null;
  const parsedTimeEnd: Date | null = timeEnd ? new Date(timeEnd) : null;

  // 뒤로가기 버튼 완전히 비활성화
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      event.preventDefault();
      window.history.pushState(null, '', window.location.href);
    };

    window.history.pushState(null, '', window.location.href);
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  return (
    <Container>
      <CustomHeader title="매치 생성 완료" />

      <Content>
        <SuccessIcon>
          <span style={{ fontSize: '32px', color: 'white' }}>✓</span>
        </SuccessIcon>

        <SuccessText>매치가 성공적으로 생성되었습니다!</SuccessText>
        <SubText>상대방을 기다려주세요.</SubText>

        <InfoCard>
          {parsedStadium && (
            <InfoItem>
              <InfoLabel>📍 장소</InfoLabel>
              <InfoValue>{parsedStadium.name}</InfoValue>
            </InfoItem>
          )}

          {parsedDate && (
            <InfoItem>
              <InfoLabel>🗓 날짜</InfoLabel>
              <InfoValue>{parsedDate.toLocaleDateString()}</InfoValue>
            </InfoItem>
          )}

          {parsedTimeStart && parsedTimeEnd && (
            <InfoItem>
              <InfoLabel>⏰ 시간</InfoLabel>
              <InfoValue>
                {parsedTimeStart.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}{' '}
                ~{' '}
                {parsedTimeEnd.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </InfoValue>
            </InfoItem>
          )}

          <InfoItem>
            <InfoLabel>💪 실력 수준</InfoLabel>
            <InfoValue>
              {skillLevelMin} ~ {skillLevelMax}
            </InfoValue>
          </InfoItem>

          {message && (
            <InfoItem>
              <InfoLabel>💬 메시지</InfoLabel>
              <InfoValue>{message}</InfoValue>
            </InfoItem>
          )}

          <InfoItem>
            <InfoLabel>🎓 동일 대학 상대</InfoLabel>
            <InfoValue>{universityOnly === 'true' ? '예' : '아니오'}</InfoValue>
          </InfoItem>
        </InfoCard>
      </Content>

      <ButtonContainer>
        <HomeButton onClick={() => router('/')}>홈으로 돌아가기</HomeButton>
      </ButtonContainer>
    </Container>
  );
}
