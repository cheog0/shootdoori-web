import { memo } from 'react';
import { RefreshCw } from 'lucide-react';

import { colors } from '@/theme';

interface EmptyStateProps {
  icon: string;
  title: string;
  subtitle: string;
  description: string;
  showRetryButton?: boolean;
  onRetry?: () => void;
}

const stateContainer = {
  display: 'flex',
  flexDirection: 'column' as const,
  alignItems: 'center',
  justifyContent: 'center',
  padding: '40px 20px',
  textAlign: 'center' as const,
};

const stateIcon = {
  fontSize: '48px',
  marginBottom: '16px',
};

const stateTitle = {
  fontSize: '20px',
  fontWeight: 'bold',
  color: colors.text.main,
  marginBottom: '8px',
};

const stateSubtitle = {
  fontSize: '16px',
  color: colors.text.sub,
  marginBottom: '12px',
};

const stateDescription = {
  fontSize: '14px',
  color: colors.text.sub,
  lineHeight: '1.5',
  maxWidth: '300px',
};

const actionButton = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  padding: '12px 24px',
  backgroundColor: colors.brand.main,
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  fontSize: '14px',
  fontWeight: '500',
};

const actionButtonText = {
  fontSize: '14px',
  fontWeight: '500',
};

export default memo(function EmptyState({
  icon,
  title,
  subtitle,
  description,
  showRetryButton = false,
  onRetry,
}: EmptyStateProps) {
  return (
    <div style={stateContainer}>
      <span style={stateIcon}>{icon}</span>
      <span style={stateTitle}>{title}</span>
      <span style={stateSubtitle}>{subtitle}</span>
      <span style={stateDescription}>{description}</span>
      {showRetryButton && onRetry && (
        <button
          style={{...actionButton, marginTop: 20}}
          onClick={onRetry}
        >
          <RefreshCw size={18} color={colors.white} />
          <span style={actionButtonText}>다시 시도</span>
        </button>
      )}
    </div>
  );
});
