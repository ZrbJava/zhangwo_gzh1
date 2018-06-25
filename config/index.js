'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
    dev: {

        // Paths
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        proxyTable: {
            // '/local/': {
            //   target: 'http://wx.palmar.cn/',//设置你调用的接口域名和端口号 
            //   changeOrigin: true,     //跨域
            //   pathRewrite: {
            //     '^/local': ''   
            //   }
            // },
            '/test/': {
                target: 'http://192.168.1.138/new_palmar/public/wechat/index.php/', //设置你调用的接口域名和端口号 
                changeOrigin: true, //跨域
                pathRewrite: {
                    '^/test': ''
                }
            },
            // '/api': {
            // target: 'http://bin.dx2.me:7000/zhangwo/api/index.php/api/',//设置你调用的接口域名和端口号 
            // target: 'http://bin.dx2.me:7000/zhangwo/api/index.php/api/',//设置你调用的接口域名和端口号 
            //   changeOrigin: true,     //跨域
            //   pathRewrite: {
            //     '^/api': '/'   
            //   }
            // },
            // '/api': {

            //   target: 'http://bobo.com/new_palmar/public/wechat/index.php/',//设置你调用的接口域名和端口号 
            //   changeOrigin: true,     //跨域
            //   pathRewrite: {
            //     '^/api': '/'   
            //   }
            // }
            // '/palmar': {
            //     target: "http://wx.palmar.cn‘",
            //     changeOrigin: true,
            //     pathRewrite: {
            //         '^/api': ''
            //     }
            // },
            // '/test1': {
            //     target: "https://music.163.com‘",
            //     changeOrigin: true,
            //     pathRewrite: {
            //         '^/api': ''
            //     }
            // }

        },


        // Various Dev Server settings
        // host: 'localhost', // can be overwritten by process.env.HOST
        // host: '192.168.1.100', // can be overwritten by process.env.HOST
        host: '192.168.1.160', // can be overwritten by process.env.HOST
        port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
        autoOpenBrowser: false,
        errorOverlay: true,
        notifyOnErrors: true,
        poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-


        /**
         * Source Maps
         */

        // https://webpack.js.org/configuration/devtool/#development
        devtool: 'cheap-module-eval-source-map',

        // If you have problems debugging vue-files in devtools,
        // set this to false - it *may* help
        // https://vue-loader.vuejs.org/en/options.html#cachebusting
        cacheBusting: true,

        cssSourceMap: true
    },

    build: {
        // Template for index.html
        index: path.resolve(__dirname, '../dist/index.html'),

        // Paths
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: 'static',
        assetsPublicPath: '',

        /**
         * Source Maps
         */

        productionSourceMap: true,
        // https://webpack.js.org/configuration/devtool/#production
        devtool: '#source-map',

        // Gzip off by default as many popular static hosts such as
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],

        // Run the build command with an extra argument to
        // View the bundle analyzer report after build finishes:
        // `npm run build --report`
        // Set to `true` or `false` to always turn it on or off
        bundleAnalyzerReport: process.env.npm_config_report
    }
}