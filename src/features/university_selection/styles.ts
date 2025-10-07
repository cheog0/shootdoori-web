import { css } from 'styled-components';

import { theme } from '@/styles/theme';

export const styles = {
  container: css`
    flex: 1;
    background-color: ${theme.colors.default};
  `,
  headerSection: css`
    padding: ${theme.spacing.spacing6} ${theme.spacing.spacing5};
    text-align: center;
  `,
  title: css`
    font-size: ${theme.typography.fontSize['2xl']};
    font-weight: ${theme.fontWeight.bold};
    color: ${theme.colors.textMain};
    margin-bottom: ${theme.spacing.spacing2};
  `,
  subtitle: css`
    font-size: ${theme.typography.fontSize.base};
    color: ${theme.colors.textSub};
    text-align: center;
  `,
  universityList: css`
    flex: 1;
    padding: ${theme.spacing.spacing4};
  `,
  universityCard: css`
    background-color: ${theme.colors.white};
    border-radius: 12px;
    padding: ${theme.spacing.spacing4};
    margin-bottom: ${theme.spacing.spacing2};
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  `,
  universityCardSelected: css`
    background-color: ${theme.colors.brand.main};
    border: 2px solid ${theme.colors.brand.main};
  `,
  cardContent: css`
    flex-direction: row;
    align-items: center;
    flex: 1;
  `,
  universityLogo: css`
    width: 40px;
    height: 40px;
    border-radius: 20px;
    background-color: ${theme.colors.blue500};
    align-items: center;
    justify-content: center;
    margin-right: ${theme.spacing.spacing3};
  `,
  universityLogoSelected: css`
    background-color: rgba(255, 255, 255, 0.2);
  `,
  universityInfo: css`
    flex: 1;
  `,
  universityName: css`
    font-size: ${theme.typography.fontSize.base};
    font-weight: ${theme.fontWeight.medium};
    color: ${theme.colors.textMain};
  `,
  universityNameSelected: css`
    color: ${theme.colors.white};
  `,
  bottomButtonContainer: css`
    position: absolute;
    bottom: ${theme.spacing.spacing5};
    left: ${theme.spacing.spacing4};
    right: ${theme.spacing.spacing4};
    align-items: center;
    justify-content: center;
  `,
  connectButton: css`
    background-color: ${theme.colors.gray400};
    padding: ${theme.spacing.spacing3} ${theme.spacing.spacing8};
    border-radius: 12px;
    width: 100%;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.2);
  `,
  connectButtonActive: css`
    background-color: ${theme.colors.brand.main};
  `,
  connectButtonText: css`
    color: ${theme.colors.white};
    font-size: ${theme.typography.fontSize.base};
    font-weight: ${theme.fontWeight.semibold};
  `,
  connectButtonTextActive: css`
    color: ${theme.colors.white};
  `,
};
