// import { useLocalSearchParams, router } from 'react-router-dom';
import React, { useState, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
// import {
//   View,
//   FlatList,
//   StatusBar,
//   Animated,
//   ActivityIndicator,
//   Alert,
//   Text,
// } from 'react-native-web';
import styled from '@emotion/styled';

// import FilterModal from '@/components/team/filters/filter_modal';
// import JoinConfirmationModal from '@/components/team/filters/join_confirmation_modal';
// import TeamCard from '@/components/team/filters/team_card';
// import TeamListHeader from '@/components/team/filters/team_list_header';
// import { CustomHeader } from '@/components/ui/custom_header';
// import GlobalErrorFallback from '@/components/ui/global_error_fallback';
// import { useTeamsByUniversityInfinite } from '@/hooks/queries';
import { theme } from '@/theme';
import type { TeamListItem } from '@/types';
import { SkillLevel, TeamType } from '@/types/team';

// import { styles } from './styles';

interface FilterOptions {
  skillLevel: SkillLevel[];
  teamType: TeamType[];
  maxMemberCount: number;
}

export default function UniversityTeamListScreen() {
  const [searchParams] = useSearchParams();
  const university = searchParams.get('university') || '';
  const navigate = useNavigate();
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<TeamListItem | null>(null);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    skillLevel: [],
    teamType: [],
    maxMemberCount: 50,
  });

  // TODO: 실제 데이터 fetching 로직 구현
  const data = null;
  const loading = false;
  const error = null;
  const fetchNextPage = () => {};
  const hasNextPage = false;
  const refetch = () => {};

  const filteredTeams = useMemo(() => {
    // TODO: 실제 데이터 필터링 로직 구현
    return [];
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

  const loadMoreTeams = () => {
    if (hasNextPage && !loading) {
      fetchNextPage();
    }
  };

  const handleJoinTeam = (teamId: number) => {
    const team = filteredTeams.find(t => t.id === teamId);
    if (team) {
      setSelectedTeam(team);
      setShowJoinModal(true);
    }
  };

  const handleConfirmJoin = async () => {
    if (selectedTeam) {
      setShowJoinModal(false);
      setSelectedTeam(null);
      window.alert(`${selectedTeam.name}에 성공적으로 신청되었습니다!`);
      navigate('/');
    }
  };

  const handleCancelJoin = () => {
    setShowJoinModal(false);
    setSelectedTeam(null);
  };

  const renderTeamItem = ({ item }: { item: TeamListItem }) => (
    <TeamCard team={item} onJoin={handleJoinTeam} />
  );

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
      <Container>
        <div style={{ textAlign: 'center', padding: '50px' }}>로딩 중...</div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <h2>에러가 발생했습니다</h2>
          <button onClick={refetch}>다시 시도</button>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <h1>팀 목록</h1>
        <button onClick={() => navigate(-1)}>← 뒤로</button>
      </Header>

      <TeamListHeader>
        <h2>{university} 팀 목록</h2>
        <button onClick={openFilterModal}>필터</button>
      </TeamListHeader>

      <TeamList>
        {filteredTeams.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '50px' }}>
            팀이 없습니다.
          </div>
        ) : (
          filteredTeams.map(team => (
            <div
              key={team.id}
              style={{
                padding: '10px',
                border: '1px solid #eee',
                margin: '5px',
              }}
            >
              <h3>{team.name}</h3>
              <p>{team.description}</p>
              <button onClick={() => handleJoinTeam(team.id)}>가입 신청</button>
            </div>
          ))
        )}
      </TeamList>

      {showFilterModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              background: 'white',
              padding: '20px',
              borderRadius: '8px',
            }}
          >
            <h3>필터</h3>
            <button onClick={closeFilterModal}>닫기</button>
          </div>
        </div>
      )}

      {selectedTeam && showJoinModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              background: 'white',
              padding: '20px',
              borderRadius: '8px',
            }}
          >
            <h3>{selectedTeam.name}에 가입하시겠습니까?</h3>
            <button onClick={handleConfirmJoin}>확인</button>
            <button onClick={handleCancelJoin}>취소</button>
          </div>
        </div>
      )}
    </Container>
  );
}

const Container = styled.div`
  min-height: 100vh;
  background-color: ${theme.colors.background.main};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: white;
  border-bottom: 1px solid #eee;
`;

const TeamListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: white;
`;

const TeamList = styled.div`
  padding: 20px;
`;
