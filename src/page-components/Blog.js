/* global graphql */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { find, flow } from 'lodash/fp'
import styled from 'react-emotion'

import { getCollections } from '../../plugins/gatsby-plugin-paginated-json'
import PostPreview from '../components/PostPreview'

// Utility

// Components
import {
  blogGridContainerStyles,
  asideTrackStyles,
  mainTrackStyles
} from '../components/Layout'

const getPostsOptions = find(({ name }) => name === 'posts')

const Section = styled('section')(...mainTrackStyles)
const Aside = styled('aside')(...asideTrackStyles)
const Container = styled('div')(...blogGridContainerStyles)

class Blog extends Component {
  constructor(props) {
    super(props)
    this.state = {
      posts: [],
      next: '/api/posts-1.json'
    }

    this.handleLoadMore = this.handleLoadMore.bind(this)
  }

  componentDidMount() {
    const { data } = this.props
    const { allContentfulBlogPost, allSitePlugin } = data
    const { pageSize } = flow(getCollections, getPostsOptions)(allSitePlugin)
    const posts = allContentfulBlogPost.edges
      .map(({ node: { id, publishDate, title, description } }) => ({
        id,
        title,
        description,
        publishDate
      }))
      .slice(0, pageSize)
    this.setState(prevState => ({
      ...prevState,
      posts: prevState.posts.concat(posts)
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
      <Container>
        <Section>
          {posts.map(({ id, ...post }) => <PostPreview key={id} {...post} />)}
          {next && <button onClick={this.handleLoadMore}>Load more</button>}
        </Section>
        <Aside>This is the aside.</Aside>
      </Container>
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
