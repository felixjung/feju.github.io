const config =  require('@sumup/foundry/eslint')({
  language: 'TypeScript',
  environments: ['Browser'],
  frameworks: ['React', 'Emotion', 'Jest'],
  openSource: false,
});

config.extends = config.extends.filter(e => e !== 'plugin:json/recommended')

config.parserOptions.project = './tsconfig.eslint.json'

module.exports = config
