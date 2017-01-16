'use strict';

const webpack = require('webpack');
const WebpackShellPlugin = require('webpack-shell-plugin');

module.exports = {

    //context: './src',

    entry: {
        phaser: './src/phaser.ts'
    },

    resolve: {

        /*
         * An array of extensions that should be used to resolve modules.
         *
         * See: http://webpack.github.io/docs/configuration.html#resolve-extensions
         */
        extensions: ['.ts', '.js', '.json'],

    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'ts-loader'
            }
        ]
    },

    output: {
        path: './dist',
        filename: '[name].js',
        library: 'Phaser',
        libraryTarget: 'umd',
        sourceMapFilename: '[file].map',
        devtoolModuleFilenameTemplate: "webpack:///[resource-path]", // string
        devtoolFallbackModuleFilenameTemplate: "webpack:///[resource-path]?[hash]", // string
        umdNamedDefine: true,
    },

    plugins: [

        new WebpackShellPlugin({
            onBuildStart: 'node create-checksum.js',
            onBuildEnd: 'node copy-to-examples.js'
        }),

        /*new webpack.optimize.UglifyJsPlugin({
          compress: { warnings: false }
        })*/
    ],

    devtool: 'inline-source-map'

};
