import { memo } from 'react';
import styled from 'styled-components';

// Styled Components
const TabContainer = styled.div`
  display: flex;
  background-color: #f8f9fa;
  border-radius: 12px;
  padding: 4px;
  margin-bottom: 20px;
`;

const Tab = styled.button<{ active: boolean }>`
  flex: 1;
  padding: 12px 16px;
  border-radius: 8px;
  border: none;
  background-color: ${props => (props.active ? 'white' : 'transparent')};
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: ${props =>
    props.active ? '0 2px 4px rgba(0, 0, 0, 0.1)' : 'none'};

  &:hover {
    background-color: ${props =>
      props.active ? 'white' : 'rgba(255, 255, 255, 0.5)'};
  }
`;

const TabText = styled.span<{ active: boolean }>`
  font-size: 14px;
  font-weight: ${props => (props.active ? '600' : '500')};
  color: ${props => (props.active ? '#1f2937' : '#6b7280')};
  text-align: center;
`;

type Tab = 'reputation' | 'settings';

export default memo(function TabBar({
  active,
  onChange,
}: {
  active: Tab;
  onChange: (t: Tab) => void;
}) {
  return (
    <TabContainer>
      <Tab
        active={active === 'reputation'}
        onClick={() => onChange('reputation')}
      >
        <TabText active={active === 'reputation'}>평판 정보</TabText>
      </Tab>
      <Tab active={active === 'settings'} onClick={() => onChange('settings')}>
        <TabText active={active === 'settings'}>설정</TabText>
      </Tab>
    </TabContainer>
  );
});
