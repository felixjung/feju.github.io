/* global graphql */

import React from 'react'
import PropTypes from 'prop-types'

import { Section } from '../components/Layout'
import { getPage } from '../lib/contentful'
import { getNodesFromAllQuery } from '../lib/gatsby'
import Markdown from '../components/Markdown'

const getBlogPosts = getNodesFromAllQuery('allContentfulBlogPost')

const Blog = ({ data }) => {
  const blogPosts = getBlogPosts(data)
  debugger;
  return (
    <Section>
      <h1>{title}</h1>
    </Section>
  )
}

Blog.propTypes = {
  data: PropTypes.shape({
    allContentfulPage: PropTypes.shape({
      title: PropTypes.string.isRequired,
      sections: PropTypes.array.isRequired
    })
  })
}

export default Blog

export const query = graphql`
  query BlogQuery {
    allContentfulBlogPost(limit: 5) {
      edges {
        node {
          slug
          title
          subtitle
          publishDate
          excerpt {
            excerpt
          }
        }
      }
    }
  }
`
