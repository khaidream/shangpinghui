module.exports =  {
    // 设置打包时不生成map文件
    productionSourceMap:false,
    // 关闭eslint
    lintOnSave:false,
    // 代理跨域
    devServer:{
        proxy:{
            '/api':{
                target:'http://39.98.123.211',
            }
        }
    }
}