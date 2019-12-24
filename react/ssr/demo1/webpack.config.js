const path  = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const config = {
    mode: 'development',
    // entry: './src/index.js',
    entry: {
        main: './src/index.js',
        test: './src/test.js',
    },
    output: {
        // path: path.resolve(__dirname, 'dist'),
        filename: '[name]-[hash].js',
        path: path.resolve(__dirname, 'dist')
    },
    // module: {
    //     rules: [
    //         {
    //             test: /\.txt$/,
    //             use: 'raw-loader'
    //         }
    //     ]
    // },
    plugins: [
        // new HtmlWebpackPlugin({
        //     template: './src/index.html'
        // }),
        new CleanWebpackPlugin()
    ]
};

module.exports = config;