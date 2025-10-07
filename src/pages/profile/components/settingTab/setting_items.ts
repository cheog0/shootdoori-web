import { EXTERNAL_LINKS } from '@/constants/external_links';
import { ROUTES } from '@/constants/routes';
import { theme } from '@/theme';
import type { SettingItem } from '@/types';

export const getDefaultSettingsItems = (
  logout: () => Promise<void>,
  navigate: (path: string) => void
): SettingItem[] => {

  return [
    {
      key: 'edit-profile',
      label: '개인정보 수정',
      onPress: () => {
        navigate(ROUTES.EDIT_PROFILE);
      },
      showChevron: true,
    },

    {
      key: 'privacy-policy',
      label: '개인정보 처리방침',
      onPress: () => window.open(EXTERNAL_LINKS.PRIVACY_POLICY, '_blank'),
      showChevron: true,
    },
    {
      key: 'terms-of-service',
      label: '서비스 이용약관',
      onPress: () => window.open(EXTERNAL_LINKS.TERMS_OF_SERVICE, '_blank'),
      showChevron: true,
    },
    {
      key: 'support',
      label: '고객 지원',
      onPress: () => {
        // TODO: 네비게이션 구현
        console.log('고객 지원 페이지로 이동');
      },
      showChevron: true,
    },
    {
      key: 'data-deletion',
      label: '계정 탈퇴',
      onPress: () => {
        // TODO: 네비게이션 구현
        console.log('계정 탈퇴 페이지로 이동');
      },
      showChevron: true,
    },

    {
      key: 'app-version',
      label: '앱 버전',
      value: '1.0.0',
      showChevron: false,
    },

    {
      key: 'logout',
      label: '로그아웃',
      color: theme.colors.error,
      onPress: () => {
        if (window.confirm('정말 로그아웃하시겠습니까?')) {
          logout();
        }
      },
      showChevron: false,
    },
  ];
};
