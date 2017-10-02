import fp from 'lodash/fp'

const BASE_SPACE = 6
const SPACE_INCREMENT = 6
const BASE_FONT_SIZE = 8
const FONT_INCREMENT = 2
const BASE_LINE_HEIGHT = 10
const LINE_HEIGHT_INCREMENT = 2
const BASE_RADIUS = 1
const RADIUS_INCREMENT = 2
const SIZES = [
  'xxs',
  'xs',
  's',
  'm',
  'l',
  'xl',
  'xxl',
  'xxxl',
  'xxxxl',
  'xxxxxl'
]

const appendUnit = (unit, val) => `${val}${unit}`

const getSizes = (sizes, startSize, count) => {
  const start = fp.findIndex(el => el === startSize, sizes)
  return fp.slice(start, start + count, sizes)
}

const range = (start, count, step) =>
  Array(count)
    .fill(start)
    .map((x, y) => x + y * step)

// eslint-disable-next-line max-params
const createValues = (
  startSize,
  sizeCount,
  baseValue,
  increment,
  unit,
  baseSizes = SIZES
) => {
  const sizes = getSizes(baseSizes, startSize, sizeCount)
  const values = range(baseValue, sizeCount, increment)
  return fp.flow(fp.zipObject, fp.mapValues(fp.curry(appendUnit)('px')))(
    sizes,
    values
  )
}

const palette = {
  /* First option */
  lightCyan: '#D6FFF6',
  russianViolet: '#231651',
  mediumTurquoise: '#4DCCBD',
  lapisLazuli: '#2374AB',
  tulip: '#FF8484',
  /* Second option */
  maastrichtBlue: '#011627',
  radicalRed: '#FF3366',
  maximumBlueGreen: '#2EC4B6',
  whiteSmoke: '#F6F7F8',
  dodgerBlue: '#20A4F3'
}

export const colors = {
  text: palette.russianViolet,
  link: palette.mediumTurquoise,
  primary: palette.radicalRed,
  secondary: palette.dodgerBlue,
  background: palette.whiteSmoke,
  error: palette.tulip
}

export const spacing = createValues('xs', 8, BASE_SPACE, SPACE_INCREMENT, 'px')
export const fontSize = createValues(
  'xs',
  6,
  BASE_FONT_SIZE,
  FONT_INCREMENT,
  'px'
)
export const lineHeight = createValues(
  's',
  5,
  BASE_LINE_HEIGHT,
  LINE_HEIGHT_INCREMENT,
  'px'
)

export const radius = createValues('s', 3, BASE_RADIUS, RADIUS_INCREMENT, 'px')
