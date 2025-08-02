import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'
import MuiLink from '@mui/material/Link'
import { useAuthStore } from '@/stores/useAuthStore'

interface FormData {
  email: string
  name: string
}

export function RegistrationForm() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate()
  const register = useAuthStore((state) => state.register)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  const onSubmit = async (values: FormData) => {
    try {
      setLoading(true)
      setError(null)

      await register(values.email, values.name || undefined)
      setSuccess(true)

      // Redirect to analytics page after successful registration
      setTimeout(() => {
        navigate('/analytics')
      }, 1500)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  const handleLoginClick = () => {
    navigate('/login')
  }

  if (success) {
    return (
      <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant='h5' gutterBottom color='success.main'>
            🎉 Registration Successful!
          </Typography>
          <Typography variant='body1' sx={{ mb: 2 }}>
            Welcome to TinyURL! Redirecting you to your dashboard...
          </Typography>
          <CircularProgress size={24} />
        </Paper>
      </Box>
    )
  }

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant='h4' gutterBottom textAlign='center'>
          Create Account
        </Typography>
        <Typography
          variant='body1'
          color='text.secondary'
          textAlign='center'
          sx={{ mb: 3 }}
        >
          Join TinyURL to track your links and access detailed analytics
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name='email'
            control={control}
            rules={{
              required: 'Email is required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Please enter a valid email address',
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label='Email Address'
                type='email'
                fullWidth
                margin='normal'
                error={!!errors.email}
                helperText={errors.email?.message}
                disabled={loading}
                autoComplete='email'
                autoFocus
              />
            )}
          />

          <Controller
            name='name'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label='Full Name (Optional)'
                fullWidth
                margin='normal'
                disabled={loading}
                autoComplete='name'
                helperText='This will be displayed in your account'
              />
            )}
          />

          {error && (
            <Alert severity='error' sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}

          <Button
            type='submit'
            fullWidth
            variant='contained'
            size='large'
            disabled={loading}
            sx={{ mt: 3, mb: 2 }}
          >
            {loading ? (
              <>
                <CircularProgress size={20} sx={{ mr: 1 }} />
                Creating Account...
              </>
            ) : (
              'Create Account'
            )}
          </Button>

          <Box textAlign='center'>
            <Typography variant='body2' color='text.secondary'>
              Already have an account?{' '}
              <MuiLink
                component='button'
                type='button'
                onClick={handleLoginClick}
                sx={{ textDecoration: 'none' }}
              >
                Sign in here
              </MuiLink>
            </Typography>
          </Box>
        </form>
      </Paper>
    </Box>
  )
}
