import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import styled from 'react-emotion'
import { css } from 'emotion'
import { transparentize } from 'polished'

import GroupedTags from '../GroupedTags'

import Description from './Description'
import ImageBackground from './ImageBackground'
import ColorBackground from './ColorBackground'
import PublishDate from '../PublishDate'
import Headline from './Headline'
import AnchorWrapper from './AnchorWrapper'

const Article = styled('article')(({ theme }) => ({
  boxShadow: `0 ${theme.spacing.xs} ${theme.spacing.l} ${transparentize(
    0.7,
    theme.colors.shadow
  )}`,
  borderRadius: theme.radius.l,
  overflow: 'hidden'
}))

const transitionAnimation = '400ms cubic-bezier(.01,.89,.64,1.1)'

const headlineClass = css`
  transition: font-size ${transitionAnimation},
    margin-top ${transitionAnimation};
`

const headlineHoverClass = css`
  font-size: 32px;
  margin-top: 0;
`

const TextContainer = styled('div')(({ theme }) => ({
  color: '#FFF',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: '100%',
  left: 0,
  padding: theme.spacing.xxl,
  position: 'absolute',
  top: 0,
  transition: `height ${transitionAnimation}`,
  width: '100%'
}))

const textContainerHoverClass = css`
  height: 50%;
`

const descriptionClass = css`
  position: absolute
  height: calc(50% + 20px);
  width: 100%;
  bottom: 0;
  transform: translateY(100%);
  transition: transform ${transitionAnimation};
`

const descriptionHoverClass = css`
  transform: translateY(20px);
`

const backgroundClass = css`
  transform: scale3d(1, 1, 1);
  transition: transform ${transitionAnimation};
`

const backgroundHoverClass = css`
  transform: scale3d(1.1, 1.1, 1);
`

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
    description: PropTypes.string.isRequired,
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
      description,
      publishDate,
      slug,
      hero,
      category,
      tags,
      ...otherProps
    } = this.props
    const { isHovering } = this.state
    // TODO: see how to prefix or obtain correct URLs in Gatsby
    // Use Link component?
    const postLink = `/blog/${slug}`

    const backgroundClasses = classNames(backgroundClass, {
      [backgroundHoverClass]: isHovering
    })
    const background = hero ? (
      <ImageBackground hero={hero} className={backgroundClasses} />
    ) : (
      <ColorBackground
        category={category.identifier}
        className={backgroundClasses}
      />
    )

    const headlineClasses = classNames(headlineClass, {
      [headlineHoverClass]: isHovering
    })
    const textClasses = classNames({ [textContainerHoverClass]: isHovering })
    const descriptionClasses = classNames(descriptionClass, {
      [descriptionHoverClass]: isHovering
    })

    return (
      <Article
        {...otherProps}
        onMouseOver={() => this.setState({ isHovering: true })}
        onMouseOut={() => this.setState({ isHovering: false })}
      >
        <AnchorWrapper href={postLink}>
          {background}
          <TextContainer className={textClasses}>
            <Headline className={headlineClasses}>{title}</Headline>
            <PublishDate date={publishDate} />
          </TextContainer>
          <Description
            text={description}
            tags={tags}
            category={category}
            className={descriptionClasses}
          >
            <GroupedTags tags={tags} category={category} />
          </Description>
        </AnchorWrapper>
      </Article>
    )
  }
}

export default PostPreview
