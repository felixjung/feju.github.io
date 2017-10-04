import { curry, flow, get, map } from 'lodash/fp'

export const getNodesFromAllQuery = curry((rootQueryType, data) =>
  flow(get(`${rootQueryType}.edges`), map(({ node }) => node))(data)
)
