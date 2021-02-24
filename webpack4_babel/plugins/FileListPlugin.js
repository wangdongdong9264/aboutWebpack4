class FileListPlugins{
    constructor({filename}){
        this.filename = filename
    }
    apply(compiler){

		// 订阅 同步的写法 如果需用tapAsync则添加cb()
		compiler.hooks.emit.tap('FileListPlugins', (compilcation) => {
            // console.log('FileListPlugins');
            let assets = compilcation.assets;
            let content = `## 文件名    资源大小\r\n`;
            
            // [[index.html, {}],[bundle.js], {}]
            Object.entries(assets).forEach(([filename, statObj]) => {
                content += `- ${filename}    ${statObj.size()}\r\n`
            });

            assets[this.filename] = {
                source(){
                    return content
                },
                size(){
                    return content.length
                }
            }
		})
	}
}
module.exports = FileListPlugins