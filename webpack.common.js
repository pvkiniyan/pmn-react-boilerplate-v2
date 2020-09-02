const path = require('path');
const fs = require('fs');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const DotenvWebpackPlugin = require('dotenv-webpack');

const currentPath = path.join(__dirname);  
const basePath = currentPath + '/.env';
const envPath = basePath + '.' + process.env.npm_package_config_ENV;
const finalPath = fs.existsSync(envPath) ? envPath : basePath;

const BUILD_DIR = path.resolve(__dirname, 'dist');

module.exports = {
    entry: ['./src/index.js'],
    output: {
      filename: 'bundle.js',
      path: BUILD_DIR,
      publicPath: '/'
    },
    plugins: [
      new DotenvWebpackPlugin({
        path: finalPath
      }),
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        title: 'LoopConsole',
        template: path.resolve(__dirname, 'template/index.html'),
        favicon: 'favicon.ico',
      }),
      new ExtractCssChunks(),
    ],
    resolve: { extensions: ["*", ".js", ".jsx", ".css"] },
    module: {
        rules: [
        {
          test: /\.css$/,
          use: [ 
            'style-loader', 
            {
              loader: ExtractCssChunks.loader,
              options: {
                hmr: process.env.NODE_ENV === 'development',
              },
            },
          'css-loader', 'postcss-loader']
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        },
        {
          test: /\.svg$/,
          use: [
            {
              loader: "react-svg-loader",
              options: {
                svgo: {
                  plugins: [
                    { removeTitle: false }
                  ],
                  floatPrecision: 2
                }
              }
            }
          ]
        },
        {
          test: /\.(png|jpe?g|gif)$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                outputPath: "static/images"
              },
            },
          ],
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                outputPath: "static/fonts"
              },
            },
          ],
        },
      ],
    },
};
  