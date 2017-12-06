import React from 'react'
import PropTypes from 'prop-types'
import { css } from 'emotion'

import formatDate from '../util/format-date'

const dateClass = css`
  font-weight: 100;
`

const PublishDate = ({ date, className }) => (
  <span className={`${dateClass} ${className}`}>{formatDate(date)}</span>
)

PublishDate.propTypes = {
  date: PropTypes.string.isRequired,
  className: PropTypes.string
}

PublishDate.defaultProps = {
  className: undefined
}

export default PublishDate
