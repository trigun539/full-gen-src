const precss       = require('precss');
const autoprefixer  = require('autoprefixer');
const lost          = require('lost');
const postcssImport = require('postcss-import');

module.exports = {
  plugins: [
    postcssImport,
    precss,
    autoprefixer,
    lost
  ]
};
