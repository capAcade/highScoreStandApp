const path = require('path');
const NodemonPlugin = require('nodemon-webpack-plugin');

module.exports = {
  entry: './src/server/server.js',
  target: 'node',
  node: {
    __dirname: false,
  },
  mode: 'development',
  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new NodemonPlugin(),
  ],
};