import { medium, large, xLarge, xxLarge } from '../styles/mixins'

export const mainContainer = [
  {
    margin: `0 auto`
  },
  ({ theme }) => ({
    width: `calc(100% - ${theme.spacing.m})`
  }),
  medium(({ theme }) => ({
    width: `calc(100% - ${theme.spacing.xl})`
  })),
  large({
    width: '90%',
    maxWidth: '1000px'
  }),
  xLarge({
    maxWidth: '1200px'
  }),
  xxLarge({
    maxWidth: '1400px'
  })
]
