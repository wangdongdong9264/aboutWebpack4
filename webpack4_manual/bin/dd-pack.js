#! /usr/bin/env node

// console.log('start')

// 1. 找到当前执行的路径, 拿到webpack.config.js

const path = require('path');
// config 配置文件
let config = require(path.resolve('webpack.config.js'));

let Compiler = require('../lib/Compiler.js');

let compiler = new Compiler(config);

compiler.hooks.entryOption.call();  // 运行tapable/订阅发布

compiler.run();