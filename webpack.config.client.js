const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    index: './src/client/index.js',
    dashBoard: './src/client/main.js',
  },
  target: 'web',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist/public'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {},
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Dashoard',
      template: 'src/client/index.html',
      filename: 'index.html',
      chunks: ['index'],
      inject: 'body',
    }),
    //PLEASE LEVE THIS !!! 
    new HtmlWebpackPlugin({
      title: 'Admin dashboard',
      template: 'src/client/adminDash.html',
      filename: 'adminDash.html',
      chunks: ['dashBoard'],
      inject: 'body',
    }),
    new CopyPlugin([
      { from: 'node_modules/capmangalaxy/docs', to: 'game' },
      { from: 'assets', to: 'assets' }
    ]),
  ],
};
