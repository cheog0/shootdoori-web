import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styled from 'styled-components';

import ActionSection from '@/components/team/sections/action_section';
import FormSection from '@/components/team/sections/form_section';
import InfoSection from '@/components/team/sections/info_section';
import { CustomHeader } from '@/components/ui/custom_header';
import GlobalErrorFallback from '@/components/ui/global_error_fallback';
import { useTeam, useUpdateTeamMutation } from '@/hooks/queries';
import { theme } from '@/styles/theme';
import {
  DEFAULT_SKILL_LEVEL,
  DEFAULT_TEAM_TYPE,
  SKILL_LEVELS,
  TEAM_TYPES,
} from '@/types/team';
import type { SkillLevel, TeamType } from '@/types/team';

// Styled Components
const Container = styled.div`
  flex: 1;
  background-color: ${theme.colors.default};
`;

const LoadingContainer = styled.div`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: ${theme.spacing.spacing4};
`;

const ErrorText = styled.p`
  text-align: center;
  color: ${theme.colors.red500};
  margin: 0;
`;

const ScrollContainer = styled.div`
  flex: 1;
`;

const LoadingSpinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid ${theme.colors.gray200};
  border-top: 4px solid ${theme.colors.brand.main};
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const LoadingText = styled.p`
  margin-top: ${theme.spacing.spacing2};
  color: ${theme.colors.textSub};
  margin: ${theme.spacing.spacing2} 0 0 0;
`;

interface TeamEditScreenProps {
  teamId: string | number;
}

export default function TeamEditScreen({ teamId }: TeamEditScreenProps) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    skillLevel: DEFAULT_SKILL_LEVEL,
    teamType: DEFAULT_TEAM_TYPE,
  });

  const numericTeamId = teamId ? Number(teamId) : 0;
  const { data: team, isLoading, error, refetch } = useTeam(numericTeamId);
  const updateTeamMutation = useUpdateTeamMutation();

  useEffect(() => {
    if (team) {
      setFormData({
        name: team.name || '',
        description: team.description || '',
        skillLevel: (SKILL_LEVELS.includes(team.skillLevel as SkillLevel)
          ? team.skillLevel
          : DEFAULT_SKILL_LEVEL) as SkillLevel,
        teamType: (TEAM_TYPES.includes(team.teamType as TeamType)
          ? team.teamType
          : DEFAULT_TEAM_TYPE) as TeamType,
      });
    }
  }, [team]);

  if (!teamId || teamId === null || teamId === undefined) {
    return (
      <Container>
        <CustomHeader title="팀 정보 수정" />
        <LoadingContainer>
          <ErrorText>유효하지 않은 팀 ID입니다.</ErrorText>
        </LoadingContainer>
      </Container>
    );
  }

  if (
    isNaN(numericTeamId) ||
    !Number.isInteger(numericTeamId) ||
    numericTeamId <= 0
  ) {
    return (
      <Container>
        <CustomHeader title="팀 정보 수정" />
        <LoadingContainer>
          <ErrorText>유효하지 않은 팀 ID입니다.</ErrorText>
        </LoadingContainer>
      </Container>
    );
  }

  if (isLoading) {
    return (
      <LoadingContainer>
        <LoadingSpinner />
        <LoadingText>로딩 중...</LoadingText>
      </LoadingContainer>
    );
  }

  if (error) {
    return <GlobalErrorFallback error={error} resetError={() => refetch()} />;
  }

  if (!team) {
    return (
      <Container>
        <LoadingText>팀 정보를 불러오는 중...</LoadingText>
      </Container>
    );
  }

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (!formData.name.trim()) {
      window.alert('팀명을 입력해주세요.');
      return;
    }

    if (!formData.description.trim()) {
      window.alert('팀 설명을 입력해주세요.');
      return;
    }

    if (!team) {
      window.alert('팀 정보를 불러올 수 없습니다.');
      return;
    }

    if (confirm('팀 정보를 수정하시겠습니까?')) {
      updateTeamMutation.mutate(
        {
          teamId: numericTeamId,
          data: {
            name: formData.name.trim(),
            description: formData.description.trim(),
            university: team.university,
            skillLevel: formData.skillLevel,
            teamType: formData.teamType,
          },
        },
        {
          onSuccess: () => {
            window.alert('팀 정보가 성공적으로 수정되었습니다.');
            navigate(-1);
          },
          onError: error => {
            console.error('팀 수정 실패:', error);
            window.alert('팀 정보 수정에 실패했습니다. 다시 시도해주세요.');
          },
        }
      );
    }
  };

  return (
    <Container>
      <CustomHeader title="팀 정보 수정" />
      <ScrollContainer>
        <div style={{ padding: theme.spacing.spacing4 }}>
          <InfoSection />
          <FormSection formData={formData} updateFormData={updateFormData} />
          <ActionSection onSave={handleSave} />
        </div>
      </ScrollContainer>
    </Container>
  );
}
