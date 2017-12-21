import { smallToXXLarge } from '../styles/mixins'

export const mainContainer = [
  {
    margin: `0 auto`
  },
  ({ theme }) =>
    smallToXXLarge({
      width: [
        `calc(100% - ${theme.spacing.m})`,
        `calc(100% - ${theme.spacing.xl})`,
        '90%'
      ],
      maxWidth: ['100vw', '100vw', '750px']
    })
]
