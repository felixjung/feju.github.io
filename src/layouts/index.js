/* global graphql */

import React from 'react'
import PropTypes from 'prop-types'
import { ThemeProvider } from 'emotion-theming'

import * as theme from '../styles/variables'
import '../styles/globals'
import '../styles/highlight'

import Nav from '../components/Navigation'
import { getPages } from '../lib/contentful'

const navLinks = [
  {
    label: 'Blog',
    url: '/blog'
  },
  {
    label: 'Markdown',
    url: '/github'
  },
  {
    label: 'About',
    url: '/about'
  }
]

const getNavigationItems = data => {
  const pages = getPages(data)
  return pages.map(({ name: label, route: url }) => ({ label, url }))
}

export default class Template extends React.Component {
  static propTypes = {
    children: PropTypes.func
  }

  render() {
    const { data } = this.props
    // const navItems = getNavigationItems(data)
    return (
      <ThemeProvider theme={theme}>
        <div>
          <Nav items={navLinks} />
          {this.props.children()}
        </div>
      </ThemeProvider>
    )
  }
}

export const pagesQuery = graphql`
  query PagesQuery {
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
