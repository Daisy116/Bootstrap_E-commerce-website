const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const webpack = require('webpack');  // 為了實作DefinePlugin，將webpack引入
const path = require('path');  // 在實作Output時，需要放絕對路徑(絕對路徑使用node.js裡面的path模組)


module.exports = {
    // 入口
    entry: './src/index.js',
    // 出口
    output: {
        path: path.resolve(__dirname, 'dist'),  // 可以改輸出的資料夾名稱
        filename: 'index.[hash].js',   // 可以改輸出的檔案名稱，中間加上[hash]，這樣每次build的檔名都會不同！
    },
    // 模式
    mode: 'development', // development or production
    // loader
    module: {
        rules: [
            // CSS的規則
            {
                test: /\.css$|\.scss/i,  // 讀取的副檔名除了css，再加上scss
                use: [
                    MiniCssExtractPlugin.loader, 
                    'css-loader',
                    {
                        loader: 'postcss-loader'   // 加入PostCSS
                    },
                    {
                        loader: "sass-loader"  // 加入Sass-loader
                    }
                ],
            },
            // Asset Modules的規則
            {
                test: /\.png|jpg|gif|jpeg/,
                type: 'asset/resource'
            },
            // Babel的規則
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader"
                }
            }
        ],
    },
    // 插件
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'index.[hash].css'  // 若新增filename這個key，value就可以指定打包後的檔案名稱(加上hash～)
        }),
        new CleanWebpackPlugin(),  // 使用Clean plugin for webpack插件
        new webpack.DefinePlugin({
            PRODUCTION: JSON.stringify(true)  // 代表執行這一個config檔時，當前環境為正式環境(如果要其他環境，用其他config檔?!)
        }),
        new CompressionPlugin()
    ],
    devtool: 'source-map' 
};
  