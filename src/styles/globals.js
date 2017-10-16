import { injectGlobal } from 'emotion'

import { colors, fontSize } from '../styles/variables'

export default injectGlobal`
  * {
    box-sizing: border-box;
  }

  html, body {
    font-family: -apple-system, "Helvetica Neue";
    font-size: ${fontSize.l};
    color: ${colors.text};
    background-color: ${colors.background};
    padding: 0;
    margin: 0;
  }
`
