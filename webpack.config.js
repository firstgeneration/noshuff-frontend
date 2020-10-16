const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/',
    },
    devServer: {
        historyApiFallback: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.less$/,
                use: [
                    {loader: "style-loader"},
                    {loader: "css-loader"},
                    {loader: "less-loader",
                        options: {
                            lessOptions: {
                                javascriptEnabled: true,
                            }
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.js'],
        alias: {
            Pages: path.join(__dirname, '/src/pages'),
            Components: path.join(__dirname, '/src/components'),
            Contexts: path.join(__dirname, '/src/contexts'),
            Utils: path.join(__dirname, '/src/utils'),
        }
    },
    plugins: [
        new Dotenv({
            path: '.env',
        }),
        new HtmlWebpackPlugin({
            template: __dirname + '/src/index.html',
        })
    ],
};
