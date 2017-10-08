/* global exports */

exports.collectionsQuery = `
  allSitePlugin(filter:{ name: { eq: "gatsby-plugin-paginated-json"}}) {
    edges {
      node {
        pluginOptions {
          collections {
            baseName
            pageSize
            query
          }
        }
      }
    }
  }
`

exports.getCollections = ({ edges }) => {
  try {
    return edges[0].node.pluginOptions.collections
  } catch (e) {
    throw new Error('Unable to find collections in Gatsby options.')
  }
}
