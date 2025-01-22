module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    ['module:react-native-dotenv'],
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@hooks': './src/hooks',
          '@models': './src/models',
          '@routes': './src/routes',
          '@service': './src/service',
          '@ui': './src/ui',
          '@utils': './src/utils',
        },
      },
    ],
  ],
};
