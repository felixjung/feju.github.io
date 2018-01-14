import { Component, Children } from 'react'
import PropTypes from 'prop-types'
import { throttle } from 'lodash/fp'

const getScrollState = ({
  scrollTop: scrollPosition,
  clientHeight: visibleHeight,
  offsetHeight: scrollHeight
}) => {
  const isScrolledToBottom = scrollPosition + visibleHeight === scrollHeight
  const isScrolledToTop = scrollPosition === 0
  return {
    scrollPosition,
    visibleHeight,
    scrollHeight,
    isScrolledToBottom,
    isScrolledToTop
  }
}

export const SCROLL_CONTEXT_TYPES = {
  scrollPosition: PropTypes.number,
  visibleHeight: PropTypes.number,
  scrollHeight: PropTypes.number,
  isScrolledToBottom: PropTypes.bool,
  isScrolledToTop: PropTypes.bool
}

export default class ScrollProvider extends Component {
  static childContextTypes = SCROLL_CONTEXT_TYPES

  constructor(props) {
    super(props)
    this.scrollingElement = null
    this.state = {
      scrollPosition: 0,
      scrollHeight: null,
      visibleHeight: null,
      isScrolledToTop: true,
      isScrolledToBottom: false
    }
    this.debouncedScroll = throttle(50, this.handleScroll)
  }

  componentDidMount() {
    window.addEventListener('scroll', this.debouncedScroll)
    const { scrollingElement } = document
    this.scrollingElement = scrollingElement
    this.setState(prevState => ({
      ...prevState,
      ...getScrollState(scrollingElement)
    }))
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.debouncedScroll)
  }

  getChildContext() {
    return { ...this.state }
  }

  handleScroll = () => {
    this.setState(prevState => ({
      ...prevState,
      ...getScrollState(this.scrollingElement)
    }))
  }

  render() {
    return Children.only(this.props.children)
  }
}
