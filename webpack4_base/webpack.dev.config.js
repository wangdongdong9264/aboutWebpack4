const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const HappyPack = require('happypack');

module.exports = {
  devServer: {
    hot: true,
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
    // proxy: {
    //   '/api':'http:localhost:3000'
    // }
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:3000',
    //     pathRewrite: {'/api' : ''}
    //   }
    // }
  },
  mode: 'development',
  entry: './src/index.js',
  devtool: 'source-map',
  watch: true,
  watchOptions: {
    aggregateTimeout: 300, // 防抖
    poll: 1000, // 每秒查询多少次
    ignored: ['public', 'server-build', 'node_modules']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'my-first-webpack.bundle.[hash:8].js',
    // publicPath: 'http://www.wangdongdong9264.xyz'
  },
  resolve: {
    // extensions: [".less", ".sass", ".css", ".js", ".json"]  //未成功
    // alias: {
    //   extension: path.resolve(__dirname, 'src/style/extension.scss')
    // }
  },
  module: {
    rules:[
      // {
      //   test: /\.m?js$/,
      //   exclude: /(node_modules|bower_components)/,
      //   use: {
      //     loader: 'eslint-loader',
      //     options: {
      //       enforce: "pre"
      //     }
      //   }
      // },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        include: path.resolve('src'),
        // use: {
        //   loader: 'babel-loader'
        // }
        use: 'HappyPack/loader?id=js',
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              insertAt: 'top'
            }
          },
          {
            loader: 'css-loader',
            options: {
              url: true,
            }
          },
          {
            loader: 'postcss-loader'
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader'
        }
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              outputPath: '/images/',
              // publicPath: 'http://www.wangdongdong9264.xyz'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
        template: './index.html',
        filename: 'index.html',
        hash: true,
        minify: {
            collapseWhitespace: true,
            removeComments: true,
            removeRedundantAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true,
            useShortDoctype: true
        }
    }),
    new webpack.ProvidePlugin({
      $:'jquery'
    }),
    new CopyPlugin([
      {from: './source', to: 'build'}
    ]),
    new webpack.DefinePlugin({
      TWO: '1+1',
      VERSION: JSON.stringify('5fa3b9')
    }),
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/
    }),
    new HappyPack({
      // 3) re-add the loaders you replaced above in #1:
      id: 'js',
      loaders: [ 'babel-loader' ]
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
};