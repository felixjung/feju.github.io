/* global graphql */

import React from 'react'
import PropTypes from 'prop-types'
import { flow, find } from 'lodash/fp'

import { Section } from '../components/Layout'
import { getPage } from '../lib/contentful'
import Markdown from '../components/Markdown'

const About = ({ data: { contentfulPage } }) => {
  const { title, sections } = getPage(contentfulPage)
  return (
    <Section>
      <h1>{title}</h1>
      <Markdown text={sections[0].body} />
    </Section>
  )
}

About.propTypes = {
  data: PropTypes.shape({
    contentfulPage: PropTypes.shape({
      title: PropTypes.string.isRequired,
      sections: PropTypes.array.isRequired
    })
  })
}

export default About

export const aboutQuery = graphql`
  query AboutQuery($id: String!) {
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
