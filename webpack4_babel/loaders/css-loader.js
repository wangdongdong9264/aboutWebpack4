function loader(source) {
    // css-loader 就是将css 中的url 转换成require

    let reg = /url\((.+?)\)/g;
    let pos = 0;  // 索引
    let current;
    let arr = ['let list = []'];
    while (current = reg.exec(source)) {
        let [matchUrl, g] = current;    // url('./dongdongPro.png') './dongdongPro.png'
        let last = reg.lastIndex - matchUrl.length;
        arr.push(`list.push(${JSON.stringify(source.slice(pos, last))})`)
        pos = reg.lastIndex;

        // 转换
        arr.push(`list.push('url('+require(${g})+')')`);
    }
    arr.push(`list.push(${JSON.stringify(source.slice(pos))})`);
    arr.push(`module.exports = list.join('')`);
    
    // console.log(arr.join('\r\n'))

    return arr.join('\r\n')
}
module.exports = loader