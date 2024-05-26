// .eslintrc.js
module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:vue/vue3-recommended',
        'plugin:prettier/recommended',
    ],
    parser: 'vue-eslint-parser',
    // overrideConfig: {
    //     parseOptions: {
    //         ecmaVersion: 'latest',
    //         ecmaFeatures: {
    //             jsx: true,
    //         },
    //         parser: '@typescript-eslint/parser',
    //         sourceType: 'module',
    //     },
    // },
    parserOptions: {
        parser: '@typescript-eslint/parser',
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
    plugins: ['@typescript-eslint', 'vue'],
    rules: {
        indent: ['error', 4],
        'linebreak-style': ['error', 'unix'],
        quotes: ['error', 'single'],
        semi: ['error', 'always'],
        'prettier/prettier': 0,
        '@typescript-eslint/no-explicit-any': ['off'],
        // vite打包时自动去除console和debugger,所以这里直接关掉检查
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'linebreak-style': 0,
        indent: 'off',
        // 'linebreak-style': [
        //     'error',
        //     process.platform === 'win32' ? 'windows' : 'unix',
        // ],
    },
};
