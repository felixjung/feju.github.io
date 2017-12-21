import fp from 'lodash/fp'
import { lighten } from 'polished'

const BASE_SPACE = 0.5
const SPACE_INCREMENT = 0.2
const BASE_FONT_SIZE = 0.6
const FONT_INCREMENT = 0.2
const BASE_LINE_HEIGHT = 1
const LINE_HEIGHT_INCREMENT = 0.2
const BASE_RADIUS = 1
const RADIUS_INCREMENT = 2
const SIZES = [
  'xxxxxs',
  'xxxxs',
  'xxxs',
  'xxs',
  'xs',
  's',
  'm',
  'l',
  'xl',
  'xxl',
  'xxxl',
  'xxxxl',
  'xxxxxl',
  'xxxxxxl'
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
  return fp.flow(fp.zipObject, fp.mapValues(fp.curry(appendUnit)(unit)))(
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

const greys = {
  greyUltraLight: '#f7f7f7',
  greyLight: '#e6e6e6',
  greyMedium: '#d9d9d9',
  greyHeavy: '#bebebe',
  greyDark: '#3f3f3f'
}

export const colors = {
  text: lighten(0.2, '#000'),
  link: {
    default: lighten(0.4, palette.mediumTurquoise),
    hover: lighten(0.3, palette.mediumTurquoise)
  },
  navigation: {
    link: palette.radicalRed
  },
  inlineCodeBackground: greys.greyLight,
  primary: palette.radicalRed,
  secondary: palette.dodgerBlue,
  background: '#FFF',
  horizontalRule: palette.mediumTurquoise,
  shadow: palette.russianViolet,
  error: palette.tulip,
  blockQuote: palette.tulip,
  ...greys
}

export const fonts = {
  sansSerif: {
    family: '"Open Sans", Helvetica, sans-serif',
    weights: {
      light: 300,
      regular: 600,
      heavy: 700
    }
  },
  serif: {
    family: 'Merriweather, Georgia, serif',
    weights: {
      light: 300,
      heavy: 700
    }
  },
  mono: {
    family: 'Menlo, mono'
  }
}

export const categories = {
  apple: {
    backgroundColor: palette.lightCyan,
    color: palette.russianViolet
  },
  travel: {
    backgroundColor: palette.maastrichtBlue,
    color: '#fff'
  },
  development: {
    backgroundColor: palette.radicalRed,
    color: palette.dodgerBlue
  },
  photography: {
    backgroundColor: palette.whiteSmoke,
    color: palette.dodgerBlue
  },
  default: {
    backgroundColor: palette.greyDark,
    color: '#fff'
  }
}

export const spacing = createValues(
  'xxs',
  10,
  BASE_SPACE,
  SPACE_INCREMENT,
  'rem'
)

export const baseFontSize = { min: '16px', max: '22px' }

export const fontSize = createValues(
  'xxs',
  10,
  BASE_FONT_SIZE,
  FONT_INCREMENT,
  'rem'
)
export const lineHeight = createValues(
  's',
  7,
  BASE_LINE_HEIGHT,
  LINE_HEIGHT_INCREMENT,
  ''
)

export const radius = createValues('s', 8, BASE_RADIUS, RADIUS_INCREMENT, 'px')
export const breakpoints = {
  s: 320,
  beforeM: 569,
  m: 570,
  beforeL: 819,
  l: 820,
  beforeXl: 1069,
  xl: 1070,
  beforeXXL: 1399,
  xxl: 1400
}
