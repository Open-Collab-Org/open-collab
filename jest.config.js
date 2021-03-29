module.exports = {
    collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}', '!src/**/*.d.ts'],
    coverageThreshold: {
        global: {
            statements: 80
        }
    },
    setupFiles: ['react-app-polyfill/jsdom'],
    setupFilesAfterEnv: ['<rootDir>/config/jest/setupTests.js'],
    testMatch: ['<rootDir>/tests/**/*.test.{ts,tsx}'],
    testEnvironment: 'jsdom',
    testRunner: '<rootDir>/node_modules/jest-circus/runner.js',
    transform: {
        '^.+\\.(js|jsx|mjs|cjs|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
        '^.+\\.css$': '<rootDir>/config/jest/cssTransform.js',
        '^(?!.*\\.(js|jsx|mjs|cjs|ts|tsx|css|json)$)':
            '<rootDir>/config/jest/fileTransform.js'
    },
    transformIgnorePatterns: [
        '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|cjs|ts|tsx)$',
        '^.+\\.module\\.(css|sass|scss)$'
    ],
    modulePaths: [],
    moduleDirectories: ['node_modules', 'src'],
    moduleNameMapper: {
        '^react-native$': 'react-native-web',
        '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
        '@themes/(.*)': '<rootDir>/src/themes/$1',
        '@components/(.*)': '<rootDir>/src/components/$1',
        '@layouts/(.*)': '<rootDir>/src/layouts/$1',
        '@pages/(.*)': '<rootDir>/src/pages/$1',
        '@types': '<rootDir>/src/types/index',
        '@util': '<rootDir>/src/util/index'
    },
    moduleFileExtensions: [
        'web.js',
        'js',
        'web.ts',
        'ts',
        'web.tsx',
        'tsx',
        'json',
        'web.jsx',
        'jsx',
        'node'
    ],
    watchPlugins: [
        'jest-watch-typeahead/filename',
        'jest-watch-typeahead/testname'
    ]
};
