export * from './profile';
export * from './team';
export * from './review';
export * from './match';
export * from './auth';
export * from './home';
export type { AppExtra } from './env';

// TODO: 누락된 타입들 추가 필요
export interface MessageCardTemplate {
  id: string;
  title: string;
  content: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
}

export interface SettingItem {
  key: string;
  label: string;
  value?: string;
  color?: string;
  onPress?: () => void;
  showChevron: boolean;
}
