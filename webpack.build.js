const path = require('path');
const config = require('./webpack.config');

module.exports = Object.assign({}, config, {
  mode: 'production',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, './dist'),
    publicPath: '/',
  },
  watch: false,
  devtool: false,

  optimization: {
    minimize: true,
  },
});
