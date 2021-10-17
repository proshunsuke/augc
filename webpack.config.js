const path = require('path');
const GasPlugin = require('gas-webpack-plugin');
const webpack = require('webpack');

const babelLoader = {
    loader: 'babel-loader',
    options: {
        presets: ['@babel/preset-env']
    }
}

const plugins = [
    new GasPlugin(),
    new webpack.EnvironmentPlugin({
        ENV: process.env.ENV || 'production',
        SITE_NAME: process.env.SITE_NAME || '',
    })
];

if (process.env.ENV === 'production') {
    plugins.push(
        new webpack.IgnorePlugin({resourceRegExp: /scheduleJson/,})
    );
}

module.exports = {
    mode: 'development', // GasPluginを使用する場合はproductionにすると動作しないのでdevelopment固定
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
    plugins: plugins,
    target: process.env.ENV === 'production' ? 'web' : 'node'
};
