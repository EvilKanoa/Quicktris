const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = (env = {}) => ({
    entry: [
        './src/index.js'
    ],
    output: {
        filename: '[name].[hash].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    stats: 'verbose',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|gif|jpeg|ico)$/,
                exclude: /node_modules/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.(sa|sc|c)ss$/,
                exclude: /node_modules/,
                use: [
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    resolve: {
        modules: [
            path.resolve(__dirname, 'src'),
            'node_modules',
            path.resolve(__dirname, 'assets')
        ]
    },
    plugins: [
        new webpack.DefinePlugin(Object.keys(env).reduce((acc, key) => {
            acc[`process.env.${key}`] = JSON.stringify(env[key]);
            return acc;
        }, {})),
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            title: 'VROOM App',
            filename: 'index.html',
            hash: env.NODE_ENV !== 'development',
            template: 'root.html',
            //favicon: 'assets/favicon.ico'
        }),
    ],
});
