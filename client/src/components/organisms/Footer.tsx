import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import Stack from '@mui/material/Stack'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import GitHub from '@mui/icons-material/GitHub'
import LinkedIn from '@mui/icons-material/LinkedIn'
import Twitter from '@mui/icons-material/Twitter'
import Favorite from '@mui/icons-material/Favorite'
import { footerStyles } from './Footer.styles'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <Box component='footer' sx={footerStyles.root}>
      <Container maxWidth='lg'>
        <Stack spacing={3}>
          {/* Main Footer Content */}
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={{ xs: 3, md: 6 }}
            justifyContent='space-between'
            alignItems={{ xs: 'center', md: 'flex-start' }}
          >
            {/* Brand Section */}
            <Stack spacing={1} alignItems={{ xs: 'center', md: 'flex-start' }}>
              <Typography variant='h6' sx={footerStyles.brandText}>
                🔗 TinyURL
              </Typography>
              <Typography variant='body2' sx={footerStyles.description}>
                Fast, reliable, and secure URL shortening service
              </Typography>
            </Stack>

            {/* Links Section */}
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={{ xs: 2, sm: 4 }}
              alignItems='center'
            >
              <Stack
                spacing={1}
                alignItems={{ xs: 'center', md: 'flex-start' }}
              >
                <Typography variant='subtitle2' sx={footerStyles.sectionTitle}>
                  Product
                </Typography>
                <Link href='#' sx={footerStyles.link}>
                  Features
                </Link>
                <Link href='#' sx={footerStyles.link}>
                  API
                </Link>
                <Link href='#' sx={footerStyles.link}>
                  Pricing
                </Link>
              </Stack>

              <Stack
                spacing={1}
                alignItems={{ xs: 'center', md: 'flex-start' }}
              >
                <Typography variant='subtitle2' sx={footerStyles.sectionTitle}>
                  Support
                </Typography>
                <Link href='#' sx={footerStyles.link}>
                  Help Center
                </Link>
                <Link href='#' sx={footerStyles.link}>
                  Contact
                </Link>
                <Link href='#' sx={footerStyles.link}>
                  Status
                </Link>
              </Stack>

              <Stack
                spacing={1}
                alignItems={{ xs: 'center', md: 'flex-start' }}
              >
                <Typography variant='subtitle2' sx={footerStyles.sectionTitle}>
                  Legal
                </Typography>
                <Link href='#' sx={footerStyles.link}>
                  Privacy
                </Link>
                <Link href='#' sx={footerStyles.link}>
                  Terms
                </Link>
                <Link href='#' sx={footerStyles.link}>
                  Security
                </Link>
              </Stack>
            </Stack>

            {/* Social Links */}
            <Stack spacing={2} alignItems='center'>
              <Typography variant='subtitle2' sx={footerStyles.sectionTitle}>
                Connect
              </Typography>
              <Stack direction='row' spacing={1}>
                <IconButton
                  href='https://github.com'
                  target='_blank'
                  rel='noopener noreferrer'
                  sx={footerStyles.socialButton}
                  aria-label='GitHub'
                >
                  <GitHub />
                </IconButton>
                <IconButton
                  href='https://twitter.com'
                  target='_blank'
                  rel='noopener noreferrer'
                  sx={footerStyles.socialButton}
                  aria-label='Twitter'
                >
                  <Twitter />
                </IconButton>
                <IconButton
                  href='https://linkedin.com'
                  target='_blank'
                  rel='noopener noreferrer'
                  sx={footerStyles.socialButton}
                  aria-label='LinkedIn'
                >
                  <LinkedIn />
                </IconButton>
              </Stack>
            </Stack>
          </Stack>

          <Divider sx={footerStyles.divider} />

          {/* Bottom Section */}
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            justifyContent='space-between'
            alignItems='center'
          >
            <Typography variant='body2' sx={footerStyles.copyright}>
              © {currentYear} TinyURL. All rights reserved.
            </Typography>

            <Stack direction='row' spacing={1} alignItems='center'>
              <Typography variant='body2' sx={footerStyles.madeWith}>
                Made with
              </Typography>
              <Favorite sx={footerStyles.heartIcon} />
              <Typography variant='body2' sx={footerStyles.madeWith}>
                using React & Material-UI
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </Box>
  )
}
