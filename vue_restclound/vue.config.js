const path = require('path')
// const CompressionPlugin = require('compression-webpack-plugin')
const webpack = require('webpack')

function resolve(dir) {
    return path.join(__dirname, dir)
}
module.exports={
    publicPath: process.env.NODE_ENV === 'production' ? 'https://object.risen.com/repairadmin/dist' : '', // 正式环境/本地开发环境
    devServer: {
        host: process.env.VUE_APP_PROXY_HOST,
        port: process.env.VUE_APP_PROXY_PORT,
        proxy: {
            '/app_102_module_maintainment': {
                target: process.env.VUE_APP_SERVICE_API,
                changeOrigin: true,
                pathRewrite: {
                    '^/app_102_module_maintainment': process.env.VUE_APP_SERVICE_PATH_REWRITE
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
    chainWebpack: config => {
        const svgRule = config.module.rule('svg')
        svgRule.uses.clear()
        svgRule
            .test(/\.(svg)(\?.*)?$/)
            .include.add(resolve('src/assets/svg-icons')).end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({ symbolId: 'icon-[name]' })
            .end()

        const imgRule = config.module.rule('images')
        imgRule
            .uses.clear()
        imgRule
            .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
            .exclude.add(resolve('src/assets/svg-icons')).end()
            .use('url-loader')
            .loader('url-loader')
            .options({
                limit: 10000,
                name: 'img/[name].[hash:8].[ext]',
            })

    },

}
