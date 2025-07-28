import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['tests/**/*.test.ts'],
    exclude: ['node_modules', 'dist'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.ts'],
      exclude: [
        'src/main.ts',
        'src/infrastructure/**',
        'src/interface-adapters/**',
        'src/**/*.d.ts',
        'src/**/index.ts'
      ],
      thresholds: {
        global: {
          branches: 100,
          functions: 100,
          lines: 100,
          statements: 100
        }
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'domain': path.resolve(__dirname, './src/domain'),
      'application': path.resolve(__dirname, './src/application'),
      'infrastructure': path.resolve(__dirname, './src/infrastructure'),
      'interface-adapters': path.resolve(__dirname, './src/interface-adapters'),
      'di': path.resolve(__dirname, './src/di')
    }
  }
})
