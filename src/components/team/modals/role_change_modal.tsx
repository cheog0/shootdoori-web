import { memo } from 'react';
import styled from 'styled-components';
import { X } from 'lucide-react';

import { theme } from '@/theme';
import type { TeamMember, TeamMemberRole } from '@/types/team';

// Styled Components
const ModalOverlay = styled.div<{ visible: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${props => (props.visible ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background-color: white;
  border-radius: 16px;
  width: 90%;
  max-width: 400px;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
`;

const ModalHeader = styled.div`
  padding: 20px;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ModalTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
`;

const ModalCloseButton = styled.button`
  background: none;
  border: none;
  color: #6b7280;
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #f3f4f6;
  }
`;

const ModalContent = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ModalMemberName = styled.span`
  font-size: 16px;
  color: #374151;
  text-align: center;
`;

const RoleOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const RoleOption = styled.button<{ selected: boolean }>`
  padding: 16px;
  border: 1px solid ${props => (props.selected ? '#3b82f6' : '#d1d5db')};
  border-radius: 8px;
  background-color: ${props => (props.selected ? '#3b82f6' : 'white')};
  color: ${props => (props.selected ? 'white' : '#374151')};
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #3b82f6;
    background-color: ${props => (props.selected ? '#2563eb' : '#f8fafc')};
  }
`;

const RoleOptionText = styled.span`
  font-size: 16px;
  font-weight: 500;
`;

const RoleDescription = styled.span`
  font-size: 14px;
  color: ${props => (props.selected ? 'rgba(255, 255, 255, 0.8)' : '#6b7280')};
  margin-top: 4px;
`;

interface RoleChangeModalProps {
  visible: boolean;
  selectedMember: TeamMember | null;
  onClose: () => void;
  onUpdateRole: (newRole: TeamMemberRole) => void;
}

export default memo(function RoleChangeModal({
  visible,
  selectedMember,
  onClose,
  onUpdateRole,
}: RoleChangeModalProps) {

  return (
    <ModalOverlay visible={visible}>
      <ModalContainer>
        <ModalHeader>
          <ModalTitle>역할 변경</ModalTitle>
          <ModalCloseButton onClick={onClose}>
            <X size={24} color={theme.colors.gray[700]} />
          </ModalCloseButton>
        </ModalHeader>

        <ModalContent>
          <ModalMemberName>
            {selectedMember?.name}님의 역할을 선택해주세요
          </ModalMemberName>

          <RoleOptions>
            <RoleOption
              selected={selectedMember?.role === 'VICE_LEADER'}
              onClick={() => onUpdateRole('VICE_LEADER')}
            >
              <RoleOptionText>부팀장</RoleOptionText>
              <RoleDescription
                selected={selectedMember?.role === 'VICE_LEADER'}
              >
                팀장을 보조하며 일부 권한을 가집니다
              </RoleDescription>
            </RoleOption>

            <RoleOption
              selected={selectedMember?.role === 'MEMBER'}
              onClick={() => onUpdateRole('MEMBER')}
            >
              <RoleOptionText>팀원</RoleOptionText>
              <RoleDescription selected={selectedMember?.role === 'MEMBER'}>
                기본적인 팀원 권한을 가집니다
              </RoleDescription>
            </RoleOption>
          </RoleOptions>
        </ModalContent>
      </ModalContainer>
    </ModalOverlay>
  );
});
