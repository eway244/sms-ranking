module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '^.+\\.js$': 'babel-jest',
  },
  moduleFileExtensions: ['js', 'json', 'vue'],
  collectCoverage: true,
  coverageReporters: ['html', 'text-summary'],
  testMatch: ['**/tests/**/*.spec.js'],
};