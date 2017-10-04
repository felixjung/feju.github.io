/* global graphql */

import React from 'react'
import PropTypes from 'prop-types'

import { getPage } from '../lib/contentful'
import Markdown from '../components/Markdown'

const Github = ({ data }) => {
  const { sections } = getPage(data.contentfulPage)
  return <Markdown text={sections[0].body} />
}

Github.propTypes = {
  data: PropTypes.shape({
    contentfulPage: PropTypes.shape({
      title: PropTypes.string.isRequired,
      sections: PropTypes.array.isRequired
    })
  })
}

export default Github

export const githubQuery = graphql`
  query GithubQuery($id: String!) {
    contentfulPage(id: { eq: $id }) {
      route
      title
      name
      sections {
        title
        name
        body {
          body
        }
      }
    }
  }
`
