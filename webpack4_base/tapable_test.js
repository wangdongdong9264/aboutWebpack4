/**
 * basic
 * BasicHook: 执行每一个，不关心函数的返回值，有 SyncHook、AsyncParallelHook、AsyncSeriesHook。
 */

// const {SyncHook} = require('tapable')

// const hook = new SyncHook(['arg', 'arg2'])  // 创建一个同步的Hook, 指定参数

// // 注册
// hook.tap('a', (...arg) => {
//     console.log('a', ...arg)
// })

// hook.tap('b', (...arg) => {
//     console.log('b', ...arg)
// })

// hook.call(1, 2)



/**
 * 
 * bail
 * BailHook: 顺序执行 Hook，遇到第一个结果 result !== undefined 则返回，不再继续执行。有：SyncBailHook、AsyncSeriseBailHook, AsyncParallelBailHook。
 */

// const {
//     SyncBailHook
// } = require('tapable')

// const hook = new SyncBailHook(['arg', 'arg2'])

// hook.tap('a', (...arg) => {
//     console.log('a', ...arg)
//     return 0
// })
// hook.tap('b', (...arg) => {
//     console.log('b', ...arg)
//     return undefined
// })
// hook.tap('c', (...arg) => {
//     console.log('c', ...arg)
// })

// hook.call(3, 2)





/**
 * 
 * Waterfall
 * WaterfallHook: 类似于 reduce，如果前一个 Hook 函数的结果 result !== undefined，则 result 会作为后一个 Hook 函数的第一个参数。既然是顺序执行，那么就只有 Sync 和 AsyncSeries 类中提供这个Hook：SyncWaterfallHook，AsyncSeriesWaterfallHook
 * 
 */

// const  {SyncWaterfallHook} = require('tapable')

// const hook = new SyncWaterfallHook(['arg'])

// hook.tap('a', (arg) => {
//     console.log('a', arg)
//     return arg + 1    
// })
// hook.tap('b', (arg) => {
//     console.log('b', arg)
//     return arg + 1
// })
// hook.tap('c', arg => {
//     console.log('c', arg)
// })
// hook.call(1)


/**
 * 
 * loop
 * LoopHook: 不停的循环执行 Hook，直到所有函数结果 result === undefined。同样的，由于对串行性有依赖，所以只有 SyncLoopHook 和 AsyncSeriseLoopHook
 * 
 */

 const {SyncLoopHook} = require('tapable')

 class Listening{
     constructor() {
         this.index = 0
         this.hooks = {
             arch: new SyncLoopHook(['arg'])
         }
     }
     tap(){
         this.hooks.arch.tap('node', arg =>{
             console.log('node', arg)
             return ++this.index === 3 ? undefined : '继续学'
         })
         this.hooks.arch.tap('angular', arg => {
             console.log('angular', arg)
         })
     }
     start () {
         this.hooks.arch.call('Dongdong')
     }
 }
 let l = new Listening()
 l.tap()
 l.start()