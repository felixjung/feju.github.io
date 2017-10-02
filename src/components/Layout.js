import React from 'react'
import styled from 'react-emotion'
import PropTypes from 'prop-types'

import { small, medium } from '../styles/mixins'

const PageContainer = styled('div')(
  small(({ theme }) => ({
    width: '100%',
    padding: theme.spacing.s,
    margin: '0 auto'
  })),
  medium(({ theme }) => ({
    maxWidth: '600px',
    padding: theme.spacing.m
  }))
)

export const inPage = Comp => {
  const wrappedComponent = ({ children }) => (
    <Comp>
      <PageContainer>{children}</PageContainer>
    </Comp>
  )
  wrappedComponent.displayName = `wrapped${Comp.displayName}`
  wrappedComponent.propTypes = {
    children: PropTypes.node.isRequired
  }
  return wrappedComponent
}

export const Section = inPage('section')
export const Nav = inPage('nav')
