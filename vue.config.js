module.exports = {
  devServer: {
    proxy: {
      '/api': {    //将www.exaple.com印射为/apis
        target: 'http://127.0.0.1:5000',  // 接口域名
        changeOrigin: true,  //是否跨域
        secure: false 
    }
    }
  }
}