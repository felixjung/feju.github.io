/* global exports */

const { resolve, join } = require('path')
const { writeFile } = require('fs')
const { promisify } = require('util')
const {
  chunk,
  curry,
  flow,
  get,
  head,
  identity,
  keys,
  map,
  padCharsStart,
  toInteger,
  values,
  countBy
} = require('lodash/fp')
const writeFileAsync = promisify(writeFile)

const validateQuery = data =>
  flow(keys, countBy(identity), count => {
    if (count > 1) {
      throw new TypeError('You can only run one query per collection.')
    }
    return data
  })(data)

const getEdges = flow(values, head, get('edges'))

const getNodes = map(get('node'))

const runQuery = async (graphql, query) => {
  const { data, errors } = await graphql(query)
  if (errors) {
    throw new Error(errors)
  }
  return data
}

const getQueryNodes = async (graphql, query) => {
  const data = await runQuery(graphql, query)
  const edges = flow(validateQuery, getEdges)(data)
  return getNodes(edges)
}

const PUBLIC_PATH = './public'

const runCollectionQuery = graphql => async ({
  query,
  map: mapNode,
  pageSize,
  baseName
}) => {
  const nodes = await getQueryNodes(graphql, query)
  return flow(map(mapNode), entries => ({
    baseName,
    pageSize,
    entries
  }))(nodes)
}

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
const getPageUris = curry(
  (destinationUri, fileNameFn, maxIndex, currentIndex) => {
    const next =
      currentIndex === maxIndex
        ? undefined
        : `${destinationUri}/${fileNameFn(currentIndex + 1)}`
    const previous =
      currentIndex === 0
        ? undefined
        : `${destinationUri}/${fileNameFn(currentIndex - 1)}`
    return { previous, next }
  }
)

const writePages = dest => ({ baseName, pages }) => {
  const fileNameForIndex = indexedWithBaseName(baseName)
  const destinationUri = createDestinationUri(dest)
  const destinationPath = createDestinationPath(dest)
  const padPageIndex = padIndex(pages)
  const createPageFileName = flow(padPageIndex, fileNameForIndex)

  const createWriteData = index => {
    const path = join(destinationPath, createPageFileName(index))
    const { previous, next } = getPageUris(
      destinationUri,
      createPageFileName,
      pages.length - 1,
      index
    )
    const data = JSON.stringify({
      next,
      previous,
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
  const paginationData = await flow(
    map(runCollectionQuery(graphql)),
    Promise.all
  )(collections)
  const paginatedData = map(paginate, paginationData)
  return flow(map(writePages(destination)), Promise.all)(paginatedData)
}

exports.onPostBuild = onPostBuild
