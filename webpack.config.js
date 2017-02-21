const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');

const METADATA = {
    title: 'Input types example',
    baseUrl: '/',
    isDevServer: true
};

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve('www/assets/js'),
        filename: '[name].bundle.js',
        sourceMapFilename: '[file].map',
        chunkFilename: '[id].chunk.js',
        library: 'ac_[name]',
        libraryTarget: 'var'
    },
    devtool: 'cheap-module-source-map',
    resolve: {
        extensions: [ '.js', '.json'],
        modules: [ "node_modules", path.resolve(__dirname, "src")]
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        [ 'es2015', { modules: false } ]
                    ]
                }
            },
            {
                test: /\.json$/,
                use: 'json-loader'
            },
            {
                test: /\.css$/,
                use: ['to-string-loader', 'css-loader'],
                exclude: [ path.resolve(__dirname, "src")]
            },
            {
                test: /\.scss$/,
                use: ['to-string-loader', 'css-loader', 'sass-loader'],
                exclude: [path.resolve(__dirname, "src")]
            },
            {
                test: /\.html$/,
                use: 'raw-loader',
                exclude: ['/index.html']
            },
            {
                test: /\.(jpg|png|gif)$/,
                use: 'file-loader'
            }
        ]
    },
    plugins: [
        new AssetsPlugin({
            path:  path.resolve('www/assets/js'),
            filename: 'assets.json',
            prettyPrint: true
        }),
        new HtmlWebpackPlugin({
            template: 'index.html',
            filename: 'www/../../../index.html',
            title: METADATA.title,
            chunksSortMode: 'dependency',
            metadata: METADATA,
            inject: 'head'
        }),
        new ScriptExtHtmlWebpackPlugin({
            defaultAttribute: 'defer'
        })
    ],
    node: {
        global: true,
        crypto: 'empty',
        process: true,
        module: false,
        clearImmediate: false,
        setImmediate: false
    }
};