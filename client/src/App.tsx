import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import './App.css'
import { BasicLayout } from '@/layouts/BasicLayout'
import { useAuthStore } from '@/stores/useAuthStore'
import { useThemeStore } from '@/stores/useThemeStore'
import { PublicHomePage } from '@/pages/PublicHomePage'

const AnalyticsPage = lazy(() =>
  import('@/pages/AnalyticsPage').then((module) => ({
    default: module.AnalyticsPage,
  })),
)
const RegistrationPage = lazy(() =>
  import('@/pages/RegistrationPage').then((module) => ({
    default: module.RegistrationPage,
  })),
)
const LoginForm = lazy(() =>
  import('@/organisms/LoginForm').then((module) => ({
    default: module.LoginForm,
  })),
)

function App() {
  const theme = useThemeStore((state) => state.theme)
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  return (
    <BasicLayout theme={theme}>
      <BrowserRouter>
        <Suspense
          fallback={
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '60vh',
              }}
            >
              <CircularProgress />
            </Box>
          }
        >
          <Routes>
            <Route path='/' element={<PublicHomePage />} />
            <Route
              path='/login'
              element={
                isAuthenticated ? (
                  <Navigate to='/analytics' replace />
                ) : (
                  <LoginForm />
                )
              }
            />
            <Route
              path='/register'
              element={
                isAuthenticated ? (
                  <Navigate to='/analytics' replace />
                ) : (
                  <RegistrationPage />
                )
              }
            />
            <Route
              path='/analytics'
              element={
                isAuthenticated ? (
                  <AnalyticsPage />
                ) : (
                  <Navigate to='/login' replace />
                )
              }
            />
            <Route path='*' element={<Navigate to='/' replace />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </BasicLayout>
  )
}

export default App
