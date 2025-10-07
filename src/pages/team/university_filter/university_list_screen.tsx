import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import styled from 'styled-components';

import { CustomHeader } from '@/components/ui/custom_header';
import { UNIVERSITIES } from '@/constants/universities';
import { theme } from '@/styles/theme';

import ConnectButton from './components/connect_button';
import UniversityHeader from './components/university_header';
import UniversityItem from './components/university_item';

// Styled Components
const Container = styled.div`
  flex: 1;
  background-color: ${theme.colors.default};
`;

const Content = styled.div`
  flex: 1;
  padding-bottom: ${theme.spacing.spacing20};
`;

const UniversityList = styled.div`
  flex: 1;
`;

const ListContainer = styled.div`
  padding: ${theme.spacing.spacing4};
`;

const UniversityItemWrapper = styled.div<{ isSelected: boolean }>`
  margin-bottom: ${theme.spacing.spacing2};
  opacity: ${props => (props.isSelected ? 1 : 0.7)};
`;

export default function UniversityListScreen() {
  const navigate = useNavigate();
  const [selectedUniversity, setSelectedUniversity] = useState<string>('');

  const handleUniversitySelect = (university: string) => {
    setSelectedUniversity(university);
  };

  const handleConnect = () => {
    if (selectedUniversity) {
      navigate(
        `/team/join-list?university=${encodeURIComponent(selectedUniversity)}`
      );
    }
  };

  return (
    <Container>
      <CustomHeader title="" showBackButton={true} />
      <Content>
        <UniversityHeader />
        <UniversityList>
          <ListContainer>
            {UNIVERSITIES.map(university => (
              <UniversityItemWrapper
                key={university.id}
                isSelected={selectedUniversity === university.name}
              >
                <UniversityItem
                  university={university.name}
                  isSelected={selectedUniversity === university.name}
                  onSelect={handleUniversitySelect}
                />
              </UniversityItemWrapper>
            ))}
          </ListContainer>
        </UniversityList>
      </Content>
      <ConnectButton
        selectedUniversity={selectedUniversity}
        onConnect={handleConnect}
      />
    </Container>
  );
}
