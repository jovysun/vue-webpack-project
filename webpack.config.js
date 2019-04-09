const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

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
              name: '[name].[ext]'
            }
          }
        ]

      }

    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HTMLPlugin(),
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
    hot: true
  }
  // config.plugins.push(
  //   new webpack.HotModuleReplacementPlugin(),
  //   new webpack.NoEmitOnErrorsPlugin()
  // )
} else {
  config.mode = 'production'
  config.entry = {
    app: path.join(__dirname, './src/index.js'),
    vendor: ['vue']
  }
  config.output.filename = '[name].[chunkhash:8].js'
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
      filename: '[name].[contentHash:8].css',
      chunkFilename: '[id].[contentHash:8].css'
    })
  )
  config.optimization = {
    splitChunks: {
      chunks: 'all'
    },
    runtimeChunk: {
      name: 'manifest'
    }
  }
}

module.exports = config
