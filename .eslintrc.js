const OFF = 0,
  WARN = 1,
  ERROR = 2;

module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: [
    'prettier',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-native/all',
    'standard',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    project: './tsconfig.eslint.json',
  },
  plugins: ['@typescript-eslint', 'react', 'react-native'],
  settings: {
    react: {
      pragma: 'React',
      version: 'detect',
    },
  },
  globals: {
    __DEV__: false,
    jasmine: false,
    beforeAll: false,
    afterAll: false,
    beforeEach: false,
    afterEach: false,
    test: false,
    expect: false,
    describe: false,
    jest: false,
    it: false,
  },
  rules: {
    'comma-dangle': OFF,
    'no-unused-vars': OFF,
    'no-undef': OFF,
    quotes: WARN,
    'no-tabs': WARN,
    indent: [OFF, 4],
    'no-console': WARN,
    'react/no-unescaped-entities': OFF,
    'react/prop-types': OFF,
    'react/display-name': OFF,
    'react-native/no-raw-text': OFF,
    'space-before-function-paren': OFF,
    semi: [WARN, 'always'],
    'object-shorthand': 'warn',
    'react-native/no-inline-styles': OFF,
    'react-native/sort-styles': OFF,
    'react/jsx-curly-brace-presence': ERROR,
    'no-restricted-syntax': [
      'error',
      {
        selector:
          ':matches(JSXElement, JSXFragment) > JSXExpressionContainer > LogicalExpression[operator="&&"][left.operator!="!"][left.right.operator!="!"]:not(UnaryExpression > LogicalExpression):not(CallExpression > LogicalExpression)[left.type!="BinaryExpression"][left.right.type!="BinaryExpression"][left.type!="CallExpression"][left.right.type!="CallExpression"]',
        message:
          'Please use a ternary, or cast left operand using ! or !! (bang operator) instead',
      },
    ],
    '@typescript-eslint/ban-ts-ignore': OFF,
    '@typescript-eslint/indent': OFF,
    '@typescript-eslint/explicit-member-accessibility': OFF,
    '@typescript-eslint/explicit-function-return-type': OFF,
    '@typescript-eslint/member-delimiter-style': OFF,
    '@typescript-eslint/no-explicit-any': OFF,
    '@typescript-eslint/no-object-literal-type-assertion': OFF,
    '@typescript-eslint/no-empty-interface': OFF,
    '@typescript-eslint/no-var-requires': OFF,
    '@typescript-eslint/no-use-before-define': OFF,
    '@typescript-eslint/type-annotation-spacing': [
      'warn',
      {
        after: true,
      },
    ],
    'no-use-before-define': OFF,
  },
};
