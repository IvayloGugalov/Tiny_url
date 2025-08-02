import js from '@eslint/js'
import tseslint from '@typescript-eslint/eslint-plugin'
import tsparser from '@typescript-eslint/parser'
import boundaries from 'eslint-plugin-boundaries'

export default [
  js.configs.recommended,
  {
    files: ['src/**/*.ts'],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
      },
      globals: {
        console: 'readonly',
        process: 'readonly',
        Buffer: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        Bun: 'readonly',
        Response: 'readonly',
        URL: 'readonly',
        TextEncoder: 'readonly',
        TextDecoder: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      boundaries,
    },
    settings: {
      'boundaries/include': ['src/**/*'],
      'boundaries/elements': [
        {
          mode: 'full',
          type: 'domain',
          pattern: ['src/domain/**/*'],
        },
        {
          mode: 'full',
          type: 'application',
          pattern: ['src/application/**/*'],
        },
        {
          mode: 'full',
          type: 'infrastructure',
          pattern: ['src/infrastructure/**/*'],
        },
        {
          mode: 'full',
          type: 'interface-adapters',
          pattern: ['src/interface-adapters/**/*'],
        },
        {
          mode: 'full',
          type: 'di',
          pattern: ['src/di/**/*'],
        },
        {
          mode: 'full',
          type: 'main',
          pattern: ['src/main.ts'],
        },
      ],
      'boundaries/ignore': ['**/*.test.ts', '**/*.spec.ts'],
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ],
      'boundaries/no-unknown': 'error',
      'boundaries/no-unknown-files': 'error',
      'boundaries/element-types': [
        'error',
        {
          default: 'disallow',
          rules: [
            {
              from: 'domain',
              allow: ['domain'],
            },
            {
              from: 'application',
              allow: ['domain', 'application'],
            },
            {
              from: 'infrastructure',
              allow: ['domain', 'application', 'infrastructure'],
            },
            {
              from: 'interface-adapters',
              allow: ['domain', 'application', 'interface-adapters'],
            },
            {
              from: 'di',
              allow: [
                'domain',
                'application',
                'infrastructure',
                'interface-adapters',
                'di',
              ],
            },
            {
              from: 'main',
              allow: [
                'domain',
                'application',
                'infrastructure',
                'interface-adapters',
                'di',
              ],
            },
          ],
        },
      ],
    },
  },
]
