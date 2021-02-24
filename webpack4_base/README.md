# webpack4 配置

### 安装

    ```sh
        yarn init -y

        yarn add webpack webpack-cli -D
    ```

#### dev-server

    ```sh
        yarn add webpack-dev-server -D
    ```


#### loader 
    
    * css-loader @import 语法
    * style-loader 将css插入到head中
    * loader 功能单一
    * 默认执行的循序是从右向左执行/从下到上

    1. 样式抽离 MiniCssExtractPlugin
    2. css自动添加前缀 autoperfixer postcss-loader
    3. 压缩css optimize-css-assets-webpack-plugin

    * expose-loader 引入第三方依赖 jquery
    
        1. 内连的写法 `require("expose-loader?$!jquery");`
        2. webpack 中配置
            ```js

                module: {
                    rules: [{
                            test: require.resolve('jquery'),
                            use: [{
                                loader: 'expose-loader',
                                options: 'jQuery'
                            },{
                                loader: 'expose-loader',
                                options: '$'
                            }]
                        }]
                    }
            ```
        3. 全局配置 `webpack.ProvidePlugin`
        4. 排除依赖 `externals` 使用cdn加载时

    + babel 一些转换
    + @babel/plugin-transform-runtime @babel/runtime
    + @babel/polyfill

    - eslint-loader
    
    * 图片打包 url-loader
    * html的图片 需要用到 html-withimg-loader / html-loader
    
#### 多页面打包

    ```js
        mode: 'development',
        entry: {
            index: './src/index.js',
            home: './src/home.js'
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: '[name].js',
            // publicPath: 'http://www.wangdongdong9264.xyz'
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './index.html',
                filename: 'index.html',
                chunks:['index']
            }),
            new HtmlWebpackPlugin({
                template: './home.html',
                filename: 'home.html',
                chunks:['index','home']
            })
        ]


    ```

#### devtool

    1. source-map 会标示当前报错的列和行 大而全
    2. eval-source-map 不会产生单独的文件, 但是可以显示行和列
    3. cheap-module-source-map  不会产生列 但是是一个单独的映射文件
    4. cheap-module-eval-source-map 不会产生文件 集成在打包后的文件中 不会产生列

#### 插件

    1. clean-webpack-plugin 清除插件 
    2. copy-webpack-plugin 拷贝插件
    3. bannerPlugin  (webpack.BannerPlugin) 内置 版权声明

#### 代理

    1. devServer.proxy
    2. devServer.before
    3. webpack-dev-middleware 使用中间件来启动webpack

#### resolve 模块解析

    1. resolve.alias
    2. resolve.mainFields   package.json > target
    3. resolve.extensions    import 不想加后缀, 可以用这个

#### 定义环境变量

    * `new webpack.DefinePlugin({Dev: JSON.stringify('dev')})`

#### 基础配置文件


#### webpack 优化

    1. noParse 不去解析jquery的依赖项
    2. webpack.IgnorePlugin 忽略第三方的的引入, 需手动引入需要的文件 例如 moment
    3. happypack 多线程打包

#### webpack 自带优化 在`production`环境下

    * tree-shaking  把没用到的代码 自动删除
    * scope hosting  作用域提升 一些多余的变量 自动计算合并

#### 提取公共代码

    * optimization.splitChunks{}

#### 懒加载

    * @babel/plugin-syntax-dynamic-import 需要安装/配置才能使用import()

#### 热更新

    1. devServer.hot 启动热更新
    2. webpack.NamedModulesPlugin() 显示更新的文件
    3. webpack.HotModuleReplacementPlugin() 热更新模块替换插件
    4. `https://webpack.js.org/guides/hot-module-replacement/`


## 高级

### tapable


### 手写webpack

    1. 添加


        ```sh

            npm link
        ```


    2. 解析

        * @babel/parser
        * @babel/traverse
        * @babel/types
        * @babel/generator
        * `https://astexplorer.net` traverse参考

    3. 取消链接

        * checkout a node project
        * cd 
        * npm unlink


#### loader 的执行

	* `pre` > `normal` > `inline` > `post`
	* `inline`在index.js里配置
	* `let test = require('!!inline-loader!./inline.js')`


	```js
	
	{
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'test-loader'
        },
        enforce: 'pre'
      }
	```
	
	* loader 由 pitch,normal 组成 
	
	