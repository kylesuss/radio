const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const autoprefixer = require('autoprefixer')
const precss = require('precss')

const env = process.env.NODE_ENV || 'development'

const config = {
  entry: ['./src/app.js'],
  output: {
    filename: 'bundle.js',
    path: 'dist',
    publicPath: '/'
  },
  devtool: 'source-map',
  module: {
    preLoaders: [],
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react', 'stage-1']
        }
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css!postcss')
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.css'],
    modulesDirectories: ['', 'src', 'node_modules']
  },
  postcss: function(webpackInstance) {
    return [
      autoprefixer({
        browsers: ['last 2 versions']
      }),
      precss
    ]
  },
  plugins: [
    new ExtractTextPlugin('[name].css'),
    new HtmlWebpackPlugin({
      template: 'index.html'
    })
  ]
}

if (env === 'development') {
  config.module.preLoaders.push({
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    loader: 'eslint-loader'
  })
}

module.exports = config
