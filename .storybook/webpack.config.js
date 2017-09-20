const { resolve, join } = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader'
        },
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader?localIdentName=[path]__[name]__[local]___[hash:base64:5]'
          },
          {
            loader: 'postcss-loader'
          }
        ]
      },
      {
        test: /\.png$/,
        use: {
          loader: 'file-loader?name=[name]__[hash:base64:5].[ext]'
        }
      },
      {
        test: /\.ttf$/,
        use: {
          loader: 'url-loader?limit=50000'
        }
      }
    ],
  },
  resolve: {
    modules: ['node_modules', resolve('src')]
  },
  plugins: []
};
