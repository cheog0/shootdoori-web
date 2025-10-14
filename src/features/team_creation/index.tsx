import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';

import { useCreateTeamMutation } from '@/hooks/queries';
import { theme } from '@/theme';
import {
  TeamType,
  SkillLevel,
  DEFAULT_TEAM_TYPE,
  DEFAULT_SKILL_LEVEL,
} from '@/types/team';

// import { styles } from './styles';

interface TeamFormData {
  name: string;
  university: string;
  teamType: TeamType;
  skillLevel: SkillLevel;
  description: string;
}

export default function TeamCreationScreen() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<TeamFormData>({
    name: '',
    university: '',
    teamType: DEFAULT_TEAM_TYPE,
    skillLevel: DEFAULT_SKILL_LEVEL,
    description: '',
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof TeamFormData, string>>
  >({});

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof TeamFormData, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = '팀 이름을 입력해주세요';
    } else if (formData.name.length > 100) {
      newErrors.name = '팀 이름은 100자 이하로 입력해주세요';
    }

    if (!formData.university.trim()) {
      newErrors.university = '대학교를 입력해주세요';
    } else if (formData.university.length > 100) {
      newErrors.university = '대학교명은 100자 이하로 입력해주세요';
    }

    if (!formData.teamType.trim()) {
      newErrors.teamType = '팀 유형을 선택해주세요';
    }

    if (formData.description && formData.description.length > 1000) {
      newErrors.description = '팀 설명은 1000자 이하로 입력해주세요';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const createTeamMutation = useCreateTeamMutation();

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        const response = await createTeamMutation.mutateAsync(formData);

        alert('팀 생성이 완료되었습니다.');
        navigate('/');
      } catch (error) {
        console.error('팀 생성 실패:', error);
        alert('팀 생성에 실패했습니다.');
      }
    }
  };

  const updateFormData = <Key extends keyof TeamFormData>(
    field: Key,
    value: TeamFormData[Key]
  ) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 2));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div style={{ padding: '20px' }}>
            <h2>팀 기본 정보</h2>
            <p>TODO: TeamBasicInfo 컴포넌트 구현 필요</p>
            <div style={{ marginTop: '20px' }}>
              <button onClick={nextStep}>다음</button>
            </div>
          </div>
        );
      case 2:
        return (
          <div style={{ padding: '20px' }}>
            <h2>팀 상세 정보</h2>
            <p>TODO: TeamDetails 컴포넌트 구현 필요</p>
            <div style={{ marginTop: '20px' }}>
              <button onClick={prevStep}>이전</button>
              <button onClick={handleSubmit} style={{ marginLeft: '10px' }}>
                완료
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <Container>
      <Header>
        <h1>팀 생성</h1>
        <button onClick={() => navigate(-1)}>← 뒤로</button>
      </Header>

      <ProgressContainer>
        <ProgressBar>
          <ProgressFill width={`${(currentStep / 2) * 100}%`} />
        </ProgressBar>
        <ProgressText>{currentStep} / 2</ProgressText>
      </ProgressContainer>

      {renderCurrentStep()}
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

const ProgressContainer = styled.div`
  padding: 20px;
  background-color: white;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 4px;
  background-color: #eee;
  border-radius: 2px;
  overflow: hidden;
`;

const ProgressFill = styled.div<{ width: string }>`
  height: 100%;
  background-color: ${theme.colors.brand.main};
  width: ${props => props.width};
  transition: width 0.3s ease;
`;

const ProgressText = styled.div`
  text-align: center;
  margin-top: 10px;
  font-size: 14px;
  color: #666;
`;
