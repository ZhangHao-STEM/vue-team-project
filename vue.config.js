module.exports={
  lintOnSave:false, //关闭eslint语法检查配置
  devServer:{
    proxy:{
      '/api':{
        target:'http://localhost:8080', //后台接口
        ws:false,
        changOrigin:true, //允许跨域
        pathRewrite:{'^/api':''}  //路径重写
      }
    }
  }
}
/*
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})
*/
