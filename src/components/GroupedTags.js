import React from 'react'
import PropTypes from 'prop-types'

import TagList from './TagList'
import Tag from './Tag'
import Category from './Category'

const GroupedTags = ({ category, tags }) => {
  const tagElements = tags && tags.map(name => <Tag key={name}>{name}</Tag>)
  const categoryElement = category && (
    <li key={category.identifier}>
      <Category identifier={category.identifier}>{category.name}</Category>
    </li>
  )
  return (
    <TagList>
      {categoryElement}
      {tagElements}
    </TagList>
  )
}

GroupedTags.propTypes = {
  category: PropTypes.shape({
    name: PropTypes.string.isRequired,
    identifier: PropTypes.string.isRequired
  }),
  tags: PropTypes.array
}

export default GroupedTags
