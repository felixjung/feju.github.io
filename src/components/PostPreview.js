import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'react-emotion'
import { css } from 'emotion'
import facepaint from 'facepaint'
import Link from 'gatsby-link'

import { breakpoints } from '../styles/variables'
import DefaultPublishDate from './PublishDate'
import { H2 } from './Elements/Headings'
import GroupedTags from './GroupedTags'

const mq = facepaint([
  `@media(min-width: ${breakpoints.m}px)`,
  `@media(min-width: ${breakpoints.l}px)`
])

const TitleLink = styled(Link)`
  text-decoration: none;
`

const Title = styled(H2)(({ theme }) => ({
  color: theme.colors.text,
  fontFamily: theme.fonts.sansSerif.family,
  fontSize: theme.fontSize.m,
  fontWeight: theme.fonts.sansSerif.weights.heavy,
  lineHeight: 1.2
}))

const Summary = styled('p')(({ theme }) =>
  mq({
    fontSize: theme.fontSize.s,
    lineHeight: theme.lineHeight.xl,
    margin: `calc(0.5 * ${theme.spacing.s}) 0 ${theme.spacing.l}`
  })
)

const PublishDate = styled(DefaultPublishDate)(({ theme }) =>
  mq({
    display: 'block',
    fontFamily: theme.fonts.sansSerif.family,
    fontSize: theme.fontSize.xs,
    marginBottom: [`${theme.spacing.xxs}`]
  })
)

const Article = styled('article')(({ theme }) =>
  mq({
    margin: [`${theme.spacing.xl} 0`],
    width: ['100%', '100%', '45%']
  })
)

class PostPreview extends Component {
  static propTypes = {
    hero: PropTypes.object,
    slug: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    category: PropTypes.shape({
      identifier: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    }),
    tags: PropTypes.arrayOf(PropTypes.string),
    summary: PropTypes.string.isRequired,
    publishDate: PropTypes.string.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      isHovering: false
    }
  }

  render() {
    const {
      title,
      summary,
      publishDate,
      slug,
      hero,
      category,
      tags,
      ...otherProps
    } = this.props

    const link = `/posts/${slug}`

    return (
      <Article>
        <PublishDate date={publishDate} />
        <TitleLink to={link}>
          <Title
            className={css`
              margin: 0;
            `}
          >
            {title}
          </Title>
        </TitleLink>
        <Summary>{summary}</Summary>
        <GroupedTags category={category} tags={tags} />
      </Article>
    )
  }
}

export default PostPreview
