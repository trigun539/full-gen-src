const webpack           = require('webpack');
const { resolve, join } = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const environment = new webpack.DefinePlugin({
	'process.env.NODE_ENV': '"production"'
});
const uglify = new webpack.optimize.UglifyJsPlugin({});
const extractCSS = new ExtractTextPlugin('styles.css');
const HTML       = new HTMLWebpackPlugin({
	title: 'Sample Full React Application',
	template: join(__dirname, 'src/index.ejs'),
	favicon: join(__dirname, 'src/favicon.png')
});

module.exports = env => {
	const config = {
		context: resolve('src'),
		entry: ['./main.js'],
		output: {
			path: resolve('dist'), 
			filename: 'bundle.js'
		},
		module: {
			rules: [
				{
					test: /\.js$/,
					loader: 'babel-loader',
					exclude: join(__dirname, 'node_modules')
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
			modules: ['node_modules', resolve('src')],
			alias: {
				'react-dom': join(__dirname, '/node_modules/react-dom/dist/react-dom.min'),
				'react-redux': join(__dirname, '/node_modules/react-redux/dist/react-redux.min'),
				react: join(__dirname, '/node_modules/react/dist/react.min')
			}
		},
		plugins: [
			extractCSS,
			HTML,
			uglify,
			environment
		]
	};

	return config;
};
