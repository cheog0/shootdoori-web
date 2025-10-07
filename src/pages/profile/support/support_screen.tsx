import styled from 'styled-components';

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
  margin: 0 0 8px 0;
`;

const Subtitle = styled.p`
  font-size: 16px;
  color: #6b7280;
  margin: 0 0 32px 0;
`;

const Section = styled.div`
  margin-bottom: 32px;
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: #374151;
  margin: 0 0 16px 0;
`;

const ContactItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid #e5e7eb;
`;

const ContactLabel = styled.span`
  font-size: 16px;
  color: #374151;
`;

const ContactButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
`;

const ContactValue = styled.span`
  font-size: 16px;
  color: #3b82f6;
  text-decoration: underline;
`;

const InfoText = styled.p`
  font-size: 14px;
  color: #6b7280;
  line-height: 1.5;
  margin: 0;
`;

export default function SupportScreen() {
  const handleEmailPress = () => {
    const email = 'clf0914@naver.com';
    const subject = '슛두리 고객 지원 문의';
    const body = '문의 내용을 입력해주세요:\n\n';

    const url = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    try {
      window.open(url, '_blank');
    } catch {
      window.alert('이메일을 보낼 수 없습니다.');
    }
  };

  return (
    <Container>
      <Content>
        <Title>고객 지원</Title>
        <Subtitle>궁금한 점이 있으시면 언제든지 문의해주세요.</Subtitle>

        <Section>
          <SectionTitle>연락처 정보</SectionTitle>

          <ContactItem>
            <ContactLabel>이메일</ContactLabel>
            <ContactButton onClick={handleEmailPress}>
              <ContactValue>clf0914@naver.com</ContactValue>
            </ContactButton>
          </ContactItem>
        </Section>

        <Section>
          <SectionTitle>자주 묻는 질문</SectionTitle>

          <div style={{ marginBottom: '16px' }}>
            <h3
              style={{
                fontSize: '16px',
                fontWeight: '600',
                color: '#374151',
                margin: '0 0 8px 0',
              }}
            >
              Q. 회원가입은 어떻게 하나요?
            </h3>
            <InfoText>
              앱에서 이메일과 비밀번호를 입력하여 간단히 회원가입할 수 있습니다.
            </InfoText>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <h3
              style={{
                fontSize: '16px',
                fontWeight: '600',
                color: '#374151',
                margin: '0 0 8px 0',
              }}
            >
              Q. 팀에 가입하려면 어떻게 해야 하나요?
            </h3>
            <InfoText>
              팀 가입 페이지에서 원하는 팀을 찾아 가입 신청을 하시면 됩니다.
            </InfoText>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <h3
              style={{
                fontSize: '16px',
                fontWeight: '600',
                color: '#374151',
                margin: '0 0 8px 0',
              }}
            >
              Q. 매치에 참여하려면 어떻게 해야 하나요?
            </h3>
            <InfoText>
              매치 목록에서 원하는 매치를 선택하고 참여 신청을 하시면 됩니다.
            </InfoText>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <h3
              style={{
                fontSize: '16px',
                fontWeight: '600',
                color: '#374151',
                margin: '0 0 8px 0',
              }}
            >
              Q. 계정을 삭제하려면 어떻게 해야 하나요?
            </h3>
            <InfoText>
              설정 &gt; 데이터 삭제 요청에서 계정 삭제를 신청할 수 있습니다.
            </InfoText>
          </div>
        </Section>

        <Section>
          <SectionTitle>운영 시간</SectionTitle>
          <InfoText>
            평일: 09:00 - 18:00{'\n'}
            주말 및 공휴일: 휴무
          </InfoText>
          <InfoText style={{ marginTop: '8px' }}>
            * 이메일 문의는 24시간 접수 가능하며, 평일 운영 시간 내에
            답변드립니다.
          </InfoText>
        </Section>
      </Content>
    </Container>
  );
}
