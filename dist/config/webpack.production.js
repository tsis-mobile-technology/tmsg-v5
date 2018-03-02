"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var clone = require('js.clone');
var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
var DefinePlugin = webpack.DefinePlugin;
var LoaderOptionsPlugin = webpack.LoaderOptionsPlugin;
var NormalModuleReplacementPlugin = webpack.NormalModuleReplacementPlugin;
var NoEmitOnErrorsPlugin = webpack.NoEmitOnErrorsPlugin;
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var helpers_1 = require("./helpers");
var commonWebpackConfig = require("./webpack.common");
exports.commonPlugins = [
    // No errors
    new NoEmitOnErrorsPlugin(),
    // Loader options
    new LoaderOptionsPlugin({
        //minimize: false,
        debug: false
    }),
    // Replacements
    new NormalModuleReplacementPlugin(/facade(\\|\/)async/, helpers_1.root('node_modules/@angular/core/src/facade/async.js')),
    new NormalModuleReplacementPlugin(/facade(\\|\/)collection/, helpers_1.root('node_modules/@angular/core/src/facade/collection.js')),
    new NormalModuleReplacementPlugin(/facade(\\|\/)errors/, helpers_1.root('node_modules/@angular/core/src/facade/errors.js')),
    new NormalModuleReplacementPlugin(/facade(\\|\/)lang/, helpers_1.root('node_modules/@angular/core/src/facade/lang.js')),
    new NormalModuleReplacementPlugin(/facade(\\|\/)math/, helpers_1.root('node_modules/@angular/core/src/facade/math.js'))
];
exports.commonConfig = {};
// Client.
exports.clientPlugins = [
    new DefinePlugin({
        'process.env': {
            'NODE_ENV': JSON.stringify('production')
        }
    }),
    new BundleAnalyzerPlugin({
        analyzerMode: 'disabled',
        reportFilename: 'report.html',
        generateStatsFile: true,
        statsFilename: 'stats.json',
    }),
    // Uglify
    new UglifyJsPlugin({
        sourceMap: true,
        mangle: {
            keep_fnames: true
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
//# sourceMappingURL=webpack.production.js.map