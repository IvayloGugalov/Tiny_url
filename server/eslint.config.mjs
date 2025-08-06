import tseslint from 'typescript-eslint'
import boundaries from 'eslint-plugin-boundaries'
import { baseConfig, nodeConfig } from '../eslint.config.mjs'

export default [
  ...baseConfig,
  {
    files: ['src/**/*.ts'],
    ...nodeConfig,
    plugins: {
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
