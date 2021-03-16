const debug = process.env.NODE_ENV == 'development';
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
let HTTP = 'http://';
const Timestamp = new Date().getTime();
const Version = '1.0.0';
module.exports = {
    // 关闭eslint
    lintOnSave: false,
    // 基本路径
    baseUrl: './',
    devServer: {//代理配置
        proxy: {
            '/api': {
                target: 'https://testgportal.iuoooo.com',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': '/'
                }
            }
        },
        port: 8081,
        //https: true
    },
    productionSourceMap: false,
    outputDir: process.env.outputDir,

    chainWebpack: config => {
        config.module
            .rule('images')
            .use('image-webpack-loader')
            .loader('image-webpack-loader')
            .options({
                bypassOnDebug: true
            })
            .end()
    },
    configureWebpack: config => { // webpack配置，值位对象时会合并配置，为方法时会改写配置

        if (debug) { // 开发环境配置
            config.devtool = 'cheap-module-eval-source-map'
        } else { // 生产环境配置

            return {
                plugins: [
                    new CompressionWebpackPlugin({
                        filename: '[path].gz[query]',
                        algorithm: 'gzip',
                        test: /\.js$|\.html$|\.json$|\.css/,
                        // threshold: 0, // 只有大小大于该值的资源会被处理
                        // minRatio:0.8, // 只有压缩率小于这个值的资源才会被处理
                        deleteOriginalAssets: false // 删除原文件
                    }),
                    new UglifyJsPlugin({
                        uglifyOptions: {
                            warnings: false,
                            drop_debugger: true,
                            drop_console: true
                        },
                        sourceMap: false,
                        parallel: true
                    })
                ],
                output: { // 输出重构  打包编译后的 文件名称  【模块名称.版本号.时间戳】
                    filename: `js/[name].[hash].${Version}.js`,
                    chunkFilename: `js/[name].[chunkhash].${Version}.js`
                },
                externals: {
                    'vue': 'Vue',
                    'vue-router': 'VueRouter',
                    'axios': 'axios',
                    'vuex': 'Vuex',
                    'element-ui': 'ELEMENT',
                }
            }
        }

    },
    css: {
        loaderOptions: {
            sass: {
                data: `
              @import "@/styles/index.scss";
            `
            }
        }
    },

};
