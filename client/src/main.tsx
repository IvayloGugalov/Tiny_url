import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { CacheProvider } from '@emotion/react'
import App from './App'
import { createEmotionCache } from '@/utils/colorUtils'
import './App.css'

const clientSideEmotionCache = createEmotionCache()

const container = document.getElementById('root')

if (!container) {
  throw new Error('Root element not found')
}

const root = createRoot(container)
root.render(
  <CacheProvider value={clientSideEmotionCache}>
    <StrictMode>
      <App />
    </StrictMode>
  </CacheProvider>
)
