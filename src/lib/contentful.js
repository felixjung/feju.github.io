import { flow, reduce, map, set } from 'lodash/fp'
import { getNodesFromAllQuery } from './gatsby'

export const getPageSection = ({ title, body: { body }, name }) => ({
  title,
  name,
  body
})

export const getPage = ({ title, sections, name }) => ({
  title,
  name,
  sections: sections.map(getPageSection)
})

export const getNavigationItems = flow(
  getNodesFromAllQuery('allContentfulPage'),
  map(({ name: label, route }) => ({ label, url: `/${route}` }))
)
