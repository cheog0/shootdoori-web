import { memo } from 'react';
import styled, { keyframes } from 'styled-components';
import { IoMdPerson } from 'react-icons/io';

import { Badge } from '@/components/badge/badge';
import { theme } from '@/theme';
import type { UserProfile } from '@/types/profile';
import { formatDate } from '@/utils/date';

// 애니메이션 정의
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-3px);
  }
`;

const ProfileHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 24px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.1),
    0 2px 8px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.3);
  animation: ${fadeInUp} 0.6s ease-out;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow:
      0 12px 40px rgba(0, 0, 0, 0.15),
      0 4px 12px rgba(0, 0, 0, 0.08);
  }
`;

const ProfileAvatar = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 35px;
  background: linear-gradient(
    135deg,
    ${theme.colors.brand.main}20 0%,
    ${theme.colors.grass[300]}20 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  position: relative;
  animation: ${float} 3s ease-in-out infinite;
  border: 2px solid rgba(255, 255, 255, 0.5);

  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    border-radius: 50%;
    background: linear-gradient(
      135deg,
      ${theme.colors.brand.main}30,
      ${theme.colors.grass[400]}30
    );
    z-index: -1;
  }
`;

const ProfileInfo = styled.div`
  flex: 1;
`;

const NameContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  gap: 12px;
`;

const ProfileName = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  background: linear-gradient(
    135deg,
    ${theme.colors.brand.main} 0%,
    ${theme.colors.grass[600]} 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.02em;
`;

const ProfileUniversity = styled.div`
  font-size: 1rem;
  color: ${theme.colors.text.sub};
  margin-bottom: 6px;
  font-weight: 500;
  opacity: 0.8;
`;

const ProfileDetails = styled.div`
  font-size: 0.85rem;
  color: ${theme.colors.text.sub};
  opacity: 0.7;
  font-weight: 400;
`;

export default memo(function ProfileHeader({ user }: { user: UserProfile }) {
  const getSkillLevelBadge = (skillLevel: string) => {
    switch (skillLevel) {
      case 'PRO':
        return { variant: 'gold' as const, text: '프로' };
      case 'SEMI_PRO':
        return { variant: 'silver' as const, text: '세미프로' };
      case 'AMATEUR':
        return { variant: 'bronze' as const, text: '아마추어' };
      default:
        return { variant: 'bronze' as const, text: '아마추어' };
    }
  };

  const skillBadge = getSkillLevelBadge(user.skillLevel);

  return (
    <ProfileHeaderContainer>
      <ProfileAvatar>
        <IoMdPerson size={48} color={theme.colors.grass[500]} />
      </ProfileAvatar>
      <ProfileInfo>
        <NameContainer>
          <ProfileName>{user.name}</ProfileName>
          <Badge
            text={skillBadge.text}
            variant={skillBadge.variant}
            size="small"
          />
        </NameContainer>
        <ProfileUniversity>{user.university}</ProfileUniversity>
        <ProfileDetails>{formatDate(user.createdAt)} 가입</ProfileDetails>
      </ProfileInfo>
    </ProfileHeaderContainer>
  );
});
