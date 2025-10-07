import { memo } from 'react';
import styled, { keyframes } from 'styled-components';
import { MdChevronRight } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

import { ROUTES } from '@/constants/routes';
import { useAuth } from '@/contexts/auth_context';
import { theme } from '@/theme';

interface EnvelopeSectionProps {
  teamId?: number | null;
}

// 애니메이션 정의
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const EnvelopeSection = styled.div`
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  border-radius: 12px;
  margin-bottom: 8px;
  box-shadow:
    0 4px 20px rgba(0, 0, 0, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
  border: 2px solid rgba(108, 142, 104, 0.2);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  animation: ${fadeInUp} 0.8s ease-out 0.4s both;
`;

const EnvelopeButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  width: 100%;
  padding: 0;
  min-height: 60px;
  display: flex;
  align-items: center;
  transition: background-color 0.2s ease;

  @media (max-width: 768px) {
    min-height: 56px;
  }
`;

const EnvelopeHeader = styled.div`
  display: flex;
  align-items: center;
  padding: ${theme.spacing.spacing5} ${theme.spacing.spacing4};
  width: 100%;
  gap: ${theme.spacing.spacing3};

  @media (max-width: 768px) {
    padding: ${theme.spacing.spacing4} ${theme.spacing.spacing3};
    gap: ${theme.spacing.spacing2};
  }
`;

const EnvelopeIcon = styled.div`
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-left: 8px;

  @media (max-width: 768px) {
    width: 24px;
    height: 24px;
    margin-left: 6px;
  }
`;

const EnvelopeImage = styled.img`
  width: 18px;
  height: 18px;

  @media (max-width: 768px) {
    width: 16px;
    height: 16px;
  }
`;

const EnvelopeTitle = styled.span`
  flex: 1;
  font-size: ${theme.typography.fontSize.font3};
  font-weight: ${theme.typography.fontWeight.medium};
  color: ${theme.colors.text.main};
  text-align: left;

  @media (max-width: 768px) {
    font-size: ${theme.typography.fontSize.font2};
  }
`;

const ChevronIcon = styled.div`
  color: ${theme.colors.brand.main};
  transition: all 0.3s ease;
`;

export default memo(function EnvelopeSectionComponent({
  teamId,
}: EnvelopeSectionProps) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const checkTeamMembership = () => {
    // 인증되지 않은 사용자는 팀 참여 필요 알림을 표시하지 않음
    if (!isAuthenticated) {
      return false;
    }

    if (!teamId || teamId === null || teamId === undefined) {
      window.alert('매치에 참여하려면 먼저 팀에 가입해야 합니다.');
      return false;
    }
    return true;
  };

  const handleMatchCreation = () => {
    if (!checkTeamMembership()) return;
    navigate(ROUTES.MATCH_MAKING);
  };

  const handleMatchParticipation = () => {
    if (!checkTeamMembership()) return;
    navigate(ROUTES.MATCH_APPLICATION);
  };

  const handleCheckCreatedMatches = () => {
    if (!checkTeamMembership()) return;
    navigate(ROUTES.CHECK_CREATED_MATCHES);
  };

  const handleCheckAppliedMatches = () => {
    if (!checkTeamMembership()) return;
    navigate(ROUTES.CHECK_APPLIED_MATCHES);
  };

  return (
    <>
      <EnvelopeSection>
        <EnvelopeButton onClick={handleMatchCreation}>
          <EnvelopeHeader>
            <EnvelopeIcon>
              <EnvelopeImage src="/assets/images/apply.png" alt="매치 생성" />
            </EnvelopeIcon>
            <EnvelopeTitle>매치 생성하기</EnvelopeTitle>
            <ChevronIcon>
              <MdChevronRight size={20} />
            </ChevronIcon>
          </EnvelopeHeader>
        </EnvelopeButton>
      </EnvelopeSection>

      <EnvelopeSection>
        <EnvelopeButton onClick={handleMatchParticipation}>
          <EnvelopeHeader>
            <EnvelopeIcon>
              <EnvelopeImage src="/assets/images/apply.png" alt="매치 참여" />
            </EnvelopeIcon>
            <EnvelopeTitle>매치 참여하기</EnvelopeTitle>
            <ChevronIcon>
              <MdChevronRight size={20} />
            </ChevronIcon>
          </EnvelopeHeader>
        </EnvelopeButton>
      </EnvelopeSection>

      <EnvelopeSection>
        <EnvelopeButton onClick={handleCheckCreatedMatches}>
          <EnvelopeHeader>
            <EnvelopeIcon>
              <EnvelopeImage src="/assets/images/memo.png" alt="생성한 매치" />
            </EnvelopeIcon>
            <EnvelopeTitle>생성한 매치 보기</EnvelopeTitle>
            <ChevronIcon>
              <MdChevronRight size={20} />
            </ChevronIcon>
          </EnvelopeHeader>
        </EnvelopeButton>
      </EnvelopeSection>

      <EnvelopeSection>
        <EnvelopeButton onClick={handleCheckAppliedMatches}>
          <EnvelopeHeader>
            <EnvelopeIcon>
              <EnvelopeImage src="/assets/images/memo.png" alt="신청한 매치" />
            </EnvelopeIcon>
            <EnvelopeTitle>신청한 매치 보기</EnvelopeTitle>
            <ChevronIcon>
              <MdChevronRight size={20} />
            </ChevronIcon>
          </EnvelopeHeader>
        </EnvelopeButton>
      </EnvelopeSection>
    </>
  );
});
