import styled from 'react-emotion'
import { css } from 'emotion'

const baseListStyles = [
  ({ theme }) => ({
    marginTop: 0,
    marginBottom: theme.spacing.l,
    marginLeft: theme.spacing.l,
    p: {
      display: 'inline'
    },
    'ul, ol': {
      marginLeft: theme.spacing.m
    }
  }),
  css`
    ul {
      list-style-type: circle;
    }
  `
]

export const Ul = styled('ul')(
  ...baseListStyles,
  css`
    list-style-type: disc;
  `
)

export const Ol = styled('ol')(...baseListStyles, ({ theme }) => ({
  marginLeft: theme.spacing.l
}))
