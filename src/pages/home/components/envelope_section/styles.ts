import { css } from 'styled-components';

import { theme } from '@/theme';

export const styles = {
  envelopeSection: css`
    background-color: ${theme.colors.background.main};
    border-radius: ${theme.spacing.spacing4};
    margin-bottom: ${theme.spacing.spacing3};
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  `,
  envelopeHeader: css`
    display: flex;
    align-items: center;
    padding: ${theme.spacing.spacing4};
    gap: ${theme.spacing.spacing3};
  `,
  envelopeIcon: css`
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  envelopeTitle: css`
    flex: 1;
    font-size: ${theme.typography.fontSize.font3};
    font-weight: ${theme.typography.fontWeight.semibold};
    color: ${theme.colors.text.main};
  `,
};
