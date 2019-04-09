const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'

const config = {
  entry: path.join(__dirname, './src/index.js'),
  output: {
    filename: 'bundle.[hash].js',
    path: path.join(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.(vue|js|jsx)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        enforce: 'pre'
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader'
      },
      {
        test: /\.(gif|jpeg|jpg|png|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024,
              name: 'images/[name].[hash:7].[ext]'
            }
          }
        ]

      }

    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HTMLPlugin({
      favicon: path.join(__dirname, './public/favicon.ico'),
      template: path.join(__dirname, './public/index.html')
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: isDev ? '"development"' : '"production"'
      }
    })
  ]
}

if (isDev) {
  config.mode = 'development'
  config.module.rules.push({
    test: /\.(sa|sc|c)ss$/,
    use: [
      'vue-style-loader',
      'css-loader',
      'postcss-loader',
      'sass-loader'
    ]
  })
  config.devtool = '#cheap-module-eval-source-map'
  config.devServer = {
    port: 8000,
    host: '0.0.0.0',
    overlay: {
      errors: true
    },
    historyApiFallback: {
      index: '/dist/index.html'
    },
    hot: true
  }
  // config.plugins.push(
  //   new webpack.HotModuleReplacementPlugin(),
  //   new webpack.NoEmitOnErrorsPlugin()
  // )
} else {
  config.mode = 'production'
  config.output.filename = 'js/[name].[chunkhash:8].js'
  config.module.rules.push(
    {
      test: /\.(sa|sc|c)ss$/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        'postcss-loader',
        'sass-loader'
      ]
    }
  )
  config.plugins.push(
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contentHash:8].css'
    }),
    new CompressionWebpackPlugin({
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.(js|css)$/,
      threshold: 8192,
      minRatio: 0.8
    })
  )
  config.optimization = {
    splitChunks: {
      chunks: 'all'
    },
    runtimeChunk: true
  }
}

module.exports = config
