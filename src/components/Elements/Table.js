import styled from 'react-emotion'
import facepaint from 'facepaint'

import { breakpoints } from '../../styles/variables'
import { dynamicFontSize } from '../../styles/mixins'

const primaryBorderWidth = '2px'
const secondaryBorderWidth = '1px'

const mq = facepaint([
  `@media(min-width: ${breakpoints.m}px)`,
  `@media(min-width: ${breakpoints.l}px)`
])

export const Table = styled('table')(
  {
    width: '100%',
    borderCollapse: 'collapse'
  },
  ({ theme }) =>
    mq({
      borderTop: `${primaryBorderWidth} solid ${theme.colors.text}`,
      borderBottom: `${primaryBorderWidth} solid ${theme.colors.text}`,
      margin: `${theme.spacing.xl} 0`,
      fontSize: [
        theme.fontSize.s,
        dynamicFontSize(
          theme.fontSize.s,
          theme.fontSize.m,
          theme.breakpoints.m,
          theme.breakpoints.l
        ),
        theme.fontSize.m
      ]
    })
)

export const Th = styled('th')({
  '&:first-of-type': {
    textAlign: 'left'
  }
})

export const Thead = styled('thead')(({ theme }) => ({
  borderBottom: `${secondaryBorderWidth} solid ${theme.colors.text}`
}))

export const Td = styled('td')({
  '&:not(:first-of-type)': {
    textAlign: 'center'
  }
})
