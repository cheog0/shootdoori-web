const getEnvVars = () => {
  // 웹 환경에서는 import.meta.env를 사용
  const isDevelopment = import.meta.env.DEV;
  const apiBaseUrl = isDevelopment
    ? '' // 개발 환경에서는 프록시 사용 (상대 경로)
    : import.meta.env.VITE_API_BASE_URL || 'https://app.shootdoori.com';
  const environment = import.meta.env.VITE_ENVIRONMENT || 'development';

  return {
    API_BASE_URL: apiBaseUrl,
    ENVIRONMENT: environment,
  };
};

export default getEnvVars();
