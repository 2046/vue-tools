var path = require('path')
var webpack = require('webpack')
var px2rem = require('postcss-px2rem')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
    entry: {
        main: [path.resolve(__dirname, 'entry.js')]
    },
    output: {
        publicPath: '/',
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['', '.js', '.css', '.vue', '.json'],
        alias: {
            'vue': 'vue/dist/vue.js',
            'pages': path.resolve(__dirname, 'pages'),
            'plugins': path.resolve(__dirname, '..', 'plugins'),
            'components': path.resolve(__dirname, '..', 'components')
        }
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, 'index.html')
        })
    ],
    module: {
        loaders: [{
            test: /\.vue$/,
            loader: 'vue'
        }, {
            test: /\.js$/,
            loader: 'babel',
            exclude: /node_modules/
        }, {
            test: /\.css$/,
            loader: 'style!css'
        }, {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            loader: 'url',
            query: {
                limit: 1,
                name: 'img/[name].[hash:7].[ext]'
            }
        }, {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            loader: 'url',
            query: {
                limit: 1,
                name: 'fonts/[name].[hash:7].[ext]'
            }
        }]
    },
    babel: {
        presets: ['es2015', 'stage-0'],
        plugins: ['transform-runtime']
    },
    vue: {
        postcss: [
            px2rem({
                remUnit: 75
            })
        ]
    },
    devServer: {
        noInfo: true
    }
}
