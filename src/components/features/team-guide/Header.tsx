import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import styled from '@emotion/styled';

export default function Header() {
  const navigate = useNavigate();

  return (
    <>
      <BackButton onClick={() => navigate(-1)}>
        <ChevronLeft size={24} color="#fff" />
      </BackButton>

      <SubTitle>같이 뛸 팀원 필요하다면?</SubTitle>

      <MainTitle>
        팀과 함께하는
        <br />
        축구의 즐거움
      </MainTitle>
    </>
  );
}

const BackButton = styled.button`
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 20px;
  width: 40px;
  height: 40px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  @media (max-width: 768px) {
    top: 15px;
    left: 15px;
  }
`;

const SubTitle = styled.h2`
  font-size: 18px;
  font-size: bold;
  color: #fff;
  text-align: center;
  margin-top: 90px;
  margin-bottom: 8px;
  opacity: 0.9;
`;

const MainTitle = styled.h1`
  font-size: 28px;
  font-weight: bold;
  color: #fff;
  text-align: center;
  line-height: 34px;
  margin-top: 12px;
  margin-bottom: 20px;
`;
