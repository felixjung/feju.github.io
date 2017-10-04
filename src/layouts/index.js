/* global graphql */

import React from 'react'
import PropTypes from 'prop-types'
import { ThemeProvider } from 'emotion-theming'

import { getNavigationItems } from '../lib/contentful'
import * as theme from '../styles/variables'
import '../styles/globals'
import '../styles/highlight'

import Nav from '../components/Navigation'

export default class Template extends React.Component {
  static propTypes = {
    children: PropTypes.func
  }

  render() {
    const { data } = this.props
    const navItems = getNavigationItems(data)
    return (
      <ThemeProvider theme={theme}>
        <div>
          <Nav items={navItems} />
          {this.props.children()}
        </div>
      </ThemeProvider>
    )
  }
}

export const pagesQuery = graphql`
  query ContentfulPagesQuery {
    allContentfulPage {
      edges {
        node {
          id
          title
          name
          route
          sections {
            id
            body {
              body
            }
          }
        }
      }
    }
  }
`
