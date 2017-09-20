const precss       = require('precss');
const autoprefixer = require('autoprefixer');
const lost         = require('lost');

module.exports = {
  plugins: [
    precss,
    autoprefixer,
    lost
  ]
};
