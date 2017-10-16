import React from 'react'
import PropTypes from 'prop-types'
import styled from 'react-emotion'
import { css } from 'emotion'
import Link from 'gatsby-link'

import { inPage } from './Layout'
import * as theme from '../styles/variables'
import { mainContainer } from '../styles/layout-styles'

const activeNavLinkStyles = {}

const NavLink = styled(Link)(
  ({ theme }) => ({
    // Border: `1px solid ${theme.colors.primary}`,
    // borderColor: theme.colors.primary,
    // borderRadius: theme.radius.m,
    color: theme.colors.primary,
    fontWeight: '600',
    display: 'inline-block',
    padding: `${theme.spacing.s} 0`,
    textDecoration: 'none'
  }),
  css`
    position: relative;

    &::after {
      position: absolute;
      bottom: 3px;
      left: 0;
      border-radius: 3px;
      height: 6px;
      width: 0;
      content: '';
      background-color: black;
      transition: width 150ms ease-in-out;
    }

    &:hover {
      &::after {
        width: 100%;
      }
    }
  `
)

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

export const NAVIGATION_HEIGHT = '75px'

const NavContainer = styled('div')(({ theme }) => ({
  width: '100%',
  backgroundColor: theme.primary,
  marginBottom: theme.spacing.xxxl
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
      <NavLink to={url}>{label}</NavLink>
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
