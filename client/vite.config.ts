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
  resolve: {
    alias: {
      "@client": path.resolve(__dirname, "./src"),
      "@server": path.resolve(__dirname, "../server/src"),
      "@shared": path.resolve(__dirname, "../shared/src")
    }
  }
})
