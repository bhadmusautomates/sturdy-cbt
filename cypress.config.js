const { defineConfig } = require("cypress");
const browserify = require("@badeball/cypress-cucumber-preprocessor/browserify");
const preprocessor = require("@badeball/cypress-cucumber-preprocessor");
const registerReportPortalPlugin = require('@reportportal/agent-js-cypress/lib/plugin');

async function setupNodeEvents (on, config){
  await preprocessor.addCucumberPreprocessorPlugin(on, config);

  on("file:preprocessor", browserify.default(config));
  await registerReportPortalPlugin(on, config);
  return config;
}

module.exports = defineConfig({
  reporter: '@reportportal/agent-js-cypress',
  reporterOptions: {
    endpoint: 'http://localhost:8080/ui',
    apiKey: 'testkey_IWiPPHICQKSmj0uuqCJ6AFiKio3eJqOpomUTA5v5-PiX18uOUQb6XlpiIjUOEQbh',
    launch: 'LAUNCH_NAME',
    project: 'PROJECT_NAME',
    description: 'LAUNCH_DESCRIPTION',
    parallel: true,
    debug: true,
  },
  e2e: {
    baseUrl:'https://staging.trymima.com/',
    defaultCommandTimeout: 10000,
    viewportHeight: 900,
    viewportWidth: 1400,
    specPattern:  '**/*.feature',
    watchForFileChanges: false,
    setupNodeEvents,
  },
});
