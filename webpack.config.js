const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, './public'),
    publicPath: '/',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.scss', '.css'],
  },
  devtool: 'inline-source-map',
  watch: true,

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    // new HtmlWebPackPlugin({
    //   title: '数据展示',
    // }),
  ],
  watchOptions: {
    ignored: /node_modules/,
  },
  devServer: {
    contentBase: './public',
    port: 8800,
    open: true,
    historyApiFallback: true,
    hot: true,
    disableHostCheck: true,
  },
};
