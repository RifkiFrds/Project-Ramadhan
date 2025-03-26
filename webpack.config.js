const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            chunks: ['main']
        }),
        new HtmlWebpackPlugin({
            template: './src/jadwal.html',
            filename: 'jadwal.html',
            chunks: ['main']
        }),
        new HtmlWebpackPlugin({
            template: './src/zakat.html',
            filename: 'zakat.html',
            chunks: ['main']
        }),
        new MiniCssExtractPlugin({
            filename: 'styles/home.css'
        }),
        new MiniCssExtractPlugin({
            filename: 'styles/zakat.css'
        }),
        new MiniCssExtractPlugin({
            filename: 'styles/jadwal.css'
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i, 
                type: 'asset/resource',
                generator: {
                    filename: 'images/[name][ext]' 
                }
            }
        ]
    },
    devServer: {
        static: './dist',
        historyApiFallback: true,
        hot: true,
    },
    mode: 'production'
};