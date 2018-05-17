const path = require('path');
// const CleanWebpackPlugin = require('clean-webpack-plugin');
// const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
require('babel-polyfill');

module.exports = {
  mode: 'development',
  entry: ['babel-polyfill', './bin/main.js'],
  target: 'node',
  node: {
    __dirname: false,
    __filename: false,
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  plugins: [
    // new CleanWebpackPlugin(['dist']),
    // new UglifyJSPlugin({
    //   sourceMap: true
    // })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env'],
          },
        },
      },
    ],
  },
  stats: {
    colors: true,
  },
  externals: [nodeExternals()],
  devtool: 'source-map',
};
