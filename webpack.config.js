const path = require('path');
const GasPlugin = require('gas-webpack-plugin');
const webpack = require('webpack');

const babelLoader = {
    loader: 'babel-loader',
    options: {
        presets: ['@babel/preset-env']
    }
}

module.exports = {
    mode: 'development',
    // devtool: process.env.ENV === 'production' ? false : 'inline-source-map',
    entry: {
        main: path.resolve(__dirname, 'src', 'index.ts')
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js'
    },
    resolve: {
        extensions: ['.ts', '.js'],
        modules: [path.resolve(__dirname, 'src'), 'node_modules']
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [babelLoader]
            },
            {
                test: /\.ts$/,
                use: [
                    babelLoader,
                    {
                        loader: 'ts-loader',
                    },
                ],
            },
        ]
    },
    plugins: [
        new GasPlugin(),
        new webpack.EnvironmentPlugin({
            ENV: process.env.ENV || 'production'
        })
    ],
    externals: {
        puppeteer: 'require("puppeteer")',
    },
    target: 'node',
};
