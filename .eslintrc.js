module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "sourceType": "module"
    },
    "rules": {
        "indent": [
            "error",
            2
        ],
        "linebreak-style": [
            "warn",
            "unix"
        ],
        "no-console": "off",
        "no-undef": "off",
        "no-unused-vars": "off",
        "quotes": "off",
        "semi": [
            "warn",
            "always"
        ]
    }
};