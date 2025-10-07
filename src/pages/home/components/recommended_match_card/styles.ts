import { css } from 'styled-components';

import { theme } from '@/theme';

export const styles = {
  container: css`
    background-color: ${theme.colors.background.main};
    border-radius: ${theme.spacing.spacing5};
    padding: ${theme.spacing.spacing6};
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  `,
  header: css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: ${theme.spacing.spacing4};
  `,
  title: css`
    ${theme.typography.text.card.title}
    color: ${theme.colors.text.main};
    margin: 0;
  `,
  moreButton: css`
    padding: ${theme.spacing.spacing1} ${theme.spacing.spacing2};
  `,
  moreText: css`
    color: ${theme.colors.text.sub};
    font-size: ${theme.typography.fontSize.font2};
    font-weight: ${theme.typography.fontWeight.semibold};
  `,
  card: css`
    width: 150px;
    height: 120px;
    margin-right: ${theme.spacing.spacing3};
    background-color: ${theme.colors.background.sub};
    border-radius: ${theme.spacing.spacing4};
    padding: ${theme.spacing.spacing4};
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border: 1px solid ${theme.colors.gray[200]};
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  `,
  location: css`
    font-size: ${theme.typography.fontSize.font3};
    font-weight: ${theme.typography.fontWeight.semibold};
    color: ${theme.colors.text.main};
    margin-bottom: ${theme.spacing.spacing1};
  `,
  time: css`
    font-size: ${theme.typography.fontSize.font2};
    color: ${theme.colors.text.sub};
    font-weight: ${theme.typography.fontWeight.medium};
  `,
  metaRow: css`
    display: flex;
    align-items: center;
    margin-top: ${theme.spacing.spacing2};
    gap: ${theme.spacing.spacing2};
  `,
  smallBadge: css`
    padding: 2px ${theme.spacing.spacing1};
    border-radius: ${theme.spacing.spacing1};
  `,
  smallBadgeText: css`
    font-size: ${theme.typography.fontSize.font1};
    font-weight: ${theme.typography.fontWeight.medium};
  `,
  playerCountSmall: css`
    font-size: ${theme.typography.fontSize.font2};
    color: ${theme.colors.text.sub};
    font-weight: ${theme.typography.fontWeight.medium};
  `,
  carouselContent: css`
    padding: 0 ${theme.spacing.spacing2};
    display: flex;
    overflow-x: auto;
    gap: ${theme.spacing.spacing3};
  `,
  modalContainer: css`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${theme.colors.background.sub};
    z-index: 1000;
    padding-top: ${theme.spacing.spacing5};
  `,
  modalHeader: css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: ${theme.spacing.spacing3} ${theme.spacing.spacing4};
    border-bottom: 1px solid ${theme.colors.gray[200]};
  `,
  modalTitle: css`
    ${theme.typography.text.card.title}
    font-weight: ${theme.typography.fontWeight.bold};
    color: ${theme.colors.text.main};
    margin: 0;
  `,
  modalClose: css`
    color: ${theme.colors.text.sub};
    font-size: ${theme.typography.fontSize.font3};
    font-weight: ${theme.typography.fontWeight.semibold};
  `,
  flatListContent: css`
    padding: ${theme.spacing.spacing4};
  `,
  fullItem: css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: ${theme.spacing.spacing3} ${theme.spacing.spacing2};
    background-color: ${theme.colors.background.main};
    border-radius: ${theme.spacing.spacing2};
  `,
  fullItemLeft: css`
    flex: 1;
    margin-right: ${theme.spacing.spacing3};
  `,
  fullItemRight: css`
    display: flex;
    align-items: flex-end;
  `,
  separator: css`
    height: ${theme.spacing.spacing3};
  `,
  // 빈 상태 스타일
  emptyStateContainer: css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: ${theme.spacing.spacing6} ${theme.spacing.spacing4};
    min-height: 120px;
  `,
  emptyStateContent: css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  `,
  emptyStateTitle: css`
    font-size: ${theme.typography.fontSize.font4};
    font-weight: ${theme.typography.fontWeight.semibold};
    color: ${theme.colors.brand.main};
    margin-bottom: ${theme.spacing.spacing2};
    text-align: center;
    margin: 0;
  `,
  emptyStateSubtitle: css`
    font-size: ${theme.typography.fontSize.font2};
    color: ${theme.colors.text.sub};
    text-align: center;
    line-height: 18px;
    opacity: 0.8;
    margin: 0;
  `,
  emptyStateFooter: css`
    display: flex;
    align-items: center;
    gap: ${theme.spacing.spacing1};
    margin-top: ${theme.spacing.spacing4};
  `,
  emptyStateDot: css`
    width: 4px;
    height: 4px;
    border-radius: 2px;
    background-color: ${theme.colors.gray[300]};
    opacity: 0.5;
  `,
};
