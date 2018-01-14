import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { getContext } from 'recompose'
import { css, cx } from 'emotion'

import { SCROLL_CONTEXT_TYPES } from './ScrollProvider'

class Reveal extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    scrollInfo: SCROLL_CONTEXT_TYPES.scrollInfo.isRequired,
    downTolerance: PropTypes.number,
    upTolerance: PropTypes.number,
    pinStart: PropTypes.number,
    outerClassName: PropTypes.string,
    innerClassName: PropTypes.string
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
    const { scrollInfo: nextScrollInfo, pinStart } = nextProps
    const { scrollInfo } = this.props
    this.setState(prevState => {
      const clientHeight = this.innerWrapper.clientHeight
      const isScrollingDown =
        nextScrollInfo.scrollPosition > scrollInfo.scrollPosition
      const pinThreshold = clientHeight + pinStart
      // Using pinStart while scrolling up ensures the element smoothly
      // moves into static position.
      const isFixed =
        (isScrollingDown && nextScrollInfo.scrollPosition >= pinThreshold) ||
        (!isScrollingDown && nextScrollInfo.scrollPosition >= pinStart)
      const isPinned =
        (!isScrollingDown && isFixed) ||
        (isScrollingDown && nextScrollInfo.scrollPosition <= pinThreshold)
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
      scrollInfo,
      downTolerance,
      upTolerance,
      outerClassName,
      innerClassName,
      ...props
    } = this.props
    const { isFixed, isPinned, isAnimated } = this.state
    const height = this.innerWrapper && this.innerWrapper.clientHeight
    const outerWrapperClass = css`
      height: ${height ? height + 'px' : 'auto'};
      left: 0;
      position: relative;
      right: 0;
      top: 0;
      z-index: 1;
    `
    const innerWrapperClass = css`
      position: relative;
      top: 0;
      left: 0;
      right: 0;
      transform: translateY(0px);
    `
    const fixedClass = css`
      position: fixed;
      transform: translateY(-100%);
      ${isAnimated ? 'transition: all 500ms ease' : undefined};
    `
    const pinnedClass = css`
      transform: translateY(0px);
    `
    return (
      <div className={cx(outerWrapperClass, outerClassName)}>
        <div
          className={cx(innerWrapperClass, innerClassName, {
            [fixedClass]: isFixed,
            [pinnedClass]: isPinned
          })}
          ref={el => {
            this.innerWrapper = el
          }}
        >
          {children(props)}
        </div>
      </div>
    )
  }
}

export default getContext(SCROLL_CONTEXT_TYPES)(Reveal)
