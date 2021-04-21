const path = require('path')

const HtmlWebPackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
	entry: {
		index: './src/js/index.js',
	},
	devServer: {
		port: 5757,
		contentBase: path.resolve(__dirname, 'src'),
		publicPath: '/src',
	},

	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: ['babel-loader'],
			},
			{
				test: /\.html$/,
				use: [
					{
						loader: 'html-loader',
						options: { minimize: true },
					},
				],
			},
			{
				test: /\.(jpg|png)$/,
				type: 'asset/resource',
				// use: [
				// 	{
				// 		loader: 'file-loader',
				// 		options: {
				// 			name: '[name].[ext]',
				// 			//outputPath: 'assets/images',
				// 		},
				// 	},
				// ],
			},
			{
				test: /\.(css|scss)$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'postcss-loader',
					'sass-loader',
				],
			},
		],
	},

	output: {
		path: path.resolve(__dirname, './build'),
		//publicPath: './assets/images',
	},

	plugins: [
		new HtmlWebPackPlugin({
			template: path.resolve(__dirname, './src/index.html'),
			filename: 'index.html',
			inject: 'body',
		}),

		new MiniCssExtractPlugin({
			filename: './css/[name].css',
		}),
	],

	devtool: 'source-map',
	mode: 'development',
}
