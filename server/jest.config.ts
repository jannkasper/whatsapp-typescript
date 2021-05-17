import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
    setupFilesAfterEnv: ['./tests/setup.tsx'],
    testEnvironment: 'node',
    roots: [
        "<rootDir>"
    ],
    testMatch: [
        "tests/**/*.+(ts|tsx|js)",
        "**/?(*.)+(spec|test).+(ts|tsx|js)"
    ],
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest"
    }
};
export default config;
