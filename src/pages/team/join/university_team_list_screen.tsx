import { useLocalSearchParams } from 'react-router-dom';
import React, { useState, useMemo } from 'react';
import styled from 'styled-components';

import { CustomHeader } from '@/components/ui/custom_header';
import GlobalErrorFallback from '@/components/ui/global_error_fallback';
import { useTeamsByUniversityInfinite } from '@/hooks/queries';
import { useTeamJoinRequest } from '@/hooks/useTeamJoinRequest';
import { theme } from '@/theme';
import type { TeamListItem } from '@/types';
import { SkillLevel, TeamType } from '@/types/team';

import FilterModal from './components/filter_modal';
import JoinConfirmationModal from './components/join_confirmation_modal';
import TeamCard from './components/team_card';
import TeamListHeader from './components/team_list_header';

// Styled Components
const Container = styled.div`
  flex: 1;
  background-color: ${theme.colors.default};
  display: flex;
  flex-direction: column;
`;

const ContentContainer = styled.div`
  flex: 1;
  overflow-y: auto;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
`;

const LoadingText = styled.span`
  font-size: 16px;
  color: ${theme.colors.gray[600]};
`;

interface FilterOptions {
  skillLevel: SkillLevel[];
  teamType: TeamType[];
  maxMemberCount: number;
}

export default function UniversityTeamListScreen() {
  const { university } = useLocalSearchParams<{ university: string }>();
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<TeamListItem | null>(null);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    skillLevel: [],
    teamType: [],
    maxMemberCount: 50,
  });

  const { joinWaiting } = useTeamJoinRequest();

  const {
    data,
    isLoading: loading,
    error,
    fetchNextPage,
    hasNextPage,
    refetch,
  } = useTeamsByUniversityInfinite(university || '', 10);

  const filteredTeams = useMemo(() => {
    const allTeams = data?.pages.flatMap((page: unknown) => (page as { content: unknown[] }).content) ?? [];
    let filtered = [...allTeams];

    if (filterOptions.skillLevel.length > 0) {
      filtered = filtered.filter(team =>
        filterOptions.skillLevel.includes(team.skillLevel)
      );
    }

    if (filterOptions.teamType.length > 0) {
      filtered = filtered.filter(team =>
        filterOptions.teamType.includes(team.teamType)
      );
    }

    filtered = filtered.filter(
      team => team.memberCount <= filterOptions.maxMemberCount
    );

    return filtered;
  }, [data?.pages, filterOptions]);

  const openFilterModal = () => {
    setShowFilterModal(true);
  };

  const closeFilterModal = () => {
    setShowFilterModal(false);
  };

  const resetFilters = () => {
    setFilterOptions({
      skillLevel: [],
      teamType: [],
      maxMemberCount: 50,
    });
  };

  // const loadMoreTeams = () => {
  //   if (hasNextPage && !loading) {
  //     fetchNextPage();
  //   }
  // };

  const handleJoinTeam = (teamId: number) => {
    const team = filteredTeams.find(t => t.id === teamId);
    if (team) {
      setSelectedTeam(team);
      setShowJoinModal(true);
    }
  };

  const handleConfirmJoin = async () => {
    if (selectedTeam) {
      try {
        await joinWaiting({
          teamId: selectedTeam.id,
          data: {},
        });

        setShowJoinModal(false);
        setSelectedTeam(null);

        window.alert(`${selectedTeam.name}에 성공적으로 신청되었습니다!`);
        navigate('/(tabs)');
      } catch {
        window.alert('팀 가입 신청에 실패했습니다. 다시 시도해주세요.');
      }
    }
  };

  const handleCancelJoin = () => {
    setShowJoinModal(false);
    setSelectedTeam(null);
  };

  // const renderTeamItem = ({ item }: { item: TeamListItem }) => (
  //   <TeamCard team={item} onJoin={handleJoinTeam} />
  // );

  const toggleSkillLevel = (level: SkillLevel) => {
    setFilterOptions(prev => ({
      ...prev,
      skillLevel: prev.skillLevel.includes(level)
        ? prev.skillLevel.filter(l => l !== level)
        : [...prev.skillLevel, level],
    }));
  };

  const toggleTeamType = (type: TeamType) => {
    setFilterOptions(prev => ({
      ...prev,
      teamType: prev.teamType.includes(type)
        ? prev.teamType.filter(t => t !== type)
        : [...prev.teamType, type],
    }));
  };

  if (loading && !data) {
    return (
      <div style={loadingContainer}>
        <div style={{
          width: '40px',
          height: '40px',
          border: `4px solid ${theme.colors.gray[200]}`,
          borderTop: `4px solid ${theme.colors.blue[500]}`,
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }} />
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (error) {
    return <GlobalErrorFallback error={error as Error} resetError={refetch} />;
  }

  return (
    <Container>
      <CustomHeader title="팀 목록" showBackButton={true} />

      <TeamListHeader
        university={university || ''}
        onFilterPress={openFilterModal}
      />

      <ContentContainer>
        {filteredTeams.map((team) => (
          <TeamCard
            key={team.id}
            team={team}
            onJoin={handleJoinTeam}
          />
        ))}
        
        {loading && data && (
          <LoadingContainer>
            <LoadingText>더 많은 팀을 불러오는 중...</LoadingText>
          </LoadingContainer>
        )}
      </ContentContainer>

      <FilterModal
        visible={showFilterModal}
        filterOptions={filterOptions}
        onClose={closeFilterModal}
        onApply={closeFilterModal}
        onReset={resetFilters}
        onToggleSkillLevel={toggleSkillLevel}
        onToggleTeamType={toggleTeamType}
        onMemberCountChange={value =>
          setFilterOptions(prev => ({
            ...prev,
            maxMemberCount: value,
          }))
        }
      />

      {selectedTeam && (
        <JoinConfirmationModal
          visible={showJoinModal}
          teamName={selectedTeam.name}
          teamType={selectedTeam.teamType}
          teamId={selectedTeam.id}
          onConfirm={handleConfirmJoin}
          onCancel={handleCancelJoin}
        />
      )}
    </Container>
  );
}
