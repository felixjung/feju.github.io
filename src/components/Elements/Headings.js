import styled from 'react-emotion'
import { css } from 'emotion'
import facepaint from 'facepaint'

import { breakpoints } from '../../styles/variables'
import { dynamicFontSize } from '../../styles/mixins'

const baseHeadingStyles = css`
  line-height: 1.2;
  margin-bottom: 0.5em;
  margin-top: 0.7em;
`

const mq = facepaint([
  `@media(min-width: ${breakpoints.m}px)`,
  `@media(min-width: ${breakpoints.l}px)`
])

export const H1 = styled('h1')(baseHeadingStyles, ({ theme }) =>
  mq({
    fontSize: [
      theme.fontSize.xxxxl,
      dynamicFontSize(
        theme.fontSize.xxxxl,
        theme.fontSize.xxxxxl,
        theme.breakpoints.m,
        theme.breakpoints.l
      ),
      theme.fontSize.xxxxxl
    ]
  })
)

export const H2 = styled('h2')(baseHeadingStyles, ({ theme }) =>
  mq({
    fontSize: [
      theme.fontSize.xxxl,
      dynamicFontSize(
        theme.fontSize.xxxl,
        theme.fontSize.xxxxl,
        theme.breakpoints.m,
        theme.breakpoints.l
      ),
      theme.fontSize.xxxxl
    ]
  })
)

export const H3 = styled('h3')(baseHeadingStyles, ({ theme }) =>
  mq({
    fontSize: [
      theme.fontSize.xxl,
      dynamicFontSize(
        theme.fontSize.xxl,
        theme.fontSize.xxxl,
        theme.breakpoints.m,
        theme.breakpoints.l
      ),
      theme.fontSize.xxxl
    ]
  })
)

export const H4 = styled('h4')(baseHeadingStyles, ({ theme }) =>
  mq({
    fontSize: [
      theme.fontSize.xl,
      dynamicFontSize(
        theme.fontSize.xl,
        theme.fontSize.xxl,
        theme.breakpoints.m,
        theme.breakpoints.l
      ),
      theme.fontSize.xxl
    ]
  })
)

export const H5 = styled('h5')(baseHeadingStyles, ({ theme }) =>
  mq({
    fontSize: [
      theme.fontSize.l,
      dynamicFontSize(
        theme.fontSize.l,
        theme.fontSize.xl,
        theme.breakpoints.m,
        theme.breakpoints.l
      ),
      theme.fontSize.xl
    ]
  })
)

export const H6 = styled('h6')(baseHeadingStyles, ({ theme }) =>
  mq({
    fontSize: [
      theme.fontSize.m,
      dynamicFontSize(
        theme.fontSize.m,
        theme.fontSize.l,
        theme.breakpoints.m,
        theme.breakpoints.l
      ),
      theme.fontSize.m
    ]
  })
)
