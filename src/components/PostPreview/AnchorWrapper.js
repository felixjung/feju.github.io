import React from 'react'
import { css } from 'emotion'

const className = css`
  color: inherit;
  display: block;
  height: 100%;
  outline: unset;
  position: relative;
  text-decoration: none;
`

const AnchorWrapper = props => <a className={className} {...props} />

export default AnchorWrapper
