module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ['<rootDir>'],
    testMatch: ['**/tests/**/*.ts', '**/?(*.)+(spec|test).ts'],
    transform: {
        '^.+\\.ts$': 'ts-jest',
    },
    moduleNameMapper: {
        '^@data/(.*)$': '<rootDir>/data/$1',
        '^@src/(.*)$': '<rootDir>/src/$1',
    },
    setupFilesAfterEnv: ['tsconfig-paths/register'],
};