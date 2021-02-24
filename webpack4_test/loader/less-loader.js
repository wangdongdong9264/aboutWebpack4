// loader 就是一个函数

const less = require('less')
function loader(source){
	let css = '';
	less.render(source, function (err, c) {
		css = c.css;
	})
	
	// 替换 
	css = css.replace(/\n/g, '\\n');
	return css
}
module.exports = loader