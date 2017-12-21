import React from 'react'
import PropTypes from 'prop-types'
import styled from 'react-emotion'
import Link from 'gatsby-link'

import { mainContainer } from '../styles/layout-styles'
import { colors } from '../styles/variables'

const activeStyle = {
  border: `1px solid ${colors.navigation.link}`,
  backgroundColor: colors.navigation.link,
  color: '#fff'
}

const NavLink = styled(Link)(({ theme }) => ({
  border: '1px solid transparent',
  borderRadius: theme.radius.m,
  color: theme.colors.navigation.link,
  display: 'inline-block',
  fontWeight: theme.fonts.sansSerif.weights.heavy,
  fontFamily: theme.fonts.sansSerif.family,
  padding: `${theme.spacing.xxs} ${theme.spacing.s}`,
  textDecoration: 'none',
  transition: 'border 100ms ease-in-out',
  '&:hover': {
    border: `1px solid ${theme.colors.navigation.link}`
  }
}))

const NavLi = styled.li(({ theme }) => ({
  ':not(:last-of-type)': {
    marginRight: theme.spacing.s
  }
}))

const NavUl = styled('ul')`
  display: flex;
  list-style: none;
  padding: 0;
  -webkit-margin-before: 0;
  -webkit-margin-after: 0;
  -webkit-margin-start: 0;
  -webkit-margin-end: 0;
  -webkit-padding-start: 0;
`

export const NAVIGATION_HEIGHT = '75px'

const NavContainer = styled('div')(({ theme }) => ({
  width: '100%',
  marginTop: `calc(2 * ${theme.spacing.xxxl})`,
  marginBottom: `calc(2 * ${theme.spacing.xxxl})`
}))

const Nav = ({ items }) => {
  const StyledNav = styled('nav')(...mainContainer, {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: NAVIGATION_HEIGHT
  })
  const listItems = items.map(({ url, label }) => (
    <NavLi key={url}>
      <NavLink to={url} activeStyle={activeStyle}>
        {label}
      </NavLink>
    </NavLi>
  ))
  return (
    <NavContainer>
      <StyledNav>
        <NavUl>{listItems}</NavUl>
      </StyledNav>
    </NavContainer>
  )
}

Nav.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired
    })
  ).isRequired
}

export default Nav
