const config =  require('@sumup/foundry/eslint')({
  language: 'TypeScript',
  environments: ['Browser'],
  frameworks: ['React', 'Emotion', 'Jest'],
  openSource: false,
}, {
  rules: {
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off'
  },
  overrides: [
    {
      files: [
        '**/*.story.*',
        '**/*.stories.*',
        '**/setupTests.*',
        '**/test-utils/*',
      ],
      rules: {
        'import/no-extraneous-dependencies': 'off',
      },
    },
  ],
});

config.extends = config.extends.filter(e => e !== 'plugin:json/recommended')

config.parserOptions.project = './tsconfig.eslint.json'

module.exports = config
