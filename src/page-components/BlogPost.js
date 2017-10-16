/* global graphql */

import React from 'react'
import styled from 'react-emotion'
import PropTypes from 'prop-types'
import { reduce, has } from 'lodash/fp'

import Markdown from '../components/Markdown'
import contentfulImageWithStyles from '../components/ContentfulImage'

const Container = styled('div')({
  width: '100%'
})

const Article = styled('article')({
  width: '50%',
  maxWidth: '700px',
  marginLeft: 'auto',
  marginRight: 'auto'
})

const MARKDOWN_ELEMENTS = [
  'p',
  'ul',
  'ol',
  'h1',
  'h2',
  'h3',
  'h5',
  'h6',
  'table',
  'div',
  'blockquote'
]

const mainTrackComponents = reduce(
  (acc, el) => {
    acc[el] = styled(el)()
    return acc
  },
  {},
  MARKDOWN_ELEMENTS
)

const EXCESS = 25
const CodeBackground = styled('div')(({ theme }) => ({
  backgroundColor: '#282c34',
  padding: `${theme.spacing.xl} ${EXCESS}%`,
  margin: `${theme.spacing.xxxl} -${EXCESS}%`,
  overflow: 'hidden',
  borderRadius: theme.radius.l
}))

const img = contentfulImageWithStyles(({ theme }) => ({
  width: '150%',
  marginLeft: `-${EXCESS}%`,
  margin: `${theme.spacing.xxxxl} -${EXCESS}%`
}))

const FullWidthDiv = styled('div')()

const Description = styled('p')(({ theme }) => ({
  fontSize: theme.fontSize.xxl
}))

const p = ({ children, ...props }) => {
  const firstChild = children[0]
  const isImage = has('props.src', firstChild)
  if (isImage) {
    return <FullWidthDiv>{children}</FullWidthDiv>
  }

  const TrackParagraph = mainTrackComponents.p

  return <TrackParagraph {...props}>{children}</TrackParagraph>
}

p.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

const Pre = styled('pre')({})

const pre = props => (
  <CodeBackground>
    <Pre {...props} />
  </CodeBackground>
)

const remarkReactComponents = { ...mainTrackComponents, img, p, pre }

const H1 = remarkReactComponents.h1
const P = remarkReactComponents.p

const BlogPost = ({ data: { contentfulBlogPost } }) => {
  const { title, publishDate, body: { body }, description } = contentfulBlogPost
  return (
    <Container>
      <Article>
        <H1>{title}</H1>
        <P>{publishDate}</P>
        <Description>{description}</Description>
        <Markdown remarkReactComponents={remarkReactComponents} text={body} />
      </Article>
    </Container>
  )
}

BlogPost.propTypes = {
  data: PropTypes.shape({
    contentfulBlogPost: PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      body: PropTypes.shape({ body: PropTypes.string.isRequired }).isRequired,
      publishDate: PropTypes.string.isRequired
    })
  })
}

export default BlogPost

export const query = graphql`
  query BlogPostQuery($id: String) {
    contentfulBlogPost(id: { eq: $id }) {
      title
      body {
        body
      }
      description
      publishDate
    }
  }
`
