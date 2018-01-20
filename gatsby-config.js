/* global module, __dirname */

const { findKey } = require('lodash')

const getEnv = () => {
  const { BRANCH, WEBHOOK_TITLE, NODE_ENV, PULL_REQUEST } = process.env
  const envs = {
    production:
      (BRANCH === 'master' && WEBHOOK_TITLE.toLowerCase() !== 'preview') ||
      NODE_ENV === 'production',
    preview: BRANCH === 'master' && WEBHOOK_TITLE.toLowerCase === 'preview',
    staging: Boolean(PULL_REQUEST),
    develop: NODE_ENV === 'develop'
  }

  return findKey(envs) || 'production'
}

const BUILD_ENV = getEnv()

if (BUILD_ENV === 'develop') {
  require('dotenv').config({ path: `.env.${BUILD_ENV}` })
}

const getSiteUrl = env => {
  const { DEPLOY_PRIME_URL } = process.env
  return env === 'develop' ? 'http://localhost:8000' : DEPLOY_PRIME_URL
}

module.exports = {
  siteMetadata: {
    siteUrl: getSiteUrl(BUILD_ENV),
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
        accessToken:
          BUILD_ENV === 'preview'
            ? process.env.GATSBY_CONTENTFUL_CPA_TOKEN
            : process.env.GATSBY_CONTENTFUL_CDA_TOKEN,
        host:
          BUILD_ENV === 'preview'
            ? 'preview.contentful.com'
            : 'cdn.contentful.com'
      }
    },
    'gatsby-plugin-contentful-pages',
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: ['open sans:300,300i,600,700', 'merriweather:300']
      }
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        output: `/sitemap.xml`,
        query: `
        {
          site {
            siteMetadata {
              siteUrl
            }
          }

          allSitePage {
            edges {
              node {
                path
              }
            }
          }
        }`,
        serialize: ({ site, allSitePage }) =>
          allSitePage.edges.map(edge => {
            return {
              url: site.siteMetadata.siteUrl + edge.node.path,
              changefreq: `daily`,
              priority: 0.7
            }
          })
      }
    }
  ]
}
