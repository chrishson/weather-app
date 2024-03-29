module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  testRegex: "(/__tests__/.*|(\\.|/)(test))\\.tsx?$",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};
