const path = require('path');
const { merge } = require("webpack-merge");
const webpackConfig = require('./webpack.config');



module.exports = merge(webpackConfig, {
    mode: "production",
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    },
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'bundle.js'
    }
});