import { router } from 'react-router-dom';
import React from 'react';
import styled from 'styled-components';

import { useAuth } from '@/contexts/auth_context';
import { useDeleteProfileMutation } from '@/hooks/queries';

// Styled Components
const Container = styled.div`
  flex: 1;
  background-color: #f8f9fa;
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  flex: 1;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  color: #1f2937;
  margin: 0 0 16px 0;
`;

const Subtitle = styled.p`
  font-size: 16px;
  color: #6b7280;
  margin: 0 0 32px 0;
`;

const WarningSection = styled.div`
  background-color: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 24px;
`;

const WarningTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #dc2626;
  margin: 0 0 8px 0;
`;

const WarningText = styled.p`
  font-size: 14px;
  color: #dc2626;
  margin: 0;
  line-height: 1.5;
`;

const InfoSection = styled.div`
  background-color: #f0f9ff;
  border: 1px solid #bae6fd;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 24px;
`;

const InfoTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0369a1;
  margin: 0 0 8px 0;
`;

const InfoText = styled.p`
  font-size: 14px;
  color: #0369a1;
  margin: 0;
  line-height: 1.5;
`;

const ButtonContainer = styled.div`
  padding: 20px;
  background-color: white;
  border-top: 1px solid #e5e7eb;
`;

const DeleteButton = styled.button`
  width: 100%;
  background-color: #dc2626;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 16px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #b91c1c;
  }

  &:disabled {
    background-color: #9ca3af;
    cursor: not-allowed;
  }
`;

export default function DataDeletionScreen() {
  const { token, logout } = useAuth();
  const deleteProfileMutation = useDeleteProfileMutation();

  const handleSubmit = async () => {
    if (!token) {
      window.alert('로그인이 필요합니다.');
      return;
    }

    const confirmed = window.confirm(
      '정말로 계정을 탈퇴하시겠습니까?\n\n탈퇴 시 모든 데이터가 삭제되며 복구할 수 없습니다.'
    );

    if (confirmed) {
      try {
        await deleteProfileMutation.mutateAsync();
        window.alert('계정이 성공적으로 탈퇴되었습니다.');
        await logout();
        router.replace('/(auth)/login');
      } catch (error) {
        let errorMessage = '계정 탈퇴 중 오류가 발생했습니다.';

        if (error && typeof error === 'object' && 'status' in error) {
          const apiError = error as {
            status: number;
            message?: string;
            data?: any;
          };

          if (apiError.status === 404) {
            errorMessage = '사용자를 찾을 수 없습니다.';
          } else if (apiError.status === 401) {
            errorMessage = '인증이 필요합니다. 다시 로그인해주세요.';
          } else if (apiError.status === 403) {
            errorMessage = '계정 탈퇴 권한이 없습니다.';
          } else if (apiError.status === 405) {
            errorMessage =
              '계정 탈퇴 기능이 아직 구현되지 않았습니다. 관리자에게 문의해주세요.';
          } else if (apiError.status === 500) {
            errorMessage =
              '계정 탈퇴 중 데이터베이스 오류가 발생했습니다. 팀 가입 대기 목록이나 다른 연관 데이터를 먼저 정리해주세요.';
          } else if (apiError.status === 204) {
            errorMessage = '';
          } else if (apiError.message) {
            errorMessage = apiError.message;
          }
        }

        if (errorMessage) {
          window.alert(errorMessage);
        }
      }
    }
  };

  return (
    <Container>
      <Content>
        <Title>계정 탈퇴</Title>
        <Subtitle>
          계정을 탈퇴하면 모든 개인정보와 데이터가 영구적으로 삭제됩니다.
        </Subtitle>

        <WarningSection>
          <WarningTitle>⚠️ 주의사항</WarningTitle>
          <WarningText>
            • 탈퇴 시 모든 개인정보, 팀 정보, 매치 기록이 삭제됩니다{'\n'}•
            삭제된 데이터는 복구할 수 없습니다{'\n'}• 팀 가입 대기 목록이나 다른
            연관 데이터가 있으면 먼저 정리해주세요
          </WarningText>
        </WarningSection>

        <InfoSection>
          <InfoTitle>ℹ️ 안내사항</InfoTitle>
          <InfoText>
            • 계정 탈퇴 후에는 동일한 이메일로 재가입이 가능합니다{'\n'}• 탈퇴
            처리에는 최대 24시간이 소요될 수 있습니다{'\n'}• 문의사항이 있으시면
            고객지원으로 연락해주세요
          </InfoText>
        </InfoSection>
      </Content>

      <ButtonContainer>
        <DeleteButton
          onClick={handleSubmit}
          disabled={deleteProfileMutation.isPending}
        >
          {deleteProfileMutation.isPending ? '처리 중...' : '계정 탈퇴하기'}
        </DeleteButton>
      </ButtonContainer>
    </Container>
  );
}
