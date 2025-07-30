import { defineConfig } from 'vite'
import browserslist from 'browserslist';
import react from '@vitejs/plugin-react'
import path from 'path'
import { browserslistToTargets } from 'lightningcss';

export default defineConfig({
  plugins: [react()],
  css: {
    transformer: 'lightningcss',
    lightningcss: {
      targets: browserslistToTargets(browserslist('>= 0.25%'))
    }
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      '@mui/material',
      '@mui/material/Container',
      '@mui/material/Divider',
      '@mui/material/IconButton',
      '@mui/material/AppBar',
      '@mui/material/Toolbar',
      '@mui/material/useMediaQuery',
      '@mui/material/TextField',
      '@mui/material/InputAdornment',
      '@mui/material/Tooltip',
      '@mui/material/Card',
      '@mui/material/Box',
      '@mui/material/Typography',
      '@mui/material/Button',
      '@mui/material/Chip',
      '@mui/material/Link',
      '@mui/material/Alert',
      '@mui/material/CircularProgress',
      '@mui/material/Paper',
      '@mui/material/Stack',
      '@mui/material/useTheme',
      '@mui/icons-material/GitHub',
      '@mui/icons-material/LinkedIn',
      '@mui/icons-material/Twitter',
      '@mui/icons-material/Favorite',
      '@mui/icons-material/Brightness4',
      '@mui/icons-material/Brightness7',
      '@mui/icons-material/Link',
      '@mui/icons-material/ContentCopy',
      '@mui/icons-material/CheckCircle',
      '@mui/icons-material/AutoAwesome',
      '@mui/icons-material/Refresh',
      'framer-motion',
      'react-router-dom',
      'zustand',
      'react-hook-form',
      '@mui/x-charts',
      '@mui/x-data-grid',
      'prop-types'
    ],
    esbuildOptions: {
      target: 'es2020'
    }
  },
  resolve: {
    alias: {
      "@/components": path.resolve(__dirname, "./src/components"),
      "@/atoms": path.resolve(__dirname, "./src/components/atoms"),
      "@/molecules": path.resolve(__dirname, "./src/components/molecules"),
      "@/organisms": path.resolve(__dirname, "./src/components/organisms"),
      "@/stores": path.resolve(__dirname, "./src/stores"),
      "@/layouts": path.resolve(__dirname, "./src/layouts"),
      "@/pages": path.resolve(__dirname, "./src/pages"),
      "@/utils": path.resolve(__dirname, "./src/utils"),
      "@/styles": path.resolve(__dirname, "./src/styles"),
      "@/types": path.resolve(__dirname, "./src/types"),
      "@/api": path.resolve(__dirname, "./src/api.ts")
    }
  },
  build: {
    target: 'esnext',
    minify: 'esbuild',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // MUI Material + Icons together (but separate from React)
          if (id.includes('@mui/material') || id.includes('@mui/icons-material')) {
            return 'mui-vendor';
          }

          // Heavy MUI X packages
          if (id.includes('@mui/x-charts') || id.includes('@mui/x-data-grid')) {
            return 'mui-x-vendor';
          }

          // Framer Motion
          if (id.includes('framer-motion')) {
            return 'animation-vendor';
          }

          // React Router
          if (id.includes('react-router-dom')) {
            return 'router-vendor';
          }

          // Optional: split by route/page
          if (id.includes('/src/pages/')) {
            const match = id.match(/\/src\/pages\/([^/]+)/);
            if (match) {
              return `page-${match[1]}`;
            }
          }

          // Fallback vendor chunk
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
    commonjsOptions: {
      include: [/node_modules/],
      transformMixedEsModules: true
    }
  },
  esbuild: {
    legalComments: 'none',
    target: 'es2020'
  }
})
