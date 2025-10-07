import { memo } from 'react';


import { colors } from '@/theme';


interface EmptyStateProps {
  icon: string;
  title: string;
  subtitle: string;
  description: string;
  showRetryButton?: boolean;
  onRetry?: () => void;
}

export default memo(function EmptyState({
  icon,
  title,
  subtitle,
  description,
  showRetryButton = false,
  onRetry,
}: EmptyStateProps) {
  return (
    <div style={{stateContainer}>
      <span style={{stateIcon}>{icon}</span>
      <span style={{stateTitle}>{title}</span>
      <span style={{stateSubtitle}>{subtitle}</span>
      <span style={{stateDescription}>{description}</span>
      {showRetryButton && onRetry && (
        <button
          style={[actionButton, { marginTop: 20 }]}
          onClick={onRetry}
        >
          <RefreshCw size={18} color={colors.white} />
          <span style={{actionButtonText}>다시 시도</span>
        </button>
      )}
    </div>
  );
});
