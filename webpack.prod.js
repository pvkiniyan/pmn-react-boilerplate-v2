const webpack = require('webpack');
const { merge } = require('webpack-merge');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

const common = require('./webpack.common.js');

module.exports = merge(common, {
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production',
      DEBUG: false
    }),
    new CompressionPlugin({
      filename: '[path].br',
      algorithm: 'brotliCompress',
      test: /\.(js|css|html|svg)$/,
      compressionOptions: {
        // zlib’s `level` option matches Brotli’s `BROTLI_PARAM_QUALITY` option.
        level: 11,
      },
      threshold: 1048,
      minRatio: 0.8,
      deleteOriginalAssets: false,
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [new CssMinimizerPlugin()],
    splitChunks: {
      chunks: 'all'
    }
  },
});