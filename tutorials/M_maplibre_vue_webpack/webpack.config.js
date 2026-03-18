import { EsbuildPlugin } from "esbuild-loader";
import ESLintPlugin from "eslint-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { VueLoaderPlugin } from "vue-loader";
import webpack from "webpack";

export default (_env, argv) => {
  const isProd = argv.mode === "production";

  return {
    mode: isProd ? "production" : "development",
    devtool: isProd ? "source-map" : "eval-source-map",
    entry: "./src/main.js",
    output: {
      filename: isProd ? "[name]-[contenthash:8].js" : "[name].js",
      clean: true,
    },
    target: "web",
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: "vue-loader",
        },
        {
          test: /\.js$/i,
          exclude: /node_modules/,
          loader: "esbuild-loader",
          options: {
            loader: "js",
            target: "es2022",
          },
        },
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: "asset/resource",
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: "asset/resource",
        },
      ],
    },
    resolve: {
      extensions: [".js", ".vue"],
    },
    plugins: [
      new VueLoaderPlugin(),
      new HtmlWebpackPlugin({
        template: "src/index.html",
      }),
      new ESLintPlugin({
        configType: "flat",
        extensions: ["js", "vue"],
        files: "src/**/*.{js,vue}",
      }),
      new webpack.DefinePlugin({
        __VUE_OPTIONS_API__: "true",
        __VUE_PROD_DEVTOOLS__: "false",
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: "false",
      }),
    ],
    optimization: {
      minimizer: [
        new EsbuildPlugin({
          target: "es2022",
          css: true,
        }),
      ],
    },
    devServer: {
      hot: true,
      open: false,
      port: 8080,
    },
  };
};
