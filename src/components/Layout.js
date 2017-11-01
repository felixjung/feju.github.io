import React from 'react'
import PropTypes from 'prop-types'

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
