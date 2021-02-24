const HtmlWebpackPlugin = require('html-webpack-plugin');

/**
 * @description 将css/js内链html
 */
class InlineSourcePlugin{
    constructor({match}){
        this.reg = match  // 正则
    }
    /**
     * @description 处理单个标签
     * @param {*} tag 
     * @param {*} compilation 
     */
    processTag(tag, compilation){
        let newTag;
        let url;
        console.log(tag)
        if(tag.tagName === 'link' && this.reg.test(tag.attributes.href)){
            newTag = {
                tagName: 'style',
                attributes:{type:'text/css'}
            }
            url = tag.attributes.href
        } 
        if(tag.tagName === 'script' && this.reg.test(tag.attributes.src)){
            newTag = {
                tagName: 'script',
                attributes:{type: 'text/javascript'}
            }
            url = tag.attributes.src
        }
        if (url) {
            // compilation.assets[url] 当前文件的详情
            newTag.innerHTML = compilation.assets[url].source();
            delete compilation.assets[url]  // 删掉替换的内容 否则会继续生成文件
            return newTag
        }

        return tag 
    }

    /**
     * @description 处理引入标签的数据
     * @param {*} data 
     * @param {*} compilation 
     */
    processTags(data, compilation){
        let headTags = [];
        let bodyTags= [];
        data.headTags.forEach(headTag => {
            headTags.push(this.processTag(headTag, compilation));
        });
        data.bodyTags.forEach(bodyTag => {
            bodyTags.push(this.processTag(bodyTag, compilation));
        });
        return {...data, headTags, bodyTags}
    }
    apply(compiler){
        // 详情 https://github.com/jantimon/html-webpack-plugin
        compiler.hooks.compilation.tap('InlineSourcePlugin', (compilation) => {
            console.log(HtmlWebpackPlugin.getHooks)
            HtmlWebpackPlugin.getHooks(compilation).alterAssetTagGroups.tapAsync(
                'alterPlugin', // <-- Set a meaningful name here for stacktraces
                (data, cb) => {
                  data = this.processTags(data, compilation)
                  // Tell webpack to move on
                  cb(null, data)
                }
              )
        })
    }
}
module.exports = InlineSourcePlugin