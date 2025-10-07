import { memo, useState } from 'react';
import styled from 'styled-components';
import { IoPerson, IoPeople } from 'react-icons/io5';

import { theme } from '@/styles/theme';
import type { TeamMember } from '@/types/team';
import { getRoleDisplayName } from '@/utils/team';

// Styled Components
const MembersSection = styled.div`
  padding: ${theme.spacing.spacing4};
`;

const SectionTitle = styled.h3`
  font-size: ${theme.typography.fontSize.lg};
  font-weight: ${theme.fontWeight.semibold};
  color: ${theme.colors.textMain};
  margin: 0 0 ${theme.spacing.spacing4} 0;
`;

const MembersList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.spacing2};
`;

const MemberCard = styled.div<{ isLeader?: boolean }>`
  background-color: ${props =>
    props.isLeader ? theme.colors.brand.main : theme.colors.white};
  border-radius: 12px;
  padding: ${theme.spacing.spacing3};
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    transform: translateY(-1px);
  }
`;

const MemberAvatar = styled.div<{ isLeader?: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: ${props =>
    props.isLeader ? 'rgba(255, 255, 255, 0.2)' : theme.colors.gray200};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: ${theme.spacing.spacing3};
`;

const MemberInfo = styled.div`
  flex: 1;
`;

const MemberName = styled.h4<{ isLeader?: boolean }>`
  font-size: ${theme.typography.fontSize.base};
  font-weight: ${theme.fontWeight.semibold};
  color: ${props =>
    props.isLeader ? theme.colors.white : theme.colors.textMain};
  margin: 0 0 ${theme.spacing.spacing1} 0;
`;

const MemberRole = styled.span<{ isLeader?: boolean }>`
  font-size: ${theme.typography.fontSize.sm};
  color: ${props =>
    props.isLeader ? 'rgba(255, 255, 255, 0.8)' : theme.colors.textSub};
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${theme.spacing.spacing8};
  color: ${theme.colors.textSub};
`;

const EmptyText = styled.p`
  font-size: ${theme.typography.fontSize.base};
  margin: 0;
`;

interface TeamMembersSectionProps {
  teamMembers: TeamMember[] | undefined;
  membersLoading: boolean;
  onMemberPress?: (member: TeamMember) => void;
}

export default memo(function TeamMembersSection({
  teamMembers,
  membersLoading,
  onMemberPress,
}: TeamMembersSectionProps) {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  const handleMemberPress = (member: TeamMember) => {
    setSelectedMember(member);
    onMemberPress?.(member);
  };

  if (membersLoading) {
    return (
      <MembersSection>
        <SectionTitle>팀원 목록</SectionTitle>
        <EmptyState>
          <EmptyText>팀원 정보를 불러오는 중...</EmptyText>
        </EmptyState>
      </MembersSection>
    );
  }

  if (!teamMembers || teamMembers.length === 0) {
    return (
      <MembersSection>
        <SectionTitle>팀원 목록</SectionTitle>
        <EmptyState>
          <EmptyText>아직 팀원이 없습니다.</EmptyText>
        </EmptyState>
      </MembersSection>
    );
  }

  return (
    <MembersSection>
      <SectionTitle>팀원 목록</SectionTitle>
      <MembersList>
        {teamMembers.map(member => (
          <MemberCard
            key={member.userId}
            isLeader={member.role === 'LEADER'}
            onClick={() => handleMemberPress(member)}
          >
            <MemberAvatar isLeader={member.role === 'LEADER'}>
              <IoPerson
                size={20}
                color={
                  member.role === 'LEADER'
                    ? theme.colors.white
                    : theme.colors.textMain
                }
              />
            </MemberAvatar>
            <MemberInfo>
              <MemberName isLeader={member.role === 'LEADER'}>
                {member.name}
              </MemberName>
              <MemberRole isLeader={member.role === 'LEADER'}>
                {getRoleDisplayName(member.role)}
              </MemberRole>
            </MemberInfo>
          </MemberCard>
        ))}
      </MembersList>
    </MembersSection>
  );
});
