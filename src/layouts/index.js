/* global graphql */

import React from 'react'
import PropTypes from 'prop-types'
import styled from 'react-emotion'
import { ThemeProvider } from 'emotion-theming'
import facepaint from 'facepaint'

import { getNavigationItems } from '../lib/contentful'
import * as theme from '../styles/variables'
import ScrollProvider from '../components/ScrollProvider'
import '../styles/globals'
import '../styles/highlight'

import MetaTags from '../components/MetaTags'
import Nav from '../components/Navigation'
import Footer from '../components/Footer'

const mq = facepaint([
  `@media(min-width: ${theme.breakpoints.m}px)`,
  `@media(min-width: ${theme.breakpoints.l}px)`
])

const CopySymbol = styled('span')`
  font-size: ${({ theme }) => theme.fontSize.xxs};
`

const Wrapper = styled('div')(({ theme }) =>
  mq({
    paddingTop: [theme.spacing.xs, 0],
    display: 'flex',
    flexDirection: ['column-reverse', 'column']
  })
)

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
    const { title, description, twitter, author } = data.site.siteMetadata
    const url = `/${location.pathname}`
    const navItems = getNavigationItems(data)
    const currentYear = new Date().getFullYear()
    return (
      <ThemeProvider theme={theme}>
        <ScrollProvider>
          <div>
            <MetaTags {...{ title, description, twitter, url }} />
            <Wrapper>
              <Nav items={navItems} />
              {this.props.children()}
            </Wrapper>
            <Footer>
              <CopySymbol>&copy;&nbsp;</CopySymbol>
              2017 - {currentYear} {author}
            </Footer>
          </div>
        </ScrollProvider>
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
        author
        title
        description
        twitter
      }
    }
  }
`
