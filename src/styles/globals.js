import { injectGlobal } from 'emotion'

import { colors } from '../styles/variables'

export default injectGlobal`
  * {
    box-sizing: border-box;
  }

  html, body {
    font-family: -apple-system, "Helvetica Neue";
    color: ${colors.text};
    background-color: ${colors.background};
  }
`
