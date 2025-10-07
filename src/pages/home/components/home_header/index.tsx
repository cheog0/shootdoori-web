import { memo } from 'react';
import styled, { keyframes } from 'styled-components';
import { IoMdLogOut, IoMdPerson } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '@/contexts/auth_context';
import { theme } from '@/theme';

// 애니메이션 정의
const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-3px);
  }
`;

const Header = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  padding: 12px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const LogoContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const LogoImage = styled.img`
  width: 36px;
  height: 36px;
  object-fit: contain;
  filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.15));
  animation: ${float} 3s ease-in-out infinite;
`;

const HeaderTitle = styled.h1`
  font-size: 22px;
  font-weight: 800;
  background: linear-gradient(
    135deg,
    ${theme.colors.brand.main} 0%,
    ${theme.colors.grass[600]} 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
  letter-spacing: -0.02em;
  animation: ${float} 3s ease-in-out infinite;
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const HeaderIcon = styled.button`
  padding: 8px;
  border: none;
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  border-radius: 8px;

  &:hover {
    background: rgba(108, 142, 104, 0.1);
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }
`;

export default memo(function HomeHeader() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const confirmed = window.confirm('정말 로그아웃하시겠습니까?');
    if (confirmed) {
      try {
        await logout();
      } catch (error) {
        console.error('로그아웃 중 오류 발생:', error);
      }
    }
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  return (
    <Header>
      <HeaderContent>
        <LeftSection>
          <LogoContainer>
            <LogoImage
              src="/assets/images/logo_big.png"
              alt="ShootDoori Logo"
            />
            <HeaderTitle>ShootDoori</HeaderTitle>
          </LogoContainer>
        </LeftSection>
        <HeaderActions>
          <HeaderIcon onClick={handleProfileClick}>
            <IoMdPerson
              size={24}
              color={theme.colors.brand.main}
              style={{ position: 'relative', zIndex: 1 }}
            />
          </HeaderIcon>
          <HeaderIcon onClick={handleLogout}>
            <IoMdLogOut
              size={24}
              color={theme.colors.brand.main}
              style={{ position: 'relative', zIndex: 1 }}
            />
          </HeaderIcon>
        </HeaderActions>
      </HeaderContent>
    </Header>
  );
});
