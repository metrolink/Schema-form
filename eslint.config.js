import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import json from '@eslint/json';
import { defineConfig } from 'eslint/config';


export default defineConfig([
    {
        files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
        plugins: { js },
        extends: ['js/recommended'],
        settings: {
            react: {
                version: 'detect', // Automatically detect the React version
            },
        },
        rules: {
            semi: 'error',
            quotes: [ 'error', 'single' ],
            'space-before-function-paren': [
                'error',
                {
                    anonymous: 'always',
                    named: 'never',
                    asyncArrow: 'always'
                }
            ],
            'space-before-blocks': 'warn',
            'no-trailing-spaces': 'warn',
            'keyword-spacing': [
                'error',
                {
                    before: true,
                    after: true
                }
            ],
            curly: 'error',
            'arrow-parens': 'warn'
        }
    }, {
        files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
        languageOptions: { globals: globals.browser }
    },
    tseslint.configs.recommended,
    {
        ...pluginReact.configs.flat.recommended,
        settings: {
            react: {
                pragma: 'React', // Pragma to use, default to 'React'
                version: 'detect', // Automatically detect the React version
            },
        },
        rules: {
            'react/react-in-jsx-scope': 'off', // Disable the rule for React 17+
        },
    }, {
        files: ['**/*.json'],
        plugins: { json },
        language: 'json/json',
        extends: ['json/recommended']
    }, {
        files: ['**/*.jsonc'],
        plugins: { json },
        language: 'json/jsonc',
        extends: ['json/recommended']
    },
]);
