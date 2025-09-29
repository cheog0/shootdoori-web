import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import styled from '@emotion/styled';

interface BenefitsSectionProps {
  teamId: number | null;
}

export default memo(function BenefitsSection({ teamId }: BenefitsSectionProps) {
  const navigate = useNavigate();

  const handleServicePress = (serviceId: string) => {
    if (serviceId === 'team') {
      if (teamId) {
        navigate(`/teams/${teamId}`);
      } else {
        navigate(ROUTES.HOME);
      }
      return;
    }

    const routeMap: Record<string, string> = {
      tournament: ROUTES.HOME,
    };

    const route = routeMap[serviceId];
    if (route) {
      navigate(route);
    }
  };

  return (
    <Wrapper>
      <Header>
        <Title>축구 서비스</Title>
      </Header>

      <MainCard>
        <ServiceCard
          onClick={() => handleServicePress('team')}
          backgroundColor="#eff6ff"
        >
          <CardTitle>팀 관리</CardTitle>
          <CardSubtitle>팀 관리 서비스</CardSubtitle>
          <CardIcon>
            <img
              src="/assets/images/team.png"
              alt="팀 관리"
              width={32}
              height={32}
            />
          </CardIcon>
        </ServiceCard>
      </MainCard>
    </Wrapper>
  );
});

// styled-components
const Wrapper = styled.div`
  margin-top: 16px;
`;

const Header = styled.div`
  margin-bottom: 8px;
`;

const Title = styled.span`
  font-size: 1.2rem;
  font-weight: bold;
`;

const MainCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.2s ease;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

const ServiceCard = styled.button<{ backgroundColor: string }>`
  width: 100%;
  padding: 16px;
  border-radius: 12px;
  text-align: center;
  cursor: pointer;
  border: none;
  background-color: ${props => props.backgroundColor};
`;

const CardTitle = styled.span`
  font-weight: bold;
  display: block;
`;

const CardSubtitle = styled.span`
  font-size: 0.9rem;
  color: #666;
  display: block;
  margin-top: 4px;
`;

const CardIcon = styled.span`
  margin-top: 8px;
  display: inline-block;
  font-size: 1.5rem;
`;
