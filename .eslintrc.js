module.exports = {
  env: {
    node: true,
    es2021: true,
    jest: true
  },
  extends: [
    'standard'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    'no-console': 'off', // Allow console.log in Node.js app
    'space-before-function-paren': ['error', 'always']
  },
  ignorePatterns: [
    'node_modules/',
    'coverage/',
    'dist/'
  ]
}
