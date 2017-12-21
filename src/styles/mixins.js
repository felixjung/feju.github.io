import { flow, reduce, slice, take, zipAll, map } from 'lodash/fp'
import facepaint from 'facepaint'
import * as media from 'media'

import { breakpoints, spacing } from './variables'

const { queryHelpers, forMedia } = media
const { forScreen, withMinWidth } = queryHelpers

const toUnit = unit => val => `${val}${unit}`

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

export const createMediaQueries = flow(
  map(flow(toUnit('px'), withMinWidth)),
  map(fn => media.media(fn({}))),
  facepaint
)

export const responsiveValue = (unit, viewportUnit) => (
  min,
  max,
  minViewPort,
  maxViewPort
) => {
  const minNumber = Number(min.replace(/[^0-9]/g, ''))
  const maxNumber = Number(max.replace(/[^0-9]/g, ''))
  const maxIncrease = maxNumber - minNumber
  const scaleFactor = [
    `(100${viewportUnit} - ${minViewPort}${unit})`,
    `(${maxViewPort} - ${minViewPort})`
  ].join(' / ')
  return `calc(${min} + ${maxIncrease} * ${scaleFactor})`
}

export const responsiveValues = (
  values,
  breakpoints,
  unit = 'px',
  viewportUnit = 'vmin'
) => {
  const toResponsiveValue = responsiveValue(unit, viewportUnit)
  const count = breakpoints.length - 1
  const arrays = [
    take(count, values),
    slice(1, values.length, values),
    take(count, breakpoints),
    slice(1, values.length, breakpoints)
  ]
  const dynamicValues = flow(
    zipAll,
    reduce((acc, vals) => acc.concat(toResponsiveValue(...vals)), [])
  )(arrays)

  return [values[0], ...dynamicValues, values[count]]
}

export const smallToLarge = createMediaQueries([
  breakpoints.s,
  breakpoints.m,
  breakpoints.l
])

export const smallToXLarge = createMediaQueries([
  breakpoints.s,
  breakpoints.m,
  breakpoints.l,
  breakpoints.xl
])

export const smallToXXLarge = createMediaQueries([
  breakpoints.s,
  breakpoints.m,
  breakpoints.l,
  breakpoints.xl,
  breakpoints.xxl
])

export const dynamicBaseFont = responsiveValue('px', 'vw')

export const textContainer = ({ theme }) => ({
  fontFamily: theme.fonts.serif.family,
  fontSize: theme.fontSize.s,
  lineHeight: theme.lineHeight.xl
})
