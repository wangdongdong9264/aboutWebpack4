const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FileListPlugins = require('./plugins/FileListPlugin')
const InlineSourcePlugin = require('./plugins/InlineSourcePlugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UploadPlugin = require('./plugins/UploadPlugin')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  devtool: 'source-map',
  // watch: true,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: 'http://img.wangdongdong9264.xyz/'
  },
  // resolveLoader: {
  //   modules: ['node_modules', path.resolve(__dirname, 'loaders')]
  // },
  module: {
    rules: [
      // {
      //   test: /\.png$/,
      //   exclude: /(node_modules|bower_components)/,
      //   // 根据图片生成一个md5 发射到dist目录下, file-loader还会返回当前图片的路径
      //   // use: {
      //   //   loader: 'file-loader'
      //   // }
      //   use: {
      //     loader: 'url-loader',
      //     options:{
      //       limit: 10*1024
      //     }
      //   }
      // },
      // {
      //   test: /\.m?js$/,
      //   exclude: /(node_modules|bower_components)/,
      //   use: {
      //     loader: 'banner-loader',
      //     options: {
      //       text:'dongdong',
      //       filename: path.resolve(__dirname, 'banner.js')
      //     }
      //   }
      // },
      // {
      //   test: /\.m?js$/,
      //   exclude: /(node_modules|bower_components)/,
      //   use: {
      //     loader: 'babel-loader',
      //     options: {
      //       presets: ['@babel/preset-env']
      //     }
      //   }
      // }

      // 不能随便命名loader 必须xxx-loader
      // {
      //   test: /\.m?js$/,
      //   exclude: /(node_modules|bower_components)/,
      //   use: ['test-loader', 'test2-loader', 'test3-loader']
      // }

      // {
      //   test: /\.m?js$/,
      //   exclude: /(node_modules|bower_components)/,
      //   use: {
      //     loader: 'test-loader'
      //   },
      //   enforce: 'pre'
      // },
      // {
      //   test: /\.m?js$/,
      //   exclude: /(node_modules|bower_components)/,
      //   use: {
      //     loader: 'test2-loader'
      //   }
      // },
      // {
      //   test: /\.m?js$/,
      //   exclude: /(node_modules|bower_components)/,
      //   use: {
      //     loader: 'test3-loader'
      //   },
      //   enforce: 'post'
      // }
      // {
      //   test: /\.less$/,
      //   exclude: /(node_modules|bower_components)/,
      //   use: ['style-loader', 'css-loader', 'less-loader']
      // },

      {
        test: /\.css$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new FileListPlugins({
      filename: 'list.md'
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].css',
    }),
    // new InlineSourcePlugin({
    //   match: /\.(js|css)/
    // })
    new UploadPlugin({
      Bucket: 'wangdongdong9264',
      AccessKey: 'lMOrD755RUjdbwDKgw5SIirZ-H3NFgWL79edTU31',
      SecretKey: 'u9XJ-jCe3Hut4rHOKCucyrdOGqDouMLx9FVHuvKZ',
      Domain: 'img.wangdongdong9264.xyz'
    })
  ]
}