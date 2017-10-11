/* global module */

const mapBlogPost = ({
  title,
  subtitle,
  publishDate,
  excerpt: { excerpt }
}) => ({
  title,
  subtitle,
  publishDate,
  excerpt
})

module.exports = {
  siteMetadata: {
    title: 'felixjung.io'
  },
  plugins: [
    'gatsby-plugin-catch-links',
    'gatsby-plugin-emotion',
    {
      resolve: 'gatsby-source-contentful',
      options: {
        spaceId: 'ibq1vhkmncem',
        accessToken:
          'fa30b33bc2cd61d8ca05a5075a34047d44b4417c1c5e52991f7ae9ce4aa5c708'
      }
    },
    'gatsby-plugin-contentful-pages',
    {
      resolve: 'gatsby-plugin-paginated-json',
      options: {
        destination: 'api',
        collections: [
          {
            name: 'posts',
            pageSize: 4,
            query: `
              {
                allContentfulBlogPost(
                  sort: {fields: [publishDate], order: DESC}
                ) {
                  edges {
                    node {
                      id
                      publishDate
                      title
                      subtitle
                      excerpt {
                        excerpt
                      }
                    }
                  }
                }
              }
            `,
            map: mapBlogPost
          }
        ]
      }
    }
  ]
}
