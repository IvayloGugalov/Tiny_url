import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import globals from 'globals'

export const baseConfig = tseslint.config(
  {
    ignores: [
      'dist',
      'node_modules',
      '*.config.js',
      '*.config.mjs',
      '**/coverage/**',
      '**/coverage/**/*',
      'server/coverage/**/*'
    ]
  },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
    },
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      'prefer-const': 'error',
      'prefer-const': 'off',
      'no-var': 'error',
    },
  },
)

export const nodeConfig = {
  languageOptions: {
    globals: {
      ...globals.node,
      console: 'readonly',
      process: 'readonly',
      Buffer: 'readonly',
      Bun: 'readonly',
      Response: 'readonly',
      URL: 'readonly',
      TextEncoder: 'readonly',
      TextDecoder: 'readonly',
    },
  },
}

export const browserConfig = {
  languageOptions: {
    globals: globals.browser,
  },
}

export default []