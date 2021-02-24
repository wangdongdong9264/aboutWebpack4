// console.log('start')

// `-!` 不会让文件 再去通过 `pre`, `normal` loader来处理
// `!` 表示没有 `normal` 处理
// `!!` 表示只执行 inline-loader
// let test = require('!!inline-loader!./inline.js')


// class B {
//     constructor() {
//         this.name = 'dongdong'
//     }
//     getName(){
//         return this.name
//     }
// }
// let b = new B();
// console.log(b.getName())

// file-loader / url-loader
// import png from './dongdongPro.png'
// let img  = document.createElement('img');
// img.src = png;
// document.body.appendChild(img);

// css-loader
// require('./index.less')


// inlineSourcePlugin
import './index.css'