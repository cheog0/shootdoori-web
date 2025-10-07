import { css } from 'styled-components';

import { theme } from '@/styles/theme';

export const styles = {
  container: css`
    flex: 1;
    background-color: ${theme.colors.default};
  `,
  header: css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 16px 20px;
    border-bottom: 1px solid ${theme.colors.gray200};
  `,
  title: css`
    font-size: 18px;
    font-weight: 600;
    color: ${theme.colors.textMain};
  `,
  closeButton: css`
    padding: 4px;
  `,
  listContainer: css`
    padding: 16px;
  `,
  joinWaitingItem: css`
    background-color: ${theme.colors.white};
    border-radius: 12px;
    padding: 12px;
    margin-bottom: 12px;
    border: 1px solid ${theme.colors.blue200};
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
    width: 100%;
  `,
  itemHeader: css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 6px;
  `,
  teamNameText: css`
    font-size: 20px;
    font-weight: 600;
    color: ${theme.colors.blue600};
    flex: 1;
    margin-right: 12px;
  `,
  teamDetails: css`
    margin-bottom: 8px;
    padding: 6px 0;
    border-top: 2px solid ${theme.colors.blue200};
    padding-top: 8px;
  `,
  detailRow: css`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 4px;
  `,
  detailText: css`
    font-size: 16px;
    color: ${theme.colors.textSub};
    margin-left: 8px;
  `,
  statusBadge: css`
    padding: 4px 12px;
    border-radius: 16px;
  `,
  statusText: css`
    font-size: 12px;
    font-weight: 500;
    color: ${theme.colors.textMain};
  `,
  viewTeamButton: css`
    background-color: ${theme.colors.blue500};
    padding: 12px 20px;
    border-radius: 12px;
    min-width: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  viewTeamButtonText: css`
    color: ${theme.colors.white};
    font-size: 14px;
    font-weight: 500;
  `,
  buttonContainer: css`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    margin-top: 8px;
    width: 100%;
  `,
  cancelButton: css`
    background-color: ${theme.colors.red500};
    padding: 12px 20px;
    border-radius: 12px;
    min-width: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  cancelButtonText: css`
    color: ${theme.colors.white};
    font-size: 14px;
    font-weight: 500;
  `,
  loadingContainer: css`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
  `,
  loadingText: css`
    margin-top: 12px;
    font-size: 16px;
    color: ${theme.colors.textSub};
  `,
  errorContainer: css`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
  `,
  errorText: css`
    margin-top: 12px;
    font-size: 16px;
    color: ${theme.colors.textSub};
    text-align: center;
  `,
  retryButton: css`
    margin-top: 16px;
    background-color: ${theme.colors.blue500};
    padding: 10px 20px;
    border-radius: 8px;
  `,
  retryButtonText: css`
    color: ${theme.colors.white};
    font-size: 14px;
    font-weight: 500;
  `,
  emptyContainer: css`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
  `,
  emptyText: css`
    margin-top: 12px;
    font-size: 16px;
    font-weight: 500;
    color: ${theme.colors.textMain};
  `,
  emptySubtext: css`
    margin-top: 8px;
    font-size: 14px;
    color: ${theme.colors.textSub};
    text-align: center;
  `,
  footerLoader: css`
    padding: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  modalContainer: css`
    flex: 1;
    background-color: ${theme.colors.default};
  `,
  modalHeader: css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 16px 20px;
    border-bottom: 1px solid ${theme.colors.gray200};
    background-color: ${theme.colors.white};
  `,
  headerContent: css`
    display: flex;
    flex-direction: row;
    align-items: center;
    flex: 1;
  `,
  iconContainer: css`
    width: 40px;
    height: 40px;
    border-radius: 20px;
    background-color: ${theme.colors.yellow00};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 12px;
  `,
  modalTitle: css`
    font-size: 18px;
    font-weight: 600;
    color: ${theme.colors.textMain};
  `,
  modalContent: css`
    flex: 1;
    padding: 20px;
  `,
  warningSection: css`
    background-color: ${theme.colors.yellow00};
    border-radius: 12px;
    padding: 16px;
    margin-bottom: 20px;
    border-left: 4px solid ${theme.colors.yellow500};
  `,
  warningText: css`
    font-size: 14px;
    color: ${theme.colors.yellow700};
    line-height: 20px;
  `,
  teamInfoCard: css`
    background-color: ${theme.colors.white};
    border-radius: 16px;
    padding: 20px;
    margin-bottom: 24px;
    border: 1px solid ${theme.colors.gray200};
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  `,
  teamInfoHeader: css`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 12px;
  `,
  teamInfoTitle: css`
    font-size: 16px;
    font-weight: 600;
    color: ${theme.colors.textMain};
    margin-left: 8px;
  `,
  teamInfoContent: css`
    background-color: ${theme.colors.blue00};
    border-radius: 12px;
    padding: 16px;
  `,
  teamIdLabel: css`
    font-size: 12px;
    color: ${theme.colors.blue600};
    margin-bottom: 4px;
    font-weight: 500;
  `,
  teamIdValue: css`
    font-size: 18px;
    font-weight: 700;
    color: ${theme.colors.blue700};
  `,
  reasonSection: css`
    margin-bottom: 20px;
  `,
  reasonHeader: css`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 8px;
  `,
  reasonLabel: css`
    font-size: 16px;
    font-weight: 600;
    color: ${theme.colors.textMain};
    margin-left: 8px;
  `,
  reasonSubtext: css`
    font-size: 14px;
    color: ${theme.colors.textSub};
    margin-bottom: 16px;
    line-height: 20px;
  `,
  inputContainer: css`
    background-color: ${theme.colors.white};
    border-radius: 16px;
    border: 1px solid ${theme.colors.gray200};
    overflow: hidden;
  `,
  reasonInput: css`
    padding: 16px;
    font-size: 16px;
    color: ${theme.colors.textMain};
    min-height: 120px;
    resize: vertical;
  `,
  inputFooter: css`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    padding: 0 16px 12px;
    border-top: 1px solid ${theme.colors.gray100};
  `,
  characterCount: css`
    font-size: 12px;
    color: ${theme.colors.textDisabled};
  `,
  modalButtonContainer: css`
    display: flex;
    flex-direction: row;
    gap: 12px;
    padding: 16px 20px 20px;
    background-color: ${theme.colors.white};
    border-top: 1px solid ${theme.colors.gray200};
  `,
  button: css`
    flex: 1;
    padding: 16px 0;
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    gap: 8px;
  `,
  modalCancelButton: css`
    background-color: ${theme.colors.gray100};
    border: 1px solid ${theme.colors.gray300};
  `,
  modalCancelButtonText: css`
    font-size: 16px;
    font-weight: 600;
    color: ${theme.colors.textSub};
  `,
  confirmButton: css`
    background-color: ${theme.colors.red500};
    box-shadow: 0 4px 8px rgba(239, 68, 68, 0.3);
  `,
  confirmButtonText: css`
    font-size: 16px;
    font-weight: 600;
    color: ${theme.colors.white};
  `,
};
