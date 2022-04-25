const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const DIST_DIR = path.resolve(__dirname, './dist');

module.exports = {
  mode: 'development',
  entry: './src/app.js',
  output: {
    path: DIST_DIR,
    filename: 'bundle.js'
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: './src/index.html', to: DIST_DIR },
        { from: './src/favicon.ico', to: DIST_DIR }
      ]
    })
  ],
  module: {
    rules: [
      { 
        test: /\.s[ac]ss$/i, 
        use: ["style-loader", "css-loader", "sass-loader"] 
      }
    ]
  },
  devServer: {
    static: {
      directory: DIST_DIR
    },
  }
}