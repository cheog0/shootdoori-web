import { memo } from 'react';
import styled from 'styled-components';
import { MdChevronRight } from 'react-icons/md';

import { Card } from '@/components/card/card';
import { theme } from '@/theme';
import type { SettingItem } from '@/types/profile';

const SectionTitle = styled.div`
  font-size: 1.25rem;
  font-weight: 700;
  background: linear-gradient(
    135deg,
    ${theme.colors.brand.main} 0%,
    ${theme.colors.grass[600]} 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 20px;
  letter-spacing: -0.02em;
`;

const SettingItemContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 8px;
  margin: 0 -8px;
  padding-left: 8px;
  padding-right: 8px;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: rgba(0, 0, 0, 0.03);
    transform: translateX(4px);
  }

  &:active {
    transform: translateX(2px);
  }
`;

const SettingText = styled.div<{ color?: string }>`
  font-size: 1rem;
  font-weight: 500;
  color: ${({ color }) => color || theme.colors.text.main};
  transition: color 0.3s ease;
`;

const SettingValue = styled.div`
  font-size: 0.9rem;
  color: ${theme.colors.text.sub};
  opacity: 0.8;
`;

const ChevronIcon = styled(MdChevronRight)`
  color: ${theme.colors.text.sub};
  opacity: 0.6;
  transition: all 0.3s ease;

  ${SettingItemContainer}:hover & {
    opacity: 1;
    transform: translateX(2px);
  }
`;

export default memo(function SettingCard({ items }: { items: SettingItem[] }) {
  return (
    <Card>
      <SectionTitle>설정</SectionTitle>
      {items.map((item, index) => (
        <SettingItemContainer
          key={item.key}
          onClick={item.onPress}
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <SettingText color={item.color}>{item.label}</SettingText>
          <SettingValue>{item.value}</SettingValue>
          {item.showChevron && <ChevronIcon size={20} />}
        </SettingItemContainer>
      ))}
    </Card>
  );
});
