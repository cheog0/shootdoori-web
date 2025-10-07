import { useNavigate } from 'react-router-dom';
import React from 'react';
import styled from 'styled-components';

import { theme } from '@/styles/theme';

// Styled Components
const ActionSection = styled.div`
  padding: ${theme.spacing.spacing4};
  display: flex;
  gap: ${theme.spacing.spacing3};
`;

const CancelButton = styled.button`
  background-color: transparent;
  border: 1px solid ${theme.colors.borderInput};
  border-radius: 12px;
  padding: ${theme.spacing.spacing4};
  flex: 1;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${theme.colors.gray100};
    border-color: ${theme.colors.gray400};
  }
`;

const CancelButtonText = styled.span`
  color: ${theme.colors.textMain};
  font-size: ${theme.typography.fontSize.base};
  font-weight: ${theme.fontWeight.medium};
  text-align: center;
`;

const SaveButton = styled.button`
  background-color: ${theme.colors.brand.main};
  border: none;
  border-radius: 12px;
  padding: ${theme.spacing.spacing4};
  flex: 1;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${theme.colors.brand.dark};
  }

  &:active {
    transform: translateY(1px);
  }
`;

const SaveButtonText = styled.span`
  color: ${theme.colors.white};
  font-size: ${theme.typography.fontSize.base};
  font-weight: ${theme.fontWeight.semibold};
  text-align: center;
`;

interface ActionSectionProps {
  onSave: () => void;
}

export default function ActionSection({ onSave }: ActionSectionProps) {
  const navigate = useNavigate();

  return (
    <ActionSection>
      <CancelButton onClick={() => navigate(-1)}>
        <CancelButtonText>취소</CancelButtonText>
      </CancelButton>
      <SaveButton onClick={onSave}>
        <SaveButtonText>저장</SaveButtonText>
      </SaveButton>
    </ActionSection>
  );
}
