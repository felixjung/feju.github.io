/* global exports */

const { resolve: resolvePath } = require('path')
const { stat } = require('fs')
const { promisify } = require('util')
const statAsync = promisify(stat)

const { flow, map, concat } = require('lodash/fp')

const { createAllQuery, getNodesForContentType } = require('./util')

// TODO: make component folder a variable
const getComponentPath = name => resolvePath(`./src/page-components/${name}.js`)

const componentExists = async path => {
  try {
    const stats = await statAsync(path)
    return stats.isFile()
  } catch (err) {
    return false
  }
}

const handleGraphQl = ({ data, errors }) => {
  if (errors) {
    throw new Error(errors)
  }
  return { data }
}

const pageObjectPropsFromNode = ({ id, route, name }) => ({
  component: getComponentPath(name),
  context: { id },
  path: `/${route}`
})

const blogPostObjectPropsFromNode = ({ slug, publishDate, id }) => ({
  // TODO: filter by publishDate
  component: getComponentPath('BlogPost'),
  context: { id },
  path: `/blog/${slug}`
})

const createBlogPageObject = () => ({
  component: getComponentPath('Blog'),
  path: '/blog'
})

const getPages = graphql => {
  return graphql(createAllQuery('page', `route name id`)).then(
    flow(
      handleGraphQl,
      getNodesForContentType('page'),
      map(pageObjectPropsFromNode)
    )
  )
}

const getBlogPosts = graphql =>
  graphql(createAllQuery('blogPost', 'slug publishDate id')).then(
    flow(
      handleGraphQl,
      getNodesForContentType('blogPost'),
      map(blogPostObjectPropsFromNode)
    )
  )

const createPages = async ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators
  const pagePageObjects = await getPages(graphql)
  const blogPostPageObjects = await getBlogPosts(graphql)
  const allPageObjects = concat(pagePageObjects, blogPostPageObjects)
  return map(createPage, allPageObjects)
}

exports.createPages = createPages
