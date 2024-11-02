/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "node",
  verbose:true,
  transform: {
    "^.+.tsx?$": ["ts-jest", {}],
  },
};
