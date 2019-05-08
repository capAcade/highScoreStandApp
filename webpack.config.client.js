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
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Dashoard',
      template: 'src/client/index.html',
      filename: 'index.html',
      chunks: ['index'],
      inject: 'body',
    }, {
      title: 'Admin dashboard',
      template: 'src/client/adminDash.html',
      filename: 'adminDash.html',
      chunks: ['dashBoard'],
      inject: 'body',
    }),
    new CopyPlugin([
      { from: 'node_modules/capmangalaxy/docs', to: 'game' }
    ]),
  ],
};
