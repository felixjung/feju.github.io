import React, { Component } from 'react'
import PropTypes from 'prop-types'
import remark from 'remark'
import externalLinks from 'remark-external-links'
import reactRenderer from 'remark-react'
import remarkLowlight from 'remark-react-lowlight'
import emoji from 'remark-gemoji-to-emoji'
import js from 'highlight.js/lib/languages/javascript'
import githubSchema from 'hast-util-sanitize/lib/github.json'

const SCHEMA = {
  ...githubSchema,
  attributes: {
    ...githubSchema.attributes,
    code: [...(githubSchema.attributes.code || []), 'className']
  }
}

const createRenderer = remarkReactComponents =>
  remark()
    .use(reactRenderer, {
      sanitize: SCHEMA,
      remarkReactComponents
    })
    .use(externalLinks)
    .use(emoji)

class Markdown extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    remarkReactComponents: PropTypes.object
  }

  static defaultProps = {
    remarkReactComponents: {
      code: remarkLowlight({
        js
      })
    }
  }

  constructor(props) {
    super(props)
    const { remarkReactComponents: inputComponents } = props
    const remarkReactComponents = {
      ...inputComponents,
      code: remarkLowlight({ js })
    }
    this.markdownRenderer = createRenderer(remarkReactComponents)
  }

  shouldComponentUpdate({ text: nextText }) {
    const { text: prevText } = this.props
    return nextText !== prevText
  }

  render() {
    const { text } = this.props
    return this.markdownRenderer.processSync(text).contents
  }
}

export default Markdown
