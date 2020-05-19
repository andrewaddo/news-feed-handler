const CopyWebpackPlugin = require("copy-webpack-plugin");
const webpack = require("webpack");
const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  module: {
    rules: [
      {
        test: /\.js|.jsx?$/,
        exclude: /(node_modules)/,
        loaders: ["babel-loader"]
      },
      {
        test: /\.css$/,
        loader: "style-loader"
      },
      {
        test: /\.css$/,
        exclude: /(node_modules)/,
        loader: "css-loader",
        query: {
          modules: true,
          localIdentName: "[name]__[local]___[hash:base64:5]"
        }
      },
      {
        test: /\.css$/,
        include: /(node_modules)/,
        loader: "css-loader"
      }
    ]
  },
  devServer: {
    contentBase: "./dist",
    overlay: true,
    hot: true
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  plugins: [
    new CopyWebpackPlugin(["index.html"]),
    new webpack.HotModuleReplacementPlugin()
  ]
};
