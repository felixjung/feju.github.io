import React from 'react'
import styled from 'react-emotion'
import PropTypes from 'prop-types'

import { medium } from '../styles/mixins'

export const inPage = Comp => {
  const wrappedComponent = ({ children }) => (
    <Comp>
      <div>{children}</div>
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
