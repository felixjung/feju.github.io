import React from 'react'
import styled from 'react-emotion'

import { H1 } from '../components/Elements/Headings'
import { mainContainer } from '../styles/layout-styles'
import { Paragraph } from '../components/Elements/Text'

const Section = styled('section')`
  align-items: center;
  display: flex;
  flex-direction: column;
  ${mainContainer};
`

const P = styled(Paragraph)(({ theme }) => ({
  fontFamily: theme.fonts.sansSerif.family,
  fontSize: theme.fontSize.xxl
}))

const ErrorPage = () => {
  return (
    <Section>
      <H1>¯\_(ツ)_/¯</H1>
      <P>Sorry, this page does not exist.</P>
    </Section>
  )
}

export default ErrorPage
