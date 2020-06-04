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
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
        ]
    },
    plugins: [
        new Dotenv({
            path: '.env',
        }),
        new HtmlWebpackPlugin({
            template: __dirname + '/src/index.html',
        })
    ],
    resolve: {
        alias: {
            pages: path.join(__dirname, '/src/components/pages'),
            components: path.join(__dirname, '/src/components'),
        }
    }
};
