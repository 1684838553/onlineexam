// const UglifyPlugin = require('uglifyjs-webpack-plugin');
// const path = require('path');
// // const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)
const path = require('path');

function resolve(dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    // 基本路径
    baseUrl: '',
    // 输出文件目录
    outputDir: 'dist',
    // eslintloader: false, //是否在保存的时候检查
    lintOnSave: false,
    // use the full build with in-browser compiler
    // https://vuejs.org/v2/guide/installation.html#Runtime-Compiler-vs-Runtime-only
    //compiler: true,
    // webpack配置
    // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
    chainWebpack: config => {
        config.resolve.alias.set("vue$", "vue/dist/vue.common.js");
        config.resolve.alias.set("@", resolve("src"));
    },
    configureWebpack: () => {},
    // vue-loader 配置项
    // https://vue-loader.vuejs.org/en/options.html
    //vueLoader: {},
    // 生产环境是否生成 sourceMap 文件
    // productionSourceMap: true,
    productionSourceMap: true, //作用是打包后生产map文件，指出哪里出错了。
    // css相关配置
    css: {
        // 是否使用css分离插件 ExtractTextPlugin
        extract: true,
        // 开启 CSS source maps
        sourceMap: true,
        // sourceMap: false,
        // css预设器配置项
        loaderOptions: {
            // less: {
            //     use: ['style-loader', 'css-loader', 'less-loader']
            // }
        },
        // 启用 CSS modules for all css / pre-processor files.
        modules: false
    },
    // use thread-loader for babel & TS in production build
    // enabled by default if the machine has more than 1 cores
    parallel: require('os').cpus().length > 1,
    // 是否启用dll
    // See https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#dll-mode
    //dll: false,
    // PWA 插件相关配置
    // see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
    pwa: {},
    // webpack-dev-server 相关配置
    devServer: {
        // open: process.platform === 'darwin',
        // host: '0.0.0.0',
        // port: 8080,
        https: false,
        // hotOnly: false,
        proxy: {
            '/jxwenba':{
                target:'https://wenba.cnjxol.com:81/jxwenba',
                changeOrigin: true, //
                pathRewrite: {
                    '^/jxwenba': ''
                }
            }
        }, // 设置代理
        before: app => {},
    },
    // 第三方插件配置
    pluginOptions: {
        // ...
        // new webpack.HotModuleReplacementPlugin(),
    }
};