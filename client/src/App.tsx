import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import { LoginForm } from './components'
import { PublicHomePage } from './pages/PublicHomePage'
import { AnalyticsPage } from './pages/AnalyticsPage'
import { BasicLayout } from './layouts/BasicLayout'

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(
    (localStorage.getItem('theme') as 'light' | 'dark') || 'light',
  )
  const [isAuthenticated, setIsAuthenticated] = useState(() =>
    !!localStorage.getItem('jwt')
  )

  // Update theme in localStorage and document when it changes
  useEffect(() => {
    localStorage.setItem('theme', theme)
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  function handleLoginSuccess() {
    setIsAuthenticated(true)
  }

  function handleLogout() {
    localStorage.removeItem('jwt')
    setIsAuthenticated(false)
  }

  return (
    <BasicLayout theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <PublicHomePage
                theme={theme}
                setTheme={setTheme}
                isAuthenticated={isAuthenticated}
              />
            }
          />
          <Route
            path="/login"
            element={
              isAuthenticated ? (
                <Navigate to="/analytics" replace />
              ) : (
                <LoginForm onLoginSuccess={handleLoginSuccess} />
              )
            }
          />
          <Route
            path="/analytics"
            element={
              isAuthenticated ? (
                <AnalyticsPage
                  theme={theme}
                  setTheme={setTheme}
                  onLogout={handleLogout}
                />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </BasicLayout>
  )
}

export default App
