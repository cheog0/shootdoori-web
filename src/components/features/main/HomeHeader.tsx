import { memo } from 'react';
import styled from '@emotion/styled';

export default memo(function HomeHeader() {
  return (
    <Header>
      <LeftSection>
        <AppIcon>
          <img
            src="/assets/images/logo_without_background.png"
            alt="ShootDoori"
            width={24}
            height={24}
          />
        </AppIcon>
        <LogoText>ShootDoori</LogoText>
      </LeftSection>
      <ShareIcon>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          <path d="m16 17 4-4-4-4" />
          <path d="M20 13H9" />
        </svg>
      </ShareIcon>
    </Header>
  );
});

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: #f5f5f5;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const AppIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LogoText = styled.h1`
  font-size: 1.2rem;
  font-weight: bold;
  color: black;
  margin: 0;
`;

const ShareIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;
