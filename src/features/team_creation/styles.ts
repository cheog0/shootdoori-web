import { css } from 'styled-components';

import { theme } from '@/styles/theme';

export const styles = {
  container: css`
    flex: 1;
    background-color: ${theme.colors.default};
  `,
  inputContainer: css`
    margin-bottom: ${theme.spacing.spacing6};
  `,
  inputLabel: css`
    font-size: ${theme.typography.fontSize.base};
    font-weight: ${theme.fontWeight.medium};
    color: ${theme.colors.textMain};
    margin-bottom: ${theme.spacing.spacing2};
  `,
  textInputError: css`
    border-color: ${theme.colors.error};
  `,
  textInput: css`
    border-width: 1px;
    border-color: ${theme.colors.borderInput};
    border-radius: 8px;
    padding: ${theme.spacing.spacing3};
    font-size: ${theme.typography.fontSize.base};
    color: ${theme.colors.textMain};
    background-color: ${theme.colors.white};
  `,
  textInputFocused: css`
    border-color: ${theme.colors.brand.main};
  `,
  errorText: css`
    color: ${theme.colors.error};
    font-size: ${theme.typography.fontSize.sm};
    margin-top: ${theme.spacing.spacing1};
  `,
  buttonContainer: css`
    margin-top: ${theme.spacing.spacing8};
    padding: ${theme.spacing.spacing4};
  `,
  primaryButton: css`
    background-color: ${theme.colors.brand.main};
    padding: ${theme.spacing.spacing4};
    border-radius: 12px;
    align-items: center;
    justify-content: center;
    margin-bottom: ${theme.spacing.spacing3};
  `,
  primaryButtonDisabled: css`
    background-color: ${theme.colors.gray400};
  `,
  primaryButtonText: css`
    color: ${theme.colors.white};
    font-size: ${theme.typography.fontSize.base};
    font-weight: ${theme.fontWeight.semibold};
  `,
  secondaryButton: css`
    background-color: transparent;
    padding: ${theme.spacing.spacing4};
    border-radius: 12px;
    border-width: 1px;
    border-color: ${theme.colors.borderInput};
    align-items: center;
    justify-content: center;
  `,
  secondaryButtonText: css`
    color: ${theme.colors.textMain};
    font-size: ${theme.typography.fontSize.base};
    font-weight: ${theme.fontWeight.medium};
  `,
  stepIndicator: css`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-bottom: ${theme.spacing.spacing6};
  `,
  stepDot: css`
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background-color: ${theme.colors.gray300};
    margin-horizontal: ${theme.spacing.spacing1};
  `,
  stepDotActive: css`
    background-color: ${theme.colors.brand.main};
  `,
  stepLine: css`
    height: 1px;
    background-color: ${theme.colors.gray300};
    flex: 1;
    margin-horizontal: ${theme.spacing.spacing2};
  `,
  stepLineActive: css`
    background-color: ${theme.colors.brand.main};
  `,
};
