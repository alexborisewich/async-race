/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const isProd = process.env.NODE_ENV == 'production';

const config = {
  entry: {
    index: path.resolve(__dirname, 'src/index.ts'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    assetModuleFilename: 'assets/[hash][ext]',
    clean: true,
  },
  devtool: isProd ? false : 'inline-source-map',
  devServer: {
    open: true,
    port: 'auto',
    static: {
      directory: path.resolve(__dirname, 'src'),
      watch: true,
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: 'body',
      favicon: './src/assets/favicon/favicon.ico',
      title: 'Async-Race',
      template: path.resolve(__dirname, 'src/index.html'),
    }),
    new ESLintPlugin({
      context: path.resolve(__dirname, 'src'),
      extensions: ['.tsx', '.ts', '.js'],
    }),
    new CopyPlugin({
      patterns: [
        {
          context: path.resolve(__dirname, 'public'),
          from: '**/*',
          to: 'assets',
          globOptions: {
            ignore: ['**/*.js', '**/*.ts', '**/*.css', '**/*.scss', '**/*.sass', '**/*.html'],
          },
          noErrorOnMissing: true,
          force: true,
        },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        loader: 'ts-loader',
        exclude: ['/node_modules/'],
      },
      {
        test: /\.css$/i,
        use: [isProd ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [isProd ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|svg|webp)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(?:mp3|wav|ogg|mp4)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
};

module.exports = () => {
  if (isProd) {
    config.mode = 'production';
    config.plugins.push(
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css',
      })
    );
  } else {
    config.mode = 'development';
  }
  return config;
};
