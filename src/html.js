import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

export default class HTML extends React.Component {
  static propTypes = {
    body: PropTypes.string.isRequired,
    headComponents: PropTypes.array.isRequired,
    postBodyComponents: PropTypes.array.isRequired
  }

  render() {
    const head = Helmet.rewind()
    const { headComponents, postBodyComponents, body } = this.props

    return (
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          {headComponents}
        </head>
        <body>
          <div id="___gatsby" dangerouslySetInnerHTML={{ __html: body }} />
          {postBodyComponents}
        </body>
      </html>
    )
  }
}
