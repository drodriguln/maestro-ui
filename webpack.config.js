const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
  module: {
    rules: [
      {
        test: [/\.(js|jsx|ts|tsx)/],
        exclude: /node_modules/,
        use: {
          loader: "awesome-typescript-loader"
        }
      },
      {
        test: /\.js$/,
        enforce: "pre",
        loader: "source-map-loader" }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },
  devtool: "source-map"
};
