import { injectGlobal } from 'emotion'

import {
  baseFontSize,
  colors,
  fonts,
  breakpoints
} from '../styles/variables'
import { dynamicBaseFont } from '../styles/mixins'

export default injectGlobal`
  * {
    box-sizing: border-box;
    -webkit-margin-before: 0;
    -webkit-padding-start: 0;
    -webkit-margin-after: 0;
  }

  html {
    font-size: ${baseFontSize.min};

    @media (min-width: ${breakpoints.m}px) {
      font-size: ${dynamicBaseFont(
        baseFontSize.min,
        baseFontSize.max,
        breakpoints.m,
        breakpoints.xl
      )};
    }

    @media (min-width: ${breakpoints.xl}px) {
      font-size: ${baseFontSize.max};
    }
  }

  html, body {
    font-family: ${fonts.serif.family};
    color: ${colors.text};
    background-color: ${colors.background};
    margin: 0;
  }
`
