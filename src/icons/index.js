//先导入我们的组件
import svgIcon from "../components/svg-Icons"

//利用webpack的require函数完成svg-icon图标的注册

//匹配文件的方法 (返回一个require函数，keys可以拿到匹配的文件名)
//第一个参数是匹配的文件夹，第二个是是否匹配子文件夹，第三个为匹配的规则（可以使用正则匹配）
const svgRequire = require.context('./svg',false,/\.svg$/)

// svgRequire.keys() 返回满足匹配的文件的数组
// console.log(svgRequire)

//循环给每个svg文件完成注册
svgRequire.keys().forEach(icon => {
    svgRequire(icon)  //使用返回的require函数(我们需要注册的文件)完成注册
});
//定义一个注册全局组件svg-icon的函数
export default function(app){
    app.component('svg-icon',svgIcon)
}
