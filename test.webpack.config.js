var webpack     = require('webpack');
var path        = require('path');
var nodeModules = require('webpack-node-externals')();

module.exports = {
  target: 'node',
  externals: nodeModules,
	resolve: {
		modules: ['node_modules', './src', './test']
	},
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          cacheDirectory: true
        }
      },
      {
        test: /\.css$/,
        loader: 'null-loader'
      },
      {
        test: /\.png$/,
        loader: 'null-loader'
      }
    ]
  }
};
