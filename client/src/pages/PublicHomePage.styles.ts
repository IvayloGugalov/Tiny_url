import { TYPOGRAPHY_SIZES, RESPONSIVE } from '../styles/constants'

export const publicHomePageStyles = {
  featuresPaper: {
    padding: RESPONSIVE.padding,
  },
  featuresTitle: {
    fontSize: TYPOGRAPHY_SIZES.h5,
  },
  featuresList: {
    mt: 2,
  },
  featureItem: {
    fontSize: TYPOGRAPHY_SIZES.body1,
  },
  // New styles for the "Why Choose TinyURL?" section
  whyChooseSection: {
    py: { xs: 4, sm: 5 },
    px: { xs: 2, sm: 4 },
  },
  whyChooseHeader: {
    textAlign: 'center',
    mb: { xs: 3, sm: 4 },
  },
  whyChooseTitle: {
    fontSize: { xs: '1.875rem', sm: '2.25rem', md: '2.5rem' },
    fontWeight: 700,
  },
  whyChooseSubtitle: {
    fontSize: { xs: '1.125rem', sm: '1.25rem' },
    maxWidth: '48rem',
    mx: 'auto',
    color: 'text.secondary',
  },
  whyChooseGrid: {
    display: 'grid',
    gridTemplateColumns: { xs: '1fr', md: '1fr 1fr', lg: 'repeat(4, 1fr)' },
    gap: { xs: 2, sm: 3 },
  },
  featureCard: {
    textAlign: 'center',
    border: 0,
    boxShadow: 3,
    bgcolor: 'background.paper',
    backdropFilter: 'blur(8px)',
    borderRadius: 2,
    p: 3,
    height: '100%',
    display: 'grid',
    gridTemplateRows: 'subgrid',
    gridRow: 'span 3',
    alignItems: 'start',
    gap: 1,
  },
  iconContainer: {
    borderRadius: 1,
    gridRow: 1,
  },
  iconContainerBlue: {
    bgcolor: 'primary.50',
  },
  iconContainerPurple: {
    bgcolor: 'secondary.50',
  },
  iconContainerGreen: {
    bgcolor: 'success.50',
  },
  iconContainerOrange: {
    bgcolor: 'warning.50',
  },
  cardTitle: {
    fontSize: '1.125rem',
    fontWeight: 600,
    mb: 1,
    gridRow: 2,
    alignSelf: 'center',
  },
  cardContent: {
    color: 'text.secondary',
    fontSize: TYPOGRAPHY_SIZES.body2,
  },
  cardContentContainer: {
    gridRow: 3,
    alignSelf: 'start', // Align to top of the content row
    p: 0,
    '&:last-child': { pb: 0 },
  },
} as const