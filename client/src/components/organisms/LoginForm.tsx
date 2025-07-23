import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Alert } from '../molecules/Alert'
import { TextField, Box, Typography, Button } from '@mui/material'

interface LoginFormProps {
  onLoginSuccess: () => void
}

interface FormData {
  email: string
  password: string
}

export function LoginForm({ onLoginSuccess }: LoginFormProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  const { control, handleSubmit, formState: { errors } } = useForm<FormData>()

  const onFinish = async (values: FormData) => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
      const data = await res.json()
      if (res.ok && data.token) {
        localStorage.setItem('jwt', data.token)
        onLoginSuccess()
        navigate('/analytics')
      } else {
        setError(data.error || 'Login failed')
      }
    } catch (err) {
      console.error(err)
      setError('Network error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box>
      <Box mb={3}>
        <Typography variant="h4" gutterBottom>
          Welcome Back
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Sign in to access your dashboard
        </Typography>
      </Box>

      <form onSubmit={handleSubmit(onFinish)}>
        <Controller
          name="email"
          control={control}
          rules={{
            required: 'Please enter your email',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Please enter a valid email address'
            }
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Email"
              type="email"
              autoFocus
              autoComplete="username"
              disabled={loading}
              error={!!errors.email}
              helperText={errors.email?.message}
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          rules={{
            required: 'Please enter your password'
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Password"
              type="password"
              autoComplete="current-password"
              disabled={loading}
              error={!!errors.password}
              helperText={errors.password?.message}
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
            />
          )}
        />

        {error && <Alert message={error} severity="error" sx={{ mb: 2 }} />}

        <Button
          variant="contained"
          type="submit"
          disabled={loading}
          fullWidth
        >
          Sign In
        </Button>
      </form>
    </Box>
  )
}
