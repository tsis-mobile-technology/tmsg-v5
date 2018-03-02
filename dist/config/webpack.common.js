"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var autoprefixer = require('autoprefixer');
var clone = require('js.clone');
var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
var ContextReplacementPlugin = webpack.ContextReplacementPlugin;
var DefinePlugin = webpack.DefinePlugin;
var HtmlWebpackPlugin = require('html-webpack-plugin');
var LoaderOptionsPlugin = webpack.LoaderOptionsPlugin;
var helpers_1 = require("./helpers");
// Common
exports.commonPlugins = [
    new ContextReplacementPlugin(/angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/, helpers_1.root('./src'), {}),
    new LoaderOptionsPlugin({
        debug: false,
        options: {
            postcss: [
                autoprefixer({ browsers: ['last 3 versions', 'Firefox ESR'] })
            ],
            resolve: {}
        }
    })
];
exports.commonConfig = {
    devtool: 'source-map',
    resolve: {
        extensions: ['.ts', '.js', '.json'],
        modules: [helpers_1.root('node_modules')]
    },
    context: helpers_1.root('./'),
    module: {
        exprContextCritical: false,
        rules: [
            {
                test: /\.ts$/,
                exclude: [/\.(spec|e2e|d)\.ts$/],
                use: ['ts-loader', 'angular2-template-loader']
            },
            {
                test: /\.html$/,
                use: ['html-loader']
            },
            {
                test: /\.scss$/,
                use: ['raw-loader', 'postcss-loader', 'sass-loader']
            },
            {
                test: /\.json$/,
                use: ['json-loader']
            }
        ],
    }
};
// Client
exports.clientPlugins = [
    new CommonsChunkPlugin({
        names: ['vendor', 'polyfills'],
        filename: 'assets/js/[name].[hash].js',
        minChunks: Infinity
    }),
    new HtmlWebpackPlugin({
        chunksSortMode: 'dependency',
        filename: 'index.html',
        hash: true,
        inject: 'body',
        template: './src/index.html'
    })
];
exports.clientConfig = {
    target: 'web',
    entry: {
        main: './src/main',
        vendor: './src/vendor',
        polyfills: './src/polyfills'
    },
    output: {
        filename: 'assets/js/[name].[hash].js',
        path: helpers_1.root('./target'),
        publicPath: '/'
    },
    node: {
        global: true,
        crypto: 'empty',
        __dirname: true,
        __filename: true,
        process: true,
        Buffer: false
    }
};
// Server.
exports.serverPlugins = [];
exports.serverConfig = {
    target: 'node',
    entry: './src/server',
    output: {
        filename: 'server.js',
        path: helpers_1.root('./target'),
        publicPath: '/',
        libraryTarget: 'commonjs2'
    },
    externals: helpers_1.includeClientPackages(/@angularclass|@angular|angular2-|ng2-|ng-|@ng-|angular-|@ngrx|ngrx-|@angular2|ionic|@ionic|-angular2|-ng2|-ng/),
    node: {
        global: true,
        crypto: true,
        __dirname: true,
        __filename: true,
        process: true,
        Buffer: false
    }
};
//# sourceMappingURL=webpack.common.js.map