import React from 'react';
import styled from 'styled-components';

import { theme } from '@/styles/theme';

// Styled Components
const Container = styled.div`
  position: absolute;
  bottom: ${theme.spacing.spacing5};
  left: ${theme.spacing.spacing4};
  right: ${theme.spacing.spacing4};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Button = styled.button<{ disabled?: boolean }>`
  background-color: ${props =>
    props.disabled ? theme.colors.gray400 : theme.colors.brand.main};
  padding: ${theme.spacing.spacing3} ${theme.spacing.spacing8};
  border-radius: 12px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.2);
  border: none;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  opacity: ${props => (props.disabled ? 0.6 : 1)};
`;

const ButtonText = styled.span`
  color: ${theme.colors.white};
  font-size: ${theme.typography.fontSize.base};
  font-weight: ${theme.fontWeight.semibold};
`;

interface ConnectButtonProps {
  selectedUniversity: string;
  onConnect: () => void;
}

export default function ConnectButton({
  selectedUniversity,
  onConnect,
}: ConnectButtonProps) {
  return (
    <Container>
      <Button onClick={onConnect} disabled={!selectedUniversity}>
        <ButtonText>
          {selectedUniversity ? '연결하기' : '대학교를 선택해주세요'}
        </ButtonText>
      </Button>
    </Container>
  );
}
