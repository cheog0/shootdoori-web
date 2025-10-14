import React, { useMemo } from 'react';

import type { TeamListItem } from './types';

interface TeamCardProps {
  team: TeamListItem;
  onJoin: (teamId: number) => void;
}

interface TeamInfoItem {
  label: string;
  value: string;
}

export default function TeamCard({ team, onJoin }: TeamCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
    });
  };

  const teamInfoItems: TeamInfoItem[] = useMemo(
    () => [
      { label: '실력', value: team.skillLevel },
      { label: '멤버', value: `${team.memberCount}명` },
      { label: '생성일', value: formatDate(team.createdAt) },
    ],
    [team.skillLevel, team.memberCount, team.createdAt]
  );

  return (
    <button style={teamCard} onClick={() => onJoin(team.id)}>
      <div style={teamHeader}>
        <div style={teamTitleSection}>
          <span style={teamName}>{team.name}</span>
          <span style={universityName}>{team.university}</span>
        </div>
        <div style={teamTypeBadge}>
          <span style={teamTypeText}>{team.teamType}</span>
        </div>
      </div>

      <span style={teamDescription}>{team.description}</span>

      <div style={teamInfo}>
        {teamInfoItems.map((item, index) => (
          <div key={index} style={infoItem}>
            <span style={infoLabel}>{item.label}</span>
            <span style={infoValue}>{item.value}</span>
          </div>
        ))}
      </div>

      <div style={joinButton}>
        <span style={joinButtonText}>신청하기</span>
      </div>
    </button>
  );
}
