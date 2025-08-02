import {
  TYPOGRAPHY_SIZES,
  HEIGHTS,
  RESPONSIVE,
  COMMON_SX,
} from '../../styles/constants'

export const linksTableStyles = {
  headerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    mb: 2,
    flexDirection: RESPONSIVE.flexDirection,
    gap: RESPONSIVE.gap,
    alignItems: RESPONSIVE.alignItems,
  },
  title: {
    fontSize: TYPOGRAPHY_SIZES.h5,
  },
  refreshButton: {
    alignSelf: { xs: 'center', sm: 'flex-end' },
  },
  dataGridContainer: {
    height: HEIGHTS.large,
  },
  dataGrid: {
    '& .MuiDataGrid-cell': {
      borderBottom: 'none',
      fontSize: { xs: '0.75rem', sm: '0.875rem' },
    },
    '& .MuiDataGrid-columnHeaders': {
      fontSize: { xs: '0.75rem', sm: '0.875rem' },
    },
  },
  link: {
    ...COMMON_SX.noTextDecoration,
  },
  loadingContainer: {
    ...COMMON_SX.flexCenter,
    minHeight: 200,
  },
} as const
