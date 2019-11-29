const path = require("path")
const webpack = require("webpack")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const autoprefixer = require("autoprefixer")
const CopyPlugin = require("copy-first-asset-webpack-plugin").default

const Paths = require("./Paths")
const { isProduction, prefix, autoCopy } = require("./Constants")

const cssLoader = [
  // isProduction ? MiniCssExtractPlugin.loader : 
  "style-loader",
  "css-loader",
].filter(Boolean)

const postcssLoader = {
  loader: "postcss-loader",
  options: {
    plugins: [
      autoprefixer
    ]
  }
}

const sassLoader = {
  loader: "sass-loader",
  options: {
    sourceMap: !isProduction
  }
}

const cssModuleLoader = {
  loader: "typings-for-css-modules-loader",
  options: {
    modules: true,
    namedExport: true,
    camelCase: true,
    sass: true,
    minimize: true,
    localIdentName: "[local]_[hash:base64:5]"
  }
}

module.exports = {
  mode: isProduction ? "production" : "development",
  devtool: "inline-cheap-module-source-map",
  entry: {
    index: path.resolve(Paths.Src, "index.ts"),
  },
  output: {
    path: Paths.Dist,
    filename: "static/scripts/[name].js",
    chunkFilename: isProduction
      ? "static/scripts/chunk-[name].js"
      : "static/scripts/chunk-[name].js"
  },
  resolve: {
    extensions: [".ts", ".js", ".json"],
    alias: {
      "@Src": Paths.Src,
      "@Comps": Paths.Comps,
    }
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        include: [ Paths.Src ],
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: !isProduction,
            },
          },
          isProduction ? "eslint-loader" : null
        ].filter(Boolean),
      },
      {
        test: /\.css$/,
        include: Paths.Src,
        exclude: /\.min\.css$/,
        use: cssLoader,
      },
      {
        test: /\.s(a|c)ss$/,
        include: Paths.Src,
        exclude: /\.module\.s(a|c)ss$/,
        use: [
          ...cssLoader,
          isProduction ? postcssLoader : null,
          sassLoader,
        ].filter(Boolean),
      },
      {
        test: /\.module\.s(a|c)ss$/,
        include: Paths.Src,
        use: [
          isProduction ? MiniCssExtractPlugin.loader : "style-loader",
          cssModuleLoader,
          postcssLoader,
          sassLoader,
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif|ico)(\?.*)?$/i,
        include: Paths.Src,
        use: [{
          loader: "url-loader",
          options: {
            limit: 8192,
            name: "static/images/[name].[hash:6].[ext]"
          }
        }]
      },
      {
        test: /\.(otf|eot|svg|ttf|woff)(\?.*)?$/i,
        include: Paths.Src,
        use: [{
          loader: "url-loader",
          options: {
            limit: 8192,
            name: "static/fonts/[name].[hash:6].[ext]"
          }
        }]
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/i,
        include: Paths.Src,
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: 'static/medias/[name].[hash:8].[ext]' // 文件名
        }
      },
    ],
  },
  plugins: [
    isProduction ? null : new HtmlWebpackPlugin({
      template: path.join(Paths.Public, "index.html"),
      filename: "index.html",
      inject: "body",
      chunks: ["index"],
      favicon: path.join(Paths.Public, "favicon.ico"),
      hash: true,
      title: "template-ts-tampermonkey",
    }),
    new webpack.WatchIgnorePlugin([/\.d\.ts$/]),
    new webpack.LoaderOptionsPlugin({
      options: {
        libraryTarget: "umd",
      }
    }),
    isProduction ? new CopyPlugin({
      prefix,
      copy: autoCopy,
    }) : null,
  ].filter(Boolean),
}
