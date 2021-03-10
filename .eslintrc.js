module.exports = {
    root: true,
    env: {
        es6: true,
        node: true,
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        sourceType: 'module',
        ecmaVersion: 2018,
        project: ['./tsconfig.eslint.json'],
    },
    plugins: ['@typescript-eslint', 'jest'],
    extends: [
        'airbnb-typescript/base',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'prettier',
    ],
    rules: {
        quotes: ['error', 'single', { 'avoidEscape': true, 'allowTemplateLiterals': false }],
        semi: ['error', 'always'],
        'import/no-extraneous-dependencies': 'off',
        'no-void': ['error', { allowAsStatement: true }],
        'no-console': ['error', { allow: ['info', 'error'] }],
        '@typescript-eslint/unbound-method': 'off'
    },
};
