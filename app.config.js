import 'dotenv/config';

export default {
  expo: {
    name: '슛두리',
    slug: 'shoot-doori',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/images/logo_without_background.png',
    userInterfaceStyle: 'light',
    newArchEnabled: true,
    scheme: 'shoot-doori-fe',
    splash: {
      image: './assets/images/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.cheogo.shootdoori',
      infoPlist: {
        ITSAppUsesNonExemptEncryption: false,
      },
    },
    android: {
      package: 'com.cheogo.shootdoori',
      adaptiveIcon: {
        foregroundImage: './assets/images/icon_logo.png',
        backgroundColor: '#ffffff',
      },
      edgeToEdgeEnabled: true,
    },
    web: {
      bundler: 'metro',
      favicon: './assets/images/logo_without_background.png',
      name: '슛두리',
      shortName: '슛두리',
      lang: 'ko',
      scope: '/',
      themeColor: '#2D5016',
      backgroundColor: '#ffffff',
      display: 'standalone',
      orientation: 'portrait',
      startUrl: '/',
      description: '대학생 축구 커뮤니티 슛두리',
      icons: [
        {
          src: './assets/images/logo_without_background.png',
          sizes: [96, 128, 192, 256, 384, 512],
          type: 'image/png',
          purpose: 'any maskable',
        },
      ],
    },
    plugins: ['expo-router', 'expo-font'],
    extra: {
      apiBaseUrl:
        process.env.EXPO_PUBLIC_API_BASE_URL || 'http://localhost:3000',
      environment: process.env.EXPO_PUBLIC_ENVIRONMENT || 'development',
      eas: {
        projectId: 'a6d64e9a-649c-4664-a566-e4b74376b7ea',
      },
    },
  },
};
