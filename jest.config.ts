module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  coverageDirectory: "coverage",
  collectCoverage: true,
  moduleNameMapper: {
    "^(.*)\\.js$": "$1", // Maps imports like '../index.js' to '../index'
  },
  collectCoverageFrom: [
    "**/*.ts",
    "!jest.config.ts",
    "!coverage/**",
    "!**/*.d.ts",
    "!interfaces/**/*.ts",
    "!constants/**/*.ts",
    "!node_modules/**",
    "!build/**", // Exclude the output directory
    "!**/*.test.{js|ts}", // Exclude test files
  ],
  moduleFileExtensions: ["js", "ts"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  coverageReporters: ["text", "lcov", "json", "html"],
  testMatch: ["**/__tests__/**/*.test.(ts|js)"],
};
