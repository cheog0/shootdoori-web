import React, { useState, useEffect } from 'react';


import { getVenues } from '@/api/venue';
import { theme } from '@/theme';
import { MatchWaitingResponseDto } from '@/types/match';


type MatchCardProps = {
  match: MatchWaitingResponseDto;
  onPressRequest?: () => void;
  disabled?: boolean;
  showStatus?: boolean;
  isCancellable?: boolean;
};

export default function MatchCard({
  match,
  onPressRequest,
  disabled,
  showStatus = false,
  isCancellable = false,
}: MatchCardProps) {
  const [venueMap, setVenueMap] = useState<Record<number, string>>({});

  useEffect(() => {
    const loadVenues = async () => {
      try {
        const venuesData = await getVenues();
        const map: Record<number, string> = {};
        venuesData.forEach(venue => {
          map[venue.venueId] = venue.venueName;
        });
        setVenueMap(map);
      } catch (error) {
        console.error('Failed to load venues:', error);
      }
    };
    loadVenues();
  }, []);

  const formatTime = (timeStart: string, timeEnd: string) =>
    `${timeStart.slice(0, 5)} ~ ${timeEnd.slice(0, 5)}`;

  const getVenueName = (venueId: number) =>
    venueMap[venueId] || `경기장 #${venueId}`;

  const getTeamName = (teamName: string | { name: string } | undefined) => {
    if (!teamName) return '미정';
    if (typeof teamName === 'object') return teamName.name;
    return teamName;
  };

  const getSkillLevelColor = (level: string) => {
    const colorMap = {
      AMATEUR: theme.colors.green[500],
      SEMI_PRO: theme.colors.yellow[500],
      PRO: theme.colors.red[500],
    } as const;
    return colorMap[level as keyof typeof colorMap] || theme.colors.green[500];
  };

  const getSkillLevelLabel = (level: string) => {
    switch (level) {
      case 'AMATEUR':
        return '아마추어';
      case 'SEMI_PRO':
        return '세미프로';
      case 'PRO':
        return '프로';
      default:
        return '아마추어';
    }
  };

  const getStatusStyle = (status?: string) => {
    switch (status?.toUpperCase()) {
      case 'MATCHED':
        return {
          bg: theme.colors.green[50],
          border: theme.colors.green[200],
          color: theme.colors.green[700],
          label: '매치 성사',
        };
      case 'WAITING':
        return {
          bg: theme.colors.yellow[50],
          border: theme.colors.yellow[200],
          color: theme.colors.yellow[700],
          label: '대기 중',
        };
      case 'CANCELED':
        return {
          bg: theme.colors.red[50],
          border: theme.colors.red[200],
          color: theme.colors.red[700],
          label: '취소됨',
        };
      default:
        return {
          bg: theme.colors.gray[50],
          border: theme.colors.gray[200],
          color: theme.colors.gray[600],
          label: '',
        };
    }
  };

  const status = getStatusStyle(match?.status);

  return (
    <div style={matchCard}>
      <div style={matchCardHeader}>
        <div style={{ flexDirection: 'row', alignItems: 'center' }}>
          <span style={matchCardTitle}>
            {getTeamName(match?.teamName)}
          </span>

          {match?.universityOnly && (
            <div style={{...matchBadge, marginLeft: 6}}>
              <span style={matchBadgeText}>대학만</span>
            </div>
          )}

          {showStatus && status.label && (
            <div
              style={[
                styles.statusBadge,
                {
                  backgroundColor: status.bg,
                  borderColor: status.border,
                },
              ]}
            >
              <span style={[statusBadgeText, { color: status.color }]}>
                {status.label}
              </span>
            </div>
          )}
        </div>
      </div>

      <div style={matchContent}>
        <div style={infoGrid}>
          <div style={infoRowContainer}>
            <div style={infoItemHalf}>
              <span style={infoLabel}>날짜</span>
              <span style={infoValue}>{match?.preferredDate}</span>
            </div>
            <div style={{...infoItemHalf, ...styles.infoItemHalfLast}}>
              <span style={infoLabel}>시간</span>
              <span style={infoValue}>
                {formatTime(
                  match?.preferredTimeStart || '00:00',
                  match?.preferredTimeEnd || '00:00'
                )}
              </span>
            </div>
          </div>

          <div style={infoRowContainer}>
            <div style={infoItemHalf}>
              <span style={infoLabel}>경기장</span>
              <span style={infoValue}>
                {getVenueName(match?.preferredVenueId)}
              </span>
            </div>
            <div style={[infoItemHalf, styles.infoItemHalfLast]}>
              <span style={infoLabel}>실력</span>
              <div style={skillLevelContainer}>
                <div
                  style={[
                    styles.skillLevelBadge,
                    {
                      backgroundColor: getSkillLevelColor(
                        match?.skillLevelMin || 'AMATEUR'
                      ),
                    },
                  ]}
                >
                  <span style={skillLevelText}>
                    {getSkillLevelLabel(match?.skillLevelMin || 'AMATEUR')}
                  </span>
                </div>
                <span style={skillLevelRange}>~</span>
                <div
                  style={[
                    styles.skillLevelBadge,
                    {
                      backgroundColor: getSkillLevelColor(
                        match?.skillLevelMax || 'PRO'
                      ),
                    },
                  ]}
                >
                  <span style={skillLevelText}>
                    {getSkillLevelLabel(match?.skillLevelMax || 'PRO')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {match?.message && (
          <div style={matchMessage}>
            <span style={matchMessageLabel}>메시지</span>
            <span style={matchMessageText}>
              &quot;{match.message}&quot;
            </span>
          </div>
        )}
      </div>

      <div style={matchFooter}>
        {!['CANCELED'].includes(match?.status?.toUpperCase?.() || '') && (
          <button
            onClick={onPressRequest}
            disabled={disabled}
            style={[
              styles.requestButton,
              disabled && styles.requestButtonDisabled,
              isCancellable && { backgroundColor: theme.colors.red[600] }, // ✅ 빨간색 적용
            ]}
          >
            <span style={requestButtonText}>
              {disabled
                ? '요청 중...'
                : isCancellable
                  ? '취소하기'
                  : '신청하기'}
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
