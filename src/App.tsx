import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { ErrorBoundary, SuspenseFallback } from '@/components/shared/ui';
import { ROUTES } from '@/constants/routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth, AuthProvider } from '@/contexts/auth_context';

const MainPage = lazy(() => import('@/pages/MainPage.tsx'));
const LoginPage = lazy(() => import('@/pages/LoginPage.tsx'));
const RegisterPage = lazy(() => import('@/pages/RegisterPage.tsx'));
const ForgotPasswordPage = lazy(() => import('@/pages/ForgotPasswordPage.tsx'));
const ProfilePage = lazy(() => import('@/pages/ProfilePage.tsx'));
const EditProfilePage = lazy(
  () => import('@/pages/profile/edit/edit_profile_screen')
);
// const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));
// const MyPage = lazy(() => import('@/pages/MyPage'));
// const GiftOrderPage = lazy(() => import('@/pages/GiftOrderPage'));
// const ThemePage = lazy(() => import('@/pages/ThemePage'));
// const ProductDetailPage = lazy(() => import('@/pages/ProductDetailPage'));
// const TeamGuidePage = lazy(() => import('@/pages/TeamGuidePage'));

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

// Protected Route 컴포넌트 - AuthProvider 내부에서 정의
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <SuspenseFallback />;
  }

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  return <>{children}</>;
}

function AppContent() {
  const location = useLocation();

  return (
    <ErrorBoundary key={location.pathname}>
      <Suspense fallback={<SuspenseFallback />}>
        <Routes>
          <Route
            path={ROUTES.HOME}
            element={
              <ProtectedRoute>
                <MainPage />
              </ProtectedRoute>
            }
          />
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
          <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
          <Route
            path={ROUTES.FORGOT_PASSWORD}
            element={<ForgotPasswordPage />}
          />
          <Route
            path={ROUTES.PROFILE}
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.EDIT_PROFILE}
            element={
              <ProtectedRoute>
                <EditProfilePage />
              </ProtectedRoute>
            }
          />
          {/* TODO: 다른 페이지들 구현 후 활성화 */}
          {/* <Route path={ROUTES.TEAM_GUIDE} element={<TeamGuidePage />} />
          <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
          <Route path={ROUTES.MY_PAGE} element={<MyPage />} />
          <Route path={ROUTES.ORDER_PAGE} element={<ProtectedRoute><GiftOrderPage /></ProtectedRoute>} />
          <Route path={ROUTES.PRODUCT} element={<ProtectedRoute><ProductDetailPage /></ProtectedRoute>} />
          <Route path="/themes/:themeId" element={<ThemePage />} /> */}
        </Routes>
      </Suspense>
      <ToastContainer position="top-center" autoClose={2000} hideProgressBar />
    </ErrorBoundary>
  );
}

export default App;
