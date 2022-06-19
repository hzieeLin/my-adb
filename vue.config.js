const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // devServer: {
  //  proxy: {
  //    '/apis': {
  //      target: 'https://v0.yiketianqi.com/api?unescape=1&version=v61&appid=79695537&appsecret=DdhW9HWx',
  //      changeOrigin: true,
  //      PathRewrite: {
  //        '^/apis': ''
  //      }
  //    }
  //  }
  // }
})
