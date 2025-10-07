import { memo } from 'react';
import styled from 'styled-components';
import { IoInformationCircle } from 'react-icons/io5';

import { theme } from '@/styles/theme';

// Styled Components
const InfoSection = styled.div`
  padding: ${theme.spacing.spacing4};
`;

const InfoCard = styled.div`
  background-color: ${theme.colors.blue50};
  border: 1px solid ${theme.colors.blue200};
  border-radius: 12px;
  padding: ${theme.spacing.spacing4};
  display: flex;
  align-items: flex-start;
`;

const InfoIcon = styled.div`
  color: ${theme.colors.blue500};
  margin-right: ${theme.spacing.spacing3};
  margin-top: ${theme.spacing.spacing1};
`;

const InfoContent = styled.div`
  flex: 1;
`;

const InfoTitle = styled.h3`
  font-size: ${theme.typography.fontSize.base};
  font-weight: ${theme.fontWeight.semibold};
  color: ${theme.colors.textMain};
  margin: 0 0 ${theme.spacing.spacing2} 0;
`;

const InfoText = styled.p`
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.textSub};
  line-height: 1.4;
  margin: 0;
`;

export default memo(function MemberInfoCard() {
  return (
    <InfoSection>
      <InfoCard>
        <InfoIcon>
          <IoInformationCircle size={24} />
        </InfoIcon>
        <InfoContent>
          <InfoTitle>팀원 관리 안내</InfoTitle>
          <InfoText>
            팀원의 역할을 변경하거나 강퇴할 수 있습니다. 변경사항은 즉시
            적용되며, 해당 팀원에게 알림이 전송됩니다.
          </InfoText>
        </InfoContent>
      </InfoCard>
    </InfoSection>
  );
});
