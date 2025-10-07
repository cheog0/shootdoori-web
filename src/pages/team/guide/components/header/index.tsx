import { useNavigate } from 'react-router-dom';
import { memo } from 'react';
import styled from 'styled-components';
import { ChevronLeft } from 'lucide-react';

import { colors } from '@/theme';

const BackButton = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s ease;
  z-index: 10;

  &:hover {
    background-color: rgba(0, 0, 0, 0.5);
  }
`;

const SubTitle = styled.div`
  font-size: 16px;
  color: ${colors.text.white};
  text-align: center;
  margin-bottom: 8px;
  opacity: 0.9;
`;

const MainTitle = styled.div`
  font-size: 28px;
  font-weight: bold;
  color: ${colors.text.white};
  text-align: center;
  line-height: 1.3;
  margin-bottom: 20px;
`;

export default memo(function Header() {
  const navigate = useNavigate();

  const handleBackPress = () => {
    navigate('/');
  };

  return (
    <>
      <BackButton onClick={handleBackPress}>
        <ChevronLeft size={24} color={colors.text.white} />
      </BackButton>

      <SubTitle>같이 뛸 팀원 필요하다면?</SubTitle>

      <MainTitle>
        팀과 함께하는{'\n'}
        축구의 즐거움
      </MainTitle>
    </>
  );
});
