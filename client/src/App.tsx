import { useState } from 'react'
import { ConfigProvider, theme as antdTheme } from 'antd'
import './App.css'
import { LoginForm } from './components'
import { PublicHomePage } from './pages/PublicHomePage'
import { AnalyticsPage } from './pages/AnalyticsPage'

const BRAND_TOKENS = {
  colorPrimary: '#e86222', // orange
  colorInfo: '#5d7bee', // accent blue
  colorSuccess: '#80f2e6', // secondary mint
  colorTextBase: '#1b0b03', // text for light
  colorBgBase: '#fef6f3', // background for light
  fontSize: 16, // 1rem
  fontSizeHeading1: 40, // 2.5rem
  fontSizeHeading2: 24, // 1.5rem
}

const BRAND_TOKENS_DARK = {
  colorPrimary: '#de5617', // orange dark
  colorInfo: '#112ea2', // accent dark blue
  colorSuccess: '#0d7d71', // secondary dark teal
  colorTextBase: '#fcece3', // text for dark
  colorBgBase: '#0e0501', // background for dark
  fontSize: 16, // 1rem
  fontSizeHeading1: 40, // 2.5rem
  fontSizeHeading2: 24, // 1.5rem
}

type AppView = 'home' | 'login' | 'analytics'

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>((localStorage.getItem('theme') as 'light' | 'dark') || 'light')
  const [currentView, setCurrentView] = useState<AppView>('home')
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!localStorage.getItem('jwt'))

  const isDark = theme === 'dark'

  function handleLoginSuccess() {
    setIsAuthenticated(true)
    setCurrentView('analytics')
  }

  function handleLogout() {
    localStorage.removeItem('jwt')
    setIsAuthenticated(false)
    setCurrentView('home')
  }

  function handleGoToAnalytics() {
    if (isAuthenticated) {
      setCurrentView('analytics')
    } else {
      setCurrentView('login')
    }
  }

  function handleGoHome() {
    setCurrentView('home')
  }

  function handleShowLogin() {
    setCurrentView('login')
  }

  return (
    <ConfigProvider
      theme={{
        algorithm: isDark ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
        token: isDark ? BRAND_TOKENS_DARK : BRAND_TOKENS,
        cssVar: { key: 'app' },
      }}
    >
      {/* Show login form if user is on login view */}
      {currentView === 'login' && (
        <LoginForm onLoginSuccess={handleLoginSuccess} />
      )}

      {/* Show analytics page if authenticated and on analytics view */}
      {currentView === 'analytics' && isAuthenticated && (
        <AnalyticsPage
          theme={theme}
          setTheme={setTheme}
          onLogout={handleLogout}
          onGoHome={handleGoHome}
        />
      )}

      {/* Show public home page by default */}
      {currentView === 'home' && (
        <PublicHomePage
          theme={theme}
          setTheme={setTheme}
          onLogin={handleShowLogin}
          onGoToAnalytics={handleGoToAnalytics}
        />
      )}
    </ConfigProvider>
  )
}

export default App
