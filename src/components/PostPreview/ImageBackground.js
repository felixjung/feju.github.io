import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { css } from 'emotion'
import { transparentize } from 'polished'

const wrapperClass = css`
  height: 100%;
  left: 0;
  position: relative;
  top: 0;
  width: 100%;
`

const imgClass = css`
  height: 100%;
  object-fit: cover;
  object-position: center;
  width: 100%;
`

const overlayClass = css`
  background-color: ${transparentize(0.54, '#000')};
  bottom: 0;
  height: 100%;
  position: absolute;
  top: 0;
  width: 100%;
`

const ImageBackground = ({ hero, classes }) => {
  const { src, srcSet, sizes } = hero.responsiveSizes

  // TODO: see, if we can put the overlay directly on the img in CSS.
  return (
    <div className={wrapperClass}>
      <img
        src={src}
        srcSet={srcSet}
        sizes={sizes}
        className={classNames(imgClass, classes)}
      />
      <div className={overlayClass} />
    </div>
  )
}

ImageBackground.propTypes = {
  hero: PropTypes.shape({
    responsiveSizes: PropTypes.shape({
      src: PropTypes.string.isRequired,
      srcSet: PropTypes.string.isRequired,
      sizes: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  classes: PropTypes.string
}

ImageBackground.defaultProps = {
  classes: ''
}

export default ImageBackground
