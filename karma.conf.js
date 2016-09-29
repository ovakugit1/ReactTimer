var fs = require('fs');
var webpackConfig = require('./webpack.config.js');
var browser = 'Chrome';
if(process.env.TRAVIS) {
  // jquery fix
  fs.exists('./node_modules/jquery', (exists) => {
    if(exists) {
      fs.exists('./node_modules/jQuery', (exists) => {
        if (!exists) { // if the jQuery folder aldready exists, don't rename.
          console.log('jquery folder found. Renaming to jQuery');
          fs.rename('./node_modules/jquery', './node_modules/jQuery');
        }
      });
    }
  });
  // travis only supports firefox by default.
  console.log('[React Timer] CI Run -> Switching browser option to Firefox');
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
