const webpack = require("webpack");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

module.exports = merge(common, {
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: require.resolve('babel-loader'),
            options: {
              plugins: ['react-refresh/babel'],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ReactRefreshWebpackPlugin(),
    new webpack.EnvironmentPlugin({
      NODE_ENV: "development",
      DEBUG: true,
    }),
  ],
  devtool: "inline-source-map",
  devServer: {
    compress: true,
    hotOnly: true,
    contentBase:('./dist'),
    port: 8080,
    historyApiFallback: true,
    index: 'index.html'
  },
});
