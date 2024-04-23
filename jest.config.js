module.exports = () => {
    // only collect cover if true
    const isDev = process.env.DEV === 'true';
    
    return {
        
        verbose: true,
        "collectCoverage": isDev ? false : true,
        "collectCoverageFrom": [
        "src/**/*.{js,ts, tsx}"
        ],
        "coverageDirectory": "coverage",
        "rootDir": "./src",
        "roots": [
        "<rootDir>/src/",
        "<rootDir>/tests/"
        ]
    };
};