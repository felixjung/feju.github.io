import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { getContext } from 'recompose'
import { css, cx } from 'emotion'
import facepaint from 'facepaint'

import { breakpoints } from '../styles/variables'
import { SCROLL_CONTEXT_TYPES } from './ScrollProvider'

const mq = facepaint([
  `@media(min-width: ${breakpoints.m}px)`,
  `@media(min-width: ${breakpoints.l}px)`
])

class Reveal extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    ...SCROLL_CONTEXT_TYPES,
    downTolerance: PropTypes.number,
    upTolerance: PropTypes.number,
    pinStart: PropTypes.number,
    outerClassName: PropTypes.string,
    innerClassName: PropTypes.string,
    pinnedClassName: PropTypes.string
  }

  static defaultProps = {
    downTolerance: 100, // How far to scroll to trigger pinning
    upTolerance: 100,
    pinStart: 0, // Extra space above/before element
    outerClassName: null,
    innerClassName: null
  }

  constructor(props) {
    super(props)
    this.state = {
      isFixed: false,
      isPinned: false,
      isScrollingDown: false,
      isAnimated: false
    }
  }

  componentWillReceiveProps(nextProps) {
    const { scrollPosition: nextScrollPosition, pinStart } = nextProps
    const { scrollPosition } = this.props
    this.setState(prevState => {
      const clientHeight = this.innerWrapper.clientHeight
      const isScrollingDown = nextScrollPosition > scrollPosition
      const pinThreshold = clientHeight + pinStart

      // Using pinStart while scrolling up ensures the element smoothly
      // moves into static position.
      const isFixed =
        (isScrollingDown && nextScrollPosition >= pinThreshold) ||
        (!isScrollingDown && nextScrollPosition >= pinStart)
      const isPinned =
        (!isScrollingDown && isFixed) ||
        (isScrollingDown && nextScrollPosition <= pinThreshold)
      return {
        ...prevState,
        isFixed,
        isPinned,
        isScrollingDown
      }
    })
  }

  componentDidUpdate(prevProps, { isFixed: prevIsFixed }) {
    const { isFixed } = this.state

    if (isFixed && !prevIsFixed) {
      this.setState(prevState => ({ ...prevState, isAnimated: true }))
    }

    if (!isFixed && prevIsFixed) {
      this.setState(prevState => ({ ...prevState, isAnimated: false }))
    }
  }

  render() {
    const {
      children,
      outerClassName,
      innerClassName,
      pinnedClassName
    } = this.props
    const { isFixed, isPinned, isAnimated } = this.state
    const height = this.innerWrapper && this.innerWrapper.clientHeight
    const outerWrapperClass = css(
      mq({
        height: height ? height + 'px' : 'auto',
        left: 0,
        position: ['fixed', 'relative'],
        right: 0,
        top: ['auto', 0],
        bottom: [0, 'auto'],
        zIndex: 1
      })
    )
    const innerWrapperClass = css(
      mq({
        position: 'relative',
        top: ['auto', 0],
        bottom: [0, 'auto'],
        left: 0,
        right: 0,
        transform: ['translateY(0px)', 'translateY(0px)']
      })
    )

    const fixedClass = css(
      mq({
        position: 'fixed',
        transform: ['translateY(100%)', 'translateY(-100%)'],
        transition: isAnimated
          ? ['all 500ms ease', 'all 500ms ease']
          : ['all 500ms ease', 'none']
      })
    )
    const pinnedClass = css(
      mq({
        transform: ['translateY(0px)', 'translateY(0px)']
      })
    )
    const renderProps = {
      isPinned,
      isFixed,
      isAnimated
    }
    return (
      <div className={cx(outerWrapperClass, outerClassName)}>
        <div
          className={cx(innerWrapperClass, innerClassName, {
            [fixedClass]: isFixed,
            [pinnedClass]: isPinned,
            [pinnedClassName]: isPinned && isFixed
          })}
          ref={el => {
            this.innerWrapper = el
          }}
        >
          {children(renderProps)}
        </div>
      </div>
    )
  }
}

export default getContext(SCROLL_CONTEXT_TYPES)(Reveal)
