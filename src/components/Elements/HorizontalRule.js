import styled from 'react-emotion'

export const HorizontalRule = styled('hr')(({ theme }) => ({
  height: '3px',
  backgroundColor: theme.colors.horizontalRule,
  opacity: 0.4,
  width: '40%',
  borderStyle: 'none',
  borderWidth: 0,
  marginTop: theme.spacing.xxxxl,
  marginBottom: theme.spacing.xxxxl,
  borderRadius: '3px'
}))
