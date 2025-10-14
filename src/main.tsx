import { createRoot } from 'react-dom/client';
import { ThemeProvider } from '@emotion/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { theme } from './styles/theme';
import App from './App';
import './styles/reset.css';
import './index.css';
import { AuthProvider } from './contexts/AuthContext';
import { queryClient } from './lib/query_client';

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);
