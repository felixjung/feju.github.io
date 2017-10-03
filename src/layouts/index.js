import React from 'react'
import PropTypes from 'prop-types'
import { ThemeProvider } from 'emotion-theming'

import * as theme from '../styles/variables'
import '../styles/globals'
import '../styles/highlight'

import Nav from '../components/Navigation'

const navLinks = [
  {
    label: 'Foo',
    url: '/foo'
  },
  {
    label: 'Bar',
    url: '/bar'
  },
  {
    label: 'Baz',
    url: '/baz'
  }
]

export default class Template extends React.Component {
  static propTypes = {
    children: PropTypes.func
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <div>
          <Nav links={navLinks} />
          {this.props.children()}
        </div>
      </ThemeProvider>
    )
  }
}
