const path = require('path')
const fs = require('fs') 

// babylon 主要吧源码转换成ast  2019/03/11 使用 @babel/parser
// @babel/traverse 节点
// @babel/types 替换节点
// @babel/generator 生成

const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const t = require('@babel/types')
const generator = require('@babel/generator').default

const ejs = require('ejs')

// 事件流 钩子函数
const {SyncHook} = require('tapable')

class Compiler {
    constructor(config){
        // entry output
        this.config = config;
        // 需要保存入口文件的路径
        this.entryID; // ./src/index.js
        // 需要保存所有的模块依赖
        this.modules = {};
        this.entry = config.entry; // 入口文件
        // 工作路径
        this.root = process.cwd();
        // 钩子
        this.hooks = {
            entryOption: new SyncHook(),
            compile: new SyncHook(), // 编译开始
            afterCompile: new SyncHook(),   
            afterPlugins: new SyncHook(),
            run: new SyncHook(),
            emit: new SyncHook(), // 发射文件
            done: new SyncHook()
        }
        let plugins = this.config.plugins;
        if(Array.isArray(plugins)) {
            plugins.forEach(plugin => {
                plugin.apply(this)
            })
        }
        this.hooks.afterPlugins.call()
        
    }
    /**
     * @description 解析源码
     * 
     */
    parse(source, parentPath){
        // console.log(source, parentPath)

        // 解析AST语法树
        let ast = parser.parse(source);
        let dependencies = []; // 依赖的数组
        traverse(ast, {
            CallExpression(p){
                let node = p.node; // 对应的节点
                if (node.callee.name === 'require') {
                    node.callee.name = '__webpack_require__'
                    let moduleName = node.arguments[0].value; // 取到模块的引用名
                    moduleName = moduleName + (path.extname(moduleName)? '' : '.js');
                    moduleName = './' + path.join(parentPath, moduleName); // src/a.js
                    dependencies.push(moduleName);
                    node.arguments = [t.stringLiteral(moduleName)]
                }
            }
        })
        let sourceCode = generator(ast).code;
        return {sourceCode, dependencies}
    }

    /**
     * @description 获取文件内容
     * @param {string} modulePath 文件路径
     */
    getSource(modulePath){
        let content = fs.readFileSync(modulePath, 'utf8');
        let rules = this.config.module.rules;
        // console.log(rules)
        // 拿到loader的每个规则
        for (let i = 0; i < rules.length; i++) {
            let rule = rules[i];
            let {test, use} = rule;
            let len = use.length - 1;
            if (test.test(modulePath)) {
                // 需要loader转化
                function normalLoader() {
                    let loader = require(use[len--]);
                    content = loader(content)
                    // 递归条用 
                    if (len >= 0) {
                        normalLoader()        
                    }
                }
                normalLoader()
            }
        }
        return content
    }

    // 构建模块
    /**
     * 
     * @description 
     * @param {*} modulePath 
     * @param {Boolean} isEntry 是否主文件
     */
    buildModule(modulePath, isEntry){
        // 拿到模块的内容
        let source = this.getSource(modulePath);
        // 模块id modulePath = modulePath - this.root  
        let moduleName = './' + path.relative(this.root, modulePath);

        if (isEntry) {
            this.entryID = moduleName  // 保存入口的名字
        }
        // 解析 需要把source源码进行改变 返回一个依赖列表
        let {sourceCode, dependencies} = this.parse(source, path.dirname(moduleName));

        // console.log(sourceCode, dependencies) ok

        // 把相对路径和模块中的内容 对应起来
        this.modules[moduleName] = sourceCode;

        dependencies.forEach(dep => {
            // 递归加载模块 'require('b.js')'
            this.buildModule(path.join(this.root, dep), false)
        })
        


    }
    /**
     * @description 生成文件
     * 
     */
    emitFile(){
        // 用数据渲染出build.js
        // 拿到输出的目录
        let main = path.join(this.config.output.path, this.config.output.filename);
        let templateStr = this.getSource(path.join(__dirname, 'main.ejs'));
        let code = ejs.render(templateStr, {
            entryID: this.entryID,
            modules: this.modules
        });
        this.assets = {}
        this.assets[main] = code;
        fs.writeFileSync(main, this.assets[main]);

    }
    run() {
        this.hooks.run.call();
        // 执行 并 创建模块的依赖关系
        this.hooks.compile.call();
        this.buildModule(path.resolve(this.root, this.entry), true)
        this.hooks.afterCompile.call();
        // console.log(this.modules)
        // console.log(this.entryID)

        // 产出一个文件 打包后的文件
        this.emitFile()
        this.hooks.emit.call();
        this.hooks.done.call();
    }
}
module.exports = Compiler