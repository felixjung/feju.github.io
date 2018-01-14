import { Component, Children } from 'react'
import PropTypes from 'prop-types'
import { throttle } from 'lodash/fp'

export const SCROLL_CONTEXT_TYPES = {
  scrollInfo: PropTypes.shape({
    scrollPosition: PropTypes.number,
    scrollingElement: PropTypes.any
  })
}

export default class ScrollProvider extends Component {
  static childContextTypes = SCROLL_CONTEXT_TYPES

  constructor(props) {
    super(props)
    this.scrollingElement = null
    this.state = {
      scrollPosition: 0
    }
    this.debouncedScroll = throttle(50, this.handleScroll)
  }

  componentDidMount() {
    window.addEventListener('scroll', this.debouncedScroll)
    const { scrollingElement } = document
    this.scrollingElement = scrollingElement
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.debouncedScroll)
  }

  getChildContext() {
    const { scrollPosition } = this.state
    const { scrollingElement } = this
    return { scrollInfo: { scrollPosition, scrollingElement } }
  }

  handleScroll = () => {
    const { scrollTop: scrollPosition } = this.scrollingElement
    this.setState(prevState => ({
      ...prevState,
      scrollPosition
    }))
  }

  render() {
    return Children.only(this.props.children)
  }
}
