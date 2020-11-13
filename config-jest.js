/***
  *   * https://medium.com/@feralamillo/create-react-app-typescript-testing-with-jest-and-enzyme-869fdba1bd3
  *   * https://tech.willgate.co.jp/entry/2019/12/12/130000
  *   * https://www.dkrk-blog.net/javascript/react_test01
 ***/
module.exports = {
    roots: ['<rootDir>/'],
    transform: {
        '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/ts-jest',
//      '^.+\\.css$': '<rootDir>/config/jest/cssTransform.js',
//      '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)':
//      '<rootDir>/config/jest/fileTransform.js',
    },
    transformIgnorePatterns: ["/node_modules/(?!(xxxx.*?\\.js$))"],
    testPathIgnorePatterns : ["/node_modules/"],
    testRegex: ["(/test/.*|\\.(test|spec))\\.(ts|tsx|js)$"],//ERROR if use together
//  testMatch: ['<rootDir>/src/**/*.test.{js,jsx,ts,tsx}'], //ERROR if use together
    modulePaths: [],
    moduleFileExtensions: ['ts','tsx','js','jsx','json','node'],
    moduleNameMapper: {
        '^react-native$': 'react-native-web',
        '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
        'src/(.*)$': '<rootDir>/src/$1',
    },
    automock : false,
    preset: 'ts-jest',
    globals: {
        'ts-jest': {
            diagnostics: true,
        },
    },
    collectCoverageFrom: [
        'src/**/*.{js,jsx,ts,tsx}',
        '!src/**/*.d.ts',
        '!src/serviceWorker.ts',
        '!src/setupTests.ts',
        '!src/index.tsx',
    ],
    //setupFiles: ['<rootDir>/setupTests.ts'],// './test/setupEnzyme.ts'], // ERROR
    //snapshotSerializers: ['enzyme-to-json/serializer'], // ERROR
    coveragePathIgnorePatterns: ['./src/*/*.types.{ts,tsx}'],
    coverageReporters: ['json', 'lcov', 'text-summary', 'clover'],
    // coverageThreshold: {
    //     global: {
    //         statements: 95,
    //         branches  : 95,
    //         lines     : 95,
    //         functions : 95,
    //     },
    // },
};
