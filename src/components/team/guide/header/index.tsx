import { IoChevronBack } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { memo } from 'react';
import styled from 'styled-components';

import { theme } from '@/styles/theme';

// Styled Components
const BackButton = styled.button`
  position: absolute;
  top: ${theme.spacing.spacing4};
  left: ${theme.spacing.spacing4};
  background: none;
  border: none;
  padding: ${theme.spacing.spacing2};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  transition: background-color 0.2s ease;
  z-index: 10;

  &:hover {
    background-color: ${theme.colors.gray100};
  }
`;

const SubTitle = styled.h2`
  font-size: ${theme.typography.fontSize['2xl']};
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.white};
  text-align: center;
  margin: ${theme.spacing.spacing8} 0 ${theme.spacing.spacing4} 0;
  line-height: 1.3;
`;

const Title = styled.h1`
  font-size: ${theme.typography.fontSize['4xl']};
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.white};
  text-align: center;
  margin: 0 0 ${theme.spacing.spacing8} 0;
  line-height: 1.2;
`;

const Container = styled.div`
  position: relative;
  width: 100%;
`;

export default memo(function Header() {
  const navigate = useNavigate();

  return (
    <Container>
      <BackButton onClick={() => navigate(-1)}>
        <IoChevronBack size={24} color={theme.colors.white} />
      </BackButton>

      <SubTitle>같이 뛸 팀원 필요하다면?</SubTitle>
      <Title>팀을 만들어보세요!</Title>
    </Container>
  );
});
