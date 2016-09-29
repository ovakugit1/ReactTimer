var fs = require('fs');
var webpackConfig = require('./webpack.config.js');
var browser = 'Chrome';
if(process.env.TRAVIS) {
  // travis only supports firefox by default.
  console.log('[Reach Timer] CI Run -> Switching browser option to Firefox');
  browser = 'Firefox';
}
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
