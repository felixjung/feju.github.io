import { flow } from 'lodash/fp'
import * as media from 'media'

const { queryHelpers, forMedia } = media

const { forScreen, withMinWidth, withMaxWidth } = queryHelpers

export const small = flow(withMaxWidth('600px'), forMedia)(forScreen)
export const medium = flow(withMinWidth('601px'), forMedia)(forScreen)
