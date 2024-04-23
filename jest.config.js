/** @type {import('jest').Config} */
const config = {
    verbose: true,
    moduleNameMapper: {
        "crunchDB/(.*)": "<rootDir>/src/$1",
        "objects/(.*)": "<rootDir>/src/objects/$1",
        "implementations/(.*)": "<rootDir>/src/implementations/$1",
        "interfaces/(.*)": "<rootDir>/src/interfaces/$1",
    }
  };
  
module.exports = config;