import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';

import { UNIVERSITIES } from '@/constants/universities';
import { theme } from '@/theme';

export default function UniversityListScreen() {
  const navigate = useNavigate();
  const [selectedUniversity, setSelectedUniversity] = useState<string>('');

  const handleUniversitySelect = (university: string) => {
    setSelectedUniversity(university);
  };

  const handleConnect = () => {
    if (selectedUniversity) {
      navigate(`/team/join-list?university=${selectedUniversity}`);
    }
  };

  return (
    <Container>
      <Header>
        <h1>대학교 선택</h1>
        <button onClick={() => navigate(-1)}>← 뒤로</button>
      </Header>

      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h2>대학교를 선택해주세요</h2>
      </div>

      <UniversityList>
        {UNIVERSITIES.map(university => (
          <div
            key={university.id}
            style={{
              padding: '15px',
              border:
                selectedUniversity === university.name
                  ? '2px solid #007AFF'
                  : '1px solid #eee',
              margin: '5px',
              borderRadius: '8px',
              cursor: 'pointer',
              backgroundColor:
                selectedUniversity === university.name ? '#f0f8ff' : 'white',
            }}
            onClick={() => handleUniversitySelect(university.name)}
          >
            {university.name}
          </div>
        ))}
      </UniversityList>

      <ConnectButton>
        <button
          onClick={handleConnect}
          disabled={!selectedUniversity}
          style={{
            width: '100%',
            padding: '15px',
            backgroundColor: selectedUniversity ? '#007AFF' : '#ccc',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            cursor: selectedUniversity ? 'pointer' : 'not-allowed',
          }}
        >
          연결하기
        </button>
      </ConnectButton>
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

const UniversityList = styled.div`
  padding: 20px;
  flex: 1;
`;

const ConnectButton = styled.div`
  padding: 20px;
  background-color: white;
  border-top: 1px solid #eee;
`;
