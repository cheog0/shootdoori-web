import { useNavigate } from 'react-router-dom';
import { Users, Plus } from 'lucide-react';
import styled from '@emotion/styled';

export default function Buttons() {
  const navigate = useNavigate();

  return (
    <ButtonContainer>
      <ButtonWrapper>
        <JoinButton onClick={() => navigate('/team/join-university')}>
          <Users size={20} color="#3b82f6" />
          <JoinText>팀 참여하기</JoinText>
        </JoinButton>
      </ButtonWrapper>

      <ButtonWrapper>
        <CreateButton onClick={() => navigate('/team/creation')}>
          <Plus size={20} color="#fff" />
          <CreateText>팀 생성하기</CreateText>
        </CreateButton>
      </ButtonWrapper>
    </ButtonContainer>
  );
}

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: -20px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const JoinButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  border: 2px solid #3b82f6;
  border-radius: 8px;
  padding: 12px 12px;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
  width: 80%;

  &:hover {
    background: #f8faff;
    transform: translateY(-1px);
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.15);
  }
`;

const JoinText = styled.span`
  font-size: 12px;
  font-weight: bold;
  color: #3b82f6;
  margin-left: 4px;
`;

const CreateButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #3b82f6;
  border-radius: 8px;
  padding: 12px 12px;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(59, 130, 246, 0.3);
  border: none;
  transition: all 0.2s ease;
  width: 80%;

  &:hover {
    background: #2563eb;
    transform: translateY(-1px);
    box-shadow: 0 3px 8px rgba(59, 130, 246, 0.4);
  }
`;

const CreateText = styled.span`
  font-size: 12px;
  font-weight: bold;
  color: #fff;
  margin-left: 4px;
`;
