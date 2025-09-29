export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  FORGOT_PASSWORD: '/forgot-password',
  REGISTER: '/register',
  MY_PAGE: '/my',
  ORDER_PAGE: '/order/:productId',
  NOT_FOUND: '*',
  PRODUCT: '/product/:productId',
  TEAM_GUIDE: '/team-guide',
} as const;
