import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';

const cards = [
  { text: '함께 뛰는 즐거움을 경험해보세요', color: '#ef4444' },
  { text: '새로운 팀원들과 만나보세요', color: '#60a5fa' },
  { text: '축구로 시작하는 특별한 인연', color: '#1e3a8a' },
];

export default function Cards() {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);

  useEffect(() => {
    // 각 카드를 순서대로 표시
    const timer = setTimeout(() => {
      for (let i = 0; i < cards.length; i++) {
        setTimeout(() => {
          setVisibleCards(prev => [...prev, i]);
        }, i * 300); // 300ms 간격으로 카드가 나타남
      }
    }, 500); // 페이지 로드 후 500ms 후 시작

    return () => clearTimeout(timer);
  }, []);

  return (
    <CardsContainer>
      {cards.map((card, index) => (
        <Card
          key={index}
          visible={visibleCards.includes(index)}
          index={index}
          style={{
            zIndex: 3 - index,
            top: index === 0 ? 0 : index === 1 ? 65 : 130,
            left: index % 2 === 0 ? '12.5%' : 'auto',
            right: index % 2 === 1 ? '12.5%' : 'auto',
          }}
        >
          <CardContent>
            <CardText>{card.text}</CardText>
            <CardButton style={{ backgroundColor: card.color }} />
          </CardContent>
        </Card>
      ))}
    </CardsContainer>
  );
}

// helper
function getRotate(index: number) {
  return index === 0 ? -3 : index === 1 ? 3 : -2;
}

// styled-components
const CardsContainer = styled.div`
  width: 100%;
  height: 280px;
  position: relative;
`;

const Card = styled.div<{ visible: boolean; index: number }>`
  position: absolute;
  width: 75%;
  background-color: #fff;
  border-radius: 16px;
  padding: 16px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.5s ease;
  transform: ${props => {
    const rotate = getRotate(props.index);
    const scale = props.visible ? 1 : 0.8;
    return props.visible
      ? `rotate(${rotate}deg) scale(${scale})`
      : `rotate(0deg) scale(${scale})`;
  }};
  opacity: ${props => (props.visible ? 1 - props.index * 0.1 : 0)};

  &:hover {
    transform: translateY(-5px) rotate(0deg) !important;
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
  }
`;

const CardContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CardText = styled.p`
  font-size: 12px;
  font-weight: 600;
  color: #2d2d2d;
  margin: 0;
`;

const CardButton = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-left: 8px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
`;
