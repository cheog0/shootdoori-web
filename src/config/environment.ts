const getEnvVars = () => {
  // 웹 환경에서는 import.meta.env를 사용
  // 개발환경(Vite 프록시)과 프로덕션환경(Vercel 프록시) 모두 상대 경로 사용
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || '';
  const environment = import.meta.env.VITE_ENVIRONMENT || 'development';

  return {
    API_BASE_URL: apiBaseUrl,
    ENVIRONMENT: environment,
  };
};

export default getEnvVars();
