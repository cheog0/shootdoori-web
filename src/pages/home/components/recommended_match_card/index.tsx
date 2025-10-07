import { useRef, useState, useEffect, useMemo } from 'react';
import styled, { keyframes } from 'styled-components';

import { theme } from '@/theme';

interface SafeMatchPreviewProps {
  onMatchPress?: (matchId: number) => void;
}

const CARD_WIDTH = 150 + theme.spacing.spacing2;

// 추천 매치 데이터 (빈 배열로 설정하여 빈 상태 테스트)
const mockRecommendedMatches: MatchWaitingResponseDto[] = [];

// 애니메이션 정의
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
`;

const shimmer = keyframes`
  0% {
    left: -100%;
  }
  100% {
    left: 100%;
  }
`;

const pulse = keyframes`
  0%, 100% {
    opacity: 0.4;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
  }
`;

// Styled Components
const Container = styled.div`
  width: 100%;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  padding: 24px;
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
  border: 2px solid rgba(108, 142, 104, 0.2);
  position: relative;
  overflow: hidden;
  animation: ${fadeInUp} 0.8s ease-out 0.2s both;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.3),
      transparent
    );
    animation: ${shimmer} 3s infinite;
  }

  @media (max-width: 768px) {
    padding: 20px;
    border-radius: 20px;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  position: relative;
  z-index: 1;
`;

const Title = styled.h2`
  font-size: 18px;
  font-weight: 700;
  color: ${theme.colors.text.main};
  margin: 0;
`;

const MoreButton = styled.button`
  background: rgba(108, 142, 104, 0.1);
  border: 2px solid rgba(108, 142, 104, 0.2);
  border-radius: 12px;
  cursor: pointer;
  padding: ${theme.spacing.spacing1};
  min-width: 44px;
  min-height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);

  &:hover {
    background: rgba(108, 142, 104, 0.2);
    border-color: ${theme.colors.brand.main};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(108, 142, 104, 0.3);
  }

  @media (max-width: 768px) {
    min-width: 40px;
    min-height: 40px;
  }
`;

const MoreText = styled.span`
  font-size: ${theme.typography.fontSize.font1};
  color: ${theme.colors.brand.main};
  font-weight: 600;
`;

const EmptyStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  text-align: center;
  border: 2px dashed rgba(108, 142, 104, 0.3);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -20px;
    left: -20px;
    width: 60px;
    height: 60px;
    background: linear-gradient(
      135deg,
      ${theme.colors.brand.main}20,
      ${theme.colors.grass[400]}20
    );
    border-radius: 50%;
    animation: ${float} 6s ease-in-out infinite;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -30px;
    right: -30px;
    width: 80px;
    height: 80px;
    background: linear-gradient(
      135deg,
      ${theme.colors.grass[300]}20,
      ${theme.colors.brand.main}20
    );
    border-radius: 50%;
    animation: ${float} 6s ease-in-out infinite reverse;
  }

  @media (max-width: 768px) {
    padding: 32px 16px;
  }
`;

const EmptyStateContent = styled.div`
  margin-bottom: 24px;
  position: relative;
  z-index: 1;
`;

const EmptyStateTitle = styled.h3`
  font-size: 16px;
  font-weight: 700;
  color: ${theme.colors.text.main};
  margin: 0 0 12px 0;
`;

const EmptyStateSubtitle = styled.p`
  font-size: 14px;
  color: ${theme.colors.text.sub};
  margin: 0;
  line-height: 1.6;
`;

const EmptyStateFooter = styled.div`
  display: flex;
  gap: 8px;
  position: relative;
  z-index: 1;
`;

const EmptyStateDot = styled.div`
  width: 8px;
  height: 8px;
  background: linear-gradient(
    135deg,
    ${theme.colors.brand.main} 0%,
    ${theme.colors.grass[500]} 100%
  );
  border-radius: 50%;
  animation: ${pulse} 2s infinite;

  &:nth-child(2) {
    animation-delay: 0.3s;
  }

  &:nth-child(3) {
    animation-delay: 0.6s;
  }
`;

const CarouselContent = styled.div`
  display: flex;
  gap: ${theme.spacing.spacing3};
  overflow-x: auto;
  padding-bottom: ${theme.spacing.spacing2};
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  -ms-overflow-style: none;
  position: relative;
  z-index: 1;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 768px) {
    gap: ${theme.spacing.spacing2};
  }
`;

const Card = styled.button<{ bgColor?: string }>`
  background: ${props => props.bgColor || 'rgba(255, 255, 255, 0.8)'};
  backdrop-filter: blur(10px);
  border: 2px solid rgba(108, 142, 104, 0.2);
  border-radius: 12px;
  padding: ${theme.spacing.spacing4};
  cursor: pointer;
  min-width: 150px;
  height: 140px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: all 0.3s ease;
  flex-shrink: 0;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.3),
      transparent
    );
    transition: left 0.5s ease;
  }

  &:hover {
    border-color: ${theme.colors.brand.main};
    box-shadow: 0 8px 24px rgba(108, 142, 104, 0.3);
    transform: translateY(-2px);

    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: scale(0.98);
  }

  @media (max-width: 768px) {
    min-width: 140px;
    height: 130px;
    padding: ${theme.spacing.spacing3};
  }
`;

const Location = styled.span`
  font-size: ${theme.typography.fontSize.font1};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.text.main};
  margin-bottom: ${theme.spacing.spacing1};
`;

const Time = styled.span`
  font-size: ${theme.typography.fontSize.font1};
  color: ${theme.colors.text.sub};
`;

const MetaRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SmallBadge = styled.div<{ bgColor?: string }>`
  background-color: ${props => props.bgColor || theme.colors.gray[50]};
  padding: ${theme.spacing.spacing1} ${theme.spacing.spacing1};
  border-radius: ${theme.spacing.spacing1};
`;

const SmallBadgeText = styled.span<{ textColor?: string }>`
  font-size: ${theme.typography.fontSize.font1};
  color: ${props => props.textColor || theme.colors.gray[700]};
`;

const PlayerCountSmall = styled.span`
  font-size: ${theme.typography.fontSize.font1};
  color: ${theme.colors.text.sub};
`;

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  flex-direction: column;
  z-index: 1000;
`;

const ModalHeader = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  padding: ${theme.spacing.spacing4};
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(108, 142, 104, 0.2);
`;

const ModalTitle = styled.h2`
  font-size: ${theme.typography.fontSize.font3};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.text.main};
  margin: 0;
`;

const ModalClose = styled.button`
  background: rgba(108, 142, 104, 0.1);
  border: 2px solid rgba(108, 142, 104, 0.2);
  border-radius: 12px;
  cursor: pointer;
  padding: ${theme.spacing.spacing2};
  min-width: 44px;
  min-height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(108, 142, 104, 0.2);
    border-color: ${theme.colors.brand.main};
  }
`;

const MatchListContent = styled.div`
  flex: 1;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  overflow-y: auto;
  padding: ${theme.spacing.spacing4};
`;

const FullItem = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  width: 100%;
  padding: ${theme.spacing.spacing4} 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease;
  border-radius: 12px;

  &:hover {
    background: rgba(108, 142, 104, 0.1);
  }
`;

const FullItemLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.spacing1};
`;

const FullItemRight = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.spacing2};
`;

const Separator = styled.div`
  height: 1px;
  background: rgba(108, 142, 104, 0.2);
  margin: 0 ${theme.spacing.spacing4};
`;

export default function SafeMatchPreview({
  onMatchPress,
}: SafeMatchPreviewProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const scrollOffset = useRef(0);
  const userInteracting = useRef(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const matches = useMemo(() => mockRecommendedMatches, []);

  const extendedMatches = useMemo(
    () => (matches.length > 1 ? [...matches, ...matches, ...matches] : matches),
    [matches]
  );

  const middleIndex = matches.length;
  const middleOffset = middleIndex * CARD_WIDTH;

  useEffect(() => {
    if (extendedMatches.length <= 1) return;

    const startAutoScroll = () => {
      if (intervalRef.current) clearInterval(intervalRef.current);

      intervalRef.current = setInterval(() => {
        if (userInteracting.current) return;

        scrollOffset.current += CARD_WIDTH;

        const maxOffset = extendedMatches.length * CARD_WIDTH;
        if (scrollOffset.current >= maxOffset - CARD_WIDTH) {
          scrollOffset.current = middleOffset;
        } else {
          // 웹에서는 자동 스크롤을 구현하지 않음
        }
      }, 3000);
    };

    startAutoScroll();

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [extendedMatches, middleOffset]);

  const renderPreviewCard = (match: MatchWaitingResponseDto, index: number) => (
    <Card key={`${match.id}-${index}`} onClick={() => onMatchPress?.(match.id)}>
      <div>
        <Location>{match.location}</Location>
        <Time>{match.time}</Time>
      </div>
      <MetaRow>
        <SmallBadge bgColor={badgeBg(match.level).backgroundColor}>
          <SmallBadgeText textColor={badgeTextColor(match.level).color}>
            {match.level}
          </SmallBadgeText>
        </SmallBadge>
        <PlayerCountSmall>
          {match.currentPlayers}/{match.totalPlayers}
        </PlayerCountSmall>
      </MetaRow>
    </Card>
  );

  const renderFullItem = (item: MatchWaitingResponseDto) => (
    <FullItem
      onClick={() => {
        setModalVisible(false);
        onMatchPress?.(item.id);
      }}
    >
      <FullItemLeft>
        <Location>{item.location}</Location>
        <Time>{item.time}</Time>
      </FullItemLeft>
      <FullItemRight>
        <SmallBadge bgColor={badgeBg(item.level).backgroundColor}>
          <SmallBadgeText textColor={badgeTextColor(item.level).color}>
            {item.level}
          </SmallBadgeText>
        </SmallBadge>
        <PlayerCountSmall>
          {item.currentPlayers}/{item.totalPlayers}
        </PlayerCountSmall>
      </FullItemRight>
    </FullItem>
  );

  // 빈 상태 렌더링
  const renderEmptyState = () => (
    <EmptyStateContainer>
      <EmptyStateContent>
        <EmptyStateTitle>추천 매치가 없어요</EmptyStateTitle>
        <EmptyStateSubtitle>
          새로운 매치가 등록되면
          <br />
          알려드릴게요!
        </EmptyStateSubtitle>
      </EmptyStateContent>
      <EmptyStateFooter>
        <EmptyStateDot />
        <EmptyStateDot />
        <EmptyStateDot />
      </EmptyStateFooter>
    </EmptyStateContainer>
  );

  return (
    <Container>
      <Header>
        <Title>금주의 추천 매치</Title>
        {matches.length > 3 && (
          <MoreButton onClick={() => setModalVisible(true)}>
            <MoreText>더보기</MoreText>
          </MoreButton>
        )}
      </Header>

      {matches.length === 0 ? (
        renderEmptyState()
      ) : (
        <>
          <CarouselContent>
            {extendedMatches.map((item, index) =>
              renderPreviewCard(item, index)
            )}
          </CarouselContent>

          {modalVisible && (
            <ModalContainer>
              <ModalHeader>
                <ModalTitle>추천 매치 전체</ModalTitle>
                <ModalClose onClick={() => setModalVisible(false)}>
                  닫기
                </ModalClose>
              </ModalHeader>
              <MatchListContent>
                {matches.map((item, index) => (
                  <div key={item.id}>
                    {renderFullItem(item)}
                    {index < matches.length - 1 && <Separator />}
                  </div>
                ))}
              </MatchListContent>
            </ModalContainer>
          )}
        </>
      )}
    </Container>
  );
}

const badgeBg = (level?: string) => {
  switch (level) {
    case '아마추어':
      return { backgroundColor: theme.colors.blue[50] };
    case '세미프로':
      return { backgroundColor: theme.colors.green[50] };
    case '프로':
      return { backgroundColor: theme.colors.red[50] };
    default:
      return { backgroundColor: theme.colors.gray[50] };
  }
};

const badgeTextColor = (level?: string) => {
  switch (level) {
    case '아마추어':
      return { color: theme.colors.blue[700] };
    case '세미프로':
      return { color: theme.colors.green[700] };
    case '프로':
      return { color: theme.colors.red[700] };
    default:
      return { color: theme.colors.gray[700] };
  }
};
