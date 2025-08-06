import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { baseConfig, browserConfig } from '../eslint.config.mjs'

export default tseslint.config(
  ...baseConfig,
  {
    files: ['**/*.{ts,tsx}'],
    ...browserConfig,
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
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: '@mui/material',
              message:
                'Use direct imports instead of barrel imports for better dev performance. Example: import Button from "@mui/material/Button"',
            },
            {
              name: '@mui/icons-material',
              message:
                'Use direct imports instead of barrel imports for better dev performance. Example: import AccessTime from "@mui/icons-material/AccessTime"',
            },
          ],
        },
      ],
    },
  },
)
