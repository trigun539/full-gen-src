const webpack           = require('webpack');
const { resolve, join } = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const extractCSS = new ExtractTextPlugin('styles.css');
const HTML       = new HTMLWebpackPlugin({
	title: 'Full react app sample',
	template: join(__dirname, 'src/index.ejs'),
	favicon: join(__dirname, 'src/favicon.png'),
	cache: false
});

module.exports = env => {
	const config = {
		context: resolve('src'),
		entry: ['./main.js'],
		output: {
			path: resolve('dist'), 
			filename: 'bundle.js?t=[hash]'
		},
		module: {
			rules: [
				{
					test: /\.js$/,
					loader: 'babel-loader',
					exclude: /node_modules/
				},
				{
					test: /\.css$/,
					loader: extractCSS.extract(['css-loader?localIdentName=[path]__[name]__[local]___[hash:base64:5]', 'postcss-loader'])
				},
				{
					test: /\.png$/,
					loader: 'file-loader?name=[name]__[hash:base64:5].[ext]'
				},
				{
					test: /\.ttf$/,
					loader: 'url-loader?limit=50000'
				},
				{
					test: /\.ejs$/,
					loader: 'ejs-loader'
				}
			]
		},
		resolve: {
			modules: ['node_modules', resolve('src')]
		},
		plugins: [
			extractCSS,
			HTML
		],
		devtool: '#eval-source-map'
	};

	return config;
};
