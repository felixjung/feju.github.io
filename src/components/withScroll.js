import { getContext } from 'recompose'
import { SCROLL_CONTEXT_TYPES } from './ScrollProvider'

const withScroll = ({ children, ...props }) => children(props)
export default getContext(SCROLL_CONTEXT_TYPES)(withScroll)
