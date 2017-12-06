import { injectGlobal } from 'emotion'

import { colors } from '../styles/variables'

export default injectGlobal`
  * {
    box-sizing: border-box;
    -webkit-margin-before: 0;
    -webkit-padding-start: 0;
    -webkit-margin-after: 0;
  }

  html, body {
    font-family: 'Open Sans', sans-serif;
    color: ${colors.text};
    background-color: ${colors.background};
    margin: 0;
  }
`
