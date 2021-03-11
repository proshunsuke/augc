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
        quotes: ['error', 'single', {'avoidEscape': true, 'allowTemplateLiterals': false}],
        semi: ['error', 'always'],
        'import/no-extraneous-dependencies': 'off',
        'no-void': ['error', {allowAsStatement: true}],
        'no-console': ['error', {allow: ['info', 'error']}],
        '@typescript-eslint/unbound-method': 'off',
        'no-restricted-syntax': [
            'error',
            {
                selector: 'ForInStatement',
                message: 'for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.',
            },
            // {
            //     selector: 'ForOfStatement',
            //     message: 'iterators/generators require regenerator-runtime, which is too heavyweight for this guide to allow them. Separately, loops should be avoided in favor of array iterations.',
            // },
            {
                selector: 'LabeledStatement',
                message: 'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.',
            },
            {
                selector: 'WithStatement',
                message: '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.',
            },
        ],
    },
};
