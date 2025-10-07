import { memo } from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';

import { ROUTES, getTeamManagementUrl } from '@/constants/routes';
import { serviceCards } from '@/constants/service_card';
import { useUserProfile } from '@/hooks/queries';
import { theme } from '@/theme';

interface BenefitsSectionProps {
  teamId: number | null;
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

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-5px);
  }
`;

const shimmer = keyframes`
  0% {
    left: -100%;
  }
  100% {
    left: 100%;
  }
`;

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
`;

const BenefitsSection = styled.div`
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  border-radius: 12px;
  padding: 24px;
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
  border: 2px solid rgba(108, 142, 104, 0.2);
  position: relative;
  overflow: hidden;
  animation: ${fadeInUp} 0.8s ease-out 0.4s both;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.3),
      transparent
    );
    animation: ${shimmer} 3s infinite;
  }

  @media (max-width: 768px) {
    padding: 20px;
    border-radius: 12px;
  }
`;

const BenefitsHeader = styled.div`
  margin-bottom: 20px;
  text-align: left;
  position: relative;
  z-index: 1;
`;

const BenefitsTitle = styled.h2`
  font-size: 18px;
  font-weight: 700;
  color: ${theme.colors.text.main};
  margin: 0;
  text-align: left;
`;

const BenefitsGrid = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: ${theme.spacing.spacing3};
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    gap: ${theme.spacing.spacing3};
  }
`;

const BenefitCard = styled.button`
  flex: 1;
  padding: ${theme.spacing.spacing5};
  border-radius: 8px !important;
  align-items: center;
  background: rgba(135, 206, 235, 0.1);
  border: 1px solid ${theme.colors.gray[200]};
  min-height: 120px;
  justify-content: center;
  cursor: pointer;
  text-align: center;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    border-color: ${theme.colors.brand.main};
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    padding: ${theme.spacing.spacing4};
    min-height: 120px;
  }
`;

const BenefitTitle = styled.h3`
  font-size: ${theme.typography.fontSize.font3};
  font-weight: ${theme.typography.fontWeight.semibold};
  color: ${theme.colors.text.main};
  text-align: center;
  margin-bottom: ${theme.spacing.spacing1};
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    font-size: ${theme.typography.fontSize.font2};
  }
`;

const BenefitSubtitle = styled.p`
  font-size: ${theme.typography.fontSize.font2};
  color: ${theme.colors.text.sub};
  text-align: center;
  margin-bottom: ${theme.spacing.spacing2};
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    font-size: ${theme.typography.fontSize.font1};
  }
`;

const BenefitIcon = styled.span`
  font-size: ${theme.typography.fontSize.font7};
  position: relative;
  z-index: 1;
  text-align: center;
  animation: ${pulse} 2s ease-in-out infinite;

  @media (max-width: 768px) {
    font-size: ${theme.typography.fontSize.font5};
  }
`;

const BenefitIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: ${theme.spacing.spacing3};
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    margin-top: ${theme.spacing.spacing2};
  }
`;

export default memo(function BenefitsSectionComponent({
  teamId,
}: BenefitsSectionProps) {
  const navigate = useNavigate();
  const { data: userProfile } = useUserProfile();

  const currentTeamId = userProfile?.teamId || teamId;

  const handleServicePress = (serviceId: string) => {
    if (serviceId === 'team') {
      if (currentTeamId) {
        navigate(getTeamManagementUrl(currentTeamId));
      } else {
        navigate(ROUTES.TEAM_GUIDE);
      }
      return;
    }
  };

  return (
    <BenefitsSection>
      <BenefitsHeader>
        <BenefitsTitle>축구 서비스</BenefitsTitle>
      </BenefitsHeader>

      <BenefitsGrid>
        {serviceCards.map(service => (
          <BenefitCard
            key={service.id}
            onClick={() => handleServicePress(service.id)}
          >
            <BenefitTitle>{service.title}</BenefitTitle>
            <BenefitSubtitle>{service.subtitle}</BenefitSubtitle>
            {typeof service.icon === 'string' ? (
              <BenefitIcon>{service.icon}</BenefitIcon>
            ) : (
              <BenefitIconContainer>{service.icon}</BenefitIconContainer>
            )}
          </BenefitCard>
        ))}
      </BenefitsGrid>
    </BenefitsSection>
  );
});
