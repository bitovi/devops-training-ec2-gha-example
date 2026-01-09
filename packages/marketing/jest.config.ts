export default {
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest-setup.ts"],
  transform: {
    "^.+\\.(t|j)sx?$": [
      "@swc/jest",
      {
        jsc: {
          parser: {
            tsx: true,
            syntax: "typescript",
          },
          transform: {
            react: {
              runtime: "automatic",
            },
          },
        },
        isModule: "unknown",
      },
    ],
  },
  moduleNameMapper: {
    "^@test/(.*)$": "<rootDir>/src/test/$1",
  },
};
