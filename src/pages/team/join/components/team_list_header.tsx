import React from 'react';

import { Settings } from 'lucide-react';

import { colors } from '@/theme';


interface TeamListHeaderProps {
  university: string;
  onFilterPress: () => void;
}

export default function TeamListHeader({
  university,
  onFilterPress,
}: TeamListHeaderProps) {
  return (
    <div style={headerSection}>
      <span style={title}>{university} 팀 목록</span>
      <span style={subtitle}>참여하고 싶은 팀을 선택하세요</span>
      <div style={filterRow}>
        <button style={filterButton} onClick={onFilterPress}>
          <Settings size={20} color={colors.white} />
        </button>
      </div>
    </div>
  );
}
