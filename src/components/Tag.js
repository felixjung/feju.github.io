import styled from 'react-emotion'

const Tag = styled('li')(({ theme }) => ({
  backgroundColor: theme.colors.greyLight,
  borderRadius: '100px',
  color: theme.colors.greyDark,
  fontSize: theme.fontSize.s,
  fontFamily: theme.fonts.sansSerif.family,
  fontWeight: theme.fonts.sansSerif.weights.regular,
  lineHeight: theme.lineHeight.s,
  padding: `3px 10px`
}))

export default Tag
