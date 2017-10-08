/* global graphql */

import React from 'react'
import PropTypes from 'prop-types'
import { find, flow } from 'lodash/fp'
import { getCollections } from '../../plugins/gatsby-plugin-paginated-json'

// Utility

// Components
import { Section } from '../components/Layout'
import Markdown from '../components/Markdown'

// Const getBlogPosts = getNodesFromAllQuery('allContentfulBlogPost')
const getPostsOptions = find(({ baseName }) => baseName === 'posts')

const PostPreview = ({ id, title, subtitle, publishDate, excerpt }) => (
  <article key={id}>
    <h2>{title}</h2>
    <h3>{subtitle}</h3>
    <Markdown text={excerpt} />
  </article>
)

const Blog = ({ data }) => {
  const { allContentfulBlogPost, allSitePlugin } = data

  const { pageSize } = flow(getCollections, getPostsOptions)(allSitePlugin)
  const posts = allContentfulBlogPost.edges
    .map(
      ({
        node: { id, publishDate, excerpt: { excerpt }, title, subtitle }
      }) => ({
        publishDate,
        excerpt,
        id,
        title,
        subtitle
      })
    )
    .slice(0, pageSize)

  // TODO: filter blog posts and render them out

  return <Section>{posts.map(PostPreview)}</Section>
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
    allContentfulBlogPost(sort: { fields: [publishDate], order: DESC }) {
      edges {
        node {
          id
          publishDate
          title
          subtitle
          excerpt {
            excerpt
          }
        }
      }
    }
    allSitePlugin(filter: { name: { eq: "gatsby-plugin-paginated-json" } }) {
      edges {
        node {
          pluginOptions {
            collections {
              baseName
              pageSize
              query
            }
          }
        }
      }
    }
  }
`
