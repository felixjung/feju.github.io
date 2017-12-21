import styled from 'react-emotion'

const primaryBorderWidth = '2px'
const secondaryBorderWidth = '1px'

export const Table = styled('table')(
  {
    width: '100%',
    borderCollapse: 'collapse'
  },
  ({ theme }) => ({
    borderTop: `${primaryBorderWidth} solid ${theme.colors.text}`,
    borderBottom: `${primaryBorderWidth} solid ${theme.colors.text}`,
    margin: `${theme.spacing.xl} 0`,
    fontSize: theme.fontSize.m
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
