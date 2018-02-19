require('dotenv').config()
const HtmlWebpackPlugin = require('html-webpack-plugin')
const S3Plugin = require('webpack-s3-plugin')
const webpack = require('webpack')
const path = require('path')

const env = process.env.NODE_ENV || 'development'
const isProd = env === 'production'
const isDev = env === 'development'
const srcDir = path.resolve(__dirname, "src")

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
        include: srcDir,
        loader: 'babel-loader'
      },
      {
        test: /\.(json)$/,
        loader: 'json-loader'
      },
      {
        test: /\.css$/,
        include: [
          srcDir,
          path.resolve(__dirname, 'node_modules/normalize.css')
        ],
        loader: 'raw-loader'
      },
      {
        test: /\.(png|jpg|jpeg)$/,
        include: path.resolve(__dirname, 'src/images'),
        loader: 'file'
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.css', '.json'],
    modulesDirectories: ['', 'src', 'node_modules'],
    symlinks: false
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
  config.devtool = 'cheap-module-eval-source-map'
  config.devServer = { historyApiFallback: true }
  config.module.preLoaders.push({
    test: /\.(js|jsx)$/,
    include: srcDir,
    loader: 'eslint-loader'
  })
  config.plugins = config.plugins.concat([
    new webpack.DefinePlugin({
      IS_SENTRY_ENABLED: JSON.stringify(false)
    })
  ])
}

if (isProd) {
  config.plugins = config.plugins.concat([
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.DefinePlugin({
      GA_TRACKING_CODE: JSON.stringify(process.env.GA_TRACKING_CODE),
      IS_SENTRY_ENABLED: JSON.stringify(true),
      SENTRY_CONFIG_URL: JSON.stringify(process.env.SENTRY_CONFIG_URL)
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
