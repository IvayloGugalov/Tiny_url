import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import { LoginForm } from './components'
import { PublicHomePage } from './pages/PublicHomePage'
import { AnalyticsPage } from './pages/AnalyticsPage'
import { RegistrationPage } from './pages/RegistrationPage'
import { BasicLayout } from './layouts/BasicLayout'
import { useAuthStore, useThemeStore } from './stores'

function App() {
  const theme = useThemeStore((state) => state.theme)
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  return (
    <BasicLayout theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<PublicHomePage />} />
          <Route
            path='/login'
            element={isAuthenticated ? <Navigate to='/analytics' replace /> : <LoginForm />}
          />
          <Route
            path='/register'
            element={isAuthenticated ? <Navigate to='/analytics' replace /> : <RegistrationPage />}
          />
          <Route
            path='/analytics'
            element={isAuthenticated ? <AnalyticsPage /> : <Navigate to='/login' replace />}
          />
          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
      </BrowserRouter>
    </BasicLayout>
  )
}

export default App
