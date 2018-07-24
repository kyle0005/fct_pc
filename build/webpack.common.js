const path = require('path');
const utils = require('./utils');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const entries =  utils.getMultiEntry('./src/resources/views/**/**/*.js'); // 获得入口js文件
const pages =  utils.getMultiEntry('./src/resources/views/**/**/*.html');
//通用配置
module.exports = {
    entry: entries,
    plugins: [
        new CleanWebpackPlugin(['dist']),
    ],
    output: {
        path: path.resolve(__dirname, '../dist/src/resources'),
        // publicPath: process.env.NODE_ENV === 'production' ? '../../' : '/',
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[ext]',
                            publicPath: '/',
                            outputPath: '../../'
                        }
                    }

                ]
            },
        ]
    }
};

for (var pathname in pages) {
    // 配置生成的html文件，定义路径等
    var conf = {
        filename: pathname + '.html',
        template: pages[pathname], // 模板路径
        chunks: [pathname, 'vendors', 'manifest'], // 每个html引用的js模块
        inject: true              // js插入位置
    };
    // 需要生成几个html文件，就配置几个HtmlWebpackPlugin对象
    module.exports.plugins.push(new HtmlWebpackPlugin(conf));
}