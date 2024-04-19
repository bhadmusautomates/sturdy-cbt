const { defineConfig } = require("cypress");
const browserify = require("@badeball/cypress-cucumber-preprocessor/browserify");
const preprocessor = require("@badeball/cypress-cucumber-preprocessor");

async function setupNodeEvents(on, config) {
  await preprocessor.addCucumberPreprocessorPlugin(on, config);

  on("file:preprocessor", browserify.default(config));
  return config;
}

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://staging.trymima.com/',
    defaultCommandTimeout: 10000,
    viewportHeight: 900,
    viewportWidth: 1400,
    specPattern: '**/*.feature',
    watchForFileChanges: false,
    env: {
      "MAILSLURP_API_KEY": "ee56382ae589ba46dd3a64e12061c912adfab92c25c4dc5c9c98e537ca5114bb"
    },
    setupNodeEvents,
  },
});
