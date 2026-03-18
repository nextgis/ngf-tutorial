// @ts-check

import js from '@eslint/js';
import { flatConfigs as importFlatConfigs } from 'eslint-plugin-import-x';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';
import { configs, parser } from 'typescript-eslint';

export default [
  {
    ignores: ['dist', 'node_modules/'],
  },

  js.configs.recommended,

  ...configs.recommended,

  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
      globals: {
        ...globals.browser,
        ...globals.es2020,
      },
    },
    rules: {
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/consistent-type-imports': 'warn',
    },
  },

  reactPlugin.configs.flat.recommended,
  reactPlugin.configs.flat['jsx-runtime'],
  reactHooks.configs.flat.recommended,

  {
    settings: {
      react: {
        version: 'detect',
      },
    },
  },

  {
    files: ['**/*.{jsx,tsx}'],

    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react/prop-types': 'off', // Use TypeScript instead
      'react/display-name': 'warn',
    },
  },

  importFlatConfigs.recommended,
  importFlatConfigs.typescript,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    rules: {
      'sort-imports': ['warn', { ignoreDeclarationSort: true }],
      'import-x/first': 'warn',
      'import-x/newline-after-import': 'warn',
      'import-x/order': [
        'warn',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
            'type',
          ],
          alphabetize: {
            order: 'asc',
            orderImportKind: 'asc',
          },
          'newlines-between': 'always',
        },
      ],
    },
    settings: {
      'import-x/resolver': {
        typescript: {
          alwaysTryTypes: true,
        },
      },
    },
  },
  prettierRecommended,
];
