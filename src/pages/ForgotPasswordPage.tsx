import { useNavigate } from 'react-router-dom';
import ForgotPasswordScreen from './auth/login/forgot_password_screen';

export default function ForgotPasswordPage() {
  const navigate = useNavigate();

  const handleBackToLogin = () => {
    navigate('/login');
  };

  return <ForgotPasswordScreen onBackToLogin={handleBackToLogin} />;
}
