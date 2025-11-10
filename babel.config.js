module.exports = function (api) {
  api.cache(true);

  const plugins = [];

  // 웹이 아닌 경우에만 worklets 플러그인 추가
  // 웹 빌드 시에는 이 플러그인이 번들링 에러를 일으킬 수 있음
  const isWeb =
    process.env.EXPO_PLATFORM === 'web' ||
    process.env.WEB_BUILD === 'true' ||
    (process.env.NODE_ENV === 'development' &&
      typeof process !== 'undefined' &&
      process.argv?.includes('--web'));

  if (!isWeb) {
    plugins.push('react-native-worklets/plugin');
  }

  return {
    presets: ['babel-preset-expo'],
    plugins: plugins,
  };
};
