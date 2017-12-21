import { find, flow, map } from 'lodash/fp'
import { getNodesFromAllQuery } from './gatsby'

export const normalizeSection = ({ title, body: { body }, name }) => ({
  title,
  name,
  body
})

export const normalizePage = ({ title, sections, name }) => ({
  title,
  name,
  sections: sections.map(normalizeSection)
})

export const getNavigationItems = flow(
  getNodesFromAllQuery('allContentfulPage'),
  map(({ name: label, route }) => ({ label, url: `/${route}` }))
)

export const getPageSection = (title, sections) =>
  find(({ title: currentTitle }) => title === currentTitle, sections)
