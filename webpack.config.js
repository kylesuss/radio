require('dotenv').config()
const HtmlWebpackPlugin = require('html-webpack-plugin')
const S3Plugin = require('webpack-s3-plugin')
const webpack = require('webpack')

const env = process.env.NODE_ENV || 'development'
const isProd = env === 'production'
const isDev = env === 'development'

const config = {
  entry: ['./src/app.js'],
  output: {
    filename: 'bundle.js',
    path: 'dist',
    publicPath: '/'
  },
  module: {
    preLoaders: [],
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        loader: 'raw-loader'
      },
      {
        test: /\.(png|jpg|jpeg)$/,
        loader: 'file'
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.css'],
    modulesDirectories: ['', 'src', 'node_modules']
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(env)
      }
    }),
    new HtmlWebpackPlugin({
      template: 'index.html',
      hash: isProd
    })
  ]
}

if (isDev) {
  config.devtool = 'source-map'
  config.devServer = { historyApiFallback: true }
  config.module.preLoaders.push({
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    loader: 'eslint-loader'
  })
}

if (isProd) {
  config.plugins = config.plugins.concat([
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.DefinePlugin({
      'GA_TRACKING_CODE': JSON.stringify(process.env.GA_TRACKING_CODE)
    }),
    new S3Plugin({
      s3Options: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.S3_REGION
      },
      s3UploadOptions: {
        Bucket: process.env.S3_BUCKET
      },
      cloudfrontInvalidateOptions: {
        DistributionId: process.env.CLOUDFRONT_DISTRIBUTION_ID,
        Items: ['/*']
      }
    })
  ])
}

module.exports = config
