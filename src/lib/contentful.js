import { flow, map } from 'lodash/fp'

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

export const getPages = ({ allContentfulPage } = {}) => flow(
  // TODO: make this work again using the above function so that the Nav works.
)
