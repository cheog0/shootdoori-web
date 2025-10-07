import React from 'react';
import styled, { keyframes } from 'styled-components';

import { theme } from '@/styles/theme';

// Animation keyframes
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const slideIn = keyframes`
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
`;

// Styled Components
const Container = styled.div`
  flex: 1;
  padding: ${theme.spacing.spacing4};
`;

const CardContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: ${theme.spacing.spacing4};
`;

const Card = styled.div<{ index: number }>`
  background-color: ${theme.colors.white};
  border-radius: 16px;
  padding: ${theme.spacing.spacing8};
  margin: ${theme.spacing.spacing4};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 0.6s ease-out ${props => props.index * 0.2}s both;
  transform: ${props =>
    props.index === 0
      ? 'rotate(-3deg)'
      : props.index === 1
        ? 'rotate(2deg)'
        : 'rotate(-1deg)'};
  transition: transform 0.3s ease;

  &:hover {
    transform: ${props =>
      props.index === 0
        ? 'rotate(-3deg) scale(1.02)'
        : props.index === 1
          ? 'rotate(2deg) scale(1.02)'
          : 'rotate(-1deg) scale(1.02)'};
  }
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const CardText = styled.h2`
  font-size: ${theme.typography.fontSize['2xl']};
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.textMain};
  margin: 0;
  line-height: 1.4;
  flex: 1;
`;

const Button = styled.button<{ buttonColor: string; index: number }>`
  background-color: ${props => props.buttonColor};
  padding: ${theme.spacing.spacing3} ${theme.spacing.spacing6};
  border-radius: 12px;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  animation: ${slideIn} 0.8s ease-out ${props => props.index * 0.2 + 0.4}s both;
  min-width: 100px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(0);
  }
`;

const ButtonText = styled.span`
  color: ${theme.colors.white};
  font-size: ${theme.typography.fontSize.base};
  font-weight: ${theme.fontWeight.semibold};
`;

const cards = [
  {
    text: '함께 뛰는 즐거움을 경험해보세요',
    buttonColor: theme.colors.red500,
  },
  {
    text: '새로운 팀원들과 만나보세요',
    buttonColor: theme.colors.blue400,
  },
  {
    text: '축구로 시작하는 특별한 인연',
    buttonColor: theme.colors.blue800,
  },
];

export default function Cards() {
  return (
    <Container>
      <CardContainer>
        {cards.map((card, index) => (
          <Card key={index} index={index}>
            <CardContent>
              <CardText>{card.text}</CardText>
              <Button buttonColor={card.buttonColor} index={index}>
                <ButtonText>시작하기</ButtonText>
              </Button>
            </CardContent>
          </Card>
        ))}
      </CardContainer>
    </Container>
  );
}
