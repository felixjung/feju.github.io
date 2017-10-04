const { resolve: resolvePath } = require('path')
const { stat } = require('fs')
const { promisify } = require('util')
const statAsync = promisify(stat)

const { flow, get, map } = require('lodash/fp')

function getComponentPath(name) {
  return resolvePath(`./src/page-components/${name}.js`)
}

async function componentExists(path) {
  try {
    const stats = await statAsync(path)
    return stats.isFile()
  } catch (err) {
    return false
  }
}

async function createContentfulPageObject({ id, route, name }) {
  const path = getComponentPath(name)
  const isExistingComponent = await componentExists(path)
  if (!isExistingComponent) {
    throw new TypeError(`No component for Page "${name}" found at "${path}".`)
  }

  return {
    path: `/${route}`,
    component: path,
    context: { id }
  }
}

const getPageNodes = get('data.allContentfulPage.edges')
const getPageData = ({ node }) => node

function createPages({ graphql, boundActionCreators }) {
  const { createPage } = boundActionCreators
  return graphql(`
    {
      allContentfulPage {
        edges {
          node {
            route
            name
            id
          }
        }
      }
    }
  `)
    .then(
      flow(
        getPageNodes,
        map(getPageData),
        map(createContentfulPageObject),
        Promise.all
      )
    )
    .then(flow(map(createPage), Promise.all))
}

exports.createPages = createPages
