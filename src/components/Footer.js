import styled from 'react-emotion'

import { mainContainer } from '../styles/layout-styles'

const Footer = styled('footer')(...mainContainer, ({ theme }) => ({
  fontSize: theme.fontSize.xxs,
  marginTop: `calc(2 * ${theme.spacing.xxxl})`,
  marginBottom: `calc(${theme.spacing.xxxl})`
}))

export default Footer
