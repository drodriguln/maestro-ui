const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: [/\.tsx?/],
        exclude: /node_modules/,
        use: {
          loader: "ts-loader"
        }
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    })
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  }
};
