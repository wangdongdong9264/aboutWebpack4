const loaderUtils = require('loader-utils')

function loader(source) {
    let style = `let style = document.createElement('style');
	style.innerHTML = ${JSON.stringify(source)};
	document.head.appendChild(style)`
	return style
}
loader.pitch = function (remainimgRequest) {
	// loaderUtils.stringifyRequest 将绝对路径转换相对路径
	let style = `let style = document.createElement('style');
	style.innerHTML = require(${loaderUtils.stringifyRequest(this, '!!' + remainimgRequest)});
	document.head.appendChild(style)`
	return style
}
module.exports = loader