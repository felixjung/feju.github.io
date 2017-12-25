/* global module, __dirname */

const configEnvs = ['develop']
if (configEnvs.includes(process.env.NODE_ENV)) {
  require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` })
}

const getBaseUrl = env => {
  const urls = {
    develop: 'http://localhost:8000',
    staging: 'https://stage.felixjung.io',
    production: 'https://felixjung.io'
  }
  return urls[env] || urls.production
}

module.exports = {
  siteMetadata: {
    baseUrl: getBaseUrl(process.env.NODE_ENV),
    title: 'felixjung.io',
    author: 'Felix Jung',
    description: 'The personal website of Felix Jung.',
    twitter: '@feju'
  },
  plugins: [
    'gatsby-plugin-catch-links',
    'gatsby-plugin-react-next',
    'gatsby-plugin-emotion',
    'gatsby-transformer-sharp',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/assets/images`
      }
    },
    {
      resolve: 'gatsby-plugin-svgr',
      options: {
        dir: 'src/assets/icons'
      }
    },
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-contentful',
      options: {
        spaceId: process.env.GATSBY_CONTENTFUL_SPACE,
        accessToken: process.env.GATSBY_CONTENTFUL_API_TOKEN,
        host:
          process.env.NODE_ENV === 'production'
            ? 'cdn.contentful.com'
            : 'preview.contentful.com'
      }
    },
    'gatsby-plugin-contentful-pages',
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: ['open sans:300,300i,600,700', 'merriweather:300']
      }
    }
  ]
}
