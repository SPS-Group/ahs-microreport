module.exports = {
  moduleNameMapper: {
    '~/(.*)': '<rootDir>/src/$1',
  },
  setupFiles: ['jest-canvas-mock'],
};
