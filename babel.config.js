const version = process.env.npm_package_version;

module.exports = {
  presets: ['@babel/preset-react'],
  plugins: [
    [
      'transform-define',
      {
        NPM_VERSION: version,
      },
    ],
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-syntax-class-properties',
    '@babel/plugin-transform-arrow-functions',
    '@babel/plugin-proposal-class-properties',
  ],
};
