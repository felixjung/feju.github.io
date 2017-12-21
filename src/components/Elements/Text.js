import styled from 'react-emotion'
import { css } from 'emotion'

export const Paragraph = styled('p')(
  css`
    > code {
      padding: 3px 6px;
      font-family: Menlo, monospace;
    }
  `,
  ({ theme }) => ({
    marginBottom: theme.spacing.xs,
    '> code': {
      backgroundColor: theme.colors.inlineCodeBackground,
      borderRadius: theme.radius.m,
      fontSize: theme.fontSize.xs,
      verticalAlign: '1px'
    }
  })
)

export const Anchor = styled('a')(({ theme }) => ({
  backgroundColor: theme.colors.link.default,
  color: theme.colors.text,
  padding: '2px 4px',
  textDecoration: 'none',
  position: 'relative',
  '&:hover': {
    backgroundColor: theme.colors.link.hover,
    '&::after': {
      backgroundColor: theme.colors.text,
      bottom: 0,
      content: `''`,
      height: '1px',
      left: 0,
      position: 'absolute',
      width: '100%'
    }
  },
  '&:visited': { color: theme.text }
}))

export const Strong = styled('strong')(({ theme }) => ({
  fontWeight: theme.fonts.serif.weights.heavy
}))

export const Blockquote = styled('blockquote')(
  css`
    position: relative;
    ul {
      list-style-type: none;
      text-align: right;
    }

    li {
      font-style: normal;
    }
  `,
  ({ theme }) => ({
    padding: `0 ${theme.spacing.xl}`,
    margin: `${theme.spacing.l} 0`,
    '*': {
      color: theme.colors.blockQuote,
      fontSize: theme.fontSize.m,
      lineHeight: theme.lineHeight.l
    },
    p: {
      fontStyle: 'italic'
    },
    '&::before': {
      backgroundColor: theme.colors.blockQuote,
      content: `''`,
      display: 'block',
      height: '100%',
      width: theme.spacing.xxs,
      left: 0,
      position: 'absolute'
    }
  })
)

export const Em = styled('em')`
  fontstyle: italic;
`
