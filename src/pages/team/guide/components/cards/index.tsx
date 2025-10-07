import { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

import { colors } from '@/theme';

const cards = [
  {
    text: '함께 뛰는 즐거움을 경험해보세요',
    buttonColor: colors.red[500],
  },
  {
    text: '새로운 팀원들과 만나보세요',
    buttonColor: colors.blue[400],
  },
  {
    text: '축구로 시작하는 특별한 인연',
    buttonColor: colors.blue[800],
  },
];

const fadeInScale = keyframes`
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const CardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 0 20px;
`;

const Card = styled.div<{
  cardType: 'first' | 'second' | 'third';
  buttonColor: string;
  isVisible: boolean;
}>`
  background-color: white;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  animation: ${fadeInScale} 0.6s ease-out;
  animation-delay: ${({ cardType }) => {
    switch (cardType) {
      case 'first':
        return '0s';
      case 'second':
        return '0.4s';
      case 'third':
        return '0.8s';
      default:
        return '0s';
    }
  }};
  animation-fill-mode: both;
`;

const CardContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const CardText = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: ${colors.gray[800]};
  flex: 1;
`;

const CardButton = styled.div<{ buttonColor: string }>`
  width: 12px;
  height: 12px;
  border-radius: 6px;
  background-color: ${({ buttonColor }) => buttonColor};
`;

export default function Cards() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <CardsContainer>
      <Card
        cardType="first"
        buttonColor={cards[0].buttonColor}
        isVisible={isVisible}
      >
        <CardContent>
          <CardText>{cards[0].text}</CardText>
          <CardButton buttonColor={cards[0].buttonColor} />
        </CardContent>
      </Card>

      <Card
        cardType="second"
        buttonColor={cards[1].buttonColor}
        isVisible={isVisible}
      >
        <CardContent>
          <CardText>{cards[1].text}</CardText>
          <CardButton buttonColor={cards[1].buttonColor} />
        </CardContent>
      </Card>

      <Card
        cardType="third"
        buttonColor={cards[2].buttonColor}
        isVisible={isVisible}
      >
        <CardContent>
          <CardText>{cards[2].text}</CardText>
          <CardButton buttonColor={cards[2].buttonColor} />
        </CardContent>
      </Card>
    </CardsContainer>
  );
}
