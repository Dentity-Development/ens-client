import typescriptEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: ['**/node_modules', '**/dist', '**/coverage', '**/*.min.js'],
  },
  ...compat.extends(
    'prettier',
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ),
  {
    plugins: {
      '@typescript-eslint': typescriptEslint,
    },
 
    languageOptions: {
      parser: tsParser,
    },

    rules: {
      quotes: ['error', 'single'],
      'no-useless-escape': 'off',
      '@typescript-eslint/no-var-requires': 0,
      'no-console': 0,
      semi: ['error', 'always'],
      '@typescript-eslint/ban-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',

      '@typescript-eslint/no-empty-interface': [
        'warn',
        {
          allowSingleExtends: false,
        },
      ],

      'no-empty-function': 'off',
    },
  },
  {
    files: ['**/*.ts'],
    rules: {},
  },
];
