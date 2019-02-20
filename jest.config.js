module.exports = {
  modulePaths: ['<rootDir>/src'],
  setupFiles: ['jest-localstorage-mock'],
  setupTestFrameworkScriptFile: '<rootDir>/src/jest/setup-framework.js',
  testURL: 'http://localhost/',
  verbose: true,
}
