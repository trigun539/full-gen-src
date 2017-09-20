exports.config = {
  // Selenium Grid Information
  // host: 'SELENIUM_GRID_URL',
  // port: 4444,
  
  specs: [
    './test-ui/**/*.spec.js'
  ],
  exclude: [
    // 'path/to/excluded/files'
  ],
  maxInstances: 10,
  capabilities: [{
    maxInstances: 5,
    // browserName: 'phantomjs'
    browserName: 'chrome'
    // browserName: 'internet explorer'
  }],
  sync: true,
  logLevel: 'silent',
  coloredLogs: true,
  bail: 0,
  screenshotPath: './test-ui/error-shots/',
  baseUrl: 'LOCAL_APP_URL',
  waitforTimeout: 30000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,
  framework: 'mocha',
  reporters: [
    'spec'
    // 'junit'
  ],
  reporterOptions: {
    junit: {
      outputDir: './'
    }
  },
  mochaOpts: {
    ui: 'bdd',
    timeout: 40000
  },
  beforeSession: function beforeSession () {
    require('babel-register'); // eslint-disable-line global-require
  }
};
