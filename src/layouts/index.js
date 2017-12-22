/* global graphql */

import React from 'react'
import PropTypes from 'prop-types'
import { ThemeProvider } from 'emotion-theming'

import { getNavigationItems } from '../lib/contentful'
import * as theme from '../styles/variables'
import '../styles/globals'
import '../styles/highlight'

import MetaTags from '../components/MetaTags'
import Nav from '../components/Navigation'

export default class Template extends React.Component {
  static propTypes = {
    children: PropTypes.func,
    data: PropTypes.object.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired
    }).isRequired
  }

  render() {
    const { data, location } = this.props
    const { title, description, twitter, baseUrl } = data.site.siteMetadata
    const url = `${baseUrl}${location.pathname}`
    const navItems = getNavigationItems(data)
    return (
      <ThemeProvider theme={theme}>
        <div>
          <MetaTags {...{ title, description, twitter, url }} />
          <Nav items={navItems} />
          {this.props.children()}
        </div>
      </ThemeProvider>
    )
  }
}

export const pagesQuery = graphql`
  query LayoutQuery {
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
    site {
      siteMetadata {
        baseUrl
        title
        description
        twitter
      }
    }
  }
`
