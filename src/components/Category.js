import React from 'react'
import { css } from 'emotion'
import classNames from 'classnames'

import * as theme from '../styles/variables'

const Category = ({ identifier, children }) => {
  const colors = theme.categories[identifier] || theme.categories.default
  const className = css({
    fontSize: theme.fontSize.xs,
    padding: `${theme.spacing.xs} ${theme.spacing.s}`,
    color: theme.colors.greyDark,
    display: 'inline-block',
    borderRadius: theme.radius.m,
    backgroundColor: theme.colors.greyHeavy
  })

  return <div className={className}>{children}</div>
}

export default Category
