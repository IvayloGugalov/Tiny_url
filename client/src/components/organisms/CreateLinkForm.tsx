import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { createShortLink } from '../../api'
import { Alert } from '../molecules/Alert'
import { TextField, Box, Typography, Button } from '@mui/material'
import { createLinkFormStyles } from './CreateLinkForm.styles'

interface CreateLinkFormProps {
  onLinkCreated: () => void
}

interface FormData {
  targetUrl: string
}

export function CreateLinkForm({ onLinkCreated }: CreateLinkFormProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const { control, handleSubmit, reset, formState: { errors } } = useForm<FormData>()

  async function onFinish(values: FormData) {
    try {
      setLoading(true)
      setError(null)
      setSuccess(null)
      const result = await createShortLink(values.targetUrl)
      setSuccess(`Short link created: ${result.shortUrl}`)
      reset()
      onLinkCreated()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create short link')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box>
      <Box mb={3}>
        <Typography
          variant="h4"
          gutterBottom
          sx={createLinkFormStyles.title}
        >
          Create New Short Link
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={createLinkFormStyles.description}
        >
          Transform long URLs into short, shareable links instantly.
        </Typography>
      </Box>

      <form onSubmit={handleSubmit(onFinish)}>
        <Controller
          name="targetUrl"
          control={control}
          rules={{
            required: 'Please enter a URL',
            pattern: {
              value: /^https?:\/\/.+/,
              message: 'Please enter a valid URL (including http:// or https://)'
            }
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Target URL"
              placeholder="https://example.com/very-long-url"
              disabled={loading}
              error={!!errors.targetUrl}
              helperText={errors.targetUrl?.message}
              variant="outlined"
              fullWidth
              sx={createLinkFormStyles.textField}
            />
          )}
        />

        {error && <Alert message={error} severity="error" sx={createLinkFormStyles.alert} />}
        {success && <Alert message={success} severity="success" sx={createLinkFormStyles.alert} />}

        <Button
          variant="contained"
          type="submit"
          disabled={loading}
          size="large"
          sx={createLinkFormStyles.submitButton}
        >
          Create Short Link
        </Button>
      </form>
    </Box>
  )
}
