import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'

const MetaTags = ({
  title,
  description,
  url,
  previewImage,
  author,
  twitter,
  updateTime,
  type
}) => (
  <Helmet>
    <title>{title}</title>
    <meta name="description" content={description} />
    {/* Twitter Card */}
    <meta name="twitter:card" content="summary" />
    {twitter && <meta name="twitter:site" content={twitter} />}
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    {previewImage && <meta name="twitter:image" content={previewImage.url} />}
    {previewImage && (
      <meta name="twitter:image:alt" content={previewImage.alt} />
    )}
    {/* Open Graph */}
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:type" content={type} />
    {author && <meta property="og:article:author" content={author} />}
    {updateTime && <meta property="og:updated_time" content={updateTime} />}
    {url && <meta property="og:url" content={url} />}
    {previewImage && (
      <meta property="og:image:secure_url" content={previewImage.url} />
    )}
    {previewImage && <meta property="og:image:type" content="image/jpg" />}
    {previewImage && <meta property="og:image:width" content="240" />}
    {previewImage && <meta property="og:image:height" content="240" />}
  </Helmet>
)

MetaTags.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  twitter: PropTypes.string,
  updateTime: PropTypes.string,
  previewImage: PropTypes.shape({
    url: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired
  }),
  type: PropTypes.string,
  author: PropTypes.string
}

MetaTags.defaultProps = {
  type: 'website'
}

export default MetaTags
