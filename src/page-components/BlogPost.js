/* global graphql */

import React from 'react'
import PropTypes from 'prop-types'

import { Section } from '../components/Layout'
import { getPage } from '../lib/contentful'
import Markdown from '../components/Markdown'

const BlogPost = ({ data }) => {
  return (
    <Section>
      <h1>BlogPost</h1>
    </Section>
  )
}

export default BlogPost

export const query = graphql`
  query BlogPostQuery($id: String) {
    contentfulBlogPost(id: { eq: $id }) {
      title
    }
  }
`
