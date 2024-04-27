const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: process.env.NODE_ENV || 'development',
    entry: './client/App.jsx',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build')
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'index.html'),
        }),
    ],
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                    },
                },
            }, 
            {
                test: /\.s?css$/,
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
        ],
    },
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'build'),
            publicPath: '/',
        },
        proxy: [{
            context: ['/api'],
            target: 'http://localhost:3000',
            changeOrigin: true,
        }],
    },
}