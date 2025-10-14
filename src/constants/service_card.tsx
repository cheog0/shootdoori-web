import type { ReactNode } from 'react';

import { colors } from '@/theme';

export interface ServiceCard {
  id: string;
  title: string;
  subtitle: string;
  icon: string | ReactNode;
  backgroundColor: string;
}

export const serviceCards: ServiceCard[] = [
  {
    id: 'team',
    title: '팀 관리',
    subtitle: '팀 관리 서비스',
    icon: (
      <img
        src="/assets/images/team.png"
        alt="팀 관리"
        style={{ width: 28, height: 28 }}
      />
    ),
    backgroundColor: colors.gray[50],
  },
];
