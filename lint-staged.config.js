const config = require('@sumup/foundry/lint-staged')({
  language: 'TypeScript',
}, {
  '*.(js|jsx|ts|tsx)': ['foundry run eslint --fix'],
});

delete config['*.(js|jsx|json|ts|tsx)']

module.exports = config
