const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: path.join(__dirname, 'src', 'index.jsx'),
    output: {
        path: path.join(__dirname, 'static', 'js'),
        filename: 'bundle.js'
    },
    plugins: [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false },
            mangle: true,
            sourcemap: false,
            beautify: false,
            dead_code: true
        })
    ],
    resolve: {
        extensions: ['', '.js', '.jsx'],
    },

    module: {
        loaders: [{
            test: /\.jsx$/,
            loaders: ['react-hot', 'babel?presets[]=react,presets[]=es2015'],
            include: path.join(__dirname, 'src'),
            exclude: /node_modules/,
        }, {
            test: /\.css$/,
            loader: 'style-loader!css-loader',
        }, {
            test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url?limit=10000&mimetype=application/font-woff',
        }, {
            test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url?limit=10000&mimetype=application/octet-stream',
        }, {
            test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'file',
        }, {
            test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url?limit=10000&mimetype=image/svg+xml',
        },
        ],
    }
};