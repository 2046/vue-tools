var path = require('path')
var webpack = require('webpack')
var merge = require('webpack-merge')
var baseConfig = require('../examples/webpack.dev.conf')

var webpackConfig = merge(baseConfig, {
    vue: {
        loaders: {
            js: 'isparta'
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"testing"'
            }
        })
    ]
})

delete webpackConfig.entry

webpackConfig.module.preLoaders = webpackConfig.module.preLoaders || []
webpackConfig.module.preLoaders.unshift({
    test: /\.js$/,
    loader: 'isparta',
    include: path.resolve(__dirname, '..', 'examples')
})

webpackConfig.module.loaders.some(function(loader, i) {
    if (loader.loader === 'babel') {
        loader.include = path.resolve(__dirname)
        return true
    }
})

module.exports = function(config) {
    config.set({
        browsers: ['Chrome'],
        frameworks: ['mocha', 'chai'],
        reporters: ['mocha', 'coverage'],
        files: ['./index.js'],
        preprocessors: {
            './index.js': ['webpack']
        },
        webpack: webpackConfig,
        webpackMiddleware: {
            noInfo: true
        },
        coverageReporter: {
            dir: '../coverage',
            reporters: [{
                type: 'lcov',
                subdir: '.'
            }, {
                type: 'text-summary'
            }]
        }
    })
}
