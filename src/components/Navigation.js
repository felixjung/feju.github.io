import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'react-emotion'
import Link from 'gatsby-link'
import facepaint from 'facepaint'
import { transparentize } from 'polished'

import { breakpoints } from '../styles/variables'
import { mainContainer } from '../styles/layout-styles'
import * as theme from '../styles/variables'
import Reveal from './Reveal'

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

const NavContainer = styled('div')(({ theme, isPinned, isFixed }) =>
  mq({
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTop:
      isPinned && isFixed
        ? [`1px solid ${theme.colors.greyUltraLight}`, 'none']
        : [`1px solid #fff`, 'none'],
    borderBottom:
      isPinned && isFixed
        ? ['none', `1px solid ${theme.colors.greyUltraLight}`]
        : [`1px solid #fff`, 'none'],
    display: 'flex',
    padding: [`${theme.spacing.s} 0`, `${theme.spacing.xs} 0`],
    width: '100%'
  })
)

const StyledNav = styled('nav')(
  ...mainContainer,
  mq({
    display: 'flex',
    justifyContent: 'space-between'
  })
)

const revealOuter = css(mq({ margin: [0, '50px 0'] }))

const Navigation = ({ items }) => {
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
          border: `1px solid ${theme.colors.navigation.link}`,
          backgroundColor: theme.colors.navigation.link,
          color: '#fff'
        }}
      >
        {label}
      </NavLink>
    </NavLi>
  ))

  return (
    <Reveal pinStart={50} outerClassName={revealOuter}>
      {props => (
        <NavContainer {...props}>
          <StyledNav>
            <NavUl>{listItems}</NavUl>
          </StyledNav>
        </NavContainer>
      )}
    </Reveal>
  )
}

Navigation.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired
    })
  ).isRequired
}

export default Navigation
