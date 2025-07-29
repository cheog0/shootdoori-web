export interface GiftTheme {
  themeId: number;
  name: string;
  image: string;
}

export interface ThemeInfo {
  themeId: number;
  name: string;
  title: string;
  description: string;
  backgroundColor: string;
}

export interface MessageCardTemplate {
  id: number;
  thumbUrl: string;
  imageUrl: string;
  defaultTextMessage: string;
}
