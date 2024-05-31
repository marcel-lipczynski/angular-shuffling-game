// eslint.config.js
import angularTemplatePlugin from '@angular-eslint/eslint-plugin-template';
import angularEslintPlugin from '@angular-eslint/eslint-plugin';
import typescriptEslintPlugin from '@typescript-eslint/eslint-plugin';
import jestPlugin from 'eslint-plugin-jest';
import importPlugin from 'eslint-plugin-import';

module.exports = {
  root: true,
  plugins: [
    '@nx',
    angularTemplatePlugin,
    angularEslintPlugin,
    typescriptEslintPlugin,
    jestPlugin,
    importPlugin,
  ],
  overrides: [
    {
      files: ['*.html'],
      extends: ['plugin:@nx/angular-template', 'plugin:@angular-eslint/template/recommended', 'prettier'],
      rules: {
        'prettier/prettier': [
          'error',
          {
            "printWidth": 80,
            "tabWidth": 2,
            "singleQuote": true,
            "quoteProps": "preserve",
            "bracketSpacing": true,
            "trailingComma": "es5"
          }
        ],
      },
    },
    {
      files: ['*.ts'],
      extends: [
        'eslint:recommended',
        'plugin:@nx/typescript',
        'plugin:@angular-eslint/recommended',
        'plugin:@angular-eslint/template/process-inline-templates',
        './.eslintrc-overrides.json',
        'prettier',
        'plugin:import/recommended',
        'plugin:import/typescript',
      ],
      parser: '@typescript-eslint/parser',
      rules: {
        'prettier/prettier': [
          'error',
          {
            "printWidth": 80,
            "tabWidth": 2,
            "singleQuote": true,
            "quoteProps": "preserve",
            "bracketSpacing": true,
            "trailingComma": "es5"
          }
        ],
        'sort-imports': [
          'error',
          {
            ignoreCase: false,
            ignoreDeclarationSort: true,
            ignoreMemberSort: false,
            memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
            allowSeparatedGroups: true,
          },
        ],
        'import/no-unresolved': 'off',
        'import/order': [
          'error',
          {
            groups: ['builtin', 'external', 'internal', ['sibling', 'parent'], 'index', 'unknown'],
            newlinesBetween: 'always',
            alphabetize: {
              order: 'asc',
              caseInsensitive: true,
            },
          },
        ],
        '@angular-eslint/no-empty-lifecycle-method': 'error',
        '@angular-eslint/no-input-rename': 'error',
        '@angular-eslint/no-output-rename': 'error',
        '@angular-eslint/use-lifecycle-interface': 'error',
        '@angular-eslint/directive-selector': [
          'error',
          {
            type: 'attribute',
            prefix: 'pro',
            style: 'camelCase',
          },
        ],
        '@angular-eslint/component-selector': [
          'error',
          {
            type: 'element',
            prefix: 'pro',
            style: 'kebab-case',
          },
        ],
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-namespace': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        'comma-dangle': ['error', 'always-multiline'],
        quotes: ['error', 'single', { avoidEscape: true }],
        semi: ['error', 'always'],
        'object-curly-spacing': ['error', 'always'],
      },
      settings: {
        'import/resolver': {
          typescript: {
            project: './tsconfig.json',
          },
          node: {
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
          },
        },
      },
    },
    {
      files: ['*.spec.ts'],
      extends: ['plugin:jest/recommended'],
      rules: {
        'comma-dangle': ['error', 'always-multiline'],
        'jest/consistent-test-it': ['error', { fn: 'it' }],
        'jest/require-hook': 'error',
        'jest/require-top-level-describe': 'error',
        'jest/expect-expect': 'error',
        'jest/no-disabled-tests': 'error',
        'jest/prefer-to-have-length': 'error',
        '@typescript-eslint/no-empty-function': ['error', { allow: ['arrowFunctions'] }],
      },
      env: {
        'jest/globals': true,
      },
    },
  ],
};
