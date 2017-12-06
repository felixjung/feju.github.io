import React from 'react'
import styled from 'react-emotion'
import PropTypes from 'prop-types'

import { breakpoints } from '../styles/variables'

const contentfulImageWithStyles = styles => {
  const ContentfulImage = ({ src, alt }) => {
    // TODO: Add figure/figcaption
    const optimizedSrc = `${src}?fm=jpg&fl=progressive`
    const sSrc = `${optimizedSrc}&w=${breakpoints.m}&h=${breakpoints.m}`
    const sSrc2x = `${optimizedSrc}&w=${breakpoints.m * 2}&h=${breakpoints.m *
      2}`
    const mSrc = `${optimizedSrc}&w=${breakpoints.l}&h=${breakpoints.l}`
    const mSrc2x = `${optimizedSrc}&w=${breakpoints.l * 2}&h=${breakpoints.l *
      2}`
    const lSrc = `${optimizedSrc}&w=${breakpoints.xl}&h=${breakpoints.xl}`
    const lSrc2x = `${optimizedSrc}&w=${breakpoints.xl * 2}&h=${breakpoints.xl *
      2}`
    const xlSrc = `${optimizedSrc}&w=1920&h=1080`
    const xlSrc2x = `${optimizedSrc}&w=3840&h=2160&q=70`
    const hiResQuality = 70
    const Img = styled('img')(...styles)
    return (
      <picture>
        <source
          srcSet={`${sSrc}, ${sSrc2x}&q=${hiResQuality} 2x`}
          media={`(max-width: ${breakpoints.beforeM}px)`}
        />
        <source
          srcSet={`${mSrc}, ${mSrc2x}&q=${hiResQuality} 2x`}
          media={`(max-width: ${breakpoints.beforeL}px)`}
        />
        <source
          srcSet={`${lSrc}, ${lSrc2x}&q=${hiResQuality} 2x`}
          media={`(max-width: ${breakpoints.beforeXl}px)`}
        />
        <source
          srcSet={`${xlSrc}, ${xlSrc2x}&q=${hiResQuality} 2x`}
          media={`(min-width: ${breakpoints.xl}px)`}
        />
        <Img src={lSrc2x} alt={alt} />
      </picture>
    )
  }

  ContentfulImage.displayName = 'ContentfulImage'
  ContentfulImage.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired
  }

  return ContentfulImage
}

export default contentfulImageWithStyles
