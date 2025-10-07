import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

import { Card } from '@/components/card/card';
import { CustomHeader } from '@/components/ui/custom_header';
import { useUserProfile, useUpdateProfileMutation } from '@/hooks/queries';
import { theme } from '@/theme';
import type { UpdateProfileRequest } from '@/types/profile';

import { ProfileForm } from './profile_form';

// 애니메이션 정의
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const gradientShift = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

// Styled Components
const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(
    135deg,
    ${theme.colors.grass[50]} 0%,
    ${theme.colors.cream[100]} 25%,
    ${theme.colors.grass[100]} 50%,
    ${theme.colors.cream[200]} 75%,
    ${theme.colors.grass[50]} 100%
  );
  background-size: 400% 400%;
  animation: ${gradientShift} 15s ease infinite;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background:
      radial-gradient(
        circle at 20% 80%,
        ${theme.colors.brand.main}15 0%,
        transparent 50%
      ),
      radial-gradient(
        circle at 80% 20%,
        ${theme.colors.grass[300]}20 0%,
        transparent 50%
      );
    pointer-events: none;
  }

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const MobileViewport = styled.div`
  width: 100%;
  max-width: 420px;
  min-height: 90vh;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  box-shadow:
    0 20px 40px rgba(0, 0, 0, 0.1),
    0 8px 16px rgba(0, 0, 0, 0.05),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.2);

  @media (max-width: 768px) {
    max-width: 100%;
    min-height: 100vh;
    border-radius: 0;
    backdrop-filter: blur(10px);
  }
`;

const ScrollContent = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  display: flex;
  flex-direction: column;
  gap: 24px;
  position: relative;
  z-index: 1;
  animation: ${fadeInUp} 0.8s ease-out;
`;

const LoadingContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
`;

const LoadingText = styled.span`
  font-size: 16px;
  color: ${theme.colors.text.sub};
`;

export default function EditProfileScreen() {
  const navigate = useNavigate();
  const { data: userInfo, refetch } = useUserProfile();
  const updateProfileMutation = useUpdateProfileMutation();

  const handleSave = async (formData: UpdateProfileRequest) => {
    try {
      const cleanData: UpdateProfileRequest = {
        name: formData.name?.trim() || '',
        skillLevel: formData.skillLevel?.trim() || '',
        position: formData.position?.trim() || '',
        bio: formData.bio?.trim() || '',
      };

      if (!cleanData.name || !cleanData.name.trim()) {
        window.alert('이름을 입력해주세요.');
        return;
      }

      await updateProfileMutation.mutateAsync(cleanData);
      window.alert('프로필이 수정되었습니다.');
      navigate(-1);
      refetch();
    } catch (error) {
      console.error('프로필 수정 실패:', error);
      window.alert('프로필 수정에 실패했습니다.');
    }
  };

  if (!userInfo) {
    return (
      <AppContainer>
        <MobileViewport>
          <LoadingContainer>
            <LoadingText>사용자 정보를 불러오는 중...</LoadingText>
          </LoadingContainer>
        </MobileViewport>
      </AppContainer>
    );
  }

  return (
    <AppContainer>
      <MobileViewport>
        <CustomHeader title="개인정보 수정" showBackButton={true} />
        <ScrollContent>
          <Card>
            <ProfileForm
              initialData={userInfo}
              onSave={handleSave}
              isLoading={updateProfileMutation.isPending}
            />
          </Card>
        </ScrollContent>
      </MobileViewport>
    </AppContainer>
  );
}
