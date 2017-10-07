/* global exports */

const { resolve, join } = require('path')
const { writeFile } = require('fs')
const { promisify } = require('util')
const {
  chunk,
  curry,
  flow,
  get,
  keys,
  map,
  padCharsStart,
  toInteger
} = require('lodash/fp')
const writeFileAsync = promisify(writeFile)

const handleGraphQl = ({ data, errors }) => {
  if (errors) {
    throw new Error(errors)
  }
  return data
}

const getNodesFromAllQuery = curry((rootQueryType, data) =>
  flow(get(`${rootQueryType}.edges`), map(({ node }) => node))(data)
)

const processQueryResponse = rootQueryType =>
  flow(handleGraphQl, getNodesFromAllQuery(rootQueryType))

const getQueryData = (graphql, rootQueryType, query) => {
  return graphql(query(rootQueryType)).then(processQueryResponse(rootQueryType))
}

const PUBLIC_PATH = './public'

// TODO: transpile to use ...rest
const queryCollection = graphql => ({
  rootQueryType,
  query,
  map: mapNode,
  pageSize,
  baseName
}) =>
  getQueryData(graphql, rootQueryType, query).then(
    flow(map(mapNode), entries => ({
      baseName,
      pageSize,
      entries
    }))
  )

const paginate = ({ baseName, pageSize, entries }) => ({
  baseName,
  pages: chunk(pageSize, entries)
})

const padIndex = (collection, zeroBase = true) => index => {
  const max = zeroBase ? collection.length - 1 : collection.length
  const digits = max.toString().length
  return padCharsStart('0')(digits)(index)
}

const toBasePath = (dest, baseName, relative) => index => {
  const basePath = relative
    ? join(`/${dest}`, baseName)
    : resolve(PUBLIC_PATH, dest, baseName)
  return `${basePath}-${index}.json`
}

const trace = data => {
  console.log(data)
  return data
}

const writePages = dest => ({ baseName, pages }) => {
  const absPathForIndex = toBasePath(dest, baseName, false)
  const relPathForIndex = toBasePath(dest, baseName, true)
  const padIndexForPages = padIndex(pages)
  const createPagePath = flow(padIndexForPages, relPathForIndex)
  const createFilePath = flow(padIndexForPages, absPathForIndex)
  const getNextPagePath = currentIndex => {
    const nextIndex = currentIndex + 1
    return nextIndex === pages.length ? undefined : createPagePath(nextIndex)
  }
  const getMeta = currentIndex => ({
    next: getNextPagePath(currentIndex)
  })
  return flow(
    keys,
    map(
      flow(
        toInteger,
        currentIndex => ({
          index: currentIndex,
          data: [pages[currentIndex], getMeta(currentIndex)]
        }),
        ({ index, data: [page, meta] }) => ({
          index,
          data: Object.assign({}, meta, { items: page })
        }),
        ({ index, data }) =>
          writeFileAsync(createFilePath(index), JSON.stringify(data))
      )
    ),
    Promise.all
  )(pages)
}

const onPostBuild = async ({ graphql }, { destination, collections }) => {
  const paginationData = await flow(map(queryCollection(graphql)), Promise.all)(
    collections
  )
  const paginatedData = map(paginate, paginationData)
  console.log(paginatedData)
  return flow(map(writePages(destination)), Promise.all)(paginatedData)
}

exports.onPostBuild = onPostBuild
