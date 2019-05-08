const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/client/main.js',
  target: 'web',
  mode: 'development',
  output: {
    filename: 'client.js',
    path: path.resolve(__dirname, 'dist/public')
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: '',
      template: 'src/client/adminDash.html',
      filename: 'adminDash.html',
      inject: 'body',
    })
    new CopyPlugin([
      { from: 'src/client/index.html', to: '' },
//      { from: 'src/client/adminDash.html', to: '' },
      { from: 'node_modules/capmangalaxy/docs', to: 'game' }
    ]),
  ],
};