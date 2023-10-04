import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import FaviconsWebpackPlugin from 'favicons-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';
import CompressionPlugin from 'compression-webpack-plugin';

const config = (env, argv) => {
  const isProd = argv.mode === 'production';

  const plugins = [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      // favicon: 'src/images/favicon.ico',
    }),
    new ForkTsCheckerWebpackPlugin({
      async: false,
    }),
    new FaviconsWebpackPlugin('src/images/favicon.svg'),
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
          test: /\.(ts|js)x?$/i,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
            },
          ],
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
    // target: isProd ? 'browserslist' : 'web',
    target: ['web', 'es5'],
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
    },
  };

  return config;
};

export default config;
