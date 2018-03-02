"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var clone = require('js.clone');
var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var DefinePlugin = webpack.DefinePlugin;
var commonWebpackConfig = require("./webpack.common");
exports.commonPlugins = [];
exports.commonConfig = {
    devtool: 'cheap-source-map'
};
// Client.
exports.clientPlugins = [
    new DefinePlugin({
        'process.env': {
            'NODE_ENV': JSON.stringify('development')
        }
    })
];
exports.clientConfig = {};
// Server.
exports.serverPlugins = [];
exports.serverConfig = {};
exports.default = [
    // Client
    webpackMerge(clone(commonWebpackConfig.commonConfig), commonWebpackConfig.clientConfig, clone(exports.commonConfig), exports.clientConfig, { plugins: commonWebpackConfig.commonPlugins.concat(commonWebpackConfig.clientPlugins, exports.commonPlugins, exports.clientPlugins) }),
    // Server
    webpackMerge(clone(commonWebpackConfig.commonConfig), commonWebpackConfig.serverConfig, clone(exports.commonConfig), exports.serverConfig, { plugins: commonWebpackConfig.commonPlugins.concat(commonWebpackConfig.serverPlugins, exports.commonPlugins, exports.serverPlugins) })
];
//# sourceMappingURL=webpack.development.js.map