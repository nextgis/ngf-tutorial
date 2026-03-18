import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';
import { EsbuildPlugin } from 'esbuild-loader';
import CompressionPlugin from 'compression-webpack-plugin';

const config = (env, argv) => {
  const isProd = argv.mode === 'production';

  const plugins = [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
    new ForkTsCheckerWebpackPlugin({
      async: false,
    }),
    new ESLintPlugin({
      extensions: ['js', 'jsx', 'ts', 'tsx'],
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(argv.mode || 'development'),
      __BROWSER__: true,
      __DEV__: !isProd,
    }),
  ];

  if (isProd) {
    plugins.push(...[new MiniCssExtractPlugin(), new CompressionPlugin()]);
  }

  const config = {
    mode: argv.mode || 'development',
    entry: './src/index.tsx',
    output: {
      filename: '[name]-[hash:7].js',
    },
    module: {
      rules: [
        {
          test: /\.[jt]sx?$/i,
          exclude: /node_modules/,
          loader: 'esbuild-loader',
          options: {
            loader: 'tsx',
            target: 'es2018',
          },
        },
        {
          test: /\.css$/i,
          use: [
            isProd ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader',
          ],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    plugins,
    devtool: isProd ? 'source-map' : 'inline-source-map',
    devServer: {
      historyApiFallback: true,
      open: false,
      hot: true,
    },
    optimization: {
      runtimeChunk: 'single',
      splitChunks: {
        chunks: 'all',
        minSize: 10000,
        maxSize: 250000,
      },
      minimizer: [
        new EsbuildPlugin({
          target: 'es2022',
          css: true,
        }),
      ],
    },
  };

  return config;
};

export default config;
