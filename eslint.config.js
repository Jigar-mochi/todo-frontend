import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'indent': ['error', 4], // Enforce 4 spaces for indentation
      'no-unused-vars': ['warn', { vars: 'all', args: 'after-used', ignoreRestSiblings: true }], // Warn on unused variables
      'semi': ['error', 'always'], // Enforce semicolons
      'quotes': ['error', 'single', { avoidEscape: true }], // Use single quotes
      'eqeqeq': ['error', 'always'], // Require strict equality
      'curly': ['error', 'all'], // Enforce consistent curly braces for control statements
      'no-console': 'warn', // Warn on console statements
      'no-debugger': 'error', // Disallow the use of debugger
      'arrow-spacing': ['error', { before: true, after: true }], // Enforce spaces around arrow functions
      'object-curly-spacing': ['error', 'always'], // Enforce spacing inside curly braces
      'array-bracket-spacing': ['error', 'never'], // Disallow spacing inside array brackets
      'key-spacing': ['error', { beforeColon: false, afterColon: true }], // Enforce spacing around object literal keys and values
    },
  },
);
