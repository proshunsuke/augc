const path = require('path');
const GasPlugin = require('gas-webpack-plugin');
const Es3ifyPlugin = require('es3ify-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    context: __dirname,
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
                test: /\.[tj]s$/,
                loader: 'babel-loader'
            }
        ]
    },
    plugins: [
        new GasPlugin(),
        new Es3ifyPlugin(),
        // new webpack.IgnorePlugin(/jsdom$/)
    ]
};
