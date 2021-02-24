const babel = require('@babel/core')
const loaderUtils = require('loader-utils')

function loader(source){
    // 参数就是 源码 source
    // loader 中 this指的是上下文
    // console.log(Object.keys(this))
    const options = loaderUtils.getOptions(this);
    let cb = this.async()

    // 转es5
    // console.log(this.resourcePath)
    babel.transform(source,{
        ...options,
        sourceMap: true,
        filename: this.resourcePath.split('/').pop() // 文件名 不加在浏览器 sources > webpack:// 显示unknown  
    },function (err, result) {
        // 异步
        cb(err,result.code, result.map);
    })

    // 转化是异步cb()  所以不用return
	// return source

}

module.exports = loader 