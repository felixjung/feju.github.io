import React from 'react'
import PropTypes from 'prop-types'
import styled from 'react-emotion'
import Link from 'gatsby-link'

import { inPage } from './Layout'
import * as theme from '../styles/variables'

const activeNavLinkStyles = {
  backgroundColor: theme.colors.primary,
  color: '#FFF'
}

const NavLink = styled(Link)(({ theme }) => ({
  border: `1px solid ${theme.colors.primary}`,
  borderColor: theme.colors.primary,
  borderRadius: theme.radius.m,
  color: theme.colors.primary,
  display: 'inline-block',
  padding: theme.spacing.s,
  textDecoration: 'none',
  ':hover': activeNavLinkStyles
}))

const NavLi = styled.li(({ theme }) => ({
  ':not(:last-of-type)': {
    marginRight: theme.spacing.s
  }
}))

const NavUl = styled.ul({
  display: 'flex',
  listStyle: 'none',
  // TODO: get some CSS reset library to take care of this shit.
  '-webkit-margin-before': 0,
  '-webkit-margin-after': 0,
  '-webkit-margin-start': 0,
  '-webkit-margin-end': 0,
  '-webkit-padding-start': 0
})

const Nav = ({ items }) => {
  const StyledNav = inPage(
    styled.nav({
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      height: '80px'
    })
  )
  const listItems = items.map(({ url, label }) => (
    <NavLi key={url}>
      <NavLink to={url}>{label}</NavLink>
    </NavLi>
  ))
  return (
    <StyledNav>
      <NavUl>{listItems}</NavUl>
    </StyledNav>
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
