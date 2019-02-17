const webpack = require('webpack')
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin')
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
	entry: {
		index: './src/index.js'
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist/js')
	},

	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader"
				}
			},
			{
				test: /\.css$/,
				exclude: /node_modules/,
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: {
						loader: 'css-loader',
					}
				})
			},
			{
				test: /\.scss$/,
				exclude: /node_modules/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [{
						loader: 'css-loader',
					}, {
						loader: 'sass-loader',
					}]
				})
			}, {
				test: /\.(png|svg|jpg|gif)$/,
				exclude: /node_modules/,
				use: [{
					loader: 'file-loader',
					options: {
						name: '../img/[name].[ext]'
					}
				}]
			}
		]
	},
	plugins: [
		new ExtractTextPlugin(isProd ? '../css/[name].css' : './dist/css/[name].css'),

		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('production')
		}),
		getEntryHtml()
	]
}

function getEntryHtml() {
	const entryHtml = {
		template: 'src/index.html'
	}
	isProd && (entryHtml.filename = path.resolve(__dirname, './dist/index.html'))
	return new HtmlWebpackPlugin(entryHtml);
}