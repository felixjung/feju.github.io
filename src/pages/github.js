/* global graphql */

import React from 'react'
import PropTypes from 'prop-types'

import { Section } from '../components/Layout'
import Markdown from '../components/Markdown'

const getGithubData = ({ allContentfulPage }) => {
  const githubPage = allContentfulPage.edges[1].node
  const { title } = githubPage
  const sections = githubPage.sections.map(({ title, body: { body } }) => ({
    title,
    body
  }))
  return { title, sections }
}

const Github = ({ data }) => {
  const { title, sections } = getGithubData(data)
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
  query GithubQuery {
    allContentfulPage {
      edges {
        node {
          id
          title
          sections {
            id
            body {
              body
            }
          }
        }
      }
    }
  }
`
