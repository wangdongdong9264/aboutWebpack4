const path = require('path');

// 模拟plugins
// plugins详情参考 /node_modules/webpack/lib/Compiler.js
class P{
	apply(compiler){

		console.log('start plugin');
		// 订阅
		compiler.hooks.emit.tap('emit', function(){
			console.log('emit');
		})
	}
}

class P2{
	apply(compiler){
		// 订阅
		compiler.hooks.afterPlugins.tap('emit', function(){
			console.log('afterPlugins');
		})
	}
}

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    resolveLoader: {
    	 modules: ['node_modules', path.resolve(__dirname, 'loader')]
    },
	module: {
		rules: [
			{
				test: /\.less$/,
				use:[
					path.resolve(__dirname, 'loader', 'style-loader'),
					path.resolve(__dirname, 'loader', 'less-loader')
				]
			},
			// {
			// 	test: /\.js$/,
			// 	use: 'babel-loader'
			// }
			{
				test:/\.js$/,
				use:{
					loader: 'babel-loader'
				}
			}
		]
	},
	plugins: [
		// new P(),
		// new P2()
	]
}