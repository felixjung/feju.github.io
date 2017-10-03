import React from 'react'
import PropTypes from 'prop-types'
import remark from 'remark'
import externalLinks from 'remark-external-links'
import reactRenderer from 'remark-react'
import remarkLowlight from 'remark-react-lowlight'
import emoji from 'remark-gemoji-to-emoji'
import styled from 'react-emotion'
import js from 'highlight.js/lib/languages/javascript'
import githubSchema from 'hast-util-sanitize/lib/github.json'

import {
  SmartParagraph,
  InsetH1,
  InsetH2,
  InsetH3,
  InsetH4,
  InsetH5,
  InsetH6,
  InsetOl,
  InsetUl,
  InsetTable,
  Pre,
  ContentfulImage
} from './Layout'

const schema = Object.assign({}, githubSchema, {
  attributes: Object.assign({}, githubSchema.attributes, {
    code: [...(githubSchema.attributes.code || []), 'className']
  })
})

const MarkdownDiv = styled('div')({})

const markdownRenderer = remark()
  .use(reactRenderer, {
    sanitize: schema,
    remarkReactComponents: {
      pre: Pre,
      code: remarkLowlight({
        js
      }),
      p: SmartParagraph,
      h1: InsetH1,
      h2: InsetH2,
      h3: InsetH3,
      h4: InsetH4,
      h5: InsetH5,
      h6: InsetH6,
      ul: InsetUl,
      ol: InsetOl,
      table: InsetTable,
      img: ContentfulImage
    }
  })
  .use(externalLinks)
  .use(emoji)

const Markdown = ({ text }) => (
  <MarkdownDiv>{markdownRenderer.processSync(text).contents}</MarkdownDiv>
)

Markdown.propTypes = {
  text: PropTypes.string.isRequired
}

export default Markdown
