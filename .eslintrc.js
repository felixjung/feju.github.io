module.exports = {
  extends: [
    'xo',
    'xo/esnext',
    'xo/browser',
    'plugin:react/recommended',
    'prettier',
    'prettier/react'
  ],
  plugins: [
    'react',
    'prettier'
  ],
  rules: {
    'max-len': ['error', {
      code: 80,
      tabWidth: 2,
      ignoreComments: true,
      ignoreUrls: true
    }],
    'prettier/prettier': ["error", {
      singleQuote: true,
      semi: false
    }]
  },
  parser: 'babel-eslint',
  parserOptions: {
    allowImportExportEverywhere: true,
    ecmaFeatures: {
      ecmaVersion: 2017,
      impliedStrict: true,
      jsx: true
    }
  },
  env: {
    browser: true
  },
  globals: {
    process: true,
    require: true
  }
};
