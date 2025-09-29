import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import styled from '@emotion/styled';
import { LoginForm } from '@/components/features/auth';
import { theme } from '@/theme';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { useErrorStore } from '@/stores/errorStore';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { errorMessage, clearError } = useErrorStore();

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
      clearError();
    }
  }, [errorMessage, clearError]);

  const handleRedirect = (replace: boolean = true) => {
    const redirect = searchParams.get('redirect');
    const from = redirect || location.state?.from || '/';
    navigate(from, { replace });
  };

  const handleLoginSuccess = () => {
    // LoginForm에서 성공 시 호출됨
    handleRedirect(true);
  };

  const handleTempLogin = () => {
    login({
      authToken: 'temp-token',
      email: 'temp@example.com',
      name: '임시사용자',
    });
    navigate('/', { replace: true });
  };

  return (
    <AppContainer>
      <MobileViewport>
        <TempLoginButton onClick={handleTempLogin}>임시 로그인</TempLoginButton>

        <LoginForm onLoginSuccess={handleLoginSuccess} />
      </MobileViewport>
    </AppContainer>
  );
}

const AppContainer = styled.div`
  height: 100vh;
  background: ${theme.colors.background.sub};
  display: flex;
  justify-content: center;
  padding: 0 ${theme.spacing.spacing4}px;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 0;
  }
`;

const MobileViewport = styled.div`
  width: 100%;
  max-width: 720px;
  height: 100vh;
  background: ${theme.colors.white};
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    max-width: 100%;
    box-shadow: none;
  }
`;

const TempLoginButton = styled.button`
  position: absolute;
  top: ${theme.spacing.spacing4}px;
  right: ${theme.spacing.spacing4}px;
  background-color: ${theme.colors.brand.main};
  border-radius: ${theme.spacing.spacing2}px;
  padding: ${theme.spacing.spacing2}px ${theme.spacing.spacing3}px;
  border: none;
  cursor: pointer;
  z-index: 1;
  color: ${theme.colors.white};
  font-size: ${theme.typography.fontSize.font2}px;
  font-weight: ${theme.typography.fontWeight.medium};

  &:hover {
    opacity: 0.8;
  }
`;
