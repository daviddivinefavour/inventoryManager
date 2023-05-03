module.exports = {
  env: {
    es2021: true,
    node: true
  },
  extends: ['airbnb-base', 'prettier', 'eslint:recommended'],
  plugins: ['prettier'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto'
      }
    ],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never'
      }
    ],
    'spaced-comment': 'off',
    'no-console': 'error',
    'consistent-return': 'off',
    'func-names': 'off',
    'object-shorthand': 'off',
    'no-process-exit': 'off',
    'no-unused-vars': ['error', { argsIgnorePattern: 'req|res|next|val' }]
  }
};
