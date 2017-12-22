import { find, flow, map } from 'lodash/fp'
import { getNodesFromAllQuery } from './gatsby'

export const normalizeSection = ({ title, body: { body }, name }) => ({
  title,
  name,
  body
})

export const normalizePage = (
  { title, sections = [], name, metaTitle, metaDescription } = {}
) => ({
  title,
  name,
  sections: sections.map(normalizeSection),
  metaTitle,
  metaDescription
})

export const getNavigationItems = flow(
  getNodesFromAllQuery('allContentfulPage'),
  map(({ name: label, route }) => ({ label, url: `/${route || ''}` }))
)

export const getPageSection = (title, sections) =>
  find(({ title: currentTitle }) => title === currentTitle, sections)
