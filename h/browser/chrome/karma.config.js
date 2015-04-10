// Karma configuration
// Generated on Mon Nov 17 2014 13:59:51 GMT+0000 (GMT)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: './',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha'],


    // list of files / patterns to load in the browser
    files: [
      '../../static/scripts/vendor/polyfills/bind.js',
      '../../static/scripts/vendor/sinon.js',
      '../../static/scripts/vendor/chai.js',
      '../../static/scripts/vendor/promise.js',
      'lib/errors.js',
      'lib/tab-store.js',
      'lib/tab-state.js',
      'lib/tab-error-cache.js',
      'lib/sidebar-injector.js',
      'lib/browser-action.js',
      'lib/help-page.js',
      'lib/hypothesis-chrome-extension.js',
      'test/*-test.js',
      '../../static/scripts/blocklist.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['dots'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true
  });
};
