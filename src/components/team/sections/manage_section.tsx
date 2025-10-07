import { useNavigate } from 'react-router-dom';
import React from 'react';
import styled from 'styled-components';
import { IoPeople, IoTrash, IoEye } from 'react-icons/io5';

import { theme } from '@/styles/theme';
import type { TeamJoinRequest } from '@/types/team';

// Styled Components
const ManageSection = styled.div`
  padding: ${theme.spacing.spacing4};
`;

const SectionTitle = styled.h3`
  font-size: ${theme.typography.fontSize.lg};
  font-weight: ${theme.fontWeight.semibold};
  color: ${theme.colors.textMain};
  margin: 0 0 ${theme.spacing.spacing4} 0;
`;

const ActionButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.spacing3};
`;

const ActionButton = styled.button<{
  variant?: 'primary' | 'secondary' | 'danger';
}>`
  background-color: ${props => {
    switch (props.variant) {
      case 'primary':
        return theme.colors.brand.main;
      case 'danger':
        return theme.colors.error;
      default:
        return theme.colors.white;
    }
  }};
  border: 1px solid
    ${props => {
      switch (props.variant) {
        case 'primary':
          return theme.colors.brand.main;
        case 'danger':
          return theme.colors.error;
        default:
          return theme.colors.borderInput;
      }
    }};
  border-radius: 12px;
  padding: ${theme.spacing.spacing4};
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${props => {
      switch (props.variant) {
        case 'primary':
          return theme.colors.brand.dark;
        case 'danger':
          return theme.colors.errorDark;
        default:
          return theme.colors.gray100;
      }
    }};
  }
`;

const ButtonIcon = styled.div<{ variant?: 'primary' | 'secondary' | 'danger' }>`
  margin-right: ${theme.spacing.spacing3};
  color: ${props => {
    switch (props.variant) {
      case 'primary':
        return theme.colors.white;
      case 'danger':
        return theme.colors.white;
      default:
        return theme.colors.textMain;
    }
  }};
`;

const ButtonText = styled.span<{
  variant?: 'primary' | 'secondary' | 'danger';
}>`
  font-size: ${theme.typography.fontSize.base};
  font-weight: ${theme.fontWeight.medium};
  color: ${props => {
    switch (props.variant) {
      case 'primary':
        return theme.colors.white;
      case 'danger':
        return theme.colors.white;
      default:
        return theme.colors.textMain;
    }
  }};
`;

const Badge = styled.span`
  background-color: ${theme.colors.error};
  color: ${theme.colors.white};
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.fontWeight.semibold};
  padding: ${theme.spacing.spacing1} ${theme.spacing.spacing2};
  border-radius: 12px;
  margin-left: auto;
`;

interface ManageSectionProps {
  teamId: string | number;
  joinRequests: TeamJoinRequest[];
  matchRequests?: unknown[]; // 매치 요청 타입은 추후 정의
  onShowJoinRequestsModal: () => void;
  onShowMatchRequestsModal?: () => void;
  onDeleteTeam: () => void;
}

export default function ManageSection({
  joinRequests,
  matchRequests = [],
  onShowJoinRequestsModal,
  onShowMatchRequestsModal,
  onDeleteTeam,
}: ManageSectionProps) {
  const handleDeleteTeam = () => {
    if (
      confirm('정말로 팀을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.')
    ) {
      onDeleteTeam();
    }
  };

  return (
    <ManageSection>
      <SectionTitle>팀 관리</SectionTitle>
      <ActionButtons>
        <ActionButton onClick={onShowJoinRequestsModal}>
          <ButtonIcon>
            <IoPeople size={20} />
          </ButtonIcon>
          <ButtonText>가입 요청 관리</ButtonText>
          {joinRequests.length > 0 && <Badge>{joinRequests.length}</Badge>}
        </ActionButton>

        {onShowMatchRequestsModal && (
          <ActionButton onClick={onShowMatchRequestsModal}>
            <ButtonIcon>
              <IoEye size={20} />
            </ButtonIcon>
            <ButtonText>매치 요청 관리</ButtonText>
            {matchRequests.length > 0 && <Badge>{matchRequests.length}</Badge>}
          </ActionButton>
        )}

        <ActionButton variant="danger" onClick={handleDeleteTeam}>
          <ButtonIcon variant="danger">
            <IoTrash size={20} />
          </ButtonIcon>
          <ButtonText variant="danger">팀 삭제</ButtonText>
        </ActionButton>
      </ActionButtons>
    </ManageSection>
  );
}
