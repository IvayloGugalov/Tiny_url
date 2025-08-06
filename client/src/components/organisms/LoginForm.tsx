import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import { useAuthStore } from '@/stores/useAuthStore'
import { Alert } from '../molecules/Alert'
import { EmailSchema } from 'shared'
import { API_BASE_URL } from '@/utils/constants'

interface FormData {
  email: string
  password: string
}

export function LoginForm() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  const login = useAuthStore((state) => state.login)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  const onFinish = async (values: FormData) => {
    setLoading(true)
    setError(null)

    console.log('🔐 Login attempt started', {
      email: values.email,
      API_BASE_URL,
      timestamp: new Date().toISOString(),
    })

    try {
      const loginUrl = `${API_BASE_URL}/api/login`

      console.log('📡 Making login request to:', loginUrl)

      const res = await fetch(loginUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(values),
      })

      console.log('📡 Login response received', {
        status: res.status,
        statusText: res.statusText,
        headers: Object.fromEntries(res.headers.entries()),
      })

      // Check if response is JSON
      const contentType = res.headers.get('content-type')
      if (!contentType?.includes('application/json')) {
        console.error('❌ Non-JSON response received', {
          contentType,
          status: res.status,
          statusText: res.statusText,
        })
        setError(
          `Server error: Expected JSON response but got ${contentType ?? 'unknown content type'}`,
        )
        return
      }

      const data = await res.json()
      console.log('📡 Login response data:', data)

      if (res.ok && data.token) {
        console.log('✅ Login successful')
        login(data.token)
        navigate('/analytics')
      } else {
        console.warn('❌ Login failed', {
          status: res.status,
          error: data.error,
        })
        setError(
          data.error ??
            data.message ??
            `Login failed (${res.status}: ${res.statusText})`,
        )
      }
    } catch (err) {
      console.error('❌ Login network error:', err)

      // Provide more specific error messages
      if (err instanceof TypeError && err.message.includes('fetch')) {
        setError(
          'Cannot connect to server. Please check if the server is running and try again.',
        )
      } else if (err instanceof SyntaxError) {
        setError('Server returned invalid response. Please try again.')
      } else {
        setError(
          `Network error: ${err instanceof Error ? err.message : 'Unknown error occurred'}`,
        )
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container
      maxWidth={false}
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 4,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: '100%',
          maxWidth: 800,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Box mb={3}>
          <Typography variant='h4' gutterBottom>
            Welcome Back
          </Typography>
          <Typography variant='body1' color='text.secondary'>
            Sign in to access your dashboard
          </Typography>
        </Box>

        <form onSubmit={handleSubmit(onFinish)}>
          <Controller
            name='email'
            control={control}
            rules={{
              required: 'Please enter your email',
              validate: (value) => {
                const result = EmailSchema.safeParse(value)
                if (!result.success) {
                  return 'Please enter a valid email address'
                }
                return true
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label='Email'
                type='email'
                autoFocus
                autoComplete='username'
                disabled={loading}
                error={!!errors.email}
                helperText={errors.email?.message}
                variant='outlined'
                fullWidth
                sx={{ mb: 2 }}
              />
            )}
          />

          <Controller
            name='password'
            control={control}
            rules={{
              required: 'Please enter your password',
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label='Password'
                type='password'
                autoComplete='current-password'
                disabled={loading}
                error={!!errors.password}
                helperText={errors.password?.message}
                variant='outlined'
                fullWidth
                sx={{ mb: 2 }}
              />
            )}
          />

          {error && <Alert message={error} severity='error' sx={{ mb: 2 }} />}

          <Button
            variant='contained'
            type='submit'
            disabled={loading}
            fullWidth
          >
            Sign In
          </Button>
        </form>
      </Paper>
    </Container>
  )
}
