import styled from 'react-emotion'

const Tag = styled('li')(({ theme }) => ({
  backgroundColor: theme.colors.greyLight,
  borderRadius: '100px',
  color: theme.colors.greyDark,
  fontSize: theme.fontSize.xs,
  padding: `${theme.spacing.xs} ${theme.spacing.s}`
}))

export default Tag
