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

const indexedWithBaseName = baseName => index => `${baseName}-${index}.json`
const stripLeadingSlash = str => str.replace(/^\//, '')
const stripTrailingSlash = str => str.replace(/\/$/, '')
const stripSlashes = flow(stripLeadingSlash, stripTrailingSlash)

const createDestinationUri = flow(stripSlashes, d => `/${d}`)
const createDestinationPath = flow(stripSlashes, dest =>
  resolve(PUBLIC_PATH, dest)
)

const writePages = dest => ({ baseName, pages }) => {
  const fileNameForIndex = indexedWithBaseName(baseName)
  const destinationUri = createDestinationUri(dest)
  const destinationPath = createDestinationPath(dest)
  const padPageIndex = padIndex(pages)
  const createPageFileName = flow(padPageIndex, fileNameForIndex)
  const getNextPageUri = currentIndex => {
    const nextIndex = currentIndex + 1
    return nextIndex === pages.length
      ? undefined
      : `${destinationUri}/${createPageFileName(nextIndex)}`
  }

  const createWriteData = index => {
    const path = join(destinationPath, createPageFileName(index))
    const data = JSON.stringify({
      next: getNextPageUri(index),
      items: pages[index]
    })
    return [path, data]
  }

  const writePage = flow(toInteger, createWriteData, ([path, data]) =>
    writeFileAsync(path, data)
  )

  return flow(keys, map(writePage), Promise.all)(pages)
}

const onPostBuild = async ({ graphql }, { destination, collections }) => {
  const paginationData = await flow(map(queryCollection(graphql)), Promise.all)(
    collections
  )
  const paginatedData = map(paginate, paginationData)
  return flow(map(writePages(destination)), Promise.all)(paginatedData)
}

exports.onPostBuild = onPostBuild
