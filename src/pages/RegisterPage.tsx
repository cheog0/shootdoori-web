import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import RegisterScreen from './auth/register/register_screen';
import { useAuth } from '@/contexts/auth_context';

export default function RegisterPage() {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, isLoading, navigate]);

  // 로딩 중이거나 이미 로그인된 경우 아무것도 렌더링하지 않음
  if (isLoading || isAuthenticated) {
    return null;
  }

  return <RegisterScreen />;
}
