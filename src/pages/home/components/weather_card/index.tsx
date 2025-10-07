import { memo } from 'react';
import styled from 'styled-components';
import { IoMdSunny, IoMdWater, IoMdLeaf } from 'react-icons/io';

import { Card } from '@/components/card/card';
import { theme } from '@/theme';

const WeatherSection = styled.div`
  margin-bottom: ${theme.spacing.spacing4};
`;

const WeatherHeader = styled.div`
  margin-bottom: ${theme.spacing.spacing3};
`;

const WeatherSectionTitle = styled.h2`
  font-size: ${theme.typography.fontSize.font4};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.text.main};
  margin: 0;
`;

const WeatherHighlightText = styled.span`
  color: ${theme.colors.brand.main};
`;

const WeatherCard = styled.div`
  background-color: ${theme.colors.white};
  border-radius: ${theme.spacing.spacing4};
  padding: ${theme.spacing.spacing4};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const WeatherCardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${theme.spacing.spacing3};
`;

const WeatherInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.spacing3};
`;

const WeatherMain = styled.div`
  flex: 1;
`;

const WeatherDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.spacing1};
`;

const Temperature = styled.span`
  font-size: ${theme.typography.fontSize.font5};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.text.main};
`;

const WeatherDescription = styled.span`
  font-size: ${theme.typography.fontSize.font2};
  color: ${theme.colors.text.sub};
`;

const WeatherStats = styled.div`
  display: flex;
  gap: ${theme.spacing.spacing3};
`;

const WeatherStatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const WeatherStatText = styled.span`
  font-size: ${theme.typography.fontSize.font1};
  color: ${theme.colors.text.sub};
`;

const WeatherBadge = styled.div`
  padding: ${theme.spacing.spacing1} ${theme.spacing.spacing2};
  background-color: ${theme.colors.blue[50]};
  border-radius: ${theme.spacing.spacing2};
`;

const FootballBadge = styled.div`
  padding: ${theme.spacing.spacing1} ${theme.spacing.spacing2};
  background-color: ${theme.colors.green[50]};
  border-radius: ${theme.spacing.spacing2};
`;

const FootballBadgeText = styled.span`
  font-size: ${theme.typography.fontSize.font1};
  color: ${theme.colors.green[700]};
  font-weight: ${theme.typography.fontWeight.medium};
`;

export default memo(function WeatherSectionComponent() {
  return (
    <WeatherSection>
      <WeatherHeader>
        <WeatherSectionTitle>
          강원도 춘천시의 <WeatherHighlightText>축구 날씨</WeatherHighlightText>
        </WeatherSectionTitle>
      </WeatherHeader>

      <Card>
        <WeatherCard>
          <WeatherCardHeader>
            <WeatherInfo>
              <WeatherMain>
                <IoMdSunny size={32} color={theme.colors.orange[500]} />
                <WeatherDetails>
                  <Temperature>22°C</Temperature>
                  <WeatherDescription>맑음</WeatherDescription>
                </WeatherDetails>
              </WeatherMain>
              <WeatherStats>
                <WeatherStatItem>
                  <IoMdWater size={16} color={theme.colors.text.sub} />
                  <WeatherStatText>습도 65%</WeatherStatText>
                </WeatherStatItem>
                <WeatherStatItem>
                  <IoMdLeaf size={16} color={theme.colors.text.sub} />
                  <WeatherStatText>풍속 3.2m/s</WeatherStatText>
                </WeatherStatItem>
              </WeatherStats>
            </WeatherInfo>
            <WeatherBadge>
              <FootballBadge>
                <FootballBadgeText>축구하기 좋은 날</FootballBadgeText>
              </FootballBadge>
            </WeatherBadge>
          </WeatherCardHeader>
        </WeatherCard>
      </Card>
    </WeatherSection>
  );
});
