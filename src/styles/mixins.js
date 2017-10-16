import { flow } from 'lodash/fp'
import * as media from 'media'

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
