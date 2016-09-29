var webpackConfig = require('./webpack.config.js');
var browser = process.env.TRAVIS ? 'Firefox' : 'Chrome'; // No chrome support on travis ci.
module.exports = function (config) {
  config.set({
    browsers: [browser],
    singleRun: true,
    frameworks: ['mocha'],
    files: ['app/tests/**/*.test.jsx'],
    preprocessors: {
      'app/tests/**/*.test.jsx': ['webpack', 'sourcemap']
    },
    reporters: ['mocha'],
    client: {
      mocha: {
        timeout: '5000'
      }
    },
    webpack: webpackConfig,
    webpackServer: {
      noInfo: true
    }
  });
};
