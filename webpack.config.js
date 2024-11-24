const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = (env) => {
    const isProduction = env === 'production';
    return {
        entry: './client/index.js',
        output: {
            path: path.resolve(__dirname, 'public'),
            publicPath: '/',
            filename: '[name].js'
        },
        mode: 'development',
        resolve: {
            extensions: ['.js', '.jsx']
        },
        module: {
            rules: [{
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-react']
                    }
                }
            },
            {
                test: /\.html$/,
                use: [{
                    loader: "html-loader"
                }]
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                use: [{
                    loader: 'file-loader',
                    options: {},
                },],
            }
            ]
        },
        devServer: {
            contentBase: path.join(__dirname, 'public'),
            historyApiFallback: true
        },
        devtool: isProduction ? 'source-map' : 'inline-source-map',
        plugins: [
            new HtmlWebpackPlugin({
                template: "./client/index.html",
                filename: "./index.html"
            }),
            new Dotenv()

        ]
    }
}