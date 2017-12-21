import styled from 'react-emotion'
import { css } from 'emotion'

const baseHeadingStyles = css`
  line-height: 1.2;
  margin-bottom: 0.5em;
  margin-top: 0.7em;
`

const baseHeadingFont = ({ theme }) => ({
  fontFamily: theme.fonts.sansSerif.family,
  fontWeight: theme.fonts.sansSerif.weights.heavy
})

const baseHeading = styled('h1')(baseHeadingStyles, baseHeadingFont)

export const H1 = styled(baseHeading)(({ theme }) => ({
  fontSize: theme.fontSize.xxxxxl
}))
export const H2 = styled(baseHeading)(({ theme }) => ({
  fontSize: theme.fontSize.xxxxl
}))

export const H3 = styled(baseHeading)(({ theme }) => ({
  fontSize: theme.fontSize.xxxl
}))

export const H4 = styled(baseHeading)(({ theme }) => ({
  fontSize: theme.fontSize.xxl
}))

export const H5 = styled(baseHeading)(({ theme }) => ({
  fontSize: theme.fontSize.xl
}))

export const H6 = styled(baseHeading)(({ theme }) => ({
  fontSize: theme.fontSize.l
}))
