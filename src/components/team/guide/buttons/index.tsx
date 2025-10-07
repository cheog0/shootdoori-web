import { IoPeople, IoAdd } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { memo } from 'react';
import styled from 'styled-components';

import { useUserProfile } from '@/hooks/queries';
import { theme } from '@/styles/theme';

// Styled Components
const ButtonContainer = styled.div`
  padding: ${theme.spacing.spacing4};
  gap: ${theme.spacing.spacing3};
`;

const JoinButton = styled.button`
  background-color: ${theme.colors.brand.main};
  padding: ${theme.spacing.spacing4};
  border-radius: 12px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: ${theme.spacing.spacing3};
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${theme.colors.brand.dark};
  }
`;

const CreateButton = styled.button`
  background-color: transparent;
  padding: ${theme.spacing.spacing4};
  border-radius: 12px;
  border: 1px solid ${theme.colors.borderInput};
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${theme.colors.gray100};
  }
`;

const ButtonContent = styled.div`
  flex-direction: row;
  align-items: center;
`;

const ButtonIcon = styled.div`
  margin-right: ${theme.spacing.spacing2};
`;

const ButtonText = styled.span`
  color: ${theme.colors.white};
  font-size: ${theme.typography.fontSize.base};
  font-weight: ${theme.fontWeight.semibold};
`;

const CreateButtonText = styled.span`
  color: ${theme.colors.textMain};
  font-size: ${theme.typography.fontSize.base};
  font-weight: ${theme.fontWeight.medium};
`;

export default memo(function Buttons() {
  const navigate = useNavigate();
  const { data: userProfile } = useUserProfile();

  return (
    <ButtonContainer>
      <JoinButton onClick={() => navigate('/team/join-university')}>
        <ButtonContent>
          <ButtonIcon>
            <IoPeople size={24} color={theme.colors.white} />
          </ButtonIcon>
          <ButtonText>팀 참여하기</ButtonText>
        </ButtonContent>
      </JoinButton>

      <CreateButton
        onClick={() =>
          navigate(
            `/team/creation?university=${encodeURIComponent(userProfile?.university || '')}`
          )
        }
      >
        <ButtonContent>
          <ButtonIcon>
            <IoAdd size={24} color={theme.colors.textMain} />
          </ButtonIcon>
          <CreateButtonText>팀 생성하기</CreateButtonText>
        </ButtonContent>
      </CreateButton>
    </ButtonContainer>
  );
});
