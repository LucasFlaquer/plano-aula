module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/essential',
    'prettier',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-unused-vars': 'off',
    // 'object-curly-new-line': 'off',
    'linebreak-style': 'off',
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    // 'object-curly-newline': [
    //   'error',
    //   {
    //     ObjectExpression: 'always',
    //     ObjectPattern: {
    //       multiline: true,
    //       minProperties: 3,
    //     },
    //     ImportDeclaration: 'never',
    //     ExportDeclaration: {
    //       multiline: true,
    //       minProperties: 3,
    //     },
    //   },
    // ],
  },
}
