/* global graphql */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { find, flow } from 'lodash/fp'
import styled from 'react-emotion'

import { getCollections } from '../../plugins/gatsby-plugin-paginated-json'
import PostPreview from '../components/PostPreview'
import { medium, large, xLarge, xxLarge } from '../styles/mixins'
import { mainContainer } from '../styles/layout-styles'

// Utility

// Components

const getPostsOptions = find(({ name }) => name === 'posts')

const gridStyles = [
  ({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, 1fr)',
    gridAutoRows: 'minmax(80vh, auto)',
    gridRowGap: theme.spacing.m
  }),
  medium(({ theme }) => ({
    gridAutoRows: 'minmax(300px, 500px)',
    gridRowGap: theme.spacing.xxl,
    gridColumnGap: theme.spacing.xxl
  })),
  large(({ theme }) => ({
    gridTemplateColumns: 'repeat(auto-fill, minmax(40%, 1fr))',
    gridRowGap: theme.spacing.xxl,
    gridColumnGap: theme.spacing.xxl
  })),
  xLarge(({ theme }) => ({
    gridRowGap: theme.spacing.xxxxl,
    gridColumnGap: theme.spacing.xxxxl
  })),
  xxLarge(({ theme }) => ({
    gridTemplateColumns: 'repeat(auto-fill, minmax(30%, 1fr))',
    gridRowGap: theme.spacing.xxxxxl,
    gridColumnGap: theme.spacing.xxxxxl
  }))
]

const Posts = styled('div')(...gridStyles)
const LoadMoreContainer = styled('div')(...mainContainer, {
  display: 'flex',
  justifyContent: 'center',
  width: '100%'
})
const Section = styled('section')(...mainContainer)

class Blog extends Component {
  constructor(props) {
    super(props)
    this.state = {
      posts: [],
      next: null
    }

    this.handleLoadMore = this.handleLoadMore.bind(this)
  }

  componentDidMount() {
    const { data } = this.props
    const { allContentfulBlogPost, allSitePlugin } = data
    const { pageSize } = flow(getCollections, getPostsOptions)(allSitePlugin)
    const allPosts = allContentfulBlogPost.edges.map(({ node }) => node)
    const next = allPosts.length > pageSize ? '/api/posts-1.json' : null
    const posts = allPosts.slice(0, pageSize)
    this.setState(prevState => ({
      ...prevState,
      posts: prevState.posts.concat(posts),
      next
    }))
  }

  handleLoadMore() {
    const { next } = this.state
    fetch(next)
      .then(resp => resp.json())
      .then(({ items, next }) => {
        this.setState(prevState => ({
          ...prevState,
          next,
          posts: prevState.posts.concat(items)
        }))
      })
  }

  render() {
    const { posts, next } = this.state
    return (
      <Section>
        <Posts>
          {posts.map(({ id, ...post }) => <PostPreview key={id} {...post} />)}
        </Posts>
        <LoadMoreContainer>
          {next && <button onClick={this.handleLoadMore}>Load more</button>}
        </LoadMoreContainer>
      </Section>
    )
  }
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
          description
          slug
          category {
            identifier
            name
          }
          tags
          hero {
            description
            title
            responsiveSizes(maxWidth: 375, quality: 70, toFormat: JPG) {
              src
              srcSet
              sizes
            }
          }
        }
      }
    }
    allSitePlugin(filter: { name: { eq: "gatsby-plugin-paginated-json" } }) {
      edges {
        node {
          pluginOptions {
            collections {
              name
              pageSize
              query
            }
          }
        }
      }
    }
  }
`
