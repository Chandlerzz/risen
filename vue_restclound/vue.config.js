
module.exports={
    publicPath: process.env.NODE_ENV === 'production' ? 'https://object.risen.com/repairadmin/dist' : '', // 正式环境/本地开发环境
    devServer: {
        host: process.env.VUE_APP_PROXY_HOST,
        port: process.env.VUE_APP_PROXY_PORT,
        proxy: {
            '/api': {
                target: process.env.VUE_APP_SERVICE_API,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': process.env.VUE_APP_SERVICE_PATH_REWRITE
                },
                secure:false
            },
            '/sns': {
                target: process.env.VUE_APP_DING_TALK_API,
                changeOrigin: true,
                pathRewrite: {
                    '^/sns': process.env.VUE_APP_DING_TALK_PATH_REWRITE
                },
                secure:false

            },
        },
        historyApiFallback: {
            // index: url.parse(options.dev ? '/assets/' : publicPath).pathname
        }
    },
    css: {
        modules: false,
        loaderOptions: {
            sass: {
                data: `@import "@/styles/index.scss";`,
            },
        },
    },

}
