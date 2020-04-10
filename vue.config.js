const path = require('path');
function resolve(dir) {
    return path.join(__dirname, dir);
}
module.exports = {
    publicPath: process.env.VUE_APP_TARGET === 'cordova' ? './' : '/',
    // lintOnSave: true,
    chainWebpack: config => {
        config.resolve.alias
            .set('_api', resolve('src/api'))
            .set('_views', resolve('src/views'))
            .set('_utils', resolve('src/utils'))
            .set('_native', resolve('src/native'))
            .set('@images', resolve('src/assets/images'))
            .set('@miGuan', resolve('src/assets/miGuan'))
            .set('_components', resolve('src/components'))
            .set('_mixins', resolve('src/mixins'));
    },

    // configureWebpack: {
    //     // 把原本需要写在webpack.config.js中的配置代码 写在这里 会自动合并
    //     externals: {
    //         vue: 'Vue'
    //     }
    // },

    configureWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            // 为生产环境修改配置...
            config.optimization.minimizer[0].options.terserOptions.compress.warnings = false;
            config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true;
            config.optimization.minimizer[0].options.terserOptions.compress.drop_debugger = true;
            config.optimization.minimizer[0].options.terserOptions.compress.pure_funcs = [
                'console.log'
            ];
        } else {
            // 为开发环境修改配置...
            console.log(config);
        }
    },

    css: {
        loaderOptions: {
            stylus: {
                'resolve url': true,
                import: ['./src/theme']
            }
        }
    },

    pluginOptions: {
        'cube-ui': {
            postCompile: true,
            theme: true
        }
    },

    filenameHashing: true
};
