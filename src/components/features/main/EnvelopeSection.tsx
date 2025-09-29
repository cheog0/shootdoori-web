import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';

export default memo(function EnvelopeSection() {
  const navigate = useNavigate();

  return (
    <Card onClick={() => navigate('/match_making/teammate_register')}>
      <IconWrapper>
        <img
          src="/assets/images/apply.png"
          alt="매치 신청"
          width={24}
          height={24}
        />
      </IconWrapper>
      <Title>매치 신청하기</Title>
      <Arrow>›</Arrow>
    </Card>
  );
});

const Card = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  background: white;
  border-radius: 12px;
  padding: 16px;
  cursor: pointer;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.div`
  font-weight: bold;
  color: black;
  flex: 1;
`;

const Arrow = styled.div`
  color: #888;
  font-size: 1.2rem;
  font-weight: bold;
`;
