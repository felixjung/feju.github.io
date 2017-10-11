import React from 'react'
import PropTypes from 'prop-types'
import styled from 'react-emotion'
import { css } from 'emotion'

import Markdown from './Markdown'

const Article = styled('article')(
  ({ theme }) => ({
    marginBottom: theme.spacing.xxxl
  }),
  css`
    &:last-of-type {
      margin-bottom: 0;
    }
  `
)

const PostPreview = ({ title, description, publishDate }) => {
  return (
    <Article>
      <h2>{title}</h2>
      <span>{publishDate}</span>
      <Markdown text={description} />
    </Article>
  )
}

PostPreview.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  publishDate: PropTypes.string.isRequired
}

export default PostPreview
