import { memo } from 'react';
import styled from 'styled-components';
import { IoPerson, IoEllipsisVertical } from 'react-icons/io5';

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

const ActionButton = styled.button<{ isLeader?: boolean }>`
  background: none;
  border: none;
  padding: ${theme.spacing.spacing2};
  cursor: pointer;
  border-radius: 8px;
  transition: background-color 0.2s ease;
  color: ${props =>
    props.isLeader ? theme.colors.white : theme.colors.textMain};

  &:hover {
    background-color: ${props =>
      props.isLeader ? 'rgba(255, 255, 255, 0.1)' : theme.colors.gray100};
  }
`;

interface MemberListSectionProps {
  teamMembers: TeamMember[];
  currentUserMember?: TeamMember | null;
  onMemberPress: (member: TeamMember) => void;
  onRoleChange: (member: TeamMember) => void;
  onRemoveMember: (member: TeamMember) => void;
  onDelegateLeadership: (member: TeamMember) => void;
}

export default memo(function MemberListSection({
  teamMembers,
  currentUserMember,
  onMemberPress,
}: MemberListSectionProps) {
  const canManageMember = (member: TeamMember) => {
    if (!currentUserMember) return false;

    // 자기 자신은 관리할 수 없음
    if (member.userId === currentUserMember.userId) return false;

    // 회장은 모든 멤버를 관리할 수 있음
    if (currentUserMember.role === 'LEADER') return true;

    // 부회장은 일반 멤버만 관리할 수 있음
    if (currentUserMember.role === 'VICE_LEADER' && member.role === 'MEMBER')
      return true;

    return false;
  };

  const canDelegateLeadership = (member: TeamMember) => {
    if (!currentUserMember) return false;

    // 회장만 리더십을 위임할 수 있음
    if (currentUserMember.role !== 'LEADER') return false;

    // 자기 자신에게는 위임할 수 없음
    if (member.userId === currentUserMember.userId) return false;

    // 이미 회장인 멤버에게는 위임할 수 없음
    if (member.role === 'LEADER') return false;

    return true;
  };

  return (
    <MemberListSection>
      <SectionTitle>팀원 목록</SectionTitle>
      <MembersList>
        {teamMembers.map(member => (
          <MemberCard
            key={member.userId}
            isLeader={member.role === 'LEADER'}
            onClick={() => onMemberPress(member)}
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
            {(canManageMember(member) || canDelegateLeadership(member)) && (
              <ActionButton
                isLeader={member.role === 'LEADER'}
                onClick={e => {
                  e.stopPropagation();
                  // 여기서 드롭다운 메뉴를 표시하거나 모달을 열 수 있음
                }}
              >
                <IoEllipsisVertical size={20} />
              </ActionButton>
            )}
          </MemberCard>
        ))}
      </MembersList>
    </MemberListSection>
  );
});
