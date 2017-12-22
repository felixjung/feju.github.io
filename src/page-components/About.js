/* global graphql */

import React from 'react'
import PropTypes from 'prop-types'
import styled from 'react-emotion'
import { css } from 'emotion'
import { transparentize } from 'polished'
import { camelCase, keyBy } from 'lodash/fp'

import MetaTags from '../components/MetaTags'
import { normalizePage } from '../lib/contentful'
import Markdown from '../components/Markdown'
import { mainContainer } from '../styles/layout-styles'
import { textContainer } from '../styles/mixins'
import {
  Anchor,
  Paragraph,
  Ul,
  Ol,
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  Strong,
  Em,
  Thead,
  Th,
  Td,
  HorizontalRule
} from '../components/Elements'

const remarkReactComponents = {
  a: Anchor,
  p: Paragraph,
  ul: Ul,
  ol: Ol,
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  strong: Strong,
  em: Em,
  th: Th,
  td: Td,
  thead: Thead,
  hr: HorizontalRule
}

import profile from '../assets/images/profile.png'

const Section = styled('section')(...mainContainer, textContainer)

const imageSize = '20vmin'
const minImageSize = '100px'
const maxImageSize = '256px'
const ProfileImage = styled('img')(
  ({ theme }) => ({
    boxShadow: `0 6px 12px 0 ${transparentize(0.8, theme.colors.text)}`
  }),
  css`
    border-radius: ${maxImageSize};
    display: block;
    min-height: ${minImageSize};
    max-height: ${maxImageSize};
    height: ${imageSize};
    width: ${imageSize};
    min-width: ${minImageSize};
    max-width: ${maxImageSize};
    margin: 0 auto;
  `
)

const About = ({ data: { contentfulPage } }) => {
  const {
    sections,
    metaDescription: description,
    metaTitle: title
  } = normalizePage(contentfulPage)
  const keyedSections = keyBy(({ title }) => camelCase(title), sections)

  return (
    <Section>
      <MetaTags {...{ title, description }} />
      <ProfileImage
        src={profile}
        alt="Felix' profile picture"
        className={css`
          margin-bottom: 10vmin;
        `}
      />
      <Markdown
        remarkReactComponents={remarkReactComponents}
        text={keyedSections.aboutMe.body}
      />
    </Section>
  )
}

About.propTypes = {
  data: PropTypes.shape({
    contentfulPage: PropTypes.shape({
      sections: PropTypes.array.isRequired
    })
  })
}

export default About

export const aboutQuery = graphql`
  query AboutQuery($id: String!) {
    contentfulPage(id: { eq: $id }) {
      route
      name
      metaTitle
      metaDescription
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
