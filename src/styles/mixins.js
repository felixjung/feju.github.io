import { flow } from 'lodash/fp'
import * as media from 'media'
import facepaint from 'facepaint'

import { breakpoints } from './variables'

const { queryHelpers, forMedia } = media
const { forScreen, withMinWidth } = queryHelpers

export const medium = flow(withMinWidth(`${breakpoints.m}px`), forMedia)(
  forScreen
)
export const large = flow(withMinWidth(`${breakpoints.l}px`), forMedia)(
  forScreen
)
export const xLarge = flow(withMinWidth(`${breakpoints.xl}px`), forMedia)(
  forScreen
)
export const xxLarge = flow(withMinWidth(`${breakpoints.xxl}px`), forMedia)(
  forScreen
)

export const dynamicFontSize = (minFont, maxFont, minWidth, maxWidth) => {
  const minFontNumber = Number(minFont.replace(/[^0-9]/g, ''))
  const maxFontNumber = Number(maxFont.replace(/[^0-9]/g, ''))
  // eslint-disable-next-line
  return `calc(${minFont} + ${maxFontNumber - minFontNumber} * (100vw - ${minWidth}px) / (${maxWidth} - ${minWidth}))`
}
