const { FlatCompat } = require('@eslint/eslintrc');
const nxEslintPlugin = require('@nx/eslint-plugin');
const js = require('@eslint/js');

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

module.exports = [
  { plugins: { '@nx': nxEslintPlugin } },
  ...compat
    .config({
      extends: [
        'plugin:@nx/angular-template',
        'plugin:@angular-eslint/template/recommended',
        'prettier',
      ],
      plugins: ['prettier'],
    })
    .map((config) => ({
      ...config,
      files: ['**/*.html'],
      rules: {
        ...config.rules,
        'prettier/prettier': [
          'error',
          {
            parser: 'angular',
            printWidth: 120,
            tabWidth: 2,
            singleQuote: true,
            quoteProps: 'preserve',
            bracketSpacing: true,
            trailingComma: 'all',
          },
        ],
      },
    })),
  ...compat
    .config({
      extends: [
        'eslint:recommended',
        'plugin:@nx/typescript',
        'plugin:@angular-eslint/recommended',
        'plugin:@angular-eslint/template/process-inline-templates',
        'prettier',
        'plugin:import/recommended',
        'plugin:import/typescript',
      ],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint', 'prettier', 'import'],
      settings: {
        'import/resolver': {
          typescript: { project: './tsconfig.json' },
          node: { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
        },
      },
    })
    .map((config) => ({
      ...config,
      files: ['**/*.ts'],
      rules: {
        ...config.rules,
        'prettier/prettier': [
          'error',
          {
            parser: 'angular',
            printWidth: 120,
            tabWidth: 2,
            embeddedLanguageFormatting: 'off',
            singleQuote: true,
            quoteProps: 'preserve',
            bracketSpacing: true,
            trailingComma: 'all',
          },
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
            groups: [
              'builtin',
              'external',
              'internal',
              ['sibling', 'parent'],
              'index',
              'unknown',
            ],
            'newlines-between': 'always',
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
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-namespace': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        'comma-dangle': ['error', 'always-multiline'],
        quotes: ['error', 'single', { avoidEscape: true }],
        semi: ['error', 'always'],
        'object-curly-spacing': ['error', 'always'],
      },
    })),
  ...compat
    .config({
      extends: ['plugin:jest/recommended'],
      plugins: ['jest'],
      env: { 'jest/globals': true },
    })
    .map((config) => ({
      ...config,
      files: ['**/*.spec.ts'],
      rules: {
        ...config.rules,
        'comma-dangle': ['error', 'always-multiline'],
        'jest/consistent-test-it': ['error', { fn: 'it' }],
        'jest/require-hook': 'error',
        'jest/require-top-level-describe': 'error',
        'jest/expect-expect': 'error',
        'jest/no-disabled-tests': 'error',
        'jest/prefer-to-have-length': 'error',
        '@typescript-eslint/no-empty-function': [
          'error',
          { allow: ['arrowFunctions'] },
        ],
      },
    })),
];
