import './style/main.scss'

import moment from 'moment'
import 'moment/locale/zh-cn'

import strA from './js/a'

// import 'extension'
// const $ = require("expose-loader?$!jquery");
const test = () => {
    console.log(`ts 6 babel`)
    // console.log(window.$)
    // console.log($)
}
test()

class bit {
    constructor(name) {
        this.name = name
    }
    getName() {
        console.log(this.name)
    }
    setName(name) {
        this.name = name
    }
}
// const b = new bit('dongdong')
// b.setName('wang')
// b.getName()

// 代理
// let xhttp = new XMLHttpRequest();
// xhttp.open(
//     'get', 'http://localhost:3000/api/user',true
// );
// xhttp.send()


// 定义的环境变量

// console.log(VERSION,TWO)


moment.locale('zh-cn')
let day = moment().endOf('day').fromNow();
console.log(day)

console.warn(strA)

if(module.hot) {
    module.hot.accept('./js/a', () => {
        console.log('Accepting the updated printMe module!')
    })
}