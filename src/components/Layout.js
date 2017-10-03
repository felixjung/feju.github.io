import React from 'react'
import styled from 'react-emotion'
import PropTypes from 'prop-types'
import { has } from 'lodash/fp'

import { breakpoints } from '../styles/variables'
import { medium } from '../styles/mixins'

export const insetStyles = [
  {
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  medium({
    maxWidth: '600px'
  })
]

export const InsetParagraph = styled('p')(...insetStyles)
export const InsetUl = styled('ul')(...insetStyles)
export const InsetOl = styled('ol')(...insetStyles)
export const InsetH1 = styled('h1')(...insetStyles)
export const InsetH2 = styled('h2')(...insetStyles)
export const InsetH3 = styled('h3')(...insetStyles)
export const InsetH4 = styled('h4')(...insetStyles)
export const InsetH5 = styled('h5')(...insetStyles)
export const InsetH6 = styled('h6')(...insetStyles)
export const InsetTable = styled('table')(...insetStyles)
export const InsetDiv = styled('div')(...insetStyles)
const CodeBackground = styled('div')({
  backgroundColor: '#282c34',
  paddingTop: '12px',
  paddingBottom: '12px'
})
const ArticleImage = styled('img')({
  width: '100vw',
  height: 'auto'
})
export const SmartParagraph = ({ children, ...props }) => {
  const firstChild = children[0]
  const isImage = has('props.src', firstChild)
  if (isImage) {
    return <div>{children}</div>
  }

  return <InsetParagraph {...props}>{children}</InsetParagraph>
}

export const ContentfulImage = ({ src, alt }) => {
  // TODO: Add figure/figcaption
  const optimizedSrc = `${src}?fm=jpg&fl=progressive`
  const sSrc = `${optimizedSrc}&w=${breakpoints.m}&h=${breakpoints.m}`
  const sSrc2x = `${optimizedSrc}&w=${breakpoints.m * 2}&h=${breakpoints.m * 2}`
  const mSrc = `${optimizedSrc}&w=${breakpoints.l}&h=${breakpoints.l}`
  const mSrc2x = `${optimizedSrc}&w=${breakpoints.l * 2}&h=${breakpoints.l * 2}`
  const lSrc = `${optimizedSrc}&w=${breakpoints.xl}&h=${breakpoints.xl}`
  const lSrc2x = `${optimizedSrc}&w=${breakpoints.xl * 2}&h=${breakpoints.xl *
    2}`
  const xlSrc = `${optimizedSrc}&w=1920&h=1080`
  const xlSrc2x = `${optimizedSrc}&w=3840&h=2160&q=70`
  const hiResQuality = 70
  return (
    <picture>
      <source
        srcSet={`${sSrc}, ${sSrc2x}&q=${hiResQuality} 2x`}
        media={`(max-width: ${breakpoints.beforeM}px)`}
      />
      <source
        srcSet={`${mSrc}, ${mSrc2x}&q=${hiResQuality} 2x`}
        media={`(max-width: ${breakpoints.beforeL}px)`}
      />
      <source
        srcSet={`${lSrc}, ${lSrc2x}&q=${hiResQuality} 2x`}
        media={`(max-width: ${breakpoints.beforeXl}px)`}
      />
      <source
        srcSet={`${xlSrc}, ${xlSrc2x}&q=${hiResQuality} 2x`}
        media={`(min-width: ${breakpoints.xl}px)`}
      />
      <ArticleImage src={lSrc2x} alt={alt} />
    </picture>
  )
}
ContentfulImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired
}

const InsetPre = InsetDiv.withComponent('pre')
export const Pre = props => (
  <CodeBackground>
    <InsetPre {...props} />
  </CodeBackground>
)
export const inPage = Comp => {
  const wrappedComponent = ({ children }) => (
    <Comp>
      <InsetDiv>{children}</InsetDiv>
    </Comp>
  )
  wrappedComponent.displayName = `wrapped${Comp.displayName}`
  wrappedComponent.propTypes = {
    children: PropTypes.node.isRequired
  }
  return wrappedComponent
}

export const Section = inPage('section')
export const Nav = inPage('nav')
