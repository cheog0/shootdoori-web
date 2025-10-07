import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import LoginScreen from './auth/login/login_screen';
import { useAuth } from '@/contexts/auth_context';

export default function LoginPage() {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useAuth();

  console.log('📄 LoginPage 렌더링:', { isAuthenticated, isLoading });

  useEffect(() => {
    console.log('🔄 LoginPage useEffect 실행:', { isAuthenticated, isLoading });
    if (!isLoading && isAuthenticated) {
      console.log('🏠 홈으로 이동합니다!');
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, isLoading, navigate]);

  const handleSwitchToRegister = () => {
    navigate('/register');
  };

  // 로딩 중이거나 이미 로그인된 경우 아무것도 렌더링하지 않음
  if (isLoading || isAuthenticated) {
    return null;
  }

  return <LoginScreen onSwitchToRegister={handleSwitchToRegister} />;
}
