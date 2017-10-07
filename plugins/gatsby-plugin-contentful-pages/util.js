/* global module */

const {
  capitalize,
  curry,
  flow,
  get,
  join,
  kebabCase,
  map,
  split
} = require('lodash/fp')

const pascalCase = flow(kebabCase, split('-'), map(capitalize), join(''))

const createAllQuery = (contentType, fieldsSubquery) => `
  {
    allContentful${pascalCase(contentType)} {
      edges {
        node {
          ${fieldsSubquery}
        }
      }
    }
  }
`

// TODO: move this into a general library for gatsby or ask to have it moved
//       into core.
const getNodesFromAllQuery = curry((rootQueryType, { data }) =>
  flow(get(`${rootQueryType}.edges`), map(({ node }) => node))(data)
)

const getNodesForContentType = flow(pascalCase, ct =>
  getNodesFromAllQuery(`allContentful${ct}`)
)

module.exports = {
  createAllQuery,
  pascalCase,
  getNodesForContentType
}
