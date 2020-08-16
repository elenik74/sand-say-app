const path = require('path')
const webpack = require('webpack');
const HTMLPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    entry: {
        js: ['babel-polyfill', './src/app.js'],
        vendor: ['react'],
    },
    output: {
        filename: 'bundle.[hash].js',
        path: path.resolve(__dirname, 'public')
    },
    plugins: [
        new HTMLPlugin({
            template: './src/index.html'
        }),
        new CleanWebpackPlugin(),
    ],
    devServer: {
        contentBase: path.join(__dirname, "public"),
        watchContentBase: true,
        port: 3001,
        hot: true
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ["file-loader"]
            }
        ],
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
}