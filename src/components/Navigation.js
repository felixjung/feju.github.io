import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'react-emotion'
import Link from 'gatsby-link'
import facepaint from 'facepaint'
import { transparentize } from 'polished'
import { throttle } from 'lodash/fp'

import { breakpoints } from '../styles/variables'
import { mainContainer } from '../styles/layout-styles'
import { colors } from '../styles/variables'

const mq = facepaint([
  `@media(min-width: ${breakpoints.m}px)`,
  `@media(min-width: ${breakpoints.l}px)`
])

const NavLink = styled(Link)(({ theme }) =>
  mq({
    border: '1px solid transparent',
    borderRadius: theme.radius.m,
    color: theme.colors.navigation.link,
    display: 'inline-block',
    fontWeight: theme.fonts.sansSerif.weights.heavy,
    fontFamily: theme.fonts.sansSerif.family,
    padding: `${theme.spacing.xxs} ${theme.spacing.s}`,
    textAlign: ['center', 'left'],
    textDecoration: 'none',
    transition: 'border 100ms ease-in-out',
    width: '100%',
    '&:hover': {
      border: `1px solid ${theme.colors.navigation.link}`
    }
  })
)

const NavLi = styled.li(({ theme }) =>
  mq({
    flexGrow: [1, 0],
    ':not(:last-of-type)': {
      marginRight: theme.spacing.s
    }
  })
)

const NavUl = styled('ul')`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  -webkit-margin-before: 0;
  -webkit-margin-after: 0;
  -webkit-margin-start: 0;
  -webkit-margin-end: 0;
  -webkit-padding-start: 0;
  width: 100%;
`

const NavContainer = styled('div')(
  ({ theme }) =>
    mq({
      alignItems: 'center',
      backgroundColor: '#fff',
      bottom: [0, 'auto'],
      boxShadow: [
        `0 0 calc(${theme.spacing.xs} / 2) ${transparentize(
          0.6,
          theme.colors.text
        )}`,
        'none'
      ],
      borderTop: [`1px solid ${theme.colors.greyUltraLight}`, 'none'],
      display: 'flex',
      height: [
        `calc(3 * ${theme.spacing.l})`,
        `calc(5 * ${theme.spacing.xxxl})`
      ],
      marginTop: [0, `calc(-5 * ${theme.spacing.xxxl})`],
      position: ['fixed', 'static'],
      transform: ['translateY(0)', 'translateY(0)'],
      transition: 'transform 200ms ease-in-out',
      width: '100%',
      zIndex: 2
    }),
  ({ scrollingUp, scrollTop }) => {
    return mq({
      transform: [
        scrollingUp || !scrollTop ? 'translateY(0)' : 'translateY(100%)',
        'none'
      ]
    })
  }
)

const StyledNav = styled('nav')(
  ...mainContainer,
  mq({
    display: 'flex',
    justifyContent: 'space-between'
  })
)

export default class Nav extends Component {
  static propTypes = {
    items: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired
      })
    ).isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      scrollTop: null,
      scrollingUp: false
    }
    this.handleScroll = throttle(200, this.handleScroll.bind(this))
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll() {
    this.setState(({ scrollTop: prevScrollTop }) => {
      const { scrollTop } = document.documentElement
      if (!prevScrollTop) {
        return { scrollTop }
      }
      return {
        scrollTop,
        scrollingUp: scrollTop < prevScrollTop
      }
    })
  }

  render() {
    const { items } = this.props

    const listItems = items.map(({ url, label }) => (
      <NavLi key={url}>
        <NavLink
          to={url}
          isActive={(match, location) => {
            if (!match) {
              return false
            }
            const { path } = match
            const { pathname } = location
            const isIdentical = path === pathname
            const isPost = /^\/posts/.test(pathname)
            const isBlogLink = path === '/'
            return isIdentical || (isPost && isBlogLink)
          }}
          activeStyle={{
            border: `1px solid ${colors.navigation.link}`,
            backgroundColor: colors.navigation.link,
            color: '#fff'
          }}
        >
          {label}
        </NavLink>
      </NavLi>
    ))

    return (
      <NavContainer {...this.state}>
        <StyledNav>
          <NavUl>{listItems}</NavUl>
        </StyledNav>
      </NavContainer>
    )
  }
}
