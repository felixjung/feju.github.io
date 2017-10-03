/* global graphql */

import React from 'react'
import PropTypes from 'prop-types'

import { Section } from '../components/Layout'
import Markdown from '../components/Markdown'

const getAboutData = ({ contentfulPage }) => {
  const { title } = contentfulPage
  const sections = contentfulPage.sections.map(({ title, body: { body } }) => ({
    title,
    body
  }))
  return { title, sections }
}

const About = ({ data }) => {
  const { title, sections } = getAboutData(data)
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
  query AboutQuery {
    contentfulPage {
      id
      title
      sections {
        body {
          body
        }
      }
    }
  }
`
