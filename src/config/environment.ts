import type { AppExtra } from '@/types';

const getEnvVars = () => {
  // 웹 환경에서는 import.meta.env를 사용
  const apiBaseUrl =
    import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';
  const environment = import.meta.env.VITE_ENVIRONMENT || 'development';

  return {
    API_BASE_URL: apiBaseUrl,
    ENVIRONMENT: environment,
  };
};

export default getEnvVars();
