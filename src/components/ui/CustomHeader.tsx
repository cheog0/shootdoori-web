// TODO: 실제 컴포넌트 구현 필요
import React from 'react';

export const CustomHeader: React.FC<{ title: string; onBack?: () => void }> = ({
  title,
  onBack,
}) => {
  return (
    <div className="flex items-center p-4 bg-white border-b">
      {onBack && (
        <button onClick={onBack} className="mr-4">
          ←
        </button>
      )}
      <h1 className="text-lg font-semibold">{title}</h1>
    </div>
  );
};
