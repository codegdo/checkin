const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env) => {
  // create a nice object from the env variable
  const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
  }, {});

  return {
    devServer: {
      host: '0.0.0.0',
      port: 3000,
      inline: true,
      hot: true,
      historyApiFallback: true,
      compress: true,
      disableHostCheck: true,
      watchOptions: {
        ignored: /node_modules/,
        aggregateTimeout: 300,
        poll: 1000,
      },
      proxy: {
        '/api/**': {
          target: 'http://localhost:5000',
          secure: false,
        },
      },
    },
    devtool: 'source-map',
    mode: 'development',
    entry: {
      app: path.join(__dirname, 'src', 'index.tsx'),
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      publicPath: process.env.ASSET_PATH || '/',
    },
    module: {
      rules: [
        {
          test: /\.(eot|ttf|otf|woff|woff2|png|jpe?g|gif)$/,
          use: 'file-loader',
        },
        {
          test: /\.(js|jsx|ts|tsx)$/,
          exclude: /node_modules/,
          use: 'babel-loader',
        },
        {
          test: /\.(sc|c)ss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            'css-loader',
            'postcss-loader',
            'sass-loader',
          ],
        },
      ],
    },
    resolve: {
      extensions: [
        '.js',
        '.jsx',
        '.ts',
        '.tsx',
        '.json',
        '.scss',
        '.eot',
        '.ttf',
        '.woff',
        '.woff2',
        '.otf',
        '.png',
        '.jpg',
        '.jpeg',
        '.gif',
      ],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: 'src/index.html',
      }),
      new MiniCssExtractPlugin({
        filename: 'style.css',
      }),
      new webpack.DefinePlugin(envKeys),
    ],
  };
};
