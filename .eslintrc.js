module.exports = {
  root: true,
  extends: [
    require.resolve('@gera2ld/plaid-common-ts/eslint'),
  ],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    '@typescript-eslint/no-unused-vars': ['error', {
      args: 'none',
      ignoreRestSiblings: true,
    }],
  },
};
