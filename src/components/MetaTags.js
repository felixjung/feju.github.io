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
    <link
      rel="apple-touch-icon"
      sizes="180x180"
      href={'/meta/apple-touch-icon.png'}
    />
    <link
      rel="icon"
      type="image/png"
      href={'/meta/favicon-32x32.png'}
      sizes="32x32"
    />
    <link
      rel="icon"
      type="image/png"
      href={'/meta/favicon-16x16.png'}
      sizes="16x16"
    />
    <link rel="manifest" href={'/meta/manifest.json'} />
    <link
      rel="mask-icon"
      href={'/meta/safari-pinned-tab.svg'}
      color="#5bbad5"
    />
    <meta name="theme-color" content="#ffffff" />
  </Helmet>
)

MetaTags.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  twitter: PropTypes.string,
  updateTime: PropTypes.string,
  previewImage: PropTypes.shape({
    url: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired
  }),
  url: PropTypes.string,
  type: PropTypes.string,
  author: PropTypes.string
}

MetaTags.defaultProps = {
  type: 'website'
}

export default MetaTags
