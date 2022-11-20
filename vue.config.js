const { defineConfig } = require('@vue/cli-service')
const path = require('path')

//获取svg文件的路径
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = defineConfig({
  //每次修改脚手架里面的值都需要修改
  transpileDependencies: true,
  //配置css预处理语言scss的变量（使得所有组件都能访问）
  css: {
    loaderOptions: {
      scss: {
        // 所有组件都可以用到 scss变量 
        additionalData: `
          @import "@/assets/scss/variable.scss";
          @import "@/assets/scss/mixin.scss";
        `
      }
      }
    },
      chainWebpack(config) {
        // 设置 svg-sprite-loader
        // 将处理svg的loader添加exclude,表示不需要使用该loader处理icon。
        config.module
          .rule('svg')
          .exclude.add(resolve('src/icons'))
          .end()
        config.module
          .rule('icons') // 添加一个新的loader  匹配src/icons内的 svg文件  
          .test(/\.svg$/)
          .include.add(resolve('src/icons'))
          .end()
          .use('svg-sprite-loader')
          .loader('svg-sprite-loader')
          .options({// 指定symbolId 不指定则默认为svg文件名 识别到icon-user 回去找 user.svg
            symbolId: 'icon-[name]'
          })
          .end()
      }
  ,
  
  //安装解析scss的loder
})
