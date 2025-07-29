import { HEIGHTS, RESPONSIVE } from '../styles/constants'

export const analyticsPageStyles = {
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