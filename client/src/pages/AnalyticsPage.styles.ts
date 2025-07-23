import { HEIGHTS, RESPONSIVE } from '../styles/constants'

export const analyticsPageStyles = {
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' },
    gap: RESPONSIVE.gap,
    mt: RESPONSIVE.margin,
  },
  chartPaper: {
    p: RESPONSIVE.padding,
    height: 'fit-content',
    minHeight: HEIGHTS.mobile,
  },
  tablePaper: {
    p: RESPONSIVE.padding,
    height: 'fit-content',
    minHeight: HEIGHTS.mobile,
  },
} as const