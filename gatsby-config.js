/* global module */

const configEnvs = ['develop']
if (configEnvs.includes(process.env.NODE_ENV)) {
  require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` })
}

module.exports = {
  siteMetadata: {
    title: 'felixjung.io'
  },
  plugins: [
    'gatsby-plugin-catch-links',
    'gatsby-plugin-react-next',
    'gatsby-plugin-emotion',
    {
      resolve: 'gatsby-source-contentful',
      options: {
        spaceId: process.env.GATSBY_CONTENTFUL_SPACE,
        accessToken: process.env.GATSBY_CONTENTFUL_API_TOKEN
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
