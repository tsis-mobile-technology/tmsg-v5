"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var autoprefixer = require('autoprefixer');
var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var DefinePlugin = webpack.DefinePlugin;
var LoaderOptionsPlugin = webpack.LoaderOptionsPlugin;
var commonWebpackConfig = require("./webpack.common");
exports.config = {
    devtool: 'cheap-source-map',
    resolve: commonWebpackConfig.commonConfig.resolve,
    module: {
        exprContextCritical: false,
        rules: [
            {
                test: /\.ts$/,
                use: [
                    {
                        loader: 'ts-loader',
                        query: {
                            // use inline sourcemaps for "karma-remap-coverage" reporter
                            sourceMap: false,
                            inlineSourceMap: true,
                            compilerOptions: {
                                // Remove TypeScript helpers to be injected
                                // below by DefinePlugin
                                removeComments: true
                            }
                        }
                    },
                    'angular2-template-loader'
                ]
            },
            {
                test: /\.html$/,
                use: ['raw-loader', 'html-loader']
            },
            {
                test: /\.scss$/,
                use: ['raw-loader', 'postcss-loader', 'sass-loader']
            },
            {
                test: /\.json$/,
                use: ['json-loader']
            }
        ]
    }
};
exports.plugins = [
    new DefinePlugin({
        'process.env': {
            'NODE_ENV': JSON.stringify('development')
        }
    }),
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
module.exports = webpackMerge(exports.config, { plugins: exports.plugins });
//# sourceMappingURL=webpack.test.js.map