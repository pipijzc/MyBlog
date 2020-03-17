module.exports = {
    lintOnSave: false,
    devServer: {
        proxy: {
            '/api': {
                //接口地址
                target: 'http://localhost:4000',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '' //通过pathRewrite重写地址，将前缀/api转为/
                }
            }
        }
    },
    chainWebpack: config => {
        //发布模式
        config.when(process.env.NODE_ENV === 'production', config => {
                //entry找到默认的打包入口，调用clear则是删除默认的打包入口
                //add添加新的打包入口
                config.entry('app').clear().add('./src/main-prod.js')
                    //使用externals设置排除项
                config.set('externals', {
                    vue: 'Vue',
                    'element-ui': 'ElementUI',
                    'highlight.js': 'hljs',
                    // 'vue-quill-editor': 'VueQuillEditor'
                    // 'vue-quill-editor': 'quillEditor'
                    // 'vue-particles': 'particles'
                })
            })
            //开发模式
        config.when(process.env.NODE_ENV === 'development', config => {
            config.entry('app').clear().add('./src/main-dev.js')
        })
    }
}