import styled from 'styled-components';
import { theme } from '@/theme';

export const BadgeStyles = {
  container: styled.div`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    font-weight: ${theme.typography.fontWeight.medium};
    transition: all 0.2s ease-in-out;
  `,

  // Size variants
  small: styled.div`
    padding: 4px 8px;
    font-size: ${theme.typography.fontSize.font1};
  `,

  medium: styled.div`
    padding: 6px 12px;
    font-size: ${theme.typography.fontSize.font2};
  `,

  large: styled.div`
    padding: 8px 16px;
    font-size: ${theme.typography.fontSize.font3};
  `,

  // Color variants
  primary: styled.div`
    background-color: ${theme.colors.brand.main};
    color: white;
  `,

  secondary: styled.div`
    background-color: ${theme.colors.gray[200]};
    color: ${theme.colors.gray[700]};
  `,

  success: styled.div`
    background-color: ${theme.colors.green[500]};
    color: white;
  `,

  warning: styled.div`
    background-color: ${theme.colors.yellow[500]};
    color: white;
  `,

  danger: styled.div`
    background-color: ${theme.colors.red[500]};
    color: white;
  `,

  gold: styled.div`
    background: linear-gradient(135deg, #ffd700, #ffed4e);
    color: #8b4513;
    font-weight: ${theme.typography.fontWeight.bold};
  `,

  silver: styled.div`
    background: linear-gradient(135deg, #c0c0c0, #e8e8e8);
    color: #4a4a4a;
    font-weight: ${theme.typography.fontWeight.bold};
  `,

  bronze: styled.div`
    background: linear-gradient(135deg, #cd7f32, #daa520);
    color: white;
    font-weight: ${theme.typography.fontWeight.bold};
  `,

  // Text size variants
  textSmall: styled.span`
    font-size: ${theme.typography.fontSize.font1};
  `,

  textMedium: styled.span`
    font-size: ${theme.typography.fontSize.font2};
  `,

  textLarge: styled.span`
    font-size: ${theme.typography.fontSize.font3};
  `,
};
