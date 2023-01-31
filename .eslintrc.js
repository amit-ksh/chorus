module.exports = {
  root: true,

  env: {
    browser: true,
    es2021: true,
    node: true,
  },

  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    parser: '@typescript-eslint/parser',
  },

  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier',
  ],

  plugins: ['@typescript-eslint', 'prettier'],

  rules: {
    'no-unused-expressions': 'off',
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
      },
    ],
    quotes: ['error', 'single', { avoidEscape: true }],
  },
};
