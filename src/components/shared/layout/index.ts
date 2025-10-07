import React from 'react';

// TODO: 실제 컴포넌트들 구현 필요
export { Card } from '../../ui/Card';
export { CustomHeader } from '../../ui/CustomHeader';

// TODO: NavigationHeader 컴포넌트 구현 필요
export const NavigationHeader: React.FC<{ title: string }> = ({ title }) => {
  return React.createElement(
    'div',
    { className: 'flex items-center p-4 bg-white border-b' },
    React.createElement('h1', { className: 'text-lg font-semibold' }, title)
  );
};
