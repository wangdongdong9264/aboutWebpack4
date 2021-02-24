const loaderUtils = require('loader-utils')
const validateOptions = require('schema-utils') // 检查格式
const fs = require('fs')

function loader(source) {
    this.cacheable && this.cacheable() // 缓存
    const options = loaderUtils.getOptions(this);
    let cb = this.async()
    let schema = {
        "type": "object",
        "properties": {
            "name": {
                "type": "string"
            },
            "filename": {
                "type": "string"
            }
        },
    }

    validateOptions(schema, options, 'banner-loader');
    if (options.filename) {
        this.addDependency(options.filename)    // 自动添加文件依赖
        fs.readFile(options.filename, 'utf8', function(err, data){
            cb(err, `/**${data}**/${source}`)
        })
    } else {
        cb(null, `/**${options.text}**/${source}`)
    }


    // return source
}
module.exports = loader