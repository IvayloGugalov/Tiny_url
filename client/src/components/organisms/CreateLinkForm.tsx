import { useState, useRef, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { motion, AnimatePresence } from 'framer-motion'
import { createShortLink } from '@/api'
import { Alert } from '@/molecules/Alert'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import LinkIcon from '@mui/icons-material/Link'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import SparkleIcon from '@mui/icons-material/AutoAwesome'
import { createLinkFormStyles } from './CreateLinkForm.styles'
import InputAdornment from '@mui/material/InputAdornment'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import CircularProgress from '@mui/material/CircularProgress'
import Paper from '@mui/material/Paper'
import { useTheme } from '@mui/material/styles'
import Chip from '@mui/material/Chip'

interface FormData {
  targetUrl: string
}

export function CreateLinkForm() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [shortUrl, setShortUrl] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const theme = useTheme()

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>()

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  async function onFinish(values: FormData) {
    try {
      setLoading(true)
      setError(null)
      setShortUrl(null)
      setCopied(false)
      setShowSuccess(false)

      const result = await createShortLink(values.targetUrl)

      setShortUrl(result.shortUrl)
      setShowSuccess(true)
      reset()

      setTimeout(() => setShowSuccess(false), 3000)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create short link'
      setError(
        errorMessage.includes('http')
          ? 'Please enter a valid URL (including http:// or https://)'
          : errorMessage,
      )
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = async () => {
    if (shortUrl) {
      try {
        await navigator.clipboard.writeText(shortUrl)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch {
        setError('Failed to copy to clipboard')
      }
    }
  }

  return (
    <Paper elevation={4} sx={createLinkFormStyles.container}>
      <Box sx={createLinkFormStyles.header}>
        <Typography variant='h2' gutterBottom sx={createLinkFormStyles.title}>
          Create a short link
        </Typography>
        <Typography variant='body1' sx={createLinkFormStyles.description}>
          Transform long URLs into short, shareable links instantly.
        </Typography>
        <Typography variant='body2' sx={createLinkFormStyles.helperText}>
          Your short link will look like: <strong>tinyurl.com/abc123</strong>
        </Typography>
      </Box>

      <Box
        sx={{
          px: 3,
          py: 4,
          background:
            'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.9) 100%)',
          transition: 'all 0.3s ease',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: 3,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          '&:hover': {
            boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
            transform: 'translateY(-2px)',
          },
        }}
      >
        <form onSubmit={handleSubmit(onFinish)}>
          <Controller
            name='targetUrl'
            control={control}
            rules={{
              required: 'Please enter a URL',
              pattern: {
                value: /^https?:\/\/.+/,
                message: 'Please enter a valid URL (including http:// or https://)',
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                inputRef={inputRef}
                label='Target URL'
                placeholder='https://example.com/very-long-url'
                disabled={loading}
                error={!!errors.targetUrl}
                helperText={errors.targetUrl?.message}
                variant='outlined'
                fullWidth
                autoFocus
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <LinkIcon color='action' />
                    </InputAdornment>
                  ),
                }}
                sx={createLinkFormStyles.inputField}
              />
            )}
          />

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <Alert message={error} severity='error' sx={createLinkFormStyles.alert} />
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {shortUrl && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <Box sx={createLinkFormStyles.resultContainer}>
                  {showSuccess && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: theme.palette.success.main,
                        fontSize: '2rem',
                        marginBottom: '8px',
                      }}
                    >
                      <CheckCircleIcon fontSize='inherit' />
                    </motion.div>
                  )}
                  <Typography
                    variant='body2'
                    color='success.main'
                    gutterBottom
                    sx={{ textAlign: 'center', fontWeight: 600 }}
                  >
                    Your short link is ready!
                  </Typography>
                  <Box display='flex' alignItems='center' gap={1}>
                    <TextField
                      value={shortUrl}
                      InputProps={{
                        readOnly: true,
                        sx: { backgroundColor: 'white', borderRadius: 1 },
                      }}
                      variant='outlined'
                      fullWidth
                      size='small'
                    />
                    <Tooltip title={copied ? 'Copied!' : 'Copy to clipboard'}>
                      <IconButton
                        onClick={handleCopy}
                        sx={createLinkFormStyles.copyButton}
                        color={copied ? 'success' : 'primary'}
                      >
                        {copied ? <CheckCircleIcon /> : <ContentCopyIcon />}
                      </IconButton>
                    </Tooltip>
                  </Box>
                  {copied && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                    >
                      <Chip
                        icon={<SparkleIcon />}
                        label='Copied to clipboard!'
                        color='success'
                        size='small'
                        sx={{ mt: 1, mx: 'auto', display: 'flex', width: 'fit-content' }}
                      />
                    </motion.div>
                  )}
                </Box>
              </motion.div>
            )}
          </AnimatePresence>

          <Button
            variant='contained'
            type='submit'
            disabled={loading}
            size='large'
            sx={createLinkFormStyles.submitButton}
            startIcon={loading ? <CircularProgress size={20} color='inherit' /> : <SparkleIcon />}
          >
            {loading ? 'Shortening...' : 'Shorten URL'}
          </Button>
        </form>
      </Box>
    </Paper>
  )
}
