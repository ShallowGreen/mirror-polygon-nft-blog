module.exports = {
  roots: ['<rootDir>'],
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/__tests__/setup.js'],
  testPathIgnorePatterns: [
    '<rootDir>/web3',
    '<rootDir>/node_modules/',
    '<rootDir>/.next/',
    'setup.js',
    'utils',
  ],
  transformIgnorePatterns: [
    '/node_modules/',
    '^.+\\.module\\.(css|sass|scss)$',
  ],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', {presets: ['next/babel']}],
  },
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/test/__mocks__/fileMock.js',
    '@/layouts': '<rootDir>/layouts',
    '@/utils/(.*)': '<rootDir>/utils/$1',
    '@/hooks/(.*)': '<rootDir>/hooks/$1',
    '@/typechain': '<rootDir>/typechain',
    '@/components': '<rootDir>/components',
    '@/components/(.*)': '<rootDir>/components/$1',
    '@/routes': '<rootDir>/routes.ts',
    '@/fetchers': '<rootDir>/fetchers',
    '@/context/(.*)': '<rootDir>/context/$1',
    '@/constants': '<rootDir>/constants.ts',
    '@/types': '<rootDir>/types/index.ts',
    '@/pages/(.*)': '<rootDir>/pages/$1',
  },
};
