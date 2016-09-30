var webpackConfig = require('./webpack.config.js');
var browser = process.env.TRAVIS ? 'Firefox' : 'Chrome';
module.exports = function (config) {
  config.set({
    browsers: [browser],
    singleRun: true,
    frameworks: ['mocha'],
    files: [
      'app/tests/**/*.test.jsx',
      'node_modules/jquery/dist/jquery.min.js',
      'node_modules/foundation-sites/dist/foundation.min.js',
    ],
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
