import React from 'react';
import styled from 'styled-components';
import { X, Loader2, User, Calendar, Star, MapPin } from 'lucide-react';

import { useTeamMember } from '@/hooks/queries';
import { colors } from '@/theme';
import { formatDate } from '@/utils/date';
import { getRoleDisplayName } from '@/utils/team';

// Styled Components
const Overlay = styled.div<{ visible: boolean }>`
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

const Header = styled.div`
  padding: 20px;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
`;

const CloseButton = styled.button`
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

const Content = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
`;

const LoadingText = styled.span`
  font-size: 16px;
  color: #6b7280;
  margin-top: 16px;
`;

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
`;

const ErrorText = styled.span`
  font-size: 16px;
  color: #ef4444;
  text-align: center;
`;

const MemberInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const MemberHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const Avatar = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #f3f4f6;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MemberDetails = styled.div`
  flex: 1;
`;

const MemberName = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 4px 0;
`;

const MemberRole = styled.span`
  font-size: 14px;
  color: #6b7280;
`;

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const InfoIcon = styled.div`
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InfoLabel = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  min-width: 80px;
`;

const InfoValue = styled.span`
  font-size: 14px;
  color: #6b7280;
`;

const SkillLevelContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const SkillLevelBadge = styled.div<{ level: string }>`
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  background-color: ${props => {
    switch (props.level) {
      case 'AMATEUR':
        return colors.green[100];
      case 'SEMI_PRO':
        return colors.yellow[100];
      case 'PRO':
        return colors.red[100];
      default:
        return colors.gray[100];
    }
  }};
  color: ${props => {
    switch (props.level) {
      case 'AMATEUR':
        return colors.green[700];
      case 'SEMI_PRO':
        return colors.yellow[700];
      case 'PRO':
        return colors.red[700];
      default:
        return colors.gray[700];
    }
  }};
`;

const BioSection = styled.div`
  margin-top: 20px;
`;

const BioLabel = styled.h4`
  font-size: 14px;
  font-weight: 600;
  color: #374151;
  margin: 0 0 8px 0;
`;

const BioText = styled.p`
  font-size: 14px;
  color: #6b7280;
  line-height: 1.5;
  margin: 0;
`;

interface MemberDetailModalProps {
  visible: boolean;
  teamId: string | number;
  userId: string | number;
  onClose: () => void;
}

export default function MemberDetailModal({
  visible,
  teamId,
  userId,
  onClose,
}: MemberDetailModalProps) {
  const { data: member, isLoading, error } = useTeamMember(teamId, userId);

  const getSkillLevelText = (level: string) => {
    switch (level) {
      case 'AMATEUR':
        return '아마추어';
      case 'SEMI_PRO':
        return '세미프로';
      case 'PRO':
        return '프로';
      default:
        return level;
    }
  };

  return (
    <Overlay visible={visible}>
      <ModalContainer>
        <Header>
          <Title>팀원 정보</Title>
          <CloseButton onClick={onClose}>
            <X size={24} color={colors.gray[600]} />
          </CloseButton>
        </Header>

        <Content>
          {isLoading ? (
            <LoadingContainer>
              <Loader2 size={32} color={colors.grass[500]} />
              <LoadingText>팀원 정보를 불러오는 중...</LoadingText>
            </LoadingContainer>
          ) : error ? (
            <ErrorContainer>
              <ErrorText>팀원 정보를 불러올 수 없습니다</ErrorText>
            </ErrorContainer>
          ) : member ? (
            <MemberInfo>
              <MemberHeader>
                <Avatar>
                  <User size={24} color={colors.gray[600]} />
                </Avatar>
                <MemberDetails>
                  <MemberName>{member.name}</MemberName>
                  <MemberRole>{getRoleDisplayName(member.role)}</MemberRole>
                </MemberDetails>
              </MemberHeader>

              <InfoSection>
                <InfoItem>
                  <InfoIcon>
                    <Calendar size={16} color={colors.gray[600]} />
                  </InfoIcon>
                  <InfoLabel>가입일</InfoLabel>
                  <InfoValue>{formatDate(member.joinedAt)}</InfoValue>
                </InfoItem>

                <InfoItem>
                  <InfoIcon>
                    <Star size={16} color={colors.gray[600]} />
                  </InfoIcon>
                  <InfoLabel>실력</InfoLabel>
                  <SkillLevelContainer>
                    <SkillLevelBadge level={member.skillLevel}>
                      {getSkillLevelText(member.skillLevel)}
                    </SkillLevelBadge>
                  </SkillLevelContainer>
                </InfoItem>

                {member.position && (
                  <InfoItem>
                    <InfoIcon>
                      <MapPin size={16} color={colors.gray[600]} />
                    </InfoIcon>
                    <InfoLabel>포지션</InfoLabel>
                    <InfoValue>{member.position}</InfoValue>
                  </InfoItem>
                )}
              </InfoSection>

              {member.bio && (
                <BioSection>
                  <BioLabel>자기소개</BioLabel>
                  <BioText>{member.bio}</BioText>
                </BioSection>
              )}
            </MemberInfo>
          ) : null}
        </Content>
      </ModalContainer>
    </Overlay>
  );
}
