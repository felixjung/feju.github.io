import { flow, reduce, slice, take, zipAll, map } from 'lodash/fp'
import facepaint from 'facepaint'

import { breakpoints } from './variables'

export const createMediaQueries = flow(
  map(width => `@media (min-width: ${width}px)`),
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
